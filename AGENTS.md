# AGENTS.md — アルパカすく〜る（alpaca-school-www）引き継ぎ資料

このファイルは、Codex・Claude Code・ChatGPT等、**どのAIツール・どのエージェントが本リポジトリを編集する場合でも**、毎回ゼロから文脈を推測せずに済むよう、蓄積されたルール・キャラクター設定・技術的な注意点をまとめたものです。編集を始める前に必ず読んでください。

## 0. 絶対厳守（2026-08-14追加：型を崩した実例から学んだ教訓）

過去に、本ファイルを読まずに（あるいは読んでも従わずに）別ツールで教材を作ったところ、技術スタック・スライド構成が独自のものになり、後から全面書き直しになった事例がある（獅子舞シリーズ、後述§12参照）。同じ失敗を繰り返さないため、**新しい教材・新しいシリーズを作るときは、必ず以下の手順で始めること**。ChatGPT等でこのファイルを読み込ませて作業する場合も例外はない。

1. **既存の完成ファイルをコピーしてベースにする**。ゼロから書き起こさない。最新の参照テンプレートは `rekishi/beniimo_ep1_ronri.html`（2026-08-14時点で最もルールを満たしている）
2. **§2の技術スタック（React + Babel standalone + Tailwind CDN、単一HTMLファイル）から絶対に逸脱しない**。vanilla JS/CSS・圧縮HTML・別フレームワークでの実装は不可
3. **§5の標準7スライド構成（intro→trouble→mentor→verify→imagine→checkin→parent）から絶対に逸脱しない**。「やってみる」を`try`と`answer`のように分割して8枚にする、スライドの追加・削除・順序変更は不可
4. **§4のキャラクター名・設定（4アルパカ・4メンター）を一言一句変えない**
5. 作り終えたら、必ず `./scripts/check_material_responsive.sh` を実行し、**そのファイルが実際にチェック対象として拾われているか**を以下のコマンドで確認する（対象外のまま「合格」と誤認しないこと。詳細は§7参照）：
   ```bash
   rg -l 'print-sheet|className="progress-dots space-x-2"' -g '*.html' .
   ```
   自分が作ったファイルのパスがこの一覧に出てこなければ、CIは実質何もチェックしていない。

## 1. プロジェクト概要

- **サイト名**：アルパカすく〜る（`alpaca-school.okinawa`）
- **本番運用**：GitHub Pages。remote `origin` = `https://github.com/alpaca-school/www.git`、`main`ブランチ直結。`git push`すると通常1〜2分で本番に反映される（ステージング環境なし）
- **ローカル作業場所**：`/Users/kanmemacbookair/Desktop/github-clones/alpaca-school-www`
- **目的**：9歳からのキャリア教育・郷土文化学習教材ポータル。ブルデューの3資本理論（文化資本→社会関係資本→経済資本）による段階的キャリアラダーが設計思想の土台（詳細は`PROJECT_SPEC.md`参照）

## 2. 技術スタック（重要：ビルド工程なし）

各教材HTMLは**単一ファイルで完結**する。以下の構成をCDN経由でscriptタグから直接読み込む。

```html
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

- `<script type="text/babel">`内にReact（JSX）をそのまま記述。ビルド・lintの仕組みが一切ないため、**中括弧`{ }`・丸括弧`( )`の対応が1文字でも崩れると、エラー表示なしでブラウザが真っ白になる**。編集後は必ず以下で自己チェックすること：
  ```bash
  python3 -c "s=open('ファイルパス').read(); print(s.count('{'), s.count('}'), s.count('('), s.count(')'))"
  ```
- ダークモード対応が必要なファイル（`matrix-library.html`等）は`tailwind.config = { darkMode: 'class' };`をCDN scriptの直後に追加している

## 3. ディレクトリ構造（主要部分）

```
alpaca-school-www/
├── index.html              # 本番トップページ（旧UI・フロア切り替え形式）。むやみに変更しない
├── index2.html             # matrix-library.htmlの完全コピー。新UIのプレビュー/昇格候補。必ずmatrix-library.htmlと同期させる
├── matrix-library.html     # 新・教材ポータル（検索/サイドバーフィルタ/おすすめ/新着バナー/常設ナビ）
├── characters.html         # キャラクター図鑑（4アルパカ+4メンター紹介）
├── concept.html            # このサイトの学びの設計思想
├── PROJECT_SPEC.md         # リニューアル全体の統合仕様書
├── AGENTS.md                # 本ファイル
├── rekishi/                 # 「知能の窓」紅芋シリーズ ep1〜9、歴史系素材
├── bousai/                  # 防災系（台風備蓄編・カー濾過編）
├── bunka/                   # 文化系（シーサー編）
└── img/characters/          # 4アルパカの画像素材（harly.png/sarabanji.png/ganjuu.png/carggy.png）
```

## 4. キャラクター体系（正・変更禁止の核）

### 4アルパカ（困りごとを持ち込む役）

| キャラ | 性格 | 身体的ギャグ（必須・1本につき最低1箇所） |
|---|---|---|
| ハーリー | オラオラ系。怖いもの知らずで目立ちたがり | 失敗の瞬間「ズコーッ!」と勢いよくすっ転ぶ |
| サラバンジ | 無謀だが運と勢いで乗り切る。短期決戦型 | 「バタン!」と大げさに倒れる→3秒後にムクッと起き上がる |
| ガンジュー | のんびり屋、人見知り、よく寝る | 正解直前に立ったまま本気のいびき→メンターに肩を叩かれてハッと飛び起きる |
| カーギー | 唯一の女性性。美意識が高く安全策を選ぶ | 登場直後、風で乱れた前髪を鏡もなしに一瞬でピシッと直す |

**役割（2026-08-11刷新）**：もう誰も"必ず正解"のキャラではない。カーギーも含め、全員が惜しいところで間違える（計算の筋道は合っているのに最後の一歩を間違える、等）。3人がランダムに選ばれ、困りごととして誤答を披露する。

### 4メンター（知識と生き方を教える役）

多重知能理論（ガードナーの8分類）を2つずつ担当。画像素材が無いため常に絵文字アバター（🧓/👵）。

| メンター | 担当（多重知能） |
|---|---|
| 知念おじぃさん | 論理・数学的知能／言語・語学的知能 |
| 仲程のヨシおばぁさん | 対人的知能／内省的知能（花が好きで、庭先にはいつも季節の花が咲いている） |
| 力也おじぃさん | 音楽・リズム的知能／身体・運動感覚的知能 |
| 美咲おばぁさん | 視覚・空間的知能／博物学的知能 |

**呼称に注意**：「オジー」「オバー」ではなく「おじぃさん」「おばぁさん」で統一（2026-08-12変更）。仲程のヨシおばぁさんのみ元々この表記。

1本の教材につき1名が「主役」として教え、他3名は1〜2行のカメオで登場。「知能の窓」シリーズの多重知能フィルタ（`matrix-library.html`の`mi`フィールド）は**メンターの4分類ではなく、ガードナー本来の8分類**（論理数学／言語／音楽／身体運動／博物学／視覚空間／内省／対人）を使う。メンターの「智徳体感」という括りは、東洋の伝統的な人間形成観（知育・徳育・体育＋美育）に基づくキャラクター哲学であり、MI理論のタグ付けとは別物として扱う。

## 5. 標準スライド構成（新方式）

```
intro（はじまりの問い）
→ trouble（困りごと。3人ランダム表示、全員不正解）
→ mentor（メンター登場。主役1名＋他3名カメオ）
→ verify / やってみる（メンターに教わった方法で実際に解く・やる）
→ imagine（想像する問題。正解のないオープンな問い）
→ checkin（ふりかえり。「はい/いいえ/わからない」＋自由記述）
→ parent（保護者向け。学習指導要領対応は保護者スライドと印刷用「学習記録シート」の両方に記載）
```

ページ先頭には必ず`../matrix-library.html`（または`rekishi/`配下でない場合は`./matrix-library.html`）への「教材一覧へ戻る」リンクを実装する。

## 6. ポラード方式（数値問題の設計原則）

- 計算問題を単独で出さない。すべて長文の文章題にする
- 答えに不要な数字・情報を必ず1つ以上混ぜる（トラップ）
- 正解を設けない「想像する問題」を必ず1つ入れる
- 対象は識字に不安のある大人も含む家庭。子ども経由で大人にも届く設計にする
- 「集（詩文・表現）」のように単一のMI分類に収まらない回（ep9等）は、この限りではない。数値トラップを無理に入れない

## 7. CSS・モバイル表示の共通ルール

全教材はiPhone 12相当の390pxを基準にし、320px以上で横スクロールを発生させない。日本語本文へ`word-break: keep-all`を使用してはいけない。全教材ファイルの`<style>`ブロックには以下を含める：

```css
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
p, li {
    word-break: normal;
    overflow-wrap: break-word;
    line-break: strict;
}
.speech-bubble {
    position: relative;
    min-width: 0;
    max-width: 100%;
}
.speech-bubble p {
    display: block;
    min-width: 0;
    max-width: 100%;
    white-space: normal;
    word-break: normal;
    overflow-wrap: anywhere;
    line-break: anywhere;
}
.choice-card { min-width: 0; }
.choice-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    min-width: 0;
    max-width: 100%;
}
.choice-row .speech-bubble { flex: 1 1 0; width: 0; }
.choice-check { flex: 0 0 auto; }
.progress-dots { display: none; }
@media (min-width: 640px) {
    .progress-dots { display: flex; }
}
```

選択肢は`choice-card`→`choice-row`→アバター＋`speech-bubble flex-1 min-w-0`＋`choice-check`の順で構成する。メインカードは`p-4 sm:p-6 md:p-8`、前後ボタンは`px-3 sm:px-5`、下部ドットは`progress-dots space-x-2`を標準とする。

LINE内ブラウザの旧HTMLキャッシュ対策として、教材ページには`Cache-Control` / `Pragma` / `Expires`のmeta指定と`pageVersion`付きURLへの自動切替を入れる。教材を更新するときは対象シリーズの`pageVersion`を新しい共通値へ更新する。

編集後は必ず以下を実行する：

```bash
./scripts/check_material_responsive.sh
```

**注意（2026-08-14追加）**：このスクリプトは内部で`rg`（ripgrep）に依存している。`rg`が未インストールの環境では`rg: コマンドが見つかりません`とエラー行を出しながらも、スクリプト自体は`Responsive material checks passed.`と誤って「合格」を表示してしまう（`rg`不在時のエラーを検知できていないバグ）。実行前に`which rg`で存在を確認し、無ければ`brew install ripgrep`でインストールしてから実行すること。

またこのスクリプトは、`print-sheet`または`className="progress-dots space-x-2"`を含むファイルだけを対象に選別している。**新しく作ったファイルがこの条件を満たさない場合、チェック対象そのものから外れ、事実上何も検証されない**。§0の手順どおり既存ファイルをベースに作れば自然に満たされるが、独自実装をした場合は対象外になっていないか、以下のコマンドで必ず確認すること：

```bash
rg -l 'print-sheet|className="progress-dots space-x-2"' -g '*.html' .
```

加えて320px・375px・390px・430px・768pxで、`document.documentElement.scrollWidth > window.innerWidth`が`false`であること、入力欄・前後ボタン・吹き出しが画面内に収まること、640px未満では進捗ドットが非表示になることを確認する。`.print-sheet`の印刷挙動は変更しない。

## 8. matrix-library.html / index2.html の同期ルール

**`index2.html`は`matrix-library.html`の完全コピー**として運用している（本番`index.html`を直接変更せず、新UIを別ページとしてプレビュー・昇格候補にするため）。`matrix-library.html`を編集したら、必ず以下でコピーし直すこと：

```bash
cp matrix-library.html index2.html
diff matrix-library.html index2.html  # 差分なしを確認
```

新しい教材を追加した場合は、`matrix-library.html`の`MATERIALS`配列に以下の形式でエントリを追加する：

```js
{
  id: "一意なid",
  title: "タイトル（知能の窓 epN：分類名編）",
  url: "相対パス（例：rekishi/beniimo_epN_xxx.html）",
  subjectLabel: "算数3年・社会3年 等",
  grades: ["小3"],
  subjects: ["算数", "社会"],
  mi: "論理数学" 等、8分類のいずれか（該当しない特別編は"特別"）,
  capital: "文化資本" / "社会関係資本" / "経済資本",
  ladderStep: "初級" / "中級" / "上級",
  status: "published",
  emoji: "🍠",
  dateAdded: "yyyy-mm-dd",
  recommended: false,
}
```

## 9. git運用ルール（最重要）

- **`git push`は必ずユーザーの明示的な許可を得てから実行する。** ファイルの作成・編集は自由に行ってよいが、pushは毎回確認を取ること
- push前に必ず機密情報チェックを行う：
  ```bash
  grep -rE "AIzaSy|api_key|apikey|secret|token" 変更ファイル一覧
  ```
- commitメッセージは変更内容が分かるように簡潔に。フッターに`Co-Authored-By`等、使用したエージェント名を記載してよい

## 10. 制作ルールの原典

より詳細な制作ルール（ポラード方式の細則・学年構成・ファイル命名規則・実制作パイプライン・史実の扱い方等）は、以下のClaude Code skillファイルに集約されている。Codexで作業する場合も、この内容に準拠すること：

`/Users/kanmemacbookair/Desktop/github/.claude/skills/alpaca-school-material-production/SKILL.md`

（このファイルはユーザーのローカルマシン上にあり、本リポジトリには含まれていない。参照時はパスを直接読みに行くか、ユーザーに内容を貼ってもらうこと）

## 11. 完成済み教材一覧（2026-08-14時点）

- `rekishi/beniimo_ep1_ronri.html`〜`ep8_taijin.html`：知能の窓 紅芋シリーズ ep1〜8（論理数学・言語・音楽・身体運動・博物学・視覚空間・内省・対人）
- `rekishi/beniimo_ep9_hyogen.html`：ep9・集（詩文）編（特別編、文芸フリマへの導線あり）
- `bousai/typhoon_prediction.html`：台風備蓄編（新方式移行済み）
- `bousai/water_filter_prediction.html`：カー濾過編（新方式移行済み）
- `bunka/shisa_prediction.html`：シーサー編（新方式移行済み、ミルクボーイ型漫才導入）
- `bunka/shishimai_ep01.html`：知能の窓・獅子舞シリーズ ep1（論理数学編）。§0の標準構成に正式準拠した唯一の獅子舞回
- `bunka/shishimai_ep02.html`〜`ep10.html`：知能の窓・獅子舞シリーズ ep2〜10。**§12参照：現状は非標準構成のため、ep1と同じ型への作り直しが必要**
- `characters.html`：キャラクター図鑑

## 12. 失敗事例と教訓：獅子舞シリーズ ep2〜10（2026-08-14）

別セッション（ChatGPT等、本ファイルの旧バージョンしか参照していなかったか、参照せずに作業したと推測される）で制作された獅子舞シリーズ全10話が、obsidian vault側のプロジェクトフォルダで先行して作られていた。統合時に判明した問題点：

- **技術スタックが独自**：React/Babel/Tailwindではなく、圧縮された素のJS/CSSで書かれていた
- **スライド構成が独自**：標準7枚（intro→trouble→mentor→verify→imagine→checkin→parent）ではなく、「やってみる」が`try`（選択）と`answer`（答え合わせ）に分かれた8枚構成だった
- **CSSクラス名が独自**：`speech-bubble`・`progress-dots`・`print-sheet`等の共通クラスを使っておらず、§7のCIチェック対象からも外れてしまっていた
- 結果：ep1のみ、標準構成へ全面書き直しを実施済み。ep2〜10は同じ書き直しがまだ必要（着手時期は都度確認すること）

**この教訓から、§0の「絶対厳守」手順を新設した。** 今後、どのツールで作業する場合も、必ず§0から読んで着手すること。
