"use client"

import { useState, useEffect } from "react"
import GameIframe from "./GameIframe"
import GameList from "./GameList"
import GameplayGuide from "./GameplayGuide"
import GameFeatures from "./GameFeatures"
import WhyPlayGame from "./WhyPlayGame"
import FAQ from "./FAQ"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useGames } from "@/hooks/useGames"
import { useRouter, usePathname } from "next/navigation"
import { Game } from "@/lib/games"

interface HomeProps {
  defaultGame: Game | null
}

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesSection {
  title?: string;
  image?: string;
  items: (FeatureItem | string)[];
}

interface GameFeature {
  title?: string;
  image?: string;
  items: string[];
}

export default function Home({ defaultGame }: HomeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { games, loading } = useGames()
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  useEffect(() => {
    if (defaultGame && !currentGame) {
      setCurrentGame(defaultGame.slug)
    }
  }, [defaultGame, currentGame])

  const handleGameSelect = (slug: string) => {
    if (slug === currentGame) return
    setCurrentGame(slug)
    router.push(`/${slug}`, { scroll: false })
  }

  const selectedGame = currentGame ? games?.find(game => game.slug === currentGame) : defaultGame

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar 
          isDarkMode={isDarkMode} 
          onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
          currentGameTitle={selectedGame?.title}
        />
        <main>
          <div className="flex flex-col lg:flex-row">
            {/* 左侧固定宽度空白区域 - 仅在桌面端显示 */}
            <div className="hidden lg:block w-[100px] flex-shrink-0">
              {/* 这里可以放置一些固定内容或保持空白 */}
            </div>

            {/* 中间内容区域 */}
            <div className="flex-1 p-4 lg:p-8">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : selectedGame ? (
                <>
                  {/* Title Section */}
                  <div className="text-center mb-4 lg:mb-8">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">{selectedGame.title}</h1>
                    <p className="text-base lg:text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-medium max-w-8xl mx-auto px-2 lg:px-4 py-1 lg:py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      {selectedGame.description}
                    </p>
                  </div>

                  <div className="w-full">
                    <GameIframe
                      game={selectedGame}
                      onGameSelect={handleGameSelect}
                      isDarkMode={isDarkMode}
                    />
                  </div>

                  {/* Features Section - 响应式间距 */}
                  {selectedGame.features?.items && selectedGame.features.items.length > 0 && (
                    <div id="features" className="mt-4 lg:mt-8">
                      <GameFeatures
                        features={selectedGame.features}
                        characteristics={null}
                      />
                    </div>
                  )}

                  {/* Characteristics Section */}
                  {selectedGame.characteristics?.items && selectedGame.characteristics.items.length > 0 && (
                    <div id="characteristics" className="mt-4 lg:mt-8">
                      <GameFeatures
                        features={null}
                        characteristics={selectedGame.characteristics}
                      />
                    </div>
                  )}

                  {/* How to Play Section */}
                  {selectedGame.howToPlayIntro && selectedGame.howToPlaySteps && selectedGame.howToPlaySteps.length > 0 && (
                    <div id="how-to-play" className="mt-4 lg:mt-8">
                      <GameplayGuide
                        intro={selectedGame.howToPlayIntro}
                        steps={selectedGame.howToPlaySteps}
                        videoUrls={selectedGame.videoUrls}
                      />
                    </div>
                  )}

                  {/* Why Play Section */}
                  {selectedGame.whyPlay?.items && selectedGame.whyPlay.items.length > 0 && (
                    <div id="why-play" className="mt-4 lg:mt-8">
                      <WhyPlayGame reasons={selectedGame.whyPlay} />
                    </div>
                  )}

                  {/* FAQ Section */}
                  {selectedGame.faq?.items && selectedGame.faq.items.length > 0 && (
                    <div id="faq" className="mt-4 lg:mt-8">
                      <FAQ faq={selectedGame.faq} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 lg:py-12">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">欢迎来到游戏门户</h1>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                    从列表中选择一个游戏开始玩
                  </p>
                </div>
              )}
            </div>

            {/* 右侧游戏列表 */}
            <div className="w-full lg:w-[320px] mt-4 lg:mt-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-800">
              <GameList
                games={games}
                currentGame={selectedGame?.slug}
                onGameSelect={handleGameSelect}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
} 