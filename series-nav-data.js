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

// 知能の窓・台風シリーズ（2026-08-16、全9話完成）
const TYPHOON_EPISODES = [
  { id: "typhoon-ep01", short: "ep1：論理・数学編", title: "水は、あと何本？", url: "bousai/typhoon_ep01.html" },
  { id: "typhoon-ep02", short: "ep2：言語編", title: "その台風情報、どこから来た？", url: "bousai/typhoon_ep02.html" },
  { id: "typhoon-ep03", short: "ep3：音楽編", title: "台風の日、家の中にはどんな音がある？", url: "bousai/typhoon_ep03.html" },
  { id: "typhoon-ep04", short: "ep4：身体・運動編", title: "暗くなる前に、家の中を歩いてみよう", url: "bousai/typhoon_ep04.html" },
  { id: "typhoon-ep05", short: "ep5：博物学編", title: "台風は、どこで力をもらう？", url: "bousai/typhoon_ep05.html" },
  { id: "typhoon-ep06", short: "ep6：視覚・空間編", title: "台風の進路図、どこを見ればいい？", url: "bousai/typhoon_ep06.html" },
  { id: "typhoon-ep07", short: "ep7：内省編", title: "台風がこわいとき、心はどうなる？", url: "bousai/typhoon_ep07.html" },
  { id: "typhoon-ep08", short: "ep8：対人編", title: "家族で、誰が何をする？", url: "bousai/typhoon_ep08.html" },
  { id: "typhoon-ep09", short: "ep9：集・表現編（完）", title: "わが家の台風知恵カードをつくろう", url: "bousai/typhoon_ep09.html" },
];

// 知能の窓・沖縄の屋号シリーズ（2026-08-16着手、中学生以上対象。ep1のみ実装済み、ep2以降は順次追加）
const YAGO_EPISODES = [
  { id: "yago-ep01", short: "ep1：論理・数学編", title: "同じ名字が3軒！どうやって呼び分ける？", url: "bunka/yago_ep01.html" },
];

// 知能の窓・沖縄の綱引きシリーズ（2026-08-16、全9話完成）
const TSUNAHIKI_EPISODES = [
  { id: "tsunahiki-ep01", short: "ep1：論理・数学編", title: "大綱づくり、わら束はあといくつ？", url: "bunka/tsunahiki_ep01.html" },
  { id: "tsunahiki-ep02", short: "ep2：言語編", title: "引く？曳く？挽く？—綱引きの名前を読む", url: "bunka/tsunahiki_ep02.html" },
  { id: "tsunahiki-ep03", short: "ep3：音楽編", title: "綱引きは、どんな音で動く？", url: "bunka/tsunahiki_ep03.html" },
  { id: "tsunahiki-ep04", short: "ep4：身体・運動編", title: "みんなの力を、どうやってそろえる？", url: "bunka/tsunahiki_ep04.html" },
  { id: "tsunahiki-ep05", short: "ep5：博物学編", title: "稲わらが、どうして大綱になる？", url: "bunka/tsunahiki_ep05.html" },
  { id: "tsunahiki-ep06", short: "ep6：視覚・空間編", title: "雄綱・雌綱は、どうつながる？", url: "bunka/tsunahiki_ep06.html" },
  { id: "tsunahiki-ep07", short: "ep7：内省編", title: "勝つ・負けると、わたしの心はどう動く？", url: "bunka/tsunahiki_ep07.html" },
  { id: "tsunahiki-ep08", short: "ep8：対人編", title: "どうして地域みんなで大綱を作れる？", url: "bunka/tsunahiki_ep08.html" },
  { id: "tsunahiki-ep09", short: "ep9：集・表現編（完）", title: "わたしの地域の綱引き文化地図をつくろう", url: "bunka/tsunahiki_ep09.html" },
];

// 知能の窓・ゴーヤーシリーズ（2026-08-17、全9話完成）
const GOYA_EPISODES = [
  { id: "goya-ep01", short: "ep1：論理・数学編", title: "出荷できるゴーヤーは何本？", url: "bunka/goya_ep01.html" },
  { id: "goya-ep02", short: "ep2：言語編", title: "ゴーヤーって、どんな野菜？", url: "bunka/goya_ep02.html" },
  { id: "goya-ep03", short: "ep3：音楽編", title: "ゴーヤーチャンプルーの台所は、どんな音？", url: "bunka/goya_ep03.html" },
  { id: "goya-ep04", short: "ep4：身体・運動編", title: "つるは、どうやって上へ行く？", url: "bunka/goya_ep04.html" },
  { id: "goya-ep05", short: "ep5：博物学編", title: "ゴーヤーは、どうやって実になる？", url: "bunka/goya_ep05.html" },
  { id: "goya-ep06", short: "ep6：視覚・空間編", title: "緑のカーテンを設計しよう", url: "bunka/goya_ep06.html" },
  { id: "goya-ep07", short: "ep7：内省編", title: "苦いって、きらいでいい？", url: "bunka/goya_ep07.html" },
  { id: "goya-ep08", short: "ep8：対人編", title: "畑から食卓まで、誰がつないでいる？", url: "bunka/goya_ep08.html" },
  { id: "goya-ep09", short: "ep9：集・表現編（完）", title: "わたしのゴーヤー文化カードをつくろう", url: "bunka/goya_ep09.html" },
];

// 知能の窓・沖縄の豚シリーズ（2026-08-17着手。ep1のみ実装済み）
const PORK_EPISODES = [
  { id: "pork-ep01", short: "ep1：論理・数学編", title: "550頭から、2万頭をこえる？", url: "bunka/buta_ep01.html" },
  { id: "pork-ep02", short: "ep2：言語編", title: "ミミガーって、どこのこと？", url: "bunka/buta_ep02.html" },
  { id: "pork-ep03", short: "ep3：音楽編", title: "ミミガー、チラガー、どんなリズム？", url: "bunka/buta_ep03.html" },
  { id: "pork-ep04", short: "ep4：身体・運動編", title: "豚は、どう動く？", url: "bunka/buta_ep04.html" },
  { id: "pork-ep05", short: "ep5：博物学編", title: "『鳴き声以外』って、本当？", url: "bunka/buta_ep05.html" },
  { id: "pork-ep06", short: "ep6：視覚・空間編", title: "一頭の豚を、地図にしよう", url: "bunka/buta_ep06.html" },
  { id: "pork-ep07", short: "ep7：内省編", title: "『いただきます』を考える", url: "bunka/buta_ep07.html" },
  { id: "pork-ep08", short: "ep8：対人編", title: "豚料理は、なぜみんなで食べる？", url: "bunka/buta_ep08.html" },
  { id: "pork-ep09", short: "ep9：集・表現編（完）", title: "沖縄の豚文化を伝えよう", url: "bunka/buta_ep09.html" },
];

// 知能の窓・グルクンシリーズ（2026-08-17、全9話完成）
const GURUKUN_EPISODES = [
  { id: "gurukun-ep01", short: "ep1：論理・数学編", title: "グルクン、何箱できる？", url: "bunka/gurukun_ep01.html" },
  { id: "gurukun-ep02", short: "ep2：言語編", title: "グルクンって、魚の名前？", url: "bunka/gurukun_ep02.html" },
  { id: "gurukun-ep03", short: "ep3：音楽編", title: "群れの動きを、リズムにできる？", url: "bunka/gurukun_ep03.html" },
  { id: "gurukun-ep04", short: "ep4：身体・運動編", title: "追い込み漁って、どう動く？", url: "bunka/gurukun_ep04.html" },
  { id: "gurukun-ep05", short: "ep5：博物学編", title: "グルクンは、どんな海で暮らす？", url: "bunka/gurukun_ep05.html" },
  { id: "gurukun-ep06", short: "ep6：視覚・空間編", title: "魚・人・網を、上から見たら？", url: "bunka/gurukun_ep06.html" },
  { id: "gurukun-ep07", short: "ep7：内省編", title: "わたしにとって「県魚」って何？", url: "bunka/gurukun_ep07.html" },
  { id: "gurukun-ep08", short: "ep8：対人編", title: "一尾のグルクンに、何人が関わる？", url: "bunka/gurukun_ep08.html" },
  { id: "gurukun-ep09", short: "ep9：集・表現編（完）", title: "「一尾の旅」を伝えよう", url: "bunka/gurukun_ep09.html" },
];

// 知能の窓・ムーチーシリーズ（2026-08-17、全9話完成）
const MUCHI_EPISODES = [
  { id: "muchi-ep01", short: "ep1：論理・数学編", title: "ムーチー、いくつ作る？", url: "bunka/muchi_ep01.html" },
  { id: "muchi-ep02", short: "ep2：言語編", title: "ムーチーって、どんな行事？", url: "bunka/muchi_ep02.html" },
  { id: "muchi-ep03", short: "ep3：音楽編", title: "ムーチーを作る音、いくつ聞こえる？", url: "bunka/muchi_ep03.html" },
  { id: "muchi-ep04", short: "ep4：身体・運動編", title: "月桃の葉で、どう包む？", url: "bunka/muchi_ep04.html" },
  { id: "muchi-ep05", short: "ep5：博物学編", title: "月桃って、どんな植物？", url: "bunka/muchi_ep05.html" },
  { id: "muchi-ep06", short: "ep6：視覚・空間編", title: "ムーチーの包み方を図にしてみよう", url: "bunka/muchi_ep06.html" },
  { id: "muchi-ep07", short: "ep7：内省編", title: "願うって、どんな気持ち？", url: "bunka/muchi_ep07.html" },
  { id: "muchi-ep08", short: "ep8：対人編", title: "ムーチーは、誰と誰をつなぐ？", url: "bunka/muchi_ep08.html" },
  { id: "muchi-ep09", short: "ep9：集・表現編（完）", title: "わたしの家のムーチー記録を残そう", url: "bunka/muchi_ep09.html" },
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
// 知能の窓・やちむんシリーズ（2026-08-17、全9話完成）
const YACHIMUN_EPISODES = [
  { id: "yachimun-ep01", short: "ep1：論理・数学編", title: "窯から、何個ぶじに出てきた？", url: "bunka/yachimun_ep01.html" },
  { id: "yachimun-ep02", short: "ep2：言語編", title: "やちむんって、どんなことば？", url: "bunka/yachimun_ep02.html" },
  { id: "yachimun-ep03", short: "ep3：音楽編", title: "土をつくる音、器をつくる音", url: "bunka/yachimun_ep03.html" },
  { id: "yachimun-ep04", short: "ep4：身体・運動編", title: "土は、手でどう変わる？", url: "bunka/yachimun_ep04.html" },
  { id: "yachimun-ep05", short: "ep5：博物学編", title: "土・水・火で、何が変わる？", url: "bunka/yachimun_ep05.html" },
  { id: "yachimun-ep06", short: "ep6：視覚・空間編", title: "壺屋と読谷、どこにある？", url: "bunka/yachimun_ep06.html" },
  { id: "yachimun-ep07", short: "ep7：内省編", title: "わたしなら、どんな器を毎日使いたい？", url: "bunka/yachimun_ep07.html" },
  { id: "yachimun-ep08", short: "ep8：対人編", title: "やちむんは、一人でできる？", url: "bunka/yachimun_ep08.html" },
  { id: "yachimun-ep09", short: "ep9：集・表現編（完）", title: "わたしのやちむん企画展", url: "bunka/yachimun_ep09.html" },
];
// 知能の窓・シーミーシリーズ（2026-08-18、全9話完成）
const SHIIMI_EPISODES = [
  { id: "shiimi-ep01", short: "ep1：論理・数学編", title: "ウサンミ、何個分けられる？", url: "bunka/shiimi_ep01.html" },
  { id: "shiimi-ep02", short: "ep2：言語編", title: "シーミーって、どんな行事？", url: "bunka/shiimi_ep02.html" },
  { id: "shiimi-ep03", short: "ep3：音楽・リズム編", title: "シーミーの日には、どんな音がある？", url: "bunka/shiimi_ep03.html" },
  { id: "shiimi-ep04", short: "ep4：身体・運動編", title: "みんなで準備するには、どう動く？", url: "bunka/shiimi_ep04.html" },
  { id: "shiimi-ep05", short: "ep5：博物学編", title: "清明って、月の満ち欠けで決まるの？", url: "bunka/shiimi_ep05.html" },
  { id: "shiimi-ep06", short: "ep6：視覚・空間編", title: "沖縄のどこで、どう違う？", url: "bunka/shiimi_ep06.html" },
  { id: "shiimi-ep07", short: "ep7：内省編", title: "会ったことのないご先祖に、何を聞く？", url: "bunka/shiimi_ep07.html" },
  { id: "shiimi-ep08", short: "ep8：対人編", title: "親族が集まるとき、どう役割を分ける？", url: "bunka/shiimi_ep08.html" },
  { id: "shiimi-ep09", short: "ep9：集・表現編（完）", title: "シーミー文化カードを残そう", url: "bunka/shiimi_ep09.html" },
];
// 知能の窓・塩川シリーズ（2026-08-21、全9話完成）
const SHIOKAWA_EPISODES = [
  { id: "shiokawa-ep01", short: "ep1：論理・数学編", title: "塩川の水は、海の水？川の水？", url: "bunka/shiokawa_ep01.html" },
  { id: "shiokawa-ep02", short: "ep2：言語編", title: "「塩川」「汽水」「天然記念物」ってどういう意味？", url: "bunka/shiokawa_ep02.html" },
  { id: "shiokawa-ep03", short: "ep3：音楽編", title: "川の音と海の音、何が違う？", url: "bunka/shiokawa_ep03.html" },
  { id: "shiokawa-ep04", short: "ep4：身体・運動編", title: "100mの川って、どのくらい？", url: "bunka/shiokawa_ep04.html" },
  { id: "shiokawa-ep05", short: "ep5：博物学編", title: "海の生きものと川の生きものが、なぜ一緒に？", url: "bunka/shiokawa_ep05.html" },
  { id: "shiokawa-ep06", short: "ep6：視覚・空間編", title: "塩川の水は、どこから来る？", url: "bunka/shiokawa_ep06.html" },
  { id: "shiokawa-ep07", short: "ep7：内省編", title: "分からないままでも、考え続けられる？", url: "bunka/shiokawa_ep07.html" },
  { id: "shiokawa-ep08", short: "ep8：対人編", title: "珍しい自然を、どう守りながら伝える？", url: "bunka/shiokawa_ep08.html" },
  { id: "shiokawa-ep09", short: "ep9：集・表現編（完）", title: "塩川ミステリーガイドをつくろう", url: "bunka/shiokawa_ep09.html" },
];

// 知能の窓・ハーリーシリーズ（2026-08-21、全9話完成）
const HARII_EPISODES = [
  { id: "harii-ep01", short: "ep1：論理・数学編", title: "漕ぎ手、あと何人？", url: "bunka/harii_ep01.html" },
  { id: "harii-ep02", short: "ep2：言語・語学編", title: "ハーリー？ ハーレー？ どっちが正しい？", url: "bunka/harii_ep02.html" },
  { id: "harii-ep03", short: "ep3：音楽・リズム編", title: "みんなの櫂は、なぜ同じタイミング？", url: "bunka/harii_ep03.html" },
  { id: "harii-ep04", short: "ep4：身体・運動編", title: "速く動くより、そろえる？", url: "bunka/harii_ep04.html" },
  { id: "harii-ep05", short: "ep5：博物学編", title: "海の高さは、どうして変わる？", url: "bunka/harii_ep05.html" },
  { id: "harii-ep06", short: "ep6：視覚・空間編", title: "舟は、どこを通って戻る？", url: "bunka/harii_ep06.html" },
  { id: "harii-ep07", short: "ep7：内省編", title: "海を見たとき、わたしはどう感じる？", url: "bunka/harii_ep07.html" },
  { id: "harii-ep08", short: "ep8：対人編", title: "漕がない人も、ハーリーを作っている？", url: "bunka/harii_ep08.html" },
  { id: "harii-ep09", short: "ep9：特別・統合／表現編（完）", title: "わたしの地域の海の祭りを未来へ渡す", url: "bunka/harii_ep09.html" },
];

// 知能の窓・旧盆・エイサーシリーズ（2026-08-21、全9話完成）
const KYUUBON_EPISODES = [
  { id: "kyuubon-ep01", short: "ep1：論理・数学編", title: "旧盆までの練習、あと何回？", url: "bunka/kyuubon_ep01.html" },
  { id: "kyuubon-ep02", short: "ep2：言語・語学編", title: "ウンケー・ナカヌヒ・ウークイって何？", url: "bunka/kyuubon_ep02.html" },
  { id: "kyuubon-ep03", short: "ep3：音楽・リズム編", title: "エイサーの音は、何が重なっている？", url: "bunka/kyuubon_ep03.html" },
  { id: "kyuubon-ep04", short: "ep4：身体・運動編", title: "道ジュネーは、どう動く？", url: "bunka/kyuubon_ep04.html" },
  { id: "kyuubon-ep05", short: "ep5：博物学編", title: "旧暦7月15日の月は、どんな月？", url: "bunka/kyuubon_ep05.html" },
  { id: "kyuubon-ep06", short: "ep6：視覚・空間編", title: "エイサーは、どこを歩く？", url: "bunka/kyuubon_ep06.html" },
  { id: "kyuubon-ep07", short: "ep7：内省編", title: "ご先祖に一言伝えるなら？", url: "bunka/kyuubon_ep07.html" },
  { id: "kyuubon-ep08", short: "ep8：対人編", title: "エイサーは、誰と成り立つ？", url: "bunka/kyuubon_ep08.html" },
  { id: "kyuubon-ep09", short: "ep9：特別・集／表現編（完）", title: "わたしの旧盆・エイサー文化記録", url: "bunka/kyuubon_ep09.html" },
];

// 知能の窓・石敢當シリーズ（2026-08-22、全9話完成）
const ISHIGANTO_EPISODES = [
  { id: "ishiganto-ep01", short: "ep1：論理・数学編", title: "石敢當は、あと何基？", url: "bunka/ishiganto_ep01.html" },
  { id: "ishiganto-ep02", short: "ep2：言語編", title: "石敢當って、なんて読む？", url: "bunka/ishiganto_ep02.html" },
  { id: "ishiganto-ep03", short: "ep3：音楽編", title: "まちの音を聞いて石敢當を探す", url: "bunka/ishiganto_ep03.html" },
  { id: "ishiganto-ep04", short: "ep4：身体・運動編", title: "T字路を身体でつくれる？", url: "bunka/ishiganto_ep04.html" },
  { id: "ishiganto-ep05", short: "ep5：博物学編", title: "石敢當は、みんな同じ石？", url: "bunka/ishiganto_ep05.html" },
  { id: "ishiganto-ep06", short: "ep6：視覚・空間編", title: "石敢當は、どこに置かれている？", url: "bunka/ishiganto_ep06.html" },
  { id: "ishiganto-ep07", short: "ep7：内省編", title: "人は、なぜ『守るもの』を置くんだろう？", url: "bunka/ishiganto_ep07.html" },
  { id: "ishiganto-ep08", short: "ep8：対人編", title: "石敢當のこと、地域の人はどう話す？", url: "bunka/ishiganto_ep08.html" },
  { id: "ishiganto-ep09", short: "ep9：集・表現編（完）", title: "わたしの石敢當文化地図をつくろう", url: "bunka/ishiganto_ep09.html" },
];

// シリーズガイド用メタデータ。
// 新しいシリーズは、上の _EPISODES 配列を定義したうえで、ここに1件追加すると
// series-guide.html のカードと全話一覧へ自動的に反映される。
const SERIES_META = [
  {
    key: "shishimai",
    name: "知能の窓・獅子舞",
    emoji: "🦁",
    summary: "獅子舞を入口に、沖縄の年中行事・地域・道具・伝承を、数・ことば・音・身体などの窓から学びます。受け継がれてきた文化を、自分のことばと表現で次へ渡すシリーズです。",
    episodes: SHISHIMAI_EPISODES,
  },
  {
    key: "typhoon",
    name: "知能の窓・台風",
    emoji: "🌀",
    summary: "沖縄で身近な台風を入口に、数・ことば・音・身体・自然・地図・心・人間関係の8つの窓から学びます。怖がらせるだけでも備蓄確認だけでもなく、自分たちの知恵として表現するシリーズです。",
    episodes: TYPHOON_EPISODES,
  },
  {
    key: "yago",
    name: "知能の窓・沖縄の屋号",
    emoji: "🏠",
    summary: "屋号を暗記するのではなく、家の名前から昔の集落や人と場所の記憶を読み解きます。屋号を入口に、沖縄の地域社会を見るシリーズです。",
    episodes: YAGO_EPISODES,
  },
  {
    key: "tsunahiki",
    name: "知能の窓・沖縄の綱引き",
    emoji: "🪢",
    summary: "沖縄の綱引きを勝敗だけで終わらせず、月、稲、綱づくり、音、身体、地域の役割へと学びを広げます。人々が力と記憶を合わせ、文化を次へ渡してきた営みを見つめるシリーズです。",
    episodes: TSUNAHIKI_EPISODES,
  },
  {
    key: "goya",
    name: "知能の窓・ゴーヤー",
    emoji: "🥒",
    summary: "ゴーヤーを入口に、数やことばだけでなく、植物・農業・食文化・環境・家庭の経験へ進みます。身近な一本から、畑と食卓をつなぐ人や自然の働きを見つけるシリーズです。",
    episodes: GOYA_EPISODES,
  },
  {
    key: "pork",
    name: "知能の窓・沖縄の豚",
    emoji: "🐖",
    summary: "沖縄の豚を単なる食材やブランドの知識にせず、数理・ことば・音・身体・生きもの・食文化・年中行事を横断して学びます。食べることと地域のつながりを、自分の表現で次へ渡すシリーズです。",
    episodes: PORK_EPISODES,
  },
  {
    key: "gurukun",
    name: "知能の窓・グルクン",
    emoji: "🐟",
    summary: "グルクンを数えるところから、群れ、海、糸満海人の技、市場、食卓、仕事までをつなぎます。沖縄の海を知ることを、自分の文化資本へ変えていくシリーズです。",
    episodes: GURUKUN_EPISODES,
  },
  {
    key: "muchi",
    name: "知能の窓・ムーチー",
    emoji: "🍃",
    summary: "ムーチーを作る数だけで終わらせず、ことば・音・手・植物・形・願い・人のつながりから学びます。自分の家や地域にある経験を記録し、次へ渡すシリーズです。",
    episodes: MUCHI_EPISODES,
  },
  {
    key: "beniimo",
    name: "知能の窓・紅芋",
    emoji: "🍠",
    summary: "紅芋を入口に、計算、ことば、リズム、身体、植物、記憶、人へ伝える力を多彩な窓から育てます。最後は紅芋から生まれたことばや表現を、誰かへ届けるシリーズです。",
    episodes: BENIIMO_EPISODES,
  },
  {
    key: "yachimun",
    name: "知能の窓・やちむん",
    emoji: "🏺",
    summary: "土を器に変える技だけでなく、沖縄の時間・場所・人・暮らしを8つの窓から学びます。見つけた価値を、自分が使う器や毎日の生活へ戻すシリーズです。",
    episodes: YACHIMUN_EPISODES,
  },
  {
    key: "shiimi",
    name: "知能の窓・シーミー",
    emoji: "🙏",
    summary: "シーミーをお墓参りとして覚えるだけでなく、数・ことば・音・身体・太陽と季節・地域差・家族関係から見直します。自分たちの文化記録として次へ渡すシリーズです。",
    episodes: SHIIMI_EPISODES,
  },
  {
    key: "shiokawa",
    name: "知能の窓・塩川",
    emoji: "🧂",
    summary: "本部町の塩川を入口に、塩分、ことば、音、生きもの、地図、地域保全を多彩な窓から学びます。まだ分かっていない自然の仕組みも大切にしながら、問い続ける力を育てるシリーズです。",
    episodes: SHIOKAWA_EPISODES,
  },
  {
    key: "harii",
    name: "知能の窓・ハーリー",
    emoji: "🚣",
    summary: "沖縄の海文化・年中行事であるハーリー／ハーレーを入口に、数・ことば・音・身体・潮・航路・感情・協働を学びます。地域ごとの違いを尊重し、海の祭りを未来へ渡すシリーズです。",
    episodes: HARII_EPISODES,
  },
  {
    key: "kyuubon",
    name: "知能の窓・旧盆・エイサー",
    emoji: "🥁",
    summary: "旧盆3日間とエイサーを入口に、数・しまくとぅば・音・身体・月・道ジュネー・心・地域の役割を学びます。家庭や地域の違いを尊重し、文化の記憶を次へ渡すシリーズです。",
    episodes: KYUUBON_EPISODES,
  },
  {
    key: "ishiganto",
    name: "知能の窓・石敢當",
    emoji: "🪨",
    summary: "石敢當を『魔除けの石』と覚えるだけでなく、沖縄の道・住まい・文字・地域の願いを8つの知能から観察します。見つけた文化を安全に記録し、地域文化地図として次へ渡すシリーズです。",
    episodes: ISHIGANTO_EPISODES,
  },
];
