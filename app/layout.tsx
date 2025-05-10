import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export const metadata: Metadata = {
  title: 'Brainrot Clicker',
  description: "Experience Brainrot Clicker, a mind-bending clicker game that challenges your reflexes and strategic thinking. With its addictive gameplay mechanics and deep progression system, it's perfect for both casual and hardcore players!",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-900 text-white">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

import './globals.css'
