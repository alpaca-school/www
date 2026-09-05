#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const REPOSITORY_ROOT = path.resolve(__dirname, "..");
const SERIES_DATA_PATH = path.join(REPOSITORY_ROOT, "series-nav-data.js");
const OUTPUT_PATH = path.join(REPOSITORY_ROOT, "material-curriculum-map.js");
const EXPECTED_SERIES_COUNT = 18;
const EXPECTED_MATERIAL_COUNT = 151;

function readSeriesMeta() {
  const source = fs.readFileSync(SERIES_DATA_PATH, "utf8");
  return vm.runInNewContext(`${source}\nSERIES_META`);
}

function extractArrayLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;

  const arrayStart = source.indexOf("[", markerIndex + marker.length);
  if (arrayStart < 0) return null;

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = arrayStart; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "[") depth += 1;
    if (character === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(arrayStart, index + 1);
    }
  }

  return null;
}

function evaluateStringArray(arrayLiteral) {
  if (!arrayLiteral) return null;

  try {
    const value = vm.runInNewContext(`(${arrayLiteral})`);
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
      return null;
    }
    return value;
  } catch (_error) {
    return null;
  }
}

function cleanInlineHtml(value) {
  return value
    .replace(/<rt>[\s\S]*?<\/rt>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractInlineStandards(source) {
  const headingIndex = source.indexOf("学習指導要領との対応");
  if (headingIndex < 0) return [];

  const listEnd = source.indexOf("</ul>", headingIndex);
  if (listEnd < 0) return [];

  const listSource = source.slice(headingIndex, listEnd);
  return [...listSource.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((match) =>
    cleanInlineHtml(match[1])
  );
}

function extractStandards(source) {
  const standards = evaluateStringArray(extractArrayLiteral(source, "const STANDARDS"));
  if (standards) return { method: "STANDARDS", values: standards };

  const curriculum = evaluateStringArray(extractArrayLiteral(source, "curriculum:"));
  if (curriculum) return { method: "curriculum", values: curriculum };

  return { method: "inline", values: extractInlineStandards(source) };
}

function parseStandard(rawValue) {
  const value = rawValue.replace(/\s+/g, " ").trim();
  const separatorIndex = value.search(/[：:]/);
  let label = separatorIndex >= 0 ? value.slice(0, separatorIndex).trim() : value;
  let unit = separatorIndex >= 0 ? value.slice(separatorIndex + 1).trim() : "";
  let subject = label;
  let grade = "";

  const parenthetical = label.match(/^(.*?)（([^）]+)）$/);
  if (parenthetical) {
    const detail = parenthetical[2].trim();
    const isGrade = /(年|学年|小学校|中学校|高校|小学|中学|高学年|低学年)/.test(detail);

    if (isGrade) {
      subject = parenthetical[1].trim();
      grade = detail;
    } else if (!unit) {
      subject = parenthetical[1].trim();
      unit = detail;
    }
  }

  if (!grade) {
    const attachedGrade = subject.match(/^(.+?)([0-9０-９]+(?:[〜~-][0-9０-９]+)?年(?:〜)?)$/);
    if (attachedGrade) {
      subject = attachedGrade[1].trim();
      grade = attachedGrade[2].trim();
    }
  }

  const schoolLevel = subject.match(/^(小学校|小学|中学校|中学|高校)(.+)$/);
  if (schoolLevel) {
    const normalizedLevel = {
      小学: "小学校",
      小学校: "小学校",
      中学: "中学校",
      中学校: "中学校",
      高校: "高校",
    }[schoolLevel[1]];
    subject = schoolLevel[2].trim();
    grade = grade ? `${normalizedLevel}${grade}` : normalizedLevel;
  }

  return { subject, grade, unit };
}

function buildCurriculumMap() {
  const seriesMeta = readSeriesMeta();
  const entries = [];
  const methods = { inline: 0, STANDARDS: 0, curriculum: 0 };

  for (const series of seriesMeta) {
    for (const episode of series.episodes) {
      const materialPath = path.join(REPOSITORY_ROOT, episode.url.split(/[?#]/, 1)[0]);
      if (!fs.existsSync(materialPath)) {
        throw new Error(`教材HTMLが見つかりません: ${episode.id} (${episode.url})`);
      }

      const source = fs.readFileSync(materialPath, "utf8");
      const extracted = Array.isArray(episode.curriculum)
        ? { method: "curriculum", values: episode.curriculum }
        : extractStandards(source);
      methods[extracted.method] += 1;

      if (extracted.values.length === 0) {
        throw new Error(`学習指導要領対応を抽出できません: ${episode.id} (${episode.url})`);
      }

      entries.push([
        episode.id,
        {
          series: series.name,
          title: episode.title,
          subjects: extracted.values.map(parseStandard),
        },
      ]);
    }
  }

  if (seriesMeta.length !== EXPECTED_SERIES_COUNT) {
    throw new Error(`シリーズ数が想定外です: ${seriesMeta.length}/${EXPECTED_SERIES_COUNT}`);
  }
  if (entries.length !== EXPECTED_MATERIAL_COUNT) {
    throw new Error(`教材数が想定外です: ${entries.length}/${EXPECTED_MATERIAL_COUNT}`);
  }

  const materialIds = entries.map(([materialId]) => materialId);
  const duplicateIds = materialIds.filter((materialId, index) => materialIds.indexOf(materialId) !== index);
  if (duplicateIds.length > 0) {
    throw new Error(`material_idが重複しています: ${[...new Set(duplicateIds)].join(", ")}`);
  }

  return { curriculumMap: Object.fromEntries(entries), methods };
}

function writeCurriculumMap(curriculumMap) {
  const generated = [
    "// このファイルは scripts/generate_material_curriculum_map.js で生成します。",
    `// series-nav-data.js の${Object.keys(curriculumMap).length}話と、各教材HTMLの renderParent にある学習指導要領対応を正本とします。`,
    "const MATERIAL_CURRICULUM_MAP = Object.freeze(",
    JSON.stringify(curriculumMap, null, 2),
    ");",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_PATH, generated, "utf8");
}

const { curriculumMap, methods } = buildCurriculumMap();
writeCurriculumMap(curriculumMap);

console.log(`material-curriculum-map.js を生成しました（${Object.keys(curriculumMap).length}話）`);
console.log(`抽出方式: inline=${methods.inline}, STANDARDS=${methods.STANDARDS}, curriculum=${methods.curriculum}`);
