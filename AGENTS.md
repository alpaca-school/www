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

## 11. 完成済み教材一覧（2026-08-15時点）

- `rekishi/beniimo_ep1_ronri.html`〜`ep8_taijin.html`：知能の窓 紅芋シリーズ ep1〜8（論理数学・言語・音楽・身体運動・博物学・視覚空間・内省・対人）
- `rekishi/beniimo_ep9_hyogen.html`：ep9・集（詩文）編（特別編、文芸フリマへの導線あり）
- `bousai/typhoon_prediction.html`：台風備蓄編（新方式移行済み）
- `bousai/water_filter_prediction.html`：カー濾過編（新方式移行済み）
- `bunka/shisa_prediction.html`：シーサー編（新方式移行済み、ミルクボーイ型漫才導入）
- `bunka/shishimai_ep01.html`〜`ep10.html`：知能の窓・獅子舞シリーズ 全10話。§0の標準構成に全話準拠済み（ep2〜10は2026-08-14に標準構成へ全面書き直し完了）。加えて全話に§13の「シリーズ内ナビ」と「ふりがなトグル」を実装済み
- `characters.html`：キャラクター図鑑

## 12. 失敗事例と教訓：獅子舞シリーズ ep2〜10（2026-08-14、解決済み）

別セッション（ChatGPT等、本ファイルの旧バージョンしか参照していなかったか、参照せずに作業したと推測される）で制作された獅子舞シリーズ全10話が、obsidian vault側のプロジェクトフォルダで先行して作られていた。統合時に判明した問題点：

- **技術スタックが独自**：React/Babel/Tailwindではなく、圧縮された素のJS/CSSで書かれていた
- **スライド構成が独自**：標準7枚（intro→trouble→mentor→verify→imagine→checkin→parent）ではなく、「やってみる」が`try`（選択）と`answer`（答え合わせ）に分かれた8枚構成だった
- **CSSクラス名が独自**：`speech-bubble`・`progress-dots`・`print-sheet`等の共通クラスを使っておらず、§7のCIチェック対象からも外れてしまっていた
- 結果：2026-08-14中にep1〜10全話を標準構成へ全面書き直し完了。**現在この問題は解消済み**（§11参照）

**この教訓から、§0の「絶対厳守」手順を新設した。** 今後、どのツールで作業する場合も、必ず§0から読んで着手すること。

**再発（2026-08-16）**：obsidian vault側「台風シリーズ」の`typhoon_ep01.html`（Layer 2の制作スナップショット、本番未統合）で、ほぼ同じ逸脱が再発しているのを確認した。技術スタックがvanilla JS/圧縮1行HTML、スライドが「やってみる」と「答え合わせ」に分かれた8枚構成、進捗表示のCSSクラスが独自（`.dot`）でCIチェック対象外、という3点とも§12の失敗事例と同型。詳細な修正方針は§16参照。

## 13. シリーズ内ナビゲーション＋ふりがなトグル（2026-08-14〜15導入）

獅子舞シリーズ全10話に、以下2つの共通機能を追加した。新しいシリーズ・エピソードを作る際も、この型を踏襲すること。

### 13.1 シリーズ内ナビゲーション（`series-nav-data.js`）

- リポジトリルートに`series-nav-data.js`（Babelを通さない素の`<script>`タグで読み込む）を新設。`SHISHIMAI_EPISODES`・`BENIIMO_EPISODES`の配列で、各エピソードの`id`・`short`（一覧表示用の短い見出し）・`title`・`url`（リポジトリルートからの相対パス）を一元管理する。
- 新しいエピソードを追加するときは、**この配列に1件足すだけ**で全教材ページの「前へ／次へ」ナビが自動更新される設計。個別のHTMLファイルを直接いじる必要はない。
- 各教材HTMLファイル側では、`<head>`か`<body>`冒頭で`../series-nav-data.js`を読み込み、`slideIds`配列の直後あたりで`episodeIndex`・`prevEpisode`・`nextEpisode`を算出する。
- 表示場所は**「おわりに」（旧parent）スライドの末尾**（2026-08-15、§14の改訂に伴い、当初のふりかえり(checkin)末尾配置から変更）。「前へ／次へ」ボタン＋「他のテーマも見る」リンク（`matrix-library.html`へ）を配置する。理由：ふりかえりスライドに置くと、共通フッターの「つぎへ」ボタン（スライド内ナビ）と視覚的に重複するため。最終スライドに置けば、共通フッターの「つぎへ」が仕様上グレーアウトしており重複しない。
- 「保護者・支援者の方へ」スライドを独立ボタン化する案は、履修履歴保存等のB2C有料化を見据えた収益設計を先に行うまで**保留**（実装しないこと）。※ただし2026-08-15、この「保護者・支援者の方へ」スライド自体の名称・内容構成は§14の通り「おわりに」に改訂した（独立ボタン化とは別の変更）。

### 13.2 ふりがなトグル（CSS-onlyアプローチ）

- 対象語彙（固有名詞・難読語）を`<ruby>漢字<rt>よみ</rt></ruby>`のHTMLタグで直接マークアップする。ルビを振るのは本文の`<p>`等、実際に画面表示されるJSXテキストのみ（JS文字列リテラルやplaceholder属性等、HTMLとして解釈されない箇所には使えないので対象外とする）。
- CSSは1行のみ：`.furigana-off rt { display: none; }`（`rt`のフォントサイズ・色は別途スタイル調整）。
- Reactの`useState`で`furiganaOn`（初期値`true`）を持ち、ルート要素の`className`に`` `... ${furiganaOn ? "" : "furigana-off"}` ``を出し分ける。個別のルビ用カスタムコンポーネントは作らない（トークン消費・保守コストを抑えるための意図的な簡易実装）。
- ヘッダー部に「🔤 ふりがな ON/OFF」の切り替えボタンを設置。
- トークン使用量は、既存教材コピー＋短いルビタグの追加のみで、新規に長文を生成する処理ではないため軽微（1話あたり数個の`<ruby>`タグ挿入程度）。

## 14. 「parent」スライドの改称「おわりに」（UDL方針、2026-08-15設計確定・全10話実装済み）

ユーザーからの提案：「保護者・支援者の方へ」スライドは、実際にはこのエピソードの学びを説明する内容であり、子どもも読める。UDL（Universal Design for Learning）の「エキスパート学習者」思想に基づき、子どもと大人を分断せず、同じページを共有した上で、大人専用のツール部分（学習指導要領コード・印刷用シート）だけをサブセクションとして残す設計に改める。

**全10話（`bunka/shishimai_ep01.html`〜`ep10.html`）で実装済み（2026-08-15）**。新しいエピソードを作るときは、以下の型をそのまま踏襲すること。

### 確定した変更内容（`renderParent`本体・`slideRenderers`前後・`renderCheckin`に関係）

1. **アイコン・見出し**：
   - `<div className="text-5xl mb-4">👪</div>` → `<div className="text-5xl mb-4">🎬</div>`
   - `<h2 className="text-2xl font-bold text-yellow-700">保護者・支援者の方へ</h2>` → `<h2 className="text-2xl font-bold text-yellow-700">おわりに</h2>`
   - `slideTitles`オブジェクト内：`parent: "👪 保護者の方へ"` → `parent: "🎬 おわりに"`

2. **「児童生徒のみなさんへ」ボックスの新設**：既存の黄色ブロック（`bg-yellow-50`）の直前に、`<div className="bg-orange-50 rounded-lg p-4">` を挿入し、見出し `<p className="text-xs font-bold text-orange-700 mb-2">🧑‍🎓 児童生徒のみなさんへ</p>` の下に、**そのエピソードで学んだことを子ども向けの言葉で新規に要約した1〜2文**を置く（既存の指導要領・MI理論等の大人向け説明文を流用しない。「きょうは、〜を考えたね。〜が教えてくれた『〜』という考え方、今度〜してみよう」のような、2人称「きみ」で語りかける文体で毎話書き下ろす）。※旧「🧒 こどもへ」表記は「子ども扱いしている印象がある」との指摘（2026-08-15）を受け、この表記に変更した。今後もこの見出し文言を使うこと。
   - 黄色ブロック側は変更しない：`<p className="text-xs font-bold text-yellow-800 mb-2">学習指導要領との対応</p>` → `<p className="text-xs font-bold text-yellow-800 mb-2">👪 保護者・支援者の方へ（学習指導要領との対応）</p>`に見出しだけ変更し、`<ul>`・「※」段落は元のまま維持する。
   - 印刷用学習記録シート（`bg-white border-2 border-dashed`ブロック）は変更しない（大人が実際に使う実務ツールのため）。

3. **共通フッターの「つぎへ」ボタン**（`nextSlide`を呼ぶボタン）：`checkin`スライドの時だけラベルを「おわりに」に変える。
   ```jsx
   {slideIds[currentSlide] === "checkin" ? "おわりに" : "つぎへ"}<ChevronRight className="w-5 h-5 ml-1" />
   ```

4. **エピソード内ナビ（§13.1）の配置は「おわりに」（旧parent）スライドの末尾に移動**：`renderCheckin`からは「つぎに進む」ナビブロックを削除し（次回予告の`bg-indigo-50`ボックスのみ残す）、`renderParent`の印刷シートブロックの直後（`</div>`の後、コンポーネント全体の閉じ`</div>`の前）に、前へ／次へ／他のテーマもボタンのブロックを追加する。最終スライドでは共通フッターの「つぎへ」が仕様上グレーアウトするため、ボタンの重複が起きない。

### 確認手順（実施済み・今後の新規エピソードでも同様に行うこと）

```bash
python3 -c "s=open('bunka/shishimai_epXX.html').read(); print('OK' if s.count('{')==s.count('}') and s.count('(')==s.count(')') else 'MISMATCH')"
bash scripts/check_material_responsive.sh
```

git commit・pushの前に、必ずユーザーへ変更内容を提示し、明示的な許可を得ること（§9参照、勝手なpush厳禁）。作業完了後は、obsidianの日次記録（`【Layer 0】daily-logs`）にも記録すること（ユーザーの秘書AI憲法§10）。

## 15. ご意見・ご要望フォーム＋制作アシスト（寄付）機能（2026-08-16導入）

`mikata.ryukyu-tane.com/care-torisetu.html`の「ご意見・ご要望」「開発をアシストする」パターンを参考に、獅子舞シリーズ全10話に導入した。新しいエピソードを作る際もこの型を踏襲すること。

### 15.1 データの一元管理（`series-nav-data.js`）

- `FEEDBACK_FORM_URL`：ご意見・ご要望フォームのURL。実フォーム未作成のため現状は`【要記入】`プレースホルダー。Googleフォームを作成したら、ここ1箇所を書き換えれば全ページに反映される。
- `SUPPORT_LINKS`：Stripe Payment Linksの配列（¥500／¥5,000／¥10,000の3段階）。`world.ryukyu-tane.com`側でも同じリンクを使う想定（ユーザー確認済み、2026-08-16）。

### 15.2 「💬 ご意見・ご要望」の配置

- `renderParent`内、エピソードナビ（§13.1、`他のテーマも見る（教材一覧）`リンクの直後）に続けて、`border-t border-dashed border-gray-300`区切りの新規ブロックとして配置。灰色背景（`bg-gray-50`）のシンプルなリンクボタン1つのみ。

### 15.3 「🌱 制作をアシストする」の配置（重要：白い教材カードの外に置く）

- **既存の白い教材カード（`bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 min-h-96`、`{slideRenderers[...]()}`を包む箱）の外**に配置する（2026-08-16、ユーザー指摘：「同じ白地の枠の中にない状態」にすること）。`renderParent`の中には入れない。
- 具体的には、白い教材カードの`</div>`の直後・共通フッターの「まえへ／つぎへ」ボタン行（`<div className="flex justify-between items-center">`）の直前に、`{slideIds[currentSlide] === "parent" && (...)}`の条件付きレンダリングで挿入する。「おわりに」スライドを表示している時だけ表示される。
- 呼びかけ文言は「寄付してください」調を避け、**学びの循環そのものを主語にする**（「ここでの学びは、記録され、次の学びへと受け継がれていきます。その循環を支えるちからになっていただけたら嬉しいです。」）。「子どものため」を前面に出す文言は、子どもを口実にしている印象を与えるため避けること（2026-08-16、ユーザー指摘）。
- Stripe決済リンクを使う場合は、必ず`tokushoho.html`（特定商取引法に基づく表記、リポジトリルート）へのリンクを併記する。他プロジェクト（`mikata`の`care-torisetu.html`等）のStripeボタン・特商法ページをそのまま流用しないこと。別サービス名義での決済表示は法的に問題があるため、必ずアルパカすく〜る専用のProduct・Price・Payment Linkを新規作成する。
- 「🛠 開発履歴」機能は2026-08-16に検討したが、ユーザー判断で不採用（実装しない）。

## 16. 台風シリーズ：修正方針と保留機能（2026-08-16、GPT側へ差し戻し）

### 16.1 正本ドキュメント

台風シリーズの内容設計の正本（source of truth）は以下：

`【Layer 1】projects ← 人間を守る（人間と時間の現場）/アルパカすく〜る/2026-08-15-知能の窓・台風-MI8全9回再設計.md`

obsidian vault側の`【Layer 2】studio ← 価値を作る（制作工房）/03_html-GAS-JS_projects/アルパカすく〜る/台風シリーズ/`配下のHTMLファイルは、あくまで**制作スナップショット（未確定の試作）**として扱うこと。内容とLayer 1に食い違いがあれば、Layer 1を正として合わせる。

### 16.2 修正が必要な点（§12と同型の逸脱、必ず直すこと）

`typhoon_ep01.html`で確認された、獅子舞シリーズの旧失敗（§12）とほぼ同じ3つの逸脱を、台風シリーズ全話で修正すること。

1. **技術スタック**：vanilla JS・圧縮1行HTML → §2の標準（React + Babel standalone + Tailwind CDN、単一HTMLファイル、`rekishi/beniimo_ep1_ronri.html`をベースにコピー）へ作り直す
2. **スライド構成**：「やってみる」と「答え合わせ」が分かれた8枚構成 → §0.3の標準7枚（intro→trouble→mentor→verify→imagine→checkin→parent）へ統合する。`verify`スライド1枚の中で、選択→フィードバック→解説までを完結させる（獅子舞・紅芋シリーズと同じ形）
3. **CSSクラス名**：独自クラス（`.dot`等）でCIチェック対象外になっていた → §7の共通クラス（`progress-dots space-x-2`・`print-sheet`等）を使い、作業後に必ず以下でCI対象に含まれているか確認する：
   ```bash
   rg -l 'print-sheet|className="progress-dots space-x-2"' -g '*.html' .
   ```

### 16.3 保留する機能（消さない・忘れない。今回の作り直しには含めない）

`typhoon_ep01.html`で試作されていた以下2機能は、Layer 1の設計思想（年齢・深度の4段階展開、高校受験への橋）に沿った良い提案であり、**将来的に台風シリーズ（および他シリーズ）へ正式導入したい**。ただし2026-08-16時点では標準テンプレートに未採用のため、今回の§16.2の作り直しには含めず、**保留（バックログ）として明記だけしておく**。

- **年齢/入口セレクト**：学年（小3〜6）・入口（暮らし／高校入試／理科・数学／台風・防災）をプルダウンで切り替え、問題文・解説・小結びが動的に変わる機能
- **読み上げ**：`speechSynthesis`によるTTSボタン

今後これらを標準機能として正式採用する場合は、まず1話（獅子舞ep1 or 台風ep1）で試作→ユーザー確認→全話展開、という今までと同じ手順を踏むこと。単独の判断で全話に一括導入しない。

### 16.4 引き継ぎ

この統合作業（§16.2の作り直し・CI確認・本番統合）は、2026-08-16にユーザーの指示によりGPT（ChatGPT/Codex）側へ検証も含めて差し戻された。Claude Codeが本ファイルを次に開いたときにこのタスクがまだ未着手であれば、まずGPT側の進捗を確認してから着手すること。
