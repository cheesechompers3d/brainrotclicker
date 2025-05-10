import { Metadata } from 'next'
import Home from '@/components/Home'
import { getGameBySlug } from '@/lib/games'

interface PageProps {
  params: { slug?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Brainrot Clicker',
    description: 'Play Brainrot Clicker - The Ultimate Idle Game Experience'
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const defaultGame = await getGameBySlug('brainrotclicker')
  return <Home defaultGame={defaultGame} />
}

