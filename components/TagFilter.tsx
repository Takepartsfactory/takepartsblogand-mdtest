'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface TagFilterProps {
  tags: string[];
  currentTag?: string;
  postCounts?: Record<string, number>;
  className?: string;
}

export default function TagFilter({ tags, currentTag, postCounts = {}, className = '' }: TagFilterProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [tags]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (tags.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        >
          タグで絞り込み
        </h2>
        <div className="text-sm text-gray-500">
          {currentTag ? `${postCounts[currentTag] || 0}件の記事` : `全${Object.values(postCounts).reduce((a, b) => a + b, 0)}件`}
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
            aria-label="左にスクロール"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
            aria-label="右にスクロール"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Tags Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* All Posts Tag */}
          <Link
            href="/blog"
            className={`flex-shrink-0 group relative`}
          >
            <div
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${!currentTag 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                }
              `}
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                すべて
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  !currentTag ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {Object.values(postCounts).reduce((a, b) => a + b, 0)}
                </span>
              </span>
            </div>
            {!currentTag && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-20 blur-xl scale-110 -z-10 animate-pulse" />
            )}
          </Link>

          {/* Individual Tags */}
          {tags.map((tag) => {
            const isActive = currentTag === tag;
            const count = postCounts[tag] || 0;
            
            return (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="flex-shrink-0 group relative"
              >
                <div
                  className={`
                    px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:scale-102'
                    }
                  `}
                  style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                    {tag}
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {count}
                    </span>
                  </span>
                </div>
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-20 blur-xl scale-110 -z-10 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Gradient Fade Effects */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Active Filter Display */}
      {currentTag && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p 
                  className="text-blue-800 font-medium"
                  style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                >
                  「{currentTag}」タグの記事を表示中 ({postCounts[currentTag] || 0}件)
                </p>
                <p className="text-blue-600 text-sm">下記の記事がフィルタリングされています</p>
              </div>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              フィルタを解除
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}