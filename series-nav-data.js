// 「知能の窓」シリーズの共通ナビゲーションデータ。
// 新しいエピソード・新しいテーマを追加するときは、このファイルに1件足すだけで
// 全教材ページの「前へ／次へ」リンクが自動的に更新される。
// 各urlはリポジトリのルートからの相対パス。各教材ファイルからは "../" を付けて参照する。

const SHISHIMAI_EPISODES = [
  { id: "shishimai-ep01", short: "ep1：論理・数学編", title: "獅子舞の練習、あと何回？", url: "bunka/shishimai_ep01.html" },
  { id: "shishimai-ep02", short: "ep2：言語編", title: "獅子舞は、いつやるの？", url: "bunka/shishimai_ep02.html" },
  { id: "shishimai-ep03", short: "ep3：文化資本編", title: "獅子のお面は、何年生きる？", url: "bunka/shishimai_ep03.html" },
  { id: "shishimai-ep04", short: "ep4：視覚・空間編", title: "沖縄のどこで獅子が舞う？", url: "bunka/shishimai_ep04.html" },
  { id: "shishimai-ep05", short: "ep5：音楽編", title: "獅子は、どんな音で動く？", url: "bunka/shishimai_ep05.html" },
  { id: "shishimai-ep06", short: "ep6：身体・運動編", title: "ふたりで、一頭の獅子になる", url: "bunka/shishimai_ep06.html" },
  { id: "shishimai-ep07", short: "ep7：博物学編", title: "獅子をつくる植物を見てみよう", url: "bunka/shishimai_ep07.html" },
  { id: "shishimai-ep08", short: "ep8：内省編", title: "十五夜の月を見て、何を感じる？", url: "bunka/shishimai_ep08.html" },
  { id: "shishimai-ep09", short: "ep9：対人編", title: "獅子舞を知らない人に、どう紹介する？", url: "bunka/shishimai_ep09.html" },
  { id: "shishimai-ep10", short: "ep10：集・表現編（完）", title: "わたしの獅子舞・月文化地図", url: "bunka/shishimai_ep10.html" },
];

// ご意見・ご要望フォーム。
// フォームURLは実際のGoogleフォーム作成後にここだけ書き換えれば全ページに反映される。
const FEEDBACK_FORM_URL = "【要記入：Googleフォームのリンクをここに設定】";

// 制作アシスト（Stripe Payment Links、支援額を選べる3段階）。
// world.ryukyu-tane.com側でも同じリンクを使う想定。
const SUPPORT_LINKS = [
  { label: "¥500", url: "https://buy.stripe.com/aFa7sK25P5bp6cme9rgw007" },
  { label: "¥5,000", url: "https://buy.stripe.com/9B600i9yhavJasCc1jgw008" },
  { label: "¥10,000", url: "https://buy.stripe.com/3cI5kC11LcDR9oy1mFgw009" },
];

const BENIIMO_EPISODES = [
  { id: "beniimo-ep1", short: "ep1：論理・数学編", title: "紅芋チップス、あと何袋たりない？", url: "rekishi/beniimo_ep1_ronri.html" },
  { id: "beniimo-ep2", short: "ep2：言語編", title: "紅芋を持ってきたのは誰？", url: "rekishi/beniimo_ep2_gengo.html" },
  { id: "beniimo-ep3", short: "ep3：音楽編", title: "紅芋づくりのリズム、覚えてる？", url: "rekishi/beniimo_ep3_ongaku.html" },
  { id: "beniimo-ep4", short: "ep4：身体・運動編", title: "紅芋掘り、正しいやり方は？", url: "rekishi/beniimo_ep4_shintai.html" },
  { id: "beniimo-ep5", short: "ep5：博物学編", title: "紅芋の色、なんで紫なの？", url: "rekishi/beniimo_ep5_hakubutsu.html" },
  { id: "beniimo-ep6", short: "ep6：視覚・空間編", title: "紅芋の花、見たことある？", url: "rekishi/beniimo_ep6_shikaku.html" },
  { id: "beniimo-ep7", short: "ep7：内省編", title: "紅芋、はじめて食べたのはいつだった？", url: "rekishi/beniimo_ep7_naisei.html" },
  { id: "beniimo-ep8", short: "ep8：対人編", title: "紅芋のこと、うまく紹介できるかな？", url: "rekishi/beniimo_ep8_taijin.html" },
  { id: "beniimo-ep9", short: "ep9：集・表現編", title: "紅芋のことば、誰かに届けてみよう", url: "rekishi/beniimo_ep9_hyogen.html" },
];
