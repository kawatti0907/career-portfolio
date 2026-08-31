// 動画URLは kaguyaサーバー + Cloudflare Tunnel のドメインが決まり次第、
// "PLACEHOLDER_VIDEO_URL_n" をここで一括置換する。
// tools は仮入力。実際に使ったソフト・機材に合わせて要修正。
// category: "work"（仕事） | "hobby"（趣味） で Works欄を分けて表示する。
const WORKS = [
  // 2026-09-01: 30.work/career-portfolio-content.md から転記。
  {
    title: "18祭 全国若者ドキュメント",
    role: "ディレクター",
    period: "取材～構成：１か月　撮影：１日　編集：１週間ほど",
    description: "18祭という番組の全国PR用ミニドキュメント。構成～完パケまで自走。画作りのためにDaVinciでのカラーグレーディングなども手がけました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_1",
    tools: ["DaVinci Resolve"],
    category: "work",
  },
  {
    title: "NEWSALES 聴き方講座",
    role: "編集",
    period: "編集：１週間",
    description: "YouTube番組の編集で参加。前任の担当者から引き継いだプロジェクトの分解/モーションのトレースなどから始めました",
    videoUrl: "PLACEHOLDER_VIDEO_URL_2",
    tools: ["PremierePro", "AfterEffects", "Figma"],
    category: "work",
  },
  {
    title: "Venue101 放送直後 MC感想動画",
    role: "撮影、編集",
    period: "生放送後の１時間",
    description: "Venue101という生放送後にSNSにアップする動画。撮影～アップまでを１時間程度で捌きます。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_3",
    tools: ["PremierePro", "Photoshop"],
    category: "work",
  },
  {
    title: "どうする家康 キャストインタビュー 山田孝之",
    role: "撮影、編集",
    period: "１週間",
    description: "ドラマのキャストインタビューで、撮影から担当。内容に合わせて効果的にドラマインサートを使用することを心掛けています。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_4",
    tools: ["PremierePro", "Photoshop"],
    category: "work",
  },
  {
    title: "どうする家康 キャストインタビュー 音尾琢真",
    role: "編集",
    period: "１週間",
    description: "音声のみのインタビューにインサート・メイキング映像を合わせてキャストインタビューとして完成させた動画。インタビューの画がないので、どういった画をのせてつなぎきるかを工夫しながら取り組みました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_5",
    tools: ["PremierePro", "Photoshop"],
    category: "work",
  },
  {
    title: "天才てれびくんgrow イマジネ道場",
    role: "ディレクター",
    period: "構成１か月、編集１か月",
    description: "これまで100本近く担当してきた「天才てれびくん」のデータ放送を活用したミニコーナー。子どもたちを飽きさせないデータ放送ゲームの工夫から企画のバリエーション出しまで、魂を削って制作してきたコンテンツです。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_6",
    tools: [],
    category: "work",
  },
  {
    title: "学ぶ君へ",
    role: "ディレクター",
    period: "構成１か月、編集２週間",
    description: "大河ドラマとのタイアップ番組。中のVTRのリサーチから台本作成、編集まで手がけました。完パケまでほとんどの編集を手掛けています。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_7",
    tools: ["PremierePro", "AfterEffects", "Photoshop"],
    category: "work",
  },
  {
    title: "豊臣兄弟! 全国展示会 インタビュー映像",
    role: "ディレクター",
    period: "構成から完パケまで２週間ほど",
    description: "大河ドラマの全国展示会の入り口に設置される主演キャストのインタビュー映像。現場のインタビューから編集まで担当しました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_8",
    tools: ["PremierePro", "Photoshop"],
    category: "work",
  },
  // 趣味カードはロール/期間を表示せず、説明とツールのみ（script.jsのworkCardHtml参照）。
  {
    title: "友人のライブ映像作成",
    description: "友人のジャズミュージシャンに頼まれて撮影から編集までを担当。これはイントロのティザー的映像ですが、この日のライブ全体の撮影・編集もし、ライブ映像としてのディレクションも担当しました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_9",
    tools: ["DaVinciResolve"],
    category: "hobby",
  },
  {
    title: "友人のウェディングムービー",
    description: "友人のウェディングムービーの制作を担当。画コンテの作成から始め、ロケ申請、撮影、編集、式場への納品まで。昔から知っている友人夫婦だからこそ、できるだけ映像の中に夫婦の関係性や歴史を演出として詰め込みました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_10",
    tools: ["DaVinciResolve"],
    category: "hobby",
  },
  {
    title: "友人のミニイベント撮影",
    description: "友人が自分のお店で開いたミニパーティーの様子を動画に撮影。お店の公式SNSで使用し、広報的に使えるような映像を目指しました。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_11",
    tools: ["DaVinciResolve"],
    category: "hobby",
  },
  // 他チャンネルにアップされたYouTube作品用のスロット。
  // youtubeId（動画IDのみ、例 "dQw4w9WgXcQ"）を入れると自動でカードが表示される。
  // null のままなら非表示。必要なだけコピーして増やしてよい。
  {
    title: "（後で記入）",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    youtubeId: null,
    tools: [],
    category: "work",
  },
  {
    title: "（後で記入）",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    youtubeId: null,
    tools: [],
    category: "work",
  },
];

// 名前の下に大きく表示するショーリール。
// D:\Dropbox\ポートフォリオ\ShowReel_2026.mp4
// 動画URLは kaguyaサーバー + Cloudflare Tunnel のドメインが決まり次第、置換する。
const SHOWREEL_URL = "PLACEHOLDER_SHOWREEL_URL";

const SKILLS = [
  {
    group: "ディレクション",
    items: ["企画立案", "構成台本執筆", "現場指揮", "仕上げ（完パケ）"],
  },
  {
    group: "映像編集",
    items: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  {
    group: "AI・自動化開発",
    items: ["LLMツール設計・実装", "音声認識", "生成AI活用", "業務自動化"],
  },
  {
    group: "その他",
    items: ["SNS運用（大型公式アカウント）", "PC自作"],
  },
];
