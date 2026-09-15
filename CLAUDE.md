# Claude Code entrypoint — アルパカすく〜る

このリポジトリを Claude Code / Claude CLI で開いたら、作業を始める前に必ず次の2ファイルを読むこと。

- @AGENTS.md
- @docs/hinukan-v2-work-log.md

`AGENTS.md` が制作・検証・Git運用の正本であり、このファイルと矛盾する場合は `AGENTS.md` を優先する。

## 端末をまたぐ作業

MBA2017・MBA2025のどちらでも、端末固有の絶対パスではなく、現在のGitリポジトリのルートを基準に作業する。開始時に以下を確認する。

```bash
git remote -v
git status --short
git branch --show-current
git fetch origin
```

- 正しいremoteは `https://github.com/alpaca-school/www.git`。
- 未commitの変更がある場合は、所有者と内容を確認するまで上書き・削除しない。
- `main`を更新するときは、cleanな状態を確認して `git pull --ff-only origin main` を使う。
- 作業の続きは、対象ブランチと `docs/` 内の引き継ぎ文書を確認してから着手する。
- pushは、各作業についてユーザーの明示的な許可がある場合だけ実行する。

## 現在のヒヌカンV2

- 作業ブランチ：`hinukan-v2`
- V1 `bunka/hinukan_ep01.html`〜`09.html` は変更しない。
- V2 `bunka/hinukan_v2_ep01.html`〜`09.html` は、正式7画面テンプレートへ移植済み。
- 詳細・検証結果・未完了事項は @docs/hinukan-v2-work-log.md を正とする。
