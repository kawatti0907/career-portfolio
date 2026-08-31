// 動画URLは kaguyaサーバー + Cloudflare Tunnel のドメインが決まり次第、
// "PLACEHOLDER_VIDEO_URL_n" をここで一括置換する。
// tools は仮入力。実際に使ったソフト・機材に合わせて要修正。
const WORKS = [
  {
    title: "天才てれびくん レギュラーコーナー",
    role: "ディレクター",
    period: "2024年〜現在",
    description: "週3本OA・1本4分を年間17週分担当。企画立案から構成台本、現場指揮、仕上げまでを一気通貫で担当。新シリーズ立ち上げにも参画し、世界観・ビジュアル設計を協働。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_1",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    title: "18祭 若者ドキュメント",
    role: "ディレクター",
    period: "入社3年目・約3ヶ月",
    description: "取材から完パケまで約3ヶ月、3本を担当。ドキュメンタリー演出を経験。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_2",
    tools: ["Premiere Pro"],
  },
  {
    title: "NHKラーニング「まなぼう」",
    role: "AD → ディレクター",
    period: "入社3年目",
    description: "最終回を単独ディレクターとして担当（15分・自身最長尺）。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_3",
    tools: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    title: "大河ドラマ キャストインタビュー",
    role: "編集",
    period: "入社1年目",
    description: "入社直後から約10本を担当。ドラマ本編の画も活かした構成。",
    videoUrl: "PLACEHOLDER_VIDEO_URL_4",
    tools: ["Premiere Pro"],
  },
];

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/UCqZjE17h5h0xXYB8KtWr5fg";

const YOUTUBE_VIDEOS = [
  {
    title: "【FiiO K7】オーディオ沼に足を突っ込んだら世界が変わった話【AFUL Performer 5+2】",
    videoId: "tPB4_TXkYqY",
  },
  {
    title: "スマートウォッチ、高いのと安いので何が違う？実生活で検証してみた",
    videoId: "YSXyXtqxX-4",
  },
  {
    title: "【レビュー】自分が引くとは思わなかったぜ...【Bose QuietConfort Ultra Earbuds】",
    videoId: "K_26W9KV3FM",
  },
  {
    title: "【Osmo】電源オフ中にバッテリーが減りすぎる件について【Action 5 Pro】",
    videoId: "0Z1S8dEj9bY",
  },
];

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
