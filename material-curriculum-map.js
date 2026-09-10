// このファイルは scripts/generate_material_curriculum_map.js で生成します。
// series-nav-data.js の151話と、各教材HTMLの renderParent にある学習指導要領対応を正本とします。
const MATERIAL_CURRICULUM_MAP = Object.freeze(
{
  "social-bungei-lesson1": {
    "series": "社会参加シリーズ・文芸フリマ運営編",
    "title": "困っている人に気づく",
    "subjects": [
      {
        "subject": "特別活動",
        "grade": "小学校高学年〜",
        "unit": "集団活動への参加、他者への気づき、役割と協力"
      },
      {
        "subject": "総合",
        "grade": "小学校高学年〜",
        "unit": "地域活動への参加と振り返り"
      }
    ]
  },
  "social-bungei-lesson2": {
    "series": "社会参加シリーズ・文芸フリマ運営編",
    "title": "会場を案内してみよう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "小学校高学年〜",
        "unit": "相手に応じて短く分かりやすく伝える"
      },
      {
        "subject": "特別活動・総合",
        "grade": "小学校高学年〜",
        "unit": "地域活動での案内と協力"
      }
    ]
  },
  "social-bungei-lesson3": {
    "series": "社会参加シリーズ・文芸フリマ運営編",
    "title": "みんなが過ごしやすい場所をつくる",
    "subjects": [
      {
        "subject": "家庭科",
        "grade": "小学校高学年〜",
        "unit": "安全で快適な住環境への気づき"
      },
      {
        "subject": "特別活動・総合",
        "grade": "小学校高学年〜",
        "unit": "公共空間の整備と協働"
      }
    ]
  },
  "social-bungei-lesson4": {
    "series": "社会参加シリーズ・文芸フリマ運営編",
    "title": "困ったら『人につなぐ』",
    "subjects": [
      {
        "subject": "特別活動",
        "grade": "小学校高学年〜",
        "unit": "自己理解、援助要請、役割分担"
      },
      {
        "subject": "保健・総合",
        "grade": "小学校高学年〜",
        "unit": "休息と安全な活動参加"
      }
    ]
  },
  "social-bungei-lesson5": {
    "series": "社会参加シリーズ・文芸フリマ運営編",
    "title": "地域イベントの経験は防災にもつながる",
    "subjects": [
      {
        "subject": "社会",
        "grade": "小学校高学年〜",
        "unit": "地域の施設、人々の協力と防災への関心"
      },
      {
        "subject": "特別活動・総合",
        "grade": "小学校高学年〜",
        "unit": "地域参加の経験を次の活動へつなげる"
      }
    ]
  },
  "shishimai-ep01": {
    "series": "獅子舞",
    "title": "獅子舞の練習、あと何回？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3年",
        "unit": "かけ算とひき算を組み合わせた計算、必要な回数から済んだ回数を引く「残り」の考え方"
      },
      {
        "subject": "社会",
        "grade": "3年〜",
        "unit": "地域の伝統文化・年中行事"
      }
    ]
  },
  "shishimai-ep02": {
    "series": "獅子舞",
    "title": "獅子舞は、いつやるの？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3年〜",
        "unit": "「旧暦」「新暦」など耳慣れない語彙の意味を文脈から読み取り、説明する力"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域による年中行事・伝統文化の違いを知る"
      }
    ]
  },
  "shishimai-ep03": {
    "series": "獅子舞",
    "title": "獅子のお面は、何年生きる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域の伝統文化の継承、受け継がれてきた物や行事についての理解"
      },
      {
        "subject": "図画工作・美術",
        "grade": "",
        "unit": "材料の性質（デイゴ等の木材）や、形・表現の工夫についての気づき"
      }
    ]
  },
  "shishimai-ep04": {
    "series": "獅子舞",
    "title": "沖縄のどこで獅子が舞う？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地図の読み取り、地域ごとの文化・行事の違い"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "地図上での配置・視覚的な情報の表現"
      }
    ]
  },
  "shishimai-ep05": {
    "series": "獅子舞",
    "title": "獅子は、どんな音で動く？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3年〜",
        "unit": "拍やリズムを感じ取り、楽器の音や身体表現とのつながりに気づく"
      },
      {
        "subject": "理科（発展）",
        "grade": "",
        "unit": "音は物体の振動によって生じるという、音と振動への入口"
      }
    ]
  },
  "shishimai-ep06": {
    "series": "獅子舞",
    "title": "ふたりで、一頭の獅子になる",
    "subjects": [
      {
        "subject": "体育",
        "grade": "3年〜",
        "unit": "体つくり運動・表現運動、2人で息を合わせて動く協応的な運動感覚"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "役割分担や合図を通じた協働、相手を信頼して動きを合わせる態度"
      }
    ]
  },
  "shishimai-ep07": {
    "series": "獅子舞",
    "title": "獅子をつくる植物を見てみよう",
    "subjects": [
      {
        "subject": "理科（発展）",
        "grade": "",
        "unit": "植物の性質・部位（木材・外皮の繊維）と、加工・利用への入口"
      },
      {
        "subject": "社会（発展）",
        "grade": "",
        "unit": "地域の産業・伝統文化を支える資源循環（同じ植物が複数の文化資源に使われる例）"
      }
    ]
  },
  "shishimai-ep08": {
    "series": "獅子舞",
    "title": "十五夜の月を見て、何を感じる？",
    "subjects": [
      {
        "subject": "道徳・国語（内省）",
        "grade": "",
        "unit": "月を見て自分が何を感じたかを、自分の言葉で表現する"
      },
      {
        "subject": "理科",
        "grade": "小学校",
        "unit": "月の見え方の変化についての素朴な観察"
      },
      {
        "subject": "理科（発展）",
        "grade": "中学校",
        "unit": "天体の動き、月食の仕組み（太陽・地球・月の位置関係）"
      }
    ]
  },
  "shishimai-ep09": {
    "series": "獅子舞",
    "title": "獅子舞を知らない人に、どう紹介する？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "話すこと・聞くこと、資料（事実）と自分の考え（感想）を区別して伝える表現"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "他者理解、相手を大切にしながら情報を選んで伝えるコミュニケーション"
      }
    ]
  },
  "shishimai-ep10": {
    "series": "獅子舞",
    "title": "わたしの獅子舞・月文化地図",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で自分の考えや情景を表現する、言葉を選ぶ・推敲する"
      },
      {
        "subject": "図画工作／美術",
        "grade": "",
        "unit": "地図や作品として、学んだ事実を自分なりに再構成する"
      },
      {
        "subject": "社会・理科",
        "grade": "",
        "unit": "ep1〜9で扱った地域の伝統文化・年中行事・自然環境の知識を振り返る"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "自己表現、他者に向けた発信の経験"
      }
    ]
  },
  "typhoon-ep01": {
    "series": "台風",
    "title": "水は、あと何本？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "乗除の組み合わせ、複数段階の計算。学年により「整数のみ」「割合」「分数」等、深さを調整できます"
      },
      {
        "subject": "家庭科・特別活動",
        "grade": "",
        "unit": "防災・家庭生活の題材"
      }
    ]
  },
  "typhoon-ep02": {
    "series": "台風",
    "title": "その台風情報、どこから来た？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "4〜6年",
        "unit": "複数の情報を比べ、要点を整理して読み取る力"
      },
      {
        "subject": "社会・情報活用",
        "grade": "",
        "unit": "情報の発信元・信頼性を確かめる態度（メディアリテラシーの基礎）"
      }
    ]
  },
  "typhoon-ep03": {
    "series": "台風",
    "title": "台風の日、家の中にはどんな音がある？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3年〜",
        "unit": "身の回りの音の音色やリズムに気づき、聞き分ける力"
      },
      {
        "subject": "理科（環境観察）",
        "grade": "",
        "unit": "生活音・自然音・人の声という視点で身近な環境を観察する入口"
      }
    ]
  },
  "typhoon-ep04": {
    "series": "台風",
    "title": "暗くなる前に、家の中を歩いてみよう",
    "subjects": [
      {
        "subject": "体育・保健（安全な生活）",
        "grade": "",
        "unit": "身の回りの危険を予測し、けがや事故を防ぐための行動を考える学習"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "住まいの中の安全、暮らしやすい住環境への気づき"
      }
    ]
  },
  "typhoon-ep05": {
    "series": "台風",
    "title": "台風は、どこで力をもらう？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "天気の変化、雲と天気の関係。中学理科（大気・水蒸気・気象）への橋渡し"
      },
      {
        "subject": "社会・特別活動",
        "grade": "",
        "unit": "防災・自然災害と生活の題材"
      }
    ]
  },
  "typhoon-ep06": {
    "series": "台風",
    "title": "台風の進路図、どこを見ればいい？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "地図・図表の読み取り"
      },
      {
        "subject": "理科",
        "grade": "",
        "unit": "天気の変化、台風の進み方"
      },
      {
        "subject": "算数",
        "grade": "",
        "unit": "位置・距離・範囲の見方"
      }
    ]
  },
  "typhoon-ep07": {
    "series": "台風",
    "title": "台風がこわいとき、心はどうなる？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自分の感情への気づき、多様な感じ方の尊重"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "不安な気持ちとの付き合い方、学級での安心できる伝え方"
      },
      {
        "subject": "保健",
        "grade": "3〜6年",
        "unit": "自己理解、心とからだのつながりへの気づき"
      }
    ]
  },
  "typhoon-ep08": {
    "series": "台風",
    "title": "家族で、誰が何をする？",
    "subjects": [
      {
        "subject": "特別活動・家庭科",
        "grade": "3〜6年",
        "unit": "家族の協力、役割分担、家庭生活における話し合い"
      },
      {
        "subject": "道徳",
        "grade": "",
        "unit": "家族愛、家庭生活の充実（学びルート「人とつながる」・徳育の窓）"
      }
    ]
  },
  "typhoon-ep09": {
    "series": "台風",
    "title": "わが家の台風知恵カードをつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で自分の考えや事実を表現する、言葉を選ぶ・推敲する"
      },
      {
        "subject": "理科・社会",
        "grade": "",
        "unit": "ep1〜8で扱った気象現象・防災の知識を自分の生活に引きつけて振り返る"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "カードやイラストとして、学んだ事実を自分なりに再構成する"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "情報を編集し、家族や身近な人に伝える経験"
      }
    ]
  },
  "yago-ep01": {
    "series": "沖縄の屋号",
    "title": "同じ名字が3軒！どうやって呼び分ける？",
    "subjects": [
      {
        "subject": "算数・数学",
        "grade": "",
        "unit": "位置・順序・条件整理、必要な情報とそうでない情報の判別"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "必要な情報の読み取り"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地図・地域社会"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "地域調査"
      }
    ]
  },
  "tsunahiki-ep01": {
    "series": "沖縄の綱引き",
    "title": "大綱づくり、わら束はあといくつ？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "加減の組み合わせ、複数段階の計算。学年により「整数のみ」「大きな数」等、深さを調整できます"
      },
      {
        "subject": "社会・総合的な学習の時間",
        "grade": "",
        "unit": "地域の伝統行事・郷土文化の題材"
      }
    ]
  },
  "tsunahiki-ep02": {
    "series": "沖縄の綱引き",
    "title": "引く？曳く？挽く？—綱引きの名前を読む",
    "subjects": [
      {
        "subject": "国語",
        "grade": "4〜6年",
        "unit": "複数の資料を比べ、共通点・相違点を読み取る力"
      },
      {
        "subject": "社会（郷土学習）",
        "grade": "",
        "unit": "地域ごとの伝統行事の名称・由来の違いを尊重する態度"
      }
    ]
  },
  "tsunahiki-ep03": {
    "series": "沖縄の綱引き",
    "title": "綱引きは、どんな音で動く？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3年〜",
        "unit": "拍・リズム・音色に気づき、人の動きと結びつけて聞く力"
      },
      {
        "subject": "体育",
        "grade": "",
        "unit": "号令や合図に合わせて集団で動くことの意味"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "地域行事の観察・記録"
      }
    ]
  },
  "tsunahiki-ep04": {
    "series": "沖縄の綱引き",
    "title": "みんなの力を、どうやってそろえる？",
    "subjects": [
      {
        "subject": "体育（体つくり運動・きまり）",
        "grade": "",
        "unit": "合図に合わせて集団で動くこと、体の動きを合わせることのねらいを考える学習"
      },
      {
        "subject": "保健体育・理科への発展",
        "grade": "中学校",
        "unit": "力の向き、摩擦、作用・反作用等の見方を図で考える入口としても扱える題材です（本教材では扱いません）"
      }
    ]
  },
  "tsunahiki-ep05": {
    "series": "沖縄の綱引き",
    "title": "稲わらが、どうして大綱になる？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "植物の育ち方、身近な自然物の観察。植物繊維と紙・麻ひも等の安全な素材との比較"
      },
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "地域の農業・資源循環、郷土の伝統行事と生活とのつながり"
      }
    ]
  },
  "tsunahiki-ep06": {
    "series": "沖縄の綱引き",
    "title": "雄綱・雌綱は、どうつながる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "地図・図表の読み取り、地域の伝統行事"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "見取り図・平面図の表現、レイヤーで整理して描く技法"
      }
    ]
  },
  "tsunahiki-ep07": {
    "series": "沖縄の綱引き",
    "title": "勝つ・負けると、わたしの心はどう動く？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自分の感情への気づき、多様な感じ方の尊重"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "勝敗をめぐる気持ちとの付き合い方、学級での安心できる伝え方"
      }
    ]
  },
  "tsunahiki-ep08": {
    "series": "沖縄の綱引き",
    "title": "どうして地域みんなで大綱を作れる？",
    "subjects": [
      {
        "subject": "特別活動・社会",
        "grade": "3〜6年",
        "unit": "地域社会との関わり、協力、地域行事における役割分担"
      },
      {
        "subject": "道徳",
        "grade": "",
        "unit": "勤労、公共の精神、集団生活の充実（学びルート「人とつながる」・徳育の窓）"
      }
    ]
  },
  "tsunahiki-ep09": {
    "series": "沖縄の綱引き",
    "title": "わたしの地域の綱引き文化地図をつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で自分の考えや事実を表現する、言葉を選ぶ・推敲する"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "ep1〜8で扱った地域の伝統文化・年中行事の知識を自分の生活に引きつけて振り返る"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "地図やカードとして、学んだ事実を自分なりに再構成する"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "情報を編集し、地域の人に伝える経験"
      }
    ]
  },
  "goya-ep01": {
    "series": "ゴーヤー",
    "title": "出荷できるゴーヤーは何本？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "加減の複数段階の計算、がい数（概数）の考え方。学年により深さを調整できます"
      },
      {
        "subject": "社会・総合的な学習の時間",
        "grade": "",
        "unit": "地域の農業・郷土文化の題材"
      }
    ]
  },
  "goya-ep02": {
    "series": "ゴーヤー",
    "title": "ゴーヤーって、どんな野菜？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "相手や目的に応じて分かりやすく説明する力、必要な事柄を選んで話す・書く力"
      },
      {
        "subject": "社会・総合的な学習の時間",
        "grade": "",
        "unit": "地域の農業・郷土文化の題材"
      }
    ]
  },
  "goya-ep03": {
    "series": "ゴーヤー",
    "title": "ゴーヤーチャンプルーの台所は、どんな音？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "身のまわりの音やリズムを聞き分け、擬音語で表現する力"
      },
      {
        "subject": "生活・家庭科",
        "grade": "",
        "unit": "調理の工程と、そこで生じる音や変化への気づき"
      }
    ]
  },
  "goya-ep04": {
    "series": "ゴーヤー",
    "title": "つるは、どうやって上へ行く？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "",
        "unit": "植物の成長と体のつくり（つる性植物の特性）"
      },
      {
        "subject": "体育",
        "grade": "",
        "unit": "身体表現、方向・順序を意識した動き"
      },
      {
        "subject": "生活科",
        "grade": "",
        "unit": "身近な自然の観察"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "体験を通した気づきの記録"
      }
    ]
  },
  "goya-ep05": {
    "series": "ゴーヤー",
    "title": "ゴーヤーは、どうやって実になる？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "植物の成長の観察、花のつくりと実のでき方（受粉と結実の関係）"
      },
      {
        "subject": "生活・総合的な学習の時間",
        "grade": "",
        "unit": "地域の農作物（ゴーヤー）を通じた栽培・観察体験"
      }
    ]
  },
  "goya-ep06": {
    "series": "ゴーヤー",
    "title": "緑のカーテンを設計しよう",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "3〜6年",
        "unit": "ものの位置関係を図でとらえ、空間の中で構成を考える力"
      },
      {
        "subject": "算数",
        "grade": "高学年",
        "unit": "縦横比・拡大図の考え方（発展的な内容として）"
      },
      {
        "subject": "理科・生活",
        "grade": "",
        "unit": "日照と気温の関係、暮らしの中の環境への工夫"
      }
    ]
  },
  "goya-ep07": {
    "series": "ゴーヤー",
    "title": "苦いって、きらいでいい？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自分の感情への気づき、多様な感じ方の尊重"
      },
      {
        "subject": "特別活動・学級活動",
        "grade": "",
        "unit": "食に関する指導、好き嫌いを否定しない伝え方"
      },
      {
        "subject": "食育",
        "grade": "3〜6年",
        "unit": "味覚の多様性への理解、無理のない食体験"
      }
    ]
  },
  "goya-ep08": {
    "series": "ゴーヤー",
    "title": "畑から食卓まで、誰がつないでいる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3年",
        "unit": "地域の生産や販売の仕事、それに携わる人々の工夫（仕入れ・運搬・販売の工夫など）"
      },
      {
        "subject": "社会",
        "grade": "5年",
        "unit": "我が国の食料生産、輸送・流通のしくみへの理解"
      },
      {
        "subject": "学びルート「人とつながる」",
        "grade": "",
        "unit": "見えない他者の役割・立場を想像し、関係性を理解する力"
      }
    ]
  },
  "goya-ep09": {
    "series": "ゴーヤー",
    "title": "わたしのゴーヤー文化カードをつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で自分の考えや情景を表現する、言葉を選ぶ・推敲する"
      },
      {
        "subject": "図画工作／美術",
        "grade": "",
        "unit": "カードや絵として、学んだ事実を自分なりに再構成する"
      },
      {
        "subject": "社会・理科",
        "grade": "",
        "unit": "ep1〜8で扱った郷土の食文化・農業・自然環境の知識を振り返る"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "自己表現、他者に向けた発信の経験"
      }
    ]
  },
  "pork-ep01": {
    "series": "沖縄の豚",
    "title": "550頭から、2万頭をこえる？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "乗除の組み合わせ、複数段階の計算。学年により「整数のみ」「割合」「分数」等、深さを調整できます"
      },
      {
        "subject": "社会",
        "grade": "6年",
        "unit": "戦後の沖縄とハワイの沖縄県系人による支援を背景として知る"
      }
    ]
  },
  "pork-ep02": {
    "series": "沖縄の豚",
    "title": "ミミガーって、どこのこと？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "相手や目的に応じて分かりやすく説明する力、必要な事柄を選んで話す・書く力"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "地域の食文化とことばの題材"
      }
    ]
  },
  "pork-ep03": {
    "series": "沖縄の豚",
    "title": "ミミガー、チラガー、どんなリズム？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "拍、リズム、音の組合せ"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "音声言語と地域のことば"
      }
    ]
  },
  "pork-ep04": {
    "series": "沖縄の豚",
    "title": "豚は、どう動く？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "",
        "unit": "表現運動"
      },
      {
        "subject": "理科・生活",
        "grade": "",
        "unit": "動物の観察"
      }
    ]
  },
  "pork-ep05": {
    "series": "沖縄の豚",
    "title": "『鳴き声以外』って、本当？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "5年",
        "unit": "動物の誕生／6年：生物と環境"
      },
      {
        "subject": "家庭科",
        "grade": "5〜6年",
        "unit": "食生活"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域文化"
      }
    ]
  },
  "pork-ep06": {
    "series": "沖縄の豚",
    "title": "一頭の豚を、地図にしよう",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "形・配置・視覚表現"
      },
      {
        "subject": "理科",
        "grade": "",
        "unit": "身体と生物"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "食材"
      }
    ]
  },
  "pork-ep07": {
    "series": "沖縄の豚",
    "title": "『いただきます』を考える",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "自分の考えを言葉にする"
      },
      {
        "subject": "道徳・家庭科・総合",
        "grade": "",
        "unit": "生命と食生活"
      }
    ]
  },
  "pork-ep08": {
    "series": "沖縄の豚",
    "title": "豚料理は、なぜみんなで食べる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域の暮らし・年中行事"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "聞き取り・記録"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "家族と食"
      }
    ]
  },
  "pork-ep09": {
    "series": "沖縄の豚",
    "title": "沖縄の豚文化を伝えよう",
    "subjects": [
      {
        "subject": "国語・社会・理科・音楽・図画工作・家庭科・総合の横断",
        "grade": "",
        "unit": ""
      }
    ]
  },
  "gurukun-ep01": {
    "series": "グルクン",
    "title": "グルクン、何箱できる？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3年",
        "unit": "加減乗除"
      },
      {
        "subject": "算数",
        "grade": "4年",
        "unit": "四則混合・概数・余り"
      },
      {
        "subject": "算数",
        "grade": "5〜6年",
        "unit": "割合・比への発展"
      }
    ]
  },
  "gurukun-ep02": {
    "series": "グルクン",
    "title": "グルクンって、魚の名前？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙・要約・説明"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域の特色"
      }
    ]
  },
  "gurukun-ep03": {
    "series": "グルクン",
    "title": "群れの動きを、リズムにできる？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "拍・リズム・反復・即興"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "海の生き物"
      }
    ]
  },
  "gurukun-ep04": {
    "series": "グルクン",
    "title": "追い込み漁って、どう動く？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "",
        "unit": "体つくり運動・協働"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域の生業"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "漁撈文化"
      }
    ]
  },
  "gurukun-ep05": {
    "series": "グルクン",
    "title": "グルクンは、どんな海で暮らす？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "生物と環境・観察・分類"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "海洋環境"
      }
    ]
  },
  "gurukun-ep06": {
    "series": "グルクン",
    "title": "魚・人・網を、上から見たら？",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "構成・配置"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "生産と流通"
      },
      {
        "subject": "算数",
        "grade": "",
        "unit": "位置・図"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域産業"
      }
    ]
  },
  "gurukun-ep07": {
    "series": "グルクン",
    "title": "わたしにとって「県魚」って何？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "郷土を大切にする心・自己理解"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域の自然と文化"
      }
    ]
  },
  "gurukun-ep08": {
    "series": "グルクン",
    "title": "一尾のグルクンに、何人が関わる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "",
        "unit": "生産・販売・地域産業"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "職業・地域参加"
      },
      {
        "subject": "道徳",
        "grade": "",
        "unit": "協働"
      }
    ]
  },
  "gurukun-ep09": {
    "series": "グルクン",
    "title": "「一尾の旅」を伝えよう",
    "subjects": [
      {
        "subject": "国語・図画工作・音楽・社会・理科・総合の横断",
        "grade": "",
        "unit": ""
      }
    ]
  },
  "muchi-ep01": {
    "series": "ムーチー",
    "title": "ムーチー、いくつ作る？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "乗除・四則混合・概数・割合・比"
      }
    ]
  },
  "muchi-ep02": {
    "series": "ムーチー",
    "title": "ムーチーって、どんな行事？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙・要約・説明・伝承"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域の年中行事"
      }
    ]
  },
  "muchi-ep03": {
    "series": "ムーチー",
    "title": "ムーチーを作る音、いくつ聞こえる？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "",
        "unit": "拍・リズム・音色"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "擬音語・擬態語"
      }
    ]
  },
  "muchi-ep04": {
    "series": "ムーチー",
    "title": "月桃の葉で、どう包む？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "",
        "unit": "巧緻性・身体操作"
      },
      {
        "subject": "家庭科",
        "grade": "5〜6年",
        "unit": "調理・安全"
      },
      {
        "subject": "図工",
        "grade": "",
        "unit": "材料操作"
      }
    ]
  },
  "muchi-ep05": {
    "series": "ムーチー",
    "title": "月桃って、どんな植物？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "植物のつくり・季節・観察"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域の自然"
      }
    ]
  },
  "muchi-ep06": {
    "series": "ムーチー",
    "title": "ムーチーの包み方を図にしてみよう",
    "subjects": [
      {
        "subject": "図工",
        "grade": "",
        "unit": "構成・配置"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "手順説明"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "地域文化の比較"
      }
    ]
  },
  "muchi-ep07": {
    "series": "ムーチー",
    "title": "願うって、どんな気持ち？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "生命・家族・伝統文化"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "理由を述べる"
      }
    ]
  },
  "muchi-ep08": {
    "series": "ムーチー",
    "title": "ムーチーは、誰と誰をつなぐ？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域社会"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "協働"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "家庭生活"
      }
    ]
  },
  "muchi-ep09": {
    "series": "ムーチー",
    "title": "わたしの家のムーチー記録を残そう",
    "subjects": [
      {
        "subject": "国語・図工・音楽・家庭科・総合の横断",
        "grade": "",
        "unit": ""
      },
      {
        "subject": "情報活用・表現",
        "grade": "",
        "unit": ""
      }
    ]
  },
  "beniimo-ep1": {
    "series": "紅芋",
    "title": "紅芋チップス、あと何袋たりない？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3年",
        "unit": "かけ算とひき算を組み合わせた計算、必要量から所持量を引く「不足分」の考え方"
      },
      {
        "subject": "社会",
        "grade": "3年〜",
        "unit": "地域の産業・特産品（紅芋）と、それを支える仕事"
      }
    ]
  },
  "beniimo-ep2": {
    "series": "紅芋",
    "title": "紅芋を持ってきたのは誰？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3年",
        "unit": "人名・固有名詞を読む、聞いたことを自分の言葉で説明する"
      },
      {
        "subject": "社会",
        "grade": "3年〜",
        "unit": "地域の歴史上の人物と、その功績"
      }
    ]
  },
  "beniimo-ep3": {
    "series": "紅芋",
    "title": "紅芋づくりのリズム、覚えてる？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3年",
        "unit": "リズムに合わせて体を動かす、拍を感じて言葉をのせる"
      },
      {
        "subject": "生活・家庭科",
        "grade": "3年〜",
        "unit": "調理の手順を順序立てて理解する"
      }
    ]
  },
  "beniimo-ep4": {
    "series": "紅芋",
    "title": "紅芋掘り、正しいやり方は？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "3年",
        "unit": "体つくり運動（体の基本的な動きを身に付ける運動）、けがの防止や安全に気をつけた体の使い方を理解する"
      },
      {
        "subject": "生活・家庭科",
        "grade": "3年〜",
        "unit": "仕事の手伝いを通して、正しく安全な体の動かし方を理解する"
      }
    ]
  },
  "beniimo-ep5": {
    "series": "紅芋",
    "title": "紅芋の色、なんで紫なの？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "4年",
        "unit": "植物の成長や特徴を観察し、環境との関わりを考える"
      },
      {
        "subject": "社会",
        "grade": "3年〜",
        "unit": "地域の特産品（紅芋）が育つ自然条件、伝来の歴史"
      }
    ]
  },
  "beniimo-ep6": {
    "series": "紅芋",
    "title": "紅芋の花、見たことある？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3年",
        "unit": "植物の育ち方や体のつくりを、色・形などの見た目に着目して観察する"
      },
      {
        "subject": "図画工作",
        "grade": "3年〜",
        "unit": "見たものの形や色をとらえ、ことばや絵で表す"
      }
    ]
  },
  "beniimo-ep7": {
    "series": "紅芋",
    "title": "紅芋、はじめて食べたのはいつだった？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "3年",
        "unit": "自分の考えや気持ちを見つめ、正直に表現する態度を養う"
      },
      {
        "subject": "特別活動",
        "grade": "3年〜",
        "unit": "自己の生活や経験を振り返り、言葉にする習慣づくり"
      }
    ]
  },
  "beniimo-ep8": {
    "series": "紅芋",
    "title": "紅芋のこと、うまく紹介できるかな？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3年",
        "unit": "相手に伝わるように、話す事柄の順序を考えて話す"
      },
      {
        "subject": "特別活動",
        "grade": "3年〜",
        "unit": "互いのよさを認め合い、協力して活動する中で伝え合う力を養う"
      }
    ]
  },
  "beniimo-ep9": {
    "series": "紅芋",
    "title": "紅芋のことば、誰かに届けてみよう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で自分の考えや情景を表現する、言葉を選ぶ・推敲する"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "自己表現、他者に向けた発信の経験"
      }
    ]
  },
  "yachimun-ep01": {
    "series": "やちむん",
    "title": "窯から、何個ぶじに出てきた？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3年",
        "unit": "加減と文章題"
      },
      {
        "subject": "算数",
        "grade": "4年",
        "unit": "複数段階の式"
      },
      {
        "subject": "算数",
        "grade": "5〜6年",
        "unit": "割合・比への発展"
      }
    ]
  },
  "yachimun-ep02": {
    "series": "やちむん",
    "title": "やちむんって、どんなことば？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙・辞書・説明・要約"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域文化"
      }
    ]
  },
  "yachimun-ep03": {
    "series": "やちむん",
    "title": "土をつくる音、器をつくる音",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "拍・リズム・音色"
      },
      {
        "subject": "図画工作・総合",
        "grade": "",
        "unit": "制作工程"
      }
    ]
  },
  "yachimun-ep04": {
    "series": "やちむん",
    "title": "土は、手でどう変わる？",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "3〜6年",
        "unit": "立体・材料"
      },
      {
        "subject": "体育・保健",
        "grade": "",
        "unit": "身体操作"
      },
      {
        "subject": "理科",
        "grade": "",
        "unit": "力と形"
      }
    ]
  },
  "yachimun-ep05": {
    "series": "やちむん",
    "title": "土・水・火で、何が変わる？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "4〜6年",
        "unit": "物の性質・温度・燃焼への接続"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "材料"
      }
    ]
  },
  "yachimun-ep06": {
    "series": "やちむん",
    "title": "壺屋と読谷、どこにある？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地図・地域の特色"
      },
      {
        "subject": "社会",
        "grade": "6年",
        "unit": "歴史資料への入口"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "配置"
      }
    ]
  },
  "yachimun-ep07": {
    "series": "やちむん",
    "title": "わたしなら、どんな器を毎日使いたい？",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "鑑賞"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "理由説明"
      },
      {
        "subject": "家庭科",
        "grade": "5〜6年",
        "unit": "生活用品"
      }
    ]
  },
  "yachimun-ep08": {
    "series": "やちむん",
    "title": "やちむんは、一人でできる？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域産業・人々の働き"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "職業・地域"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "協働"
      }
    ]
  },
  "yachimun-ep09": {
    "series": "やちむん",
    "title": "わたしのやちむん企画展",
    "subjects": [
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "表現・鑑賞"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "説明・発表"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域文化"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "探究・発信"
      }
    ]
  },
  "shiimi-ep01": {
    "series": "シーミー",
    "title": "ウサンミ、何個分けられる？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "乗除の組み合わせ、複数段階の計算。学年により「絵・具体物で数える」「乗除と複数段階の式」「割合・比」「均等分配という仮定自体の検討」と深さを調整できます"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "年中行事に関わる文化資本の入口"
      }
    ]
  },
  "shiimi-ep02": {
    "series": "シーミー",
    "title": "シーミーって、どんな行事？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙を広げる力、資料を読み取って要約する力、地域のことばを尊重して受け止める力"
      },
      {
        "subject": "社会・総合的な学習の時間",
        "grade": "",
        "unit": "地域文化・資料読解、年中行事の学習"
      }
    ]
  },
  "shiimi-ep03": {
    "series": "シーミー",
    "title": "シーミーの日には、どんな音がある？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "音色・強弱・長短・音の重なりを聴き取り、簡単な図や記号で表す活動"
      },
      {
        "subject": "生活・総合的な学習の時間",
        "grade": "",
        "unit": "身近な暮らしの環境を観察し、気づいたことを表現する活動"
      }
    ]
  },
  "shiimi-ep04": {
    "series": "シーミー",
    "title": "みんなで準備するには、どう動く？",
    "subjects": [
      {
        "subject": "体育（体つくり運動）",
        "grade": "",
        "unit": "安全に気を配った協働的な動き"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "役割分担・協力"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "家庭生活と協力"
      }
    ]
  },
  "shiimi-ep05": {
    "series": "シーミー",
    "title": "清明って、月の満ち欠けで決まるの？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "季節と生き物・太陽の動き。中学理科「地球と宇宙」への入口としても扱えます"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "暦と年中行事、地域文化の観察"
      }
    ]
  },
  "shiimi-ep06": {
    "series": "シーミー",
    "title": "沖縄のどこで、どう違う？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "",
        "unit": "地図・地域の特色、都道府県内の地域差"
      },
      {
        "subject": "図画工作・美術",
        "grade": "",
        "unit": "情報の配置・記号化、色や記号での表現"
      }
    ]
  },
  "shiimi-ep07": {
    "series": "シーミー",
    "title": "会ったことのないご先祖に、何を聞く？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自己理解、家族・生命への多様な向き合い方の尊重"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "安心して気持ちを表現できる伝え方"
      },
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "問いを自分の言葉にする、考えを書く"
      }
    ]
  },
  "shiimi-ep08": {
    "series": "シーミー",
    "title": "親族が集まるとき、どう役割を分ける？",
    "subjects": [
      {
        "subject": "特別活動・家庭科",
        "grade": "3〜6年",
        "unit": "協働、役割分担、家庭生活と協力"
      },
      {
        "subject": "道徳・公民",
        "grade": "中学・高校",
        "unit": "相互扶助、公正な分担、共同体の中での多様な立場への配慮"
      }
    ]
  },
  "shiimi-ep09": {
    "series": "シーミー",
    "title": "シーミー文化カードを残そう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "学んだことを要約し、他者に伝わる形に編集する"
      },
      {
        "subject": "情報・総合的な学習の時間",
        "grade": "",
        "unit": "情報を整理し、事実と経験を区別して発信する"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域文化・地域差の理解、資料の読み取り"
      },
      {
        "subject": "特別活動",
        "grade": "",
        "unit": "家族・地域とのかかわり、多様な価値観の尊重"
      }
    ]
  },
  "shiokawa-ep01": {
    "series": "塩川",
    "title": "塩川の水は、海の水？川の水？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "4〜6年",
        "unit": "割合・小数・分数の相互関係、百分率"
      },
      {
        "subject": "理科",
        "grade": "中学校1年",
        "unit": "水溶液・質量パーセント濃度への入口"
      }
    ]
  },
  "shiokawa-ep02": {
    "series": "塩川",
    "title": "「塩川」「汽水」「天然記念物」ってどういう意味？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙を広げる力、資料を読み取って要約する力、分からないことばを分かったふりで済ませない姿勢"
      },
      {
        "subject": "国語",
        "grade": "中学校",
        "unit": "情報整理・語句の意味を資料で確認する力への接続"
      },
      {
        "subject": "社会・総合的な学習の時間",
        "grade": "",
        "unit": "地域の自然資源・郷土学習"
      }
    ]
  },
  "shiokawa-ep03": {
    "series": "塩川",
    "title": "川の音と海の音、何が違う？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "音色・強弱、拍やリズムの反復と変化を聞き取る活動"
      },
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "身近な自然環境の観察、音や水の性質への気づき"
      }
    ]
  },
  "shiokawa-ep04": {
    "series": "塩川",
    "title": "100mの川って、どのくらい？",
    "subjects": [
      {
        "subject": "体育（体つくり運動）",
        "grade": "",
        "unit": "歩く・数えるなど、基本的な体の動きを通して自分の体の感覚をつかむ学習"
      },
      {
        "subject": "算数",
        "grade": "",
        "unit": "長さの単位（m）を、実測を通して量感として捉える学習。速さや比の素地にもつながる"
      },
      {
        "subject": "理科",
        "grade": "",
        "unit": "観察・野外での基礎的な測定活動"
      }
    ]
  },
  "shiokawa-ep05": {
    "series": "塩川",
    "title": "海の生きものと川の生きものが、なぜ一緒に？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "生物と環境、水辺の生物の観察と分類"
      },
      {
        "subject": "理科",
        "grade": "中学校",
        "unit": "生態系（食物網・生物どうしのつながり）への入口"
      }
    ]
  },
  "shiokawa-ep06": {
    "series": "塩川",
    "title": "塩川の水は、どこから来る？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地図の読み取り、県内の特色ある地域"
      },
      {
        "subject": "理科",
        "grade": "5〜6年",
        "unit": "流れる水のはたらき、土地のつくりと変化"
      },
      {
        "subject": "理科",
        "grade": "中学校",
        "unit": "地層・地下水（入口）"
      }
    ]
  },
  "shiokawa-ep07": {
    "series": "塩川",
    "title": "分からないままでも、考え続けられる？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "物事を多面的・多角的に考え、より良く生きようとする態度"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "問題の発見・整理・情報の収集と分析"
      },
      {
        "subject": "理科",
        "grade": "3〜6年",
        "unit": "問題解決の過程（予想・仮説を立てる、分からないことを明らかにする）"
      }
    ]
  },
  "shiokawa-ep08": {
    "series": "塩川",
    "title": "珍しい自然を、どう守りながら伝える？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "地域社会との関わり、地域資源の保全と公共性"
      },
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自然愛護、公共の精神、集団や社会との関わり（学びルート「人とつながる」・徳育の窓）"
      },
      {
        "subject": "総合的な学習の時間",
        "grade": "",
        "unit": "地域資源をめぐる合意形成、立場の異なる人との対話"
      }
    ]
  },
  "shiokawa-ep09": {
    "series": "塩川",
    "title": "塩川ミステリーガイドをつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "短い言葉で事実と自分の考えを分けて伝える、要約・推敲"
      },
      {
        "subject": "理科",
        "grade": "",
        "unit": "自然環境の観察、仮説を立てる態度、未解明の現象への向き合い方（中学理科・地学分野への入口）"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域の文化財・自然環境の保護、地図の読み取り"
      },
      {
        "subject": "情報・総合",
        "grade": "",
        "unit": "音声・ガイド・地図・動画など複数の伝え方から選び、情報を整理して発信する経験"
      }
    ]
  },
  "harii-ep01": {
    "series": "ハーリー",
    "title": "漕ぎ手、あと何人？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜6年",
        "unit": "乗除の組み合わせ、複数段階の計算。学年により「整数のみ」「割合」「分数」等、深さを調整できます"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "地域の年中行事を入口にした文化資本の学習"
      }
    ]
  },
  "harii-ep02": {
    "series": "ハーリー",
    "title": "ハーリー？ ハーレー？ どっちが正しい？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "複数資料の語彙を比べ、根拠を示して説明する"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "地域文化の呼称と歴史的変化を調べる"
      }
    ]
  },
  "harii-ep03": {
    "series": "ハーリー",
    "title": "みんなの櫂は、なぜ同じタイミング？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "",
        "unit": "拍、リズム、反復、間、郷土の音楽を聞き分ける"
      },
      {
        "subject": "体育",
        "grade": "",
        "unit": "合図に合わせた集団動作と安全な模擬活動"
      }
    ]
  },
  "harii-ep04": {
    "series": "ハーリー",
    "title": "速く動くより、そろえる？",
    "subjects": [
      {
        "subject": "体育（体つくり運動・集団行動）",
        "grade": "",
        "unit": "合図に合わせて集団で動くこと、姿勢・タイミングをそろえることのねらいを考える学習"
      },
      {
        "subject": "保健",
        "grade": "",
        "unit": "安全に配慮した集団運動の進め方を考える入口としても扱える題材です"
      }
    ]
  },
  "harii-ep05": {
    "series": "ハーリー",
    "title": "海の高さは、どうして変わる？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "",
        "unit": "月・太陽と潮汐、周期的な自然現象"
      },
      {
        "subject": "情報・防災",
        "grade": "",
        "unit": "一般的な仕組みと地点別の公的データを区別する"
      }
    ]
  },
  "harii-ep06": {
    "series": "ハーリー",
    "title": "舟は、どこを通って戻る？",
    "subjects": [
      {
        "subject": "算数・図工",
        "grade": "",
        "unit": "方向、位置関係、図形、図解"
      },
      {
        "subject": "社会・情報",
        "grade": "",
        "unit": "地図の読み方と架空設定・公式情報の区別"
      }
    ]
  },
  "harii-ep07": {
    "series": "ハーリー",
    "title": "海を見たとき、わたしはどう感じる？",
    "subjects": [
      {
        "subject": "道徳・特別活動",
        "grade": "",
        "unit": "自己理解、感情の言語化、多様な感じ方の尊重"
      },
      {
        "subject": "保健",
        "grade": "",
        "unit": "安心できる参加方法と海の安全"
      }
    ]
  },
  "harii-ep08": {
    "series": "ハーリー",
    "title": "漕がない人も、ハーリーを作っている？",
    "subjects": [
      {
        "subject": "特別活動・社会",
        "grade": "3〜6年",
        "unit": "地域社会との関わり、協力、地域行事における役割分担"
      },
      {
        "subject": "道徳",
        "grade": "",
        "unit": "勤労、公共の精神、集団生活の充実（学びルート「人とつながる」・徳育の窓）"
      }
    ]
  },
  "harii-ep09": {
    "series": "ハーリー",
    "title": "わたしの地域の海の祭りを未来へ渡す",
    "subjects": [
      {
        "subject": "国語・社会・理科",
        "grade": "",
        "unit": "資料を選び、事実と考えを分けて編集する"
      },
      {
        "subject": "総合・情報",
        "grade": "",
        "unit": "文化記録、著作権・肖像・個人情報、他者からの改善意見"
      }
    ]
  },
  "kyuubon-ep01": {
    "series": "旧盆・エイサー",
    "title": "旧盆までの練習、あと何回？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "",
        "unit": "乗法と減法を組み合わせた複数段階の文章題"
      },
      {
        "subject": "情報",
        "grade": "",
        "unit": "必要情報と不要情報の選択、架空設定の明示"
      }
    ]
  },
  "kyuubon-ep02": {
    "series": "旧盆・エイサー",
    "title": "ウンケー・ナカヌヒ・ウークイって何？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "語彙、順序、意味を根拠とともに説明する"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "年中行事としまくとぅば、地域差"
      }
    ]
  },
  "kyuubon-ep03": {
    "series": "旧盆・エイサー",
    "title": "エイサーの音は、何が重なっている？",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "",
        "unit": "拍、リズム、音色、重なり、郷土の音楽"
      },
      {
        "subject": "情報",
        "grade": "",
        "unit": "音源の出典・権利と一例の範囲を示す"
      }
    ]
  },
  "kyuubon-ep04": {
    "series": "旧盆・エイサー",
    "title": "道ジュネーは、どう動く？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "",
        "unit": "リズム運動、方向転換、間隔、安全な集団動作"
      },
      {
        "subject": "音楽・総合",
        "grade": "",
        "unit": "地域芸能の観察と権利・地域差"
      }
    ]
  },
  "kyuubon-ep05": {
    "series": "旧盆・エイサー",
    "title": "旧暦7月15日の月は、どんな月？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "",
        "unit": "月の満ち欠け、時刻・方角・太陽との関係"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "文化の暦と自然現象を分けて説明する"
      }
    ]
  },
  "kyuubon-ep06": {
    "series": "旧盆・エイサー",
    "title": "エイサーは、どこを歩く？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "",
        "unit": "地図、経路、地域空間、凡例"
      },
      {
        "subject": "図工・情報",
        "grade": "",
        "unit": "記号・矢印による視覚表現と個人情報"
      }
    ]
  },
  "kyuubon-ep07": {
    "series": "旧盆・エイサー",
    "title": "ご先祖に一言伝えるなら？",
    "subjects": [
      {
        "subject": "道徳・国語",
        "grade": "",
        "unit": "自己理解、相手を選んだ表現、沈黙する権利"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "文化と個人経験を分け、同意を尊重する"
      }
    ]
  },
  "kyuubon-ep08": {
    "series": "旧盆・エイサー",
    "title": "エイサーは、誰と成り立つ？",
    "subjects": [
      {
        "subject": "社会・特別活動",
        "grade": "",
        "unit": "地域社会、協働、役割と関係"
      },
      {
        "subject": "総合・キャリア教育",
        "grade": "",
        "unit": "見えにくい仕事、負担、同意"
      }
    ]
  },
  "kyuubon-ep09": {
    "series": "旧盆・エイサー",
    "title": "わたしの旧盆・エイサー文化記録",
    "subjects": [
      {
        "subject": "国語・音楽・理科・社会",
        "grade": "",
        "unit": "教科横断の資料編集と表現"
      },
      {
        "subject": "総合・情報",
        "grade": "",
        "unit": "文化記録、同意、個人情報、出典、改善"
      }
    ]
  },
  "ishiganto-ep01": {
    "series": "石敢當",
    "title": "石敢當は、あと何基？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜4年",
        "unit": "加減、複数段階の計算、表や文章から必要な情報を選ぶ"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "身近な地域の観察、地域に残る文化"
      }
    ]
  },
  "ishiganto-ep02": {
    "series": "石敢當",
    "title": "石敢當って、なんて読む？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "漢字・語句の意味、情報を選んで短く説明する"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "身近な地域に残る文化を知る"
      }
    ]
  },
  "ishiganto-ep03": {
    "series": "石敢當",
    "title": "まちの音を聞いて石敢當を探す",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "音色・強弱・反復・間を感じて表現する"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域を複数の感覚で観察し、記録する"
      }
    ]
  },
  "ishiganto-ep04": {
    "series": "石敢當",
    "title": "T字路を身体でつくれる？",
    "subjects": [
      {
        "subject": "体育",
        "grade": "",
        "unit": "体の動き、空間を使った表現、仲間との協働"
      },
      {
        "subject": "算数・社会",
        "grade": "",
        "unit": "平面図形、方位、道路の形と安全"
      }
    ]
  },
  "ishiganto-ep05": {
    "series": "石敢當",
    "title": "石敢當は、みんな同じ石？",
    "subjects": [
      {
        "subject": "理科",
        "grade": "",
        "unit": "共通点と差異に着目した観察・分類"
      },
      {
        "subject": "図画工作・社会",
        "grade": "",
        "unit": "形や材質への関心、地域文化の記録"
      }
    ]
  },
  "ishiganto-ep06": {
    "series": "石敢當",
    "title": "石敢當は、どこに置かれている？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "",
        "unit": "地図や地域資料の読み取り、地域文化"
      },
      {
        "subject": "算数・図画工作",
        "grade": "",
        "unit": "位置関係、平面図、記号による表現"
      }
    ]
  },
  "ishiganto-ep07": {
    "series": "石敢當",
    "title": "人は、なぜ『守るもの』を置くんだろう？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "生命の尊重、家族や郷土を大切にする心"
      },
      {
        "subject": "国語・社会",
        "grade": "",
        "unit": "事実と感想を分け、文化的背景を考える"
      }
    ]
  },
  "ishiganto-ep08": {
    "series": "石敢當",
    "title": "石敢當のこと、地域の人はどう話す？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "目的に応じた質問、聞き取り、記録と要約"
      },
      {
        "subject": "社会・総合",
        "grade": "",
        "unit": "地域の人との対話、情報モラル、文化の継承"
      }
    ]
  },
  "ishiganto-ep09": {
    "series": "石敢當",
    "title": "わたしの石敢當文化地図をつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "情報の整理、出典を示した文章表現"
      },
      {
        "subject": "社会・図画工作・総合",
        "grade": "",
        "unit": "地域文化、地図・記号・構成、探究成果の発信"
      },
      {
        "subject": "情報",
        "grade": "",
        "unit": "個人情報、同意、著作物の扱い"
      }
    ]
  },
  "hinukan-ep01": {
    "series": "ヒヌカン",
    "title": "火神さまは、いつ戻ってくる？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜4年",
        "unit": "日数の計算、暦の理解"
      },
      {
        "subject": "社会",
        "grade": "4年",
        "unit": "地域の年中行事を知る"
      }
    ]
  },
  "hinukan-ep02": {
    "series": "ヒヌカン",
    "title": "呼び方は、ひとつじゃない",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語句の意味、方言・地域のことばへの関心"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域によって異なる暮らしの文化を知る"
      }
    ]
  },
  "hinukan-ep03": {
    "series": "ヒヌカン",
    "title": "台所の音を聞いてみよう",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "音色・リズムを聞き分ける"
      },
      {
        "subject": "家庭科",
        "grade": "",
        "unit": "台所の仕事を知る"
      }
    ]
  },
  "hinukan-ep04": {
    "series": "ヒヌカン",
    "title": "大切な場所を整える",
    "subjects": [
      {
        "subject": "生活科",
        "grade": "",
        "unit": "整理整頓の習慣"
      },
      {
        "subject": "図画工作",
        "grade": "",
        "unit": "紙工作、丁寧な手の動き"
      }
    ]
  },
  "hinukan-ep05": {
    "series": "ヒヌカン",
    "title": "三つの石を観察しよう",
    "subjects": [
      {
        "subject": "理科・生活科",
        "grade": "3〜6年",
        "unit": "身近な道具の観察・比較"
      },
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "暮らしの道具の移り変わり"
      }
    ]
  },
  "hinukan-ep06": {
    "series": "ヒヌカン",
    "title": "小さな神さまは、いろんな場所にいる",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜6年",
        "unit": "地域社会の仕組み"
      }
    ]
  },
  "hinukan-ep07": {
    "series": "ヒヌカン",
    "title": "言葉づかいを、ちょっと振り返る",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "自分の言動を振り返り、より良い生き方を考える"
      },
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "意見文、自分の考えを言葉で表現する"
      }
    ]
  },
  "hinukan-ep08": {
    "series": "ヒヌカン",
    "title": "家族に聞いてみよう（無理はしない）",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "聞くこと・話すこと、開かれた質問のしかた"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "家庭と地域の暮らしの多様性"
      }
    ]
  },
  "hinukan-ep09": {
    "series": "ヒヌカン",
    "title": "わたしの『火と暮らし』ノートをつくろう",
    "subjects": [
      {
        "subject": "国語",
        "grade": "",
        "unit": "これまでの学びを整理し、自分のことばで表現する"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域や家庭による暮らしの違いを尊重する"
      },
      {
        "subject": "図画工作・総合",
        "grade": "",
        "unit": "ノート作り、探究成果の発信"
      }
    ]
  },
  "shioya-ungami-ep01": {
    "series": "塩屋湾ウンガミ",
    "title": "御願バーリー、勝つのはどっち？",
    "subjects": [
      {
        "subject": "算数",
        "grade": "3〜4年",
        "unit": "かけ算の複数段階、表と整理、不要な情報を見分ける力"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域行事"
      }
    ]
  },
  "shioya-ungami-ep02": {
    "series": "塩屋湾ウンガミ",
    "title": "ウンガミって、なんて呼ぶ？",
    "subjects": [
      {
        "subject": "国語",
        "grade": "3〜6年",
        "unit": "語彙、説明文、要約"
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域文化"
      }
    ]
  },
  "shioya-ungami-ep03": {
    "series": "塩屋湾ウンガミ",
    "title": "太鼓の音で、神様をお迎えする",
    "subjects": [
      {
        "subject": "音楽",
        "grade": "3〜6年",
        "unit": "リズム・音色"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "文化体験"
      }
    ]
  },
  "shioya-ungami-ep04": {
    "series": "塩屋湾ウンガミ",
    "title": "バーリーの舟を漕いでみよう",
    "subjects": [
      {
        "subject": "体育",
        "grade": "3〜6年",
        "unit": "身体表現・協力運動"
      },
      {
        "subject": "総合",
        "grade": "",
        "unit": "地域行事体験"
      }
    ]
  },
  "shioya-ungami-ep05": {
    "series": "塩屋湾ウンガミ",
    "title": "海の恵みと、豊漁の願い",
    "subjects": [
      {
        "subject": "理科・生活科的観察",
        "grade": "",
        "unit": ""
      },
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地域産業"
      }
    ]
  },
  "shioya-ungami-ep06": {
    "series": "塩屋湾ウンガミ",
    "title": "アサギから海まで、どう進む？",
    "subjects": [
      {
        "subject": "社会",
        "grade": "3〜4年",
        "unit": "地図・地域行事"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "順序を表す言葉"
      }
    ]
  },
  "shioya-ungami-ep07": {
    "series": "塩屋湾ウンガミ",
    "title": "見えないものに、感謝するってどういうこと？",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "感謝の気持ちについて考える"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "意見表現"
      }
    ]
  },
  "shioya-ungami-ep08": {
    "series": "塩屋湾ウンガミ",
    "title": "89年間、役目を守った人がいた",
    "subjects": [
      {
        "subject": "道徳",
        "grade": "",
        "unit": "人物の生き方について考える"
      },
      {
        "subject": "国語",
        "grade": "",
        "unit": "聞く・話す"
      },
      {
        "subject": "社会",
        "grade": "",
        "unit": "地域の歴史・人物"
      }
    ]
  },
  "shioya-ungami-ep09": {
    "series": "塩屋湾ウンガミ",
    "title": "わたしの海のまつり地図をつくろう",
    "subjects": [
      {
        "subject": "国語・社会・図工・情報・総合の横断的なまとめ活動",
        "grade": "",
        "unit": ""
      }
    ]
  }
}
);
