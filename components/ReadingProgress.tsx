'use client';

import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  className?: string;
  showPercentage?: boolean;
  estimatedReadingTime?: number;
}

export default function ReadingProgress({ 
  className = '', 
  showPercentage = false,
  estimatedReadingTime 
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100);

      // Calculate remaining reading time
      if (estimatedReadingTime) {
        const remaining = estimatedReadingTime * (1 - scrollPercent / 100);
        setRemainingTime(Math.max(0, remaining));
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, [estimatedReadingTime]);

  if (!isVisible) return null;

  return (
    <>
      {/* Progress Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 ${className}`}
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Circle with Details */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="relative">
          {/* Progress Circle */}
          <div className="w-16 h-16">
            <svg 
              className="w-full h-full transform -rotate-90" 
              viewBox="0 0 36 36"
            >
              {/* Background Circle */}
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress Circle */}
              <path
                className="text-blue-600"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-xs font-bold text-gray-700"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Tooltip with Reading Time */}
          {remainingTime !== null && (
            <div className="absolute left-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 min-w-max">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span 
                    className="text-gray-700 font-medium"
                    style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                  >
                    {remainingTime > 1 
                      ? `あと約${Math.ceil(remainingTime)}分` 
                      : '読了まであと少し'
                    }
                  </span>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white border-l border-b border-gray-200 rotate-45" />
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {progress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300 group"
          aria-label="ページトップへ戻る"
        >
          <svg 
            className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      )}

      {/* Progress Details for Mobile */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span 
                className="text-gray-700 font-medium"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {Math.round(progress)}%
              </span>
            </div>
            {remainingTime !== null && (
              <>
                <div className="w-px h-4 bg-gray-300" />
                <span 
                  className="text-gray-600"
                  style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                >
                  {remainingTime > 1 
                    ? `約${Math.ceil(remainingTime)}分` 
                    : 'もうすぐ'
                  }
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}