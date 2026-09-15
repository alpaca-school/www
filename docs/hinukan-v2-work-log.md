# ヒヌカンV2 作業記録

最終更新：2026-09-15  
対象リポジトリ：`alpaca-school/www`  
作業ブランチ：`hinukan-v2`

## 1. 作業の目的

既存のヒヌカン教材をVersion 1として変更せずに残し、次の問いが連続するVersion 2を別シリーズとして制作する。

> おばあちゃんの「1日・15日」  
> → 新暦と旧暦  
> → 旧暦と月の満ち欠け  
> → 月の観察  
> → 月の近くに見える光  
> → 星の動き  
> → 家族・地域への聞き取り  
> → 火・月・星の記録を次の人へ渡す

## 2. Version 1との関係

- Version 1：`bunka/hinukan_ep01.html`〜`bunka/hinukan_ep09.html`
- Version 2：`bunka/hinukan_v2_ep01.html`〜`bunka/hinukan_v2_ep09.html`
- Version 1の9ファイルには変更を加えていない。
- Version 2は上書き版ではなく、独立したストーリー型シリーズとして追加した。

## 3. Version 2の全9話

| 回 | 学びのルート | タイトル |
|---|---|---|
| ep1 | 論理・数学 | おばあちゃんの「1日・15日」って、いつ？ |
| ep2 | 言語 | 旧暦って、どんなカレンダー？ |
| ep3 | 音楽・リズム | 月にもリズムがある？ |
| ep4 | 身体・運動 | 月を探しに外へ出よう |
| ep5 | 博物学 | 月は、どうして形が変わる？ |
| ep6 | 視覚・空間 | 月のとなりの光を、地図にしよう |
| ep7 | 論理・数学 | 星は、1時間でどれくらい動く？ |
| ep8 | 対人 | 家族に「月と空の記憶」を聞いてみよう |
| ep9 | 集・表現 | わたしの「火・月・星」ノートをつくろう |

## 4. 実装内容

Version 2の9話を、`AGENTS.md`で定められた正式テンプレートへ移植した。

- React 18＋Babel standalone＋Tailwind CSS CDNの単一HTML
- 標準7画面構成
  1. `intro`：はじまりの問い
  2. `trouble`：困りごと
  3. `mentor`：メンター登場
  4. `verify`：やってみる
  5. `imagine`：想像する
  6. `checkin`：ふりかえり
  7. `parent`：おわりに
- ふりがなON／OFF
- キーボードで操作できる選択肢
- 学習記録シートの印刷
- 前後エピソードナビゲーション
- 教材一覧への導線
- キャッシュ対策用`pageVersion`
- 320px以上を対象にしたレスポンシブ設計

## 5. 更新・追加ファイル

### 教材本体

- `bunka/hinukan_v2_ep01.html`
- `bunka/hinukan_v2_ep02.html`
- `bunka/hinukan_v2_ep03.html`
- `bunka/hinukan_v2_ep04.html`
- `bunka/hinukan_v2_ep05.html`
- `bunka/hinukan_v2_ep06.html`
- `bunka/hinukan_v2_ep07.html`
- `bunka/hinukan_v2_ep08.html`
- `bunka/hinukan_v2_ep09.html`

### 一覧・ナビゲーション

- `series-nav-data.js`
  - `HINUKAN_V2_EPISODES`を追加
  - `SERIES_META`へ`hinukan-v2`を追加
- `matrix-library.html`
  - Version 2の教材9件を追加
- `index2.html`
  - `matrix-library.html`と同一内容へ同期

### 引き継ぎ

- `CLAUDE.md`
  - Claude Code／Claude CLIが最初に読むプロジェクト入口として追加
- `AGENTS.md`
  - 「§35. ヒヌカンV2」を追加
- `docs/hinukan-v2-handoff.txt`
  - 初回作業時の簡易引き継ぎ記録。今後は本Markdownを詳細記録の正本とする

## 6. 内容上のガードレール

- 「ヒヌカンに1日・15日に線香をあげる」を沖縄全体の共通規則として扱わない。
- 教材用の架空場面に登場する、ある家庭のおばあちゃんの経験として提示する。
- 特定の祀り方を正解とせず、祈りや線香の実演を学習課題にしない。
- ヒヌカンを祀っていない家庭や、家庭について話したくない人も参加できる設計にする。
- 聞き取りは任意とし、実名・住所・家庭事情を入力させない。
- 旧暦は月の満ち欠けを基礎とし、季節とのずれも調整する太陰太陽暦として扱う。
- 「旧暦15日は必ず天文学上の満月」と断定しない。
- 星の約15度／時は、天の極を中心に見た日周運動の回転角として説明する。
- 夜の観察は大人と安全な場所で行い、窓辺や資料による代替を認める。
- 太陽を直接見たり、双眼鏡や望遠鏡で太陽を探したりさせない。

## 7. 確認した出典

- [国立天文台「『旧暦』ってなに？」](https://www.nao.ac.jp/faq/a0304.html)
- [国立天文台「旧暦の日付と月の形」関連FAQ](https://www.nao.ac.jp/faq/)
- 日本天文学会の天文学辞典にある日周運動の説明

各教材では、実際に使用した資料だけを「🎬 おわりに」の「📚 出典・参考資料」へ表示する。

## 8. 実施済みの検証

2026-09-15時点で、次を確認済み。

- `./scripts/check_material_responsive.sh`：合格
- Version 2の9話すべてがレスポンシブ検査対象に含まれること：確認済み
- 標準7画面の順序：9話すべて確認済み
- JSX内の中括弧・丸括弧の対応：確認済み
- 内部リンクと画像参照：欠落なし
- `HINUKAN_V2_EPISODES`：9件一致
- `matrix-library.html`のVersion 2教材：9件一致
- `matrix-library.html`と`index2.html`：差分なし
- Version 1の9ファイル：`origin/main`からの差分なし
- 秘密情報の混入：なし
- `fetch`、`XMLHttpRequest`、`localStorage`等の外部送信・永続保存処理：追加なし
- 表示設定スナップショット：整合性合格
- 独立レビュー：Critical／Highの問題なし
- 指摘されたキーボード操作と印刷時の回答欠落：修正済み

## 9. 未完了の確認

次の実ブラウザ確認は未完了。

- 全7画面の遷移
- 選択肢のクリック・キーボード操作
- 自由記述の入力
- 印刷プレビュー
- 320／375／390／430／768pxでの横スクロール、入力欄、前後ボタン、吹き出しの収まり

作業環境のCloud Browserがローカルページを開けなかったため、静的検査とコード検査までを完了した。GitHubへブランチをpushした後、公開可能なプレビュー環境またはMBA上のブラウザで確認する。

## 10. 表示設定シート

表示設定は次のGoogleスプレッドシートで管理されている。

<https://docs.google.com/spreadsheets/d/1TrDP6OnmNjOVBeLcHdBdCAHL2WjtKe68FBOk33Uq5LU/edit#gid=2078889757>

- `Untitled!A84:E93`へテーマ1件＋教材9件を追加済み
- テーマID：`hinukan-v2`
- 教材ID：`hinukan-v2-ep01`〜`hinukan-v2-ep09`
- プレビュー段階のため`visible=FALSE`
- 本番公開を決定した時点で10行を`TRUE`へ変更する

## 11. Gitの状態

2026-09-15時点のローカル履歴：

- `a205f6f`：`feat: add Hinukan V2 journey from calendar to moon and stars`
- `b380462`：`docs: add Claude CLI handoff for Hinukan V2`
- ベース：`origin/main`の`47bd9c2`

通常の`git push`は認証情報がないため失敗した。接続済みGitHub経由の書込みも`403 Resource not accessible by integration`となった。このため、ローカルcommitは完成しているが、作業時点ではremoteの`hinukan-v2`ブランチは未作成。

確認コマンド：

```bash
git ls-remote --heads origin hinukan-v2
```

出力がなければ未push。GitHubへの書込み権限がある端末からpushする。

## 12. MBA2017／MBA2025への引き継ぎ

Claude Codeは、リポジトリ直下の`CLAUDE.md`から本ファイルと`AGENTS.md`を参照する。端末固有の絶対パスに依存しない。

### 最初にpushするMBA

```bash
cd <alpaca-school-wwwのローカルリポジトリ>
git remote -v
git status --short
git switch hinukan-v2
git push -u origin hinukan-v2
```

Git bundleを受け取った場合：

```bash
cd <alpaca-school-wwwのローカルリポジトリ>
git fetch <ダウンロードしたhinukan-v2.bundleのパス> hinukan-v2:hinukan-v2
git switch hinukan-v2
git push -u origin hinukan-v2
```

### もう一方のMBA

```bash
cd <alpaca-school-wwwのローカルリポジトリ>
git fetch origin
git switch hinukan-v2
git pull --ff-only
claude
```

Claude CLIを起動したら、`/memory`で`CLAUDE.md`が読み込まれていることを確認する。

## 13. 次に行うこと

1. 書込み可能な端末から`hinukan-v2`をpushする。
2. MBA上のブラウザで、5種類の画面幅と全7画面の操作を確認する。
3. 問題があれば同ブランチで修正・再検証する。
4. 星空シリーズの公開ファイルと確定URLを確認する。
5. 星空シリーズ公開後、必要に応じてep7・ep9へ接続リンクを追加する。
6. 公開決定後、表示設定シートの10行を`TRUE`にする。
7. `main`へのマージと本番公開は、上記確認後に別途実施する。

