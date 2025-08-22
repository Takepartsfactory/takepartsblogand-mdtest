'use client';

import React, { useState, useEffect } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonalTheme {
  name: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  pattern: string;
  message: string;
  decorativeElements: string[];
}

interface SeasonalDecorationsProps {
  variant?: 'subtle' | 'prominent' | 'header' | 'footer';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  showMessage?: boolean;
  className?: string;
}

const SeasonalDecorations: React.FC<SeasonalDecorationsProps> = ({
  variant = 'subtle',
  position = 'top-right',
  showMessage = false,
  className = ''
}) => {
  const [currentSeason, setCurrentSeason] = useState<Season>('spring');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Determine current season based on month
    const month = new Date().getMonth(); // 0-11
    let season: Season;
    
    if (month >= 2 && month <= 4) {
      season = 'spring'; // March, April, May
    } else if (month >= 5 && month <= 7) {
      season = 'summer'; // June, July, August
    } else if (month >= 8 && month <= 10) {
      season = 'autumn'; // September, October, November
    } else {
      season = 'winter'; // December, January, February
    }
    
    setCurrentSeason(season);
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const seasonalThemes: Record<Season, SeasonalTheme> = {
    spring: {
      name: '春',
      emoji: '🌸',
      colors: {
        primary: '#FFB7C5', // Light pink
        secondary: '#FF69B4', // Hot pink
        accent: '#98FB98'     // Pale green
      },
      pattern: 'radial-gradient(circle at 20% 80%, rgba(255, 183, 197, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(152, 251, 152, 0.1) 0%, transparent 50%)',
      message: '新しい季節、新しい技術で皆様をサポートいたします',
      decorativeElements: ['🌸', '🌿', '🦋', '🌱']
    },
    summer: {
      name: '夏',
      emoji: '🌻',
      colors: {
        primary: '#FFD700', // Gold
        secondary: '#FF6347', // Tomato
        accent: '#00CED1'     // Dark turquoise
      },
      pattern: 'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 206, 209, 0.1) 0%, transparent 50%)',
      message: '暑い夏も変わらぬ品質でお応えいたします',
      decorativeElements: ['🌻', '☀️', '🌊', '🍃']
    },
    autumn: {
      name: '秋',
      emoji: '🍁',
      colors: {
        primary: '#FF8C00', // Dark orange
        secondary: '#DC143C', // Crimson
        accent: '#DAA520'     // Goldenrod
      },
      pattern: 'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
      message: '実りの秋、お客様との実り多い関係を築いてまいります',
      decorativeElements: ['🍁', '🍂', '🌰', '🎃']
    },
    winter: {
      name: '冬',
      emoji: '❄️',
      colors: {
        primary: '#87CEEB', // Sky blue
        secondary: '#4682B4', // Steel blue
        accent: '#E6E6FA'     // Lavender
      },
      pattern: 'radial-gradient(circle at 20% 80%, rgba(135, 206, 235, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(230, 230, 250, 0.1) 0%, transparent 50%)',
      message: '寒い冬も温かいサービスでお客様をお迎えいたします',
      decorativeElements: ['❄️', '⭐', '🌟', '❅']
    }
  };

  const currentTheme = seasonalThemes[currentSeason];

  const getPositionClasses = () => {
    const baseClasses = 'absolute pointer-events-none';
    switch (position) {
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      case 'top-right':
        return `${baseClasses} top-4 right-4`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`;
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`;
      case 'center':
        return `${baseClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      default:
        return `${baseClasses} top-4 right-4`;
    }
  };

  const renderSubtle = () => (
    <div className={`${getPositionClasses()} ${className}`}>
      <div 
        className={`seasonal-${currentSeason} transition-all duration-1000 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
      >
        <span className="text-2xl animate-pulse">{currentTheme.emoji}</span>
      </div>
    </div>
  );

  const renderProminent = () => (
    <div className={`${getPositionClasses()} ${className}`}>
      <div 
        className={`bg-white rounded-lg shadow-lg p-4 border-l-4 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ 
          borderLeftColor: currentTheme.colors.primary,
          background: currentTheme.pattern
        }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{currentTheme.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-900 font-japanese">
              {currentTheme.name}の季節
            </h3>
            {showMessage && (
              <p className="text-sm text-gray-600 font-japanese mt-1">
                {currentTheme.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-end space-x-1 mt-2 opacity-60">
          {currentTheme.decorativeElements.slice(1, 4).map((element, index) => (
            <span 
              key={index} 
              className="text-sm animate-bounce" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {element}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className={`w-full h-2 ${className}`}>
      <div 
        className={`w-full h-full transition-all duration-1000 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          background: `linear-gradient(90deg, ${currentTheme.colors.primary}20, ${currentTheme.colors.secondary}20, ${currentTheme.colors.accent}20)`
        }}
      />
      <div className="relative">
        <div className="absolute right-4 -top-6 flex space-x-2">
          {currentTheme.decorativeElements.map((element, index) => (
            <span 
              key={index}
              className={`text-lg transition-all duration-1000 ${showAnimation ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ 
                animationDelay: `${index * 0.5}s`,
                animation: showAnimation ? 'float 3s ease-in-out infinite' : undefined
              }}
            >
              {element}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className={`w-full ${className}`}>
      <div 
        className="w-full py-4 text-center"
        style={{ 
          background: currentTheme.pattern,
          borderTop: `2px solid ${currentTheme.colors.primary}40`
        }}
      >
        <div className={`flex items-center justify-center space-x-4 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-2xl">{currentTheme.emoji}</span>
          <p className="text-sm text-gray-600 font-japanese">
            {currentTheme.message}
          </p>
          <div className="flex space-x-1">
            {currentTheme.decorativeElements.slice(1, 3).map((element, index) => (
              <span 
                key={index}
                className="text-sm opacity-60"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${index * 0.7}s`
                }}
              >
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Special holiday decorations
  const getHolidayDecorations = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // New Year (January 1-7)
    if (month === 0 && day <= 7) {
      return {
        emoji: '🎍',
        message: '新年明けましておめでとうございます。本年もよろしくお願いいたします。',
        elements: ['🎍', '🎊', '✨', '🌅']
      };
    }
    
    // Golden Week (April 29 - May 5)
    if ((month === 3 && day >= 29) || (month === 4 && day <= 5)) {
      return {
        emoji: '🎏',
        message: 'ゴールデンウィーク期間中もお気軽にお問い合わせください。',
        elements: ['🎏', '🌸', '🌿', '🎌']
      };
    }
    
    // Obon (August 13-16)
    if (month === 7 && day >= 13 && day <= 16) {
      return {
        emoji: '🏮',
        message: 'お盆期間中の営業についてはお問い合わせください。',
        elements: ['🏮', '🌟', '👻', '🕯️']
      };
    }
    
    // Year End (December 28-31)
    if (month === 11 && day >= 28) {
      return {
        emoji: '🎌',
        message: '年末のご挨拶とともに、来年もよろしくお願いいたします。',
        elements: ['🎌', '⭐', '🎊', '✨']
      };
    }
    
    return null;
  };

  const holidayDecor = getHolidayDecorations();

  if (holidayDecor) {
    // Override with holiday decorations
    const modifiedTheme = {
      ...currentTheme,
      emoji: holidayDecor.emoji,
      message: holidayDecor.message,
      decorativeElements: holidayDecor.elements
    };
    
    switch (variant) {
      case 'subtle':
        return renderSubtle();
      case 'prominent':
        return (
          <div className={`${getPositionClasses()} ${className}`}>
            <div 
              className={`bg-white rounded-lg shadow-lg p-4 border-l-4 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ 
                borderLeftColor: currentTheme.colors.primary,
                background: currentTheme.pattern
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{modifiedTheme.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 font-japanese">
                    特別なお知らせ
                  </h3>
                  <p className="text-sm text-gray-600 font-japanese mt-1">
                    {modifiedTheme.message}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-1 mt-2 opacity-60">
                {modifiedTheme.decorativeElements.slice(1, 4).map((element, index) => (
                  <span 
                    key={index} 
                    className="text-sm animate-bounce" 
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'header':
        return renderHeader();
      case 'footer':
        return renderFooter();
      default:
        return renderSubtle();
    }
  }

  // Regular seasonal decorations
  switch (variant) {
    case 'subtle':
      return renderSubtle();
    case 'prominent':
      return renderProminent();
    case 'header':
      return renderHeader();
    case 'footer':
      return renderFooter();
    default:
      return renderSubtle();
  }
};

export default SeasonalDecorations;