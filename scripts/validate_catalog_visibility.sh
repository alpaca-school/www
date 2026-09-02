#!/usr/bin/env bash
# data/catalog-visibility.snapshot.json の構造・整合性を検証する。
# node不要（既存CIにNode環境が無いため、python3のみで完結させる）。

set -uo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root" || exit 1

python3 - <<'PY'
import json, re, sys

failed = False

def fail(msg):
    global failed
    print(f"ERROR: {msg}", file=sys.stderr)
    failed = True

try:
    snapshot = json.load(open("data/catalog-visibility.snapshot.json", encoding="utf-8"))
except Exception as e:
    fail(f"snapshot JSON parse失敗: {e}")
    sys.exit(1)

rows = snapshot.get("rows")
if not isinstance(rows, list) or not rows:
    fail("rows が配列でないか空です")
    sys.exit(1)

if len(rows) > 1000:
    fail(f"行数が上限(1000)を超えています: {len(rows)}")

seen = set()
for row in rows:
    entity_type = row.get("entity_type")
    entity_id = row.get("entity_id")
    visible = row.get("visible")

    if entity_type not in ("theme", "material"):
        fail(f"不正な entity_type: {row}")
        continue
    if not isinstance(entity_id, str) or not entity_id:
        fail(f"不正な entity_id: {row}")
        continue
    if not isinstance(visible, bool):
        fail(f"visible がboolean型ではありません: {row}")
        continue

    key = (entity_type, entity_id)
    if key in seen:
        fail(f"重複ID: {key}")
    seen.add(key)

# matrix-library.html の MATERIALS / series-nav-data.js の SERIES_META に
# 実在しないIDが紛れ込んでいないかを確認する（IDだけの整合性チェック。値の正誤は見ない）。
html = open("matrix-library.html", encoding="utf-8").read()
m = re.search(r"const MATERIALS = (\[[\s\S]*?\n\s*\]);", html)
material_ids = set(re.findall(r'id:\s*"([^"]*)"', m.group(1))) if m else set()

js = open("series-nav-data.js", encoding="utf-8").read()
theme_keys = set(re.findall(r'key:\s*"([^"]*)"', js))

for row in rows:
    entity_type = row.get("entity_type")
    entity_id = row.get("entity_id")
    if entity_type == "material" and entity_id not in material_ids:
        fail(f"matrix-library.html に存在しない教材IDがスナップショットにあります: {entity_id}")
    if entity_type == "theme" and entity_id not in theme_keys:
        fail(f"series-nav-data.js の SERIES_META に存在しないテーマkeyがスナップショットにあります: {entity_id}")

if failed:
    sys.exit(1)

print(f"catalog-visibility snapshot: {len(rows)}行、整合性OK")
PY
