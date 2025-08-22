'use client';

import { useState, useEffect, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from content
  useEffect(() => {
    const headingRegex = /^(#{1,4})\s+(.+)$/gm;
    const headings: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      headings.push({ id, text, level });
    }

    setTocItems(headings);
  }, [content]);

  // Set up intersection observer for active heading detection
  useEffect(() => {
    if (tocItems.length === 0) return;

    const headingElements = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => 
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0
      }
    );

    headingElements.forEach(element => {
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocItems]);

  // Show/hide TOC based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div 
      className={`
        fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
        ${className}
      `}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-bold text-gray-900 flex items-center gap-2"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              目次
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg hover:bg-white/50 transition-colors"
              aria-label={isExpanded ? '目次を折りたたむ' : '目次を展開する'}
            >
              <svg 
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* TOC Items */}
        <div 
          className={`
            transition-all duration-300 overflow-hidden
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-2 max-h-96 overflow-y-auto custom-scrollbar">
            <nav>
              <ul className="space-y-1">
                {tocItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  const paddingLeft = `${(item.level - 1) * 1 + 1.5}rem`;
                  
                  return (
                    <li key={`${item.id}-${index}`}>
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={`
                          w-full text-left px-6 py-2 text-sm transition-all duration-200 relative
                          hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                          ${isActive 
                            ? 'text-blue-600 font-semibold bg-blue-50' 
                            : 'text-gray-700 hover:text-blue-600'
                          }
                        `}
                        style={{ 
                          fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                          paddingLeft 
                        }}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                        )}
                        
                        {/* Level indicator dot */}
                        <span 
                          className={`
                            inline-block w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0
                            ${isActive ? 'bg-blue-600' : 'bg-gray-300'}
                          `}
                        />
                        
                        {/* Heading text */}
                        <span className="leading-relaxed">
                          {item.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Footer with scroll to top */}
        {isExpanded && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/80">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full text-center text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              ページトップへ
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}