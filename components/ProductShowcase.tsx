'use client'

import React from 'react'
import { FrameSequence, ScrollAnimations } from './ScrollAnimations'

interface ProductShowcaseProps {
  className?: string
}

/**
 * ProductShowcase - Sonos-inspired product reveal with frame sequence animation
 * 
 * Features:
 * - Scroll-triggered frame animation for product rotation
 * - Performance optimized with frame preloading
 * - Responsive design with mobile fallback
 * - Accessibility considerations
 */
export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  className = ''
}) => {
  // Example frame sequence for CNC lathe operation
  // In a real implementation, these would be actual image URLs
  const cncFrames = [
    '/images/frames/cnc-frame-001.jpg',
    '/images/frames/cnc-frame-002.jpg', 
    '/images/frames/cnc-frame-003.jpg',
    '/images/frames/cnc-frame-004.jpg',
    '/images/frames/cnc-frame-005.jpg',
    '/images/frames/cnc-frame-006.jpg',
    '/images/frames/cnc-frame-007.jpg',
    '/images/frames/cnc-frame-008.jpg',
    '/images/frames/cnc-frame-009.jpg',
    '/images/frames/cnc-frame-010.jpg',
    '/images/frames/cnc-frame-011.jpg',
    '/images/frames/cnc-frame-012.jpg',
    '/images/frames/cnc-frame-013.jpg',
    '/images/frames/cnc-frame-014.jpg',
    '/images/frames/cnc-frame-015.jpg',
    '/images/frames/cnc-frame-016.jpg',
    '/images/frames/cnc-frame-017.jpg',
    '/images/frames/cnc-frame-018.jpg',
    '/images/frames/cnc-frame-019.jpg',
    '/images/frames/cnc-frame-020.jpg'
  ]

  return (
    <section className={`py-24 bg-gray-900 text-white relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimations animation="slide-up" className="text-center mb-16">
          <h2 className="text-fluid-2xl font-bold mb-6 font-japanese">
            精密加工の技術力
          </h2>
          <p className="text-fluid-lg text-gray-300 max-w-3xl mx-auto font-japanese">
            スクロールしてNC旋盤の精密加工プロセスをご覧ください
          </p>
        </ScrollAnimations>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Frame Sequence Animation */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <FrameSequence
                frames={cncFrames}
                className="w-full h-full rounded-2xl shadow-2xl"
                triggerOffset={100}
              />
              
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
              
              {/* Frame counter indicator */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-lg px-3 py-2">
                <span className="text-sm font-mono text-white">
                  フレーム: スクロールで再生
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollAnimations animation="slide-up" delay={200} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-japanese">材料セットアップ</h3>
                  <p className="text-gray-300 font-japanese">
                    高精度チャックシステムによる材料の確実な固定
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-japanese">精密切削</h3>
                  <p className="text-gray-300 font-japanese">
                    プログラム制御による±0.01mmの高精度加工
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-japanese">品質検査</h3>
                  <p className="text-gray-300 font-japanese">
                    三次元測定機による全数検査と品質保証
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="magnetic-btn text-white px-8 py-4 rounded-xl font-japanese">
                加工技術の詳細を見る
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </ScrollAnimations>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-brand-red/3 rounded-full blur-2xl" />
    </section>
  )
}

export default ProductShowcase