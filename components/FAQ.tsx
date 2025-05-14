"use client"

import { FAQSection } from "@/lib/types"
import { useMemo } from "react"

interface FAQProps {
  faq?: FAQSection
}

// 预定义一些好看的文字颜色
const textColors = [
  "text-blue-400",
  "text-purple-400",
  "text-green-400",
  "text-rose-400",
  "text-amber-400",
  "text-teal-400",
  "text-indigo-400",
  "text-cyan-400",
]

export default function FAQ({ faq }: FAQProps) {
  if (!faq?.items?.length) {
    return null
  }

  // 为每个问题分配一个随机文字颜色
  const questionColors = useMemo(() => {
    return faq.items.map(() => {
      const randomIndex = Math.floor(Math.random() * textColors.length)
      return textColors[randomIndex]
    })
  }, [faq.items.length])

  return (
    <div className="mt-4 lg:mt-8 bg-gray-900 rounded-xl p-4 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 text-center text-white">
        {faq.title || "常见问题"}
      </h2>
      <div className="space-y-3 lg:space-y-4">
        {faq.items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-4 lg:p-6 bg-gray-800/50"
          >
            <h3 className={`text-base lg:text-lg font-semibold mb-2 lg:mb-3 ${questionColors[index]}`}>
              {item.question}
            </h3>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gray-800/50 rounded-lg">
        <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-white">
          Still Have Questions?
        </h3>
        <p className="text-sm lg:text-base text-white/90 leading-relaxed">
          If you can't find the answer you need in our FAQ, please contact our community support team. Our dedicated staff is committed to ensuring every player gets the best gaming experience and will respond to your inquiries promptly.
        </p>
      </div>
    </div>
  )
}

