'use client';

import { useState, useEffect, useMemo } from 'react';
import { Post } from '@/lib/mdx-utils';

interface BlogSearchProps {
  posts: Post[];
  onFilteredPosts: (posts: Post[]) => void;
  placeholder?: string;
  className?: string;
}

export default function BlogSearch({ 
  posts, 
  onFilteredPosts, 
  placeholder = "記事を検索...", 
  className = '' 
}: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Memoized filtered posts
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return posts;
    }

    const term = searchTerm.toLowerCase().trim();
    return posts.filter(post => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(term);
      const excerptMatch = post.frontmatter.excerpt?.toLowerCase().includes(term) || false;
      const tagMatch = post.frontmatter.tags?.some(tag => 
        tag.toLowerCase().includes(term)
      ) || false;
      const authorMatch = post.frontmatter.author?.toLowerCase().includes(term) || false;
      
      return titleMatch || excerptMatch || tagMatch || authorMatch;
    });
  }, [posts, searchTerm]);

  // Update parent component when filtered posts change
  useEffect(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  // Simulate search delay for better UX
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={`${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isSearching ? (
            <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-gray-900 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        />
        
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="検索をクリア"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Summary */}
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p 
                className="text-gray-900 font-medium"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                「{searchTerm}」の検索結果: {filteredPosts.length}件
              </p>
              <p className="text-sm text-gray-500">
                {filteredPosts.length === 0 
                  ? '条件に一致する記事が見つかりませんでした' 
                  : `全${posts.length}件中${filteredPosts.length}件を表示`
                }
              </p>
            </div>
          </div>
          
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              検索をクリア
            </button>
          )}
        </div>
      )}

      {/* No Results Message */}
      {searchTerm && filteredPosts.length === 0 && (
        <div className="mt-8 text-center py-12 bg-gray-50 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 
            className="text-lg font-semibold text-gray-900 mb-2"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            検索結果が見つかりません
          </h3>
          <p 
            className="text-gray-600 mb-6 max-w-md mx-auto"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            別のキーワードで検索するか、下記の提案をお試しください
          </p>
          
          {/* Search Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {['CNC旋盤', '精密加工', '品質管理', 'ステンレス', '製造技術'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchTerm(suggestion)}
                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-colors"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}