// 動画URLは kaguyaサーバー + Cloudflare Tunnel のドメインが決まり次第、
// "PLACEHOLDER_VIDEO_URL_n" をここで一括置換する。
// tools は仮入力。実際に使ったソフト・機材に合わせて要修正。
// category: "work"（仕事） | "hobby"（趣味） で Works欄を分けて表示する。
const WORKS = [
  // 2026-09-01: D:\Dropbox\ポートフォリオ\サイト掲載用 から追加。
  // role / period / description / tools は未確認のため要記入。
  {
    title: "18祭 Vaundy",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_1",
    tools: [],
    category: "work",
  },
  {
    title: "NEWSALES 聴き方講座",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_2",
    tools: [],
    category: "work",
  },
  {
    title: "Venue101 放送直後 MC感想動画",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_3",
    tools: [],
    category: "work",
  },
  {
    title: "どうする家康 キャストインタビュー 山田孝之",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_4",
    tools: [],
    category: "work",
  },
  {
    title: "どうする家康 キャストインタビュー 音尾琢真",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_5",
    tools: [],
    category: "work",
  },
  {
    title: "天才てれびくんgrow イマジネ道場",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_6",
    tools: [],
    category: "work",
  },
  {
    title: "学ぶ君へ",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_7",
    tools: [],
    category: "work",
  },
  {
    title: "豊臣兄弟! 全国展示会 インタビュー映像",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_8",
    tools: [],
    category: "work",
  },
  {
    title: "DEPARTURE (Teaser)",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_9",
    tools: [],
    category: "hobby",
  },
  {
    title: "ウェディングムービー",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_10",
    tools: [],
    category: "hobby",
  },
  {
    title: "ミニイベント撮影",
    role: "（後で記入）",
    period: "（後で記入）",
    description: "（後で記入）",
    videoUrl: "PLACEHOLDER_VIDEO_URL_11",
    tools: [],
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
