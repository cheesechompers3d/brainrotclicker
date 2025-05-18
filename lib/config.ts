import type { SiteConfig } from './types'

// 默认配置
export const defaultConfig: SiteConfig = {
  defaultGame: "brainrotclicker",
  siteName: "Brainrot Clicker",
  seo: {
    title: "Brainrot Clicker - Play Free Online Meme Clicker Game | Italian Brainrot",
    description: "Play Brainrot Clicker, the ultimate meme-based clicker game featuring Italian Brainrot characters! Click, upgrade, and unlock hilarious memes. Free online game, no download required.",
    ogImage: "/images/hot_game/brainrotclicker.jpg",
    keywords: "brainrot clicker, italian brainrot clicker, meme game, clicker game, online game"
  },
  advertisement: {
    key: ""
  },
  siteInfo: {
    companyName: "brainrotclicker",
    siteUrl: "https://www.brainrotclicker.pro",
    email: "HarryC199101@gmail.com"
  },
  footer: {
    columns: [
      {
        title: "Games",
        description: "",
        links: [
          {
            text: "More Games",
            url: "/more-games"
          }
        ]
      }
    ],
    copyright: "© 2025 All rights reserved.",
    disclaimer: "This is an independent website and is not affiliated with any organizations."
  }
} 

export function getSiteConfig(): SiteConfig {
  return defaultConfig
} 