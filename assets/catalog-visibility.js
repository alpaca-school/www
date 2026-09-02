// 表示設定の合成レイヤー（テーマ・教材の表示/非表示をGoogleスプレッドシートから取得する）。
// Babelを通さない素の<script>として、matrix-library.html / series-guide.html の両方から読み込む。
// 参照: docs/2026-08-31-google-sheets-visibility-design-plan.md
//
// 運用担当者がGoogleスプレッドシートのチェックボックスを切り替えるだけで、
// テーマ・教材一覧の表示/非表示を切り替えられるようにする。教材本文・URL・分類等は
// このファイルからは一切編集できない（表示可否のbooleanのみを扱う）。
(function (global) {
  "use strict";

  // 公開シート（表示設定専用ブック）のID・タブ。実運用シートを作成後、ここだけ書き換える。
  const SHEET_ID = "1TrDP6OnmNjOVBeLcHdBdCAHL2WjtKe68FBOk33Uq5LU"; // 「アルパカすく〜る 表示設定（テーマ・教材）」
  const SHEET_GID = "0"; // 唯一のシート（1枚目）のgid
  const REMOTE_TIMEOUT_MS = 2500;
  const SNAPSHOT_URL = "./data/catalog-visibility.snapshot.json";
  const MAX_ROWS = 1000;

  function isPlaceholderSheetId(id) {
    return !id || id.indexOf("【要記入") === 0;
  }

  // Google Visualization Query（gviz）。
  // 実機検証の結果、<script>タグ注入（JSONPコールバック）は、gvizエンドポイントが
  // 返す `Content-Disposition: attachment` ヘッダによりChromeがスクリプト実行をブロックし、
  // エラーも出さず沈黙して失敗することを確認した（2026-09-02、responseHandler方式で0件のまま
  // タイムアウトフォールバックのみ発生）。gvizエンドポイントは公開シートに対しては
  // Access-Control-Allow-Origin をリクエスト元へ反映するため、fetch()で直接取得できる。
  function fetchViaVisualizationQuery(sheetId, gid, timeoutMs) {
    if (isPlaceholderSheetId(sheetId)) {
      return Promise.reject(new Error("SHEET_ID未設定"));
    }

    const url =
      "https://docs.google.com/spreadsheets/d/" +
      encodeURIComponent(sheetId) +
      "/gviz/tq?gid=" +
      encodeURIComponent(gid) +
      "&tqx=out:json";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    return fetch(url, { credentials: "omit", signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("HTTPエラー: " + res.status);
        return res.text();
      })
      .then((text) => {
        // 応答は `/*O_o*/\ngoogle.visualization.Query.setResponse({...});` の形式。
        // eval/Functionは使わず、JSON部分だけを正規表現で切り出してJSON.parseする。
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);\s*$/);
        if (!match) throw new Error("gviz応答の形式が不正");
        const response = JSON.parse(match[1]);
        if (!response || response.status !== "ok") throw new Error("gvizエラー応答");

        const table = response.table;
        const cols = table.cols.map((c) => (c.label || c.id || "").trim());
        const rows = table.rows
          .map((r) =>
            cols.reduce((acc, colName, i) => {
              const cell = r.c && r.c[i];
              acc[colName] = cell ? cell.v : null;
              return acc;
            }, {})
          )
          // シート既定の空行（entity_type/entity_idが両方とも空）を除外する。
          // 除外せず検証に回すと、埋まっていない行のせいで表示設定全体が不正判定されてしまう。
          .filter((row) => row.entity_type != null || row.entity_id != null);
        return rows;
      })
      .finally(() => clearTimeout(timer));
  }

  function fetchSnapshot() {
    return fetch(SNAPSHOT_URL, { cache: "no-store" }).then((res) => {
      if (!res.ok) throw new Error("スナップショット取得失敗");
      return res.json();
    }).then((json) => {
      if (!Array.isArray(json.rows)) throw new Error("スナップショット形式不正");
      return json.rows;
    });
  }

  // 行配列 -> { "theme:shishimai": true, "material:shishimai-ep01": false, ... }
  // 1件でも不正な行があれば null を返し、呼び出し側にフォールバックさせる（部分適用しない）。
  function validateAndBuildRules(rows) {
    if (!Array.isArray(rows) || rows.length === 0 || rows.length > MAX_ROWS) return null;

    const rules = Object.create(null);
    const seen = Object.create(null);

    for (const row of rows) {
      const entityType = row.entity_type;
      const entityId = row.entity_id;
      const visibleRaw = row.visible;

      if (entityType !== "theme" && entityType !== "material") return null;
      if (typeof entityId !== "string" || entityId.trim() === "") return null;

      let visible;
      if (typeof visibleRaw === "boolean") {
        visible = visibleRaw;
      } else if (typeof visibleRaw === "string") {
        const normalized = visibleRaw.trim().toUpperCase();
        if (normalized === "TRUE") visible = true;
        else if (normalized === "FALSE") visible = false;
        else return null;
      } else {
        return null;
      }

      const key = entityType + ":" + entityId.trim();
      if (seen[key]) return null; // 重複ID
      seen[key] = true;
      rules[key] = visible;
    }

    return rules;
  }

  function ruleFor(rules, entityType, entityId) {
    if (!rules) return true; // 表示設定が取得できない場合は全表示（後方互換）
    const key = entityType + ":" + entityId;
    if (!Object.prototype.hasOwnProperty.call(rules, key)) return true; // 行がないIDは表示維持
    return rules[key];
  }

  // themeId が null/undefined の単発教材はテーマ非表示の影響を受けない。
  function isMaterialVisible(rules, materialId, themeId) {
    if (!ruleFor(rules, "material", materialId)) return false;
    if (themeId && !ruleFor(rules, "theme", themeId)) return false;
    return true;
  }

  function isThemeVisible(rules, themeId) {
    return ruleFor(rules, "theme", themeId);
  }

  // { source: 'remote'|'snapshot'|'static', rules: object|null }
  function load() {
    const remote = fetchViaVisualizationQuery(SHEET_ID, SHEET_GID, REMOTE_TIMEOUT_MS)
      .then((rows) => {
        const rules = validateAndBuildRules(rows);
        if (!rules) throw new Error("リモート表示設定が不正");
        return { source: "remote", rules: rules };
      });

    return remote.catch(() =>
      fetchSnapshot()
        .then((rows) => {
          const rules = validateAndBuildRules(rows);
          if (!rules) throw new Error("スナップショットが不正");
          return { source: "snapshot", rules: rules };
        })
        .catch(() => ({ source: "static", rules: null }))
    );
  }

  global.CatalogVisibility = {
    load: load,
    isMaterialVisible: isMaterialVisible,
    isThemeVisible: isThemeVisible,
    _validateAndBuildRules: validateAndBuildRules, // テスト用
  };
})(window);
