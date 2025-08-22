'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BlogCard, TagFilter, BlogSearch, BlogPagination } from '@/components';
import { Post } from '@/lib/mdx-utils';

// Constants
const POSTS_PER_PAGE = 9; // 3x3 grid
const FEATURED_POSTS_COUNT = 2;

interface BlogPageClientProps {
  initialPosts: Post[];
  initialTags: string[];
}

export default function BlogPageClient({ initialPosts, initialTags }: BlogPageClientProps) {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [allTags, setAllTags] = useState(initialTags);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchFilteredPosts, setSearchFilteredPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postCounts, setPostCounts] = useState<Record<string, number>>({});

  // Calculate post counts on initial load
  useEffect(() => {
    const counts: Record<string, number> = {};
    initialTags.forEach(tag => {
      counts[tag] = initialPosts.filter(post => 
        post.frontmatter.tags?.includes(tag)
      ).length;
    });
    setPostCounts(counts);
  }, [initialPosts, initialTags]);

  // Handle URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    const page = parseInt(urlParams.get('page') || '1');
    
    setCurrentTag(tag);
    setCurrentPage(page);
    
    if (tag) {
      const tagFiltered = allPosts.filter(post => 
        post.frontmatter.tags?.includes(tag)
      );
      setFilteredPosts(tagFiltered);
      setSearchFilteredPosts(tagFiltered);
    } else {
      setFilteredPosts(allPosts);
      setSearchFilteredPosts(allPosts);
    }
  }, [allPosts]);

  // Handle search filtering
  const handleSearchFilter = useCallback((posts: Post[]) => {
    setSearchFilteredPosts(posts);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Calculate pagination
  const totalPosts = searchFilteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = searchFilteredPosts.slice(startIndex, endIndex);
  
  // Separate featured posts from regular posts
  const featuredPosts = currentPosts.slice(0, FEATURED_POSTS_COUNT);
  const regularPosts = currentPosts.slice(FEATURED_POSTS_COUNT);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Loading Header */}
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded-lg mb-4 mx-auto max-w-md"></div>
              <div className="h-6 bg-white/15 rounded-lg mx-auto max-w-lg"></div>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded-lg max-w-xs"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Page Header */}
      <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 30c0-9.9-8.1-18-18-18s-18 8.1-18 18 8.1 18 18 18 18-8.1 18-18z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            技術情報・ブログ
          </h1>
          <p 
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8"
            style={{ 
              fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
              lineHeight: '1.7'
            }}
          >
            CNC旋盤加工や精密部品製造に関する技術情報、最新のノウハウをお届けします
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalPosts}</div>
              <div className="text-sm">記事</div>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">{allTags.length}</div>
              <div className="text-sm">カテゴリ</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <BlogSearch
            posts={filteredPosts}
            onFilteredPosts={handleSearchFilter}
            className="max-w-2xl mx-auto"
          />
          
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <TagFilter
              tags={allTags}
              currentTag={currentTag || undefined}
              postCounts={postCounts}
            />
          )}
        </div>

        {/* Posts Content */}
        {searchFilteredPosts.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && currentPage === 1 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 
                    className="text-2xl font-bold text-gray-900"
                    style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                  >
                    注目記事
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} featured />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <section>
                {currentPage === 1 && featuredPosts.length > 0 && (
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                    >
                      最新記事
                    </h2>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(currentPage === 1 ? regularPosts : currentPosts).map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalPosts={totalPosts}
                postsPerPage={POSTS_PER_PAGE}
                className="mt-16"
              />
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                記事が見つかりません
              </h3>
              <p 
                className="text-gray-600 mb-8 leading-relaxed"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {currentTag 
                  ? `「${currentTag}」タグの記事は現在ありません。`
                  : '検索条件に一致する記事が見つかりませんでした。'
                }
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9" />
                </svg>
                すべての記事を見る
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}