"use client"

import Image from "next/image"
import { Game } from "@/lib/types"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

interface GameListProps {
  games?: Game[]
  currentGame: string | undefined | null
  onGameSelect: (slug: string) => void
  isDarkMode: boolean
}

export default function GameList({
  games = [],
  currentGame,
  onGameSelect,
  isDarkMode,
}: GameListProps) {
  const router = useRouter()

  const renderAdSlot = (index: number) => (
    <div 
      key={`ad-${index}`} 
      className="col-span-2 h-[80px] lg:h-[120px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 my-1 lg:my-2"
    >
      Ad Slot {index + 1}
    </div>
  )

  const handleGameClick = (slug: string) => {
    onGameSelect(slug)
    // 更新 URL
    router.push(`/${slug}`)
    // 使用平滑滚动到游戏 iframe 区域
    const gameFrame = document.getElementById('game-frame')
    if (gameFrame) {
      gameFrame.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderGameItems = (): ReactNode[] => {
    const items: ReactNode[] = []
    games.forEach((game, index) => {
      items.push(
        <div
          key={game.slug}
          className={`cursor-pointer transition-transform duration-300 hover:scale-105 ${
            currentGame === game.slug ? "ring-2 ring-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleGameClick(game.slug)}
        >
          <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
            <Image
              src={game.icon}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={index < 4}
            />
          </div>
          <h3 className="text-sm font-medium text-center truncate px-1">
            {game.title}
          </h3>
        </div>
      )

      // 每4个游戏（2行）后添加广告位
      if ((index + 1) % 4 === 0) {
        items.push(renderAdSlot(Math.floor(index / 4)))
      }
    })
    return items
  }

  return (
    <div>
      <div className="py-4 px-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Hot Games</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 px-2">
        {renderGameItems()}
      </div>
    </div>
  )
} 