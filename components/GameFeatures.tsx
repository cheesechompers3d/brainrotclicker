"use client"

import Image from "next/image"
import { GameFeature } from "@/lib/types"

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesSection {
  title?: string;
  image?: string;
  items: (string | FeatureItem)[];
}

interface GameFeaturesProps {
  features: FeaturesSection | null;
  characteristics: FeaturesSection | null;
}

export default function GameFeatures({ features, characteristics }: GameFeaturesProps) {
  if ((!features?.items?.length && !characteristics?.items?.length)) {
    return null
  }

  const parseFeatureItem = (item: string | FeatureItem): FeatureItem => {
    // 如果 item 是对象类型（包含 title 和 description）
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || '',
        description: item.description || ''
      }
    }
    
    // 如果 item 是字符串类型
    if (typeof item === 'string') {
      // 尝试用不同的分隔符分割
      const separators = [': ', ': ', '：']
      for (const separator of separators) {
        if (item.includes(separator)) {
          const [title, ...descParts] = item.split(separator)
          return {
            title: title.trim(),
            description: descParts.join(separator).trim()
          }
        }
      }
      // 如果没有找到分隔符，返回整个字符串作为标题
      return {
        title: item,
        description: ''
      }
    }

    // 如果是其他类型，返回空对象
    return {
      title: '',
      description: ''
    }
  }

  return (
    <div className="mt-4 lg:mt-8 space-y-8 lg:space-y-12">
      {/* Key Features Section */}
      {features?.items && features.items.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 rounded-xl p-4 lg:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* 左侧图片 */}
            <div className="lg:w-1/3 aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-indigo-800/30 to-purple-800/30 backdrop-blur-sm">
              {features?.image ? (
                <Image
                  src={features.image}
                  alt="Feature Image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-indigo-300/50">
                  Feature Image
                </div>
              )}
            </div>
            {/* 右侧内容 */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                {features.title || "Key Features"}
              </h2>
              <div className="grid gap-4">
                {features.items.map((item, index) => {
                  const feature = parseFeatureItem(item);
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-indigo-200 mb-1">{feature.title}</h3>
                        {feature.description && (
                          <p className="text-sm lg:text-base text-indigo-300/80">{feature.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Characteristics Section */}
      {characteristics?.items && characteristics.items.length > 0 && (
        <div className="bg-gradient-to-br from-cyan-900 via-teal-900 to-emerald-900 rounded-xl p-4 lg:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-8">
            {/* 右侧图片 */}
            <div className="lg:w-1/3 aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-cyan-800/30 to-teal-800/30 backdrop-blur-sm">
              {characteristics?.image ? (
                <Image
                  src={characteristics.image}
                  alt="Characteristics Image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-cyan-300/50">
                  Characteristics Image
                </div>
              )}
            </div>
            {/* 左侧内容 */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-teal-200">
                {characteristics.title || "Game Characteristics"}
              </h2>
              <div className="grid gap-4">
                {characteristics.items.map((item, index) => {
                  const characteristic = parseFeatureItem(item);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-cyan-800/20 to-teal-800/20 hover:from-cyan-800/30 hover:to-teal-800/30 transition-colors backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-cyan-200 mb-1">{characteristic.title}</h3>
                        {characteristic.description && (
                          <p className="text-sm lg:text-base text-cyan-300/80">{characteristic.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
