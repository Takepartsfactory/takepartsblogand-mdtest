'use client';

import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  baseUrl?: string;
  className?: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  postsPerPage,
  baseUrl = '/blog',
  className = ''
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Add ellipsis if needed
    if (currentPage - delta > 2) {
      pages.push('...');
    }
    
    // Add pages around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Add ellipsis if needed
    if (currentPage + delta < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  return (
    <div className={`${className}`}>
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-8">
        <p 
          className="text-sm text-gray-600"
          style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        >
          <span className="font-medium">{startPost}</span>
          ～
          <span className="font-medium">{endPost}</span>
          件目 （全
          <span className="font-medium">{totalPosts}</span>
          件中）
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span 
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            ページ {currentPage} / {totalPages}
          </span>
        </div>
      </div>

      {/* Pagination Navigation */}
      <nav className="flex items-center justify-center" aria-label="ページネーション">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          {currentPage > 1 ? (
            <Link
              href={getPageUrl(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              前へ
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              前へ
            </div>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-1 mx-4">
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;

              return (
                <Link
                  key={pageNumber}
                  href={getPageUrl(pageNumber)}
                  className={`
                    px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-blue-300'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </div>

          {/* Next Button */}
          {currentPage < totalPages ? (
            <Link
              href={getPageUrl(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              次へ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed">
              次へ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </nav>

      {/* Quick Jump (for large page counts) */}
      {totalPages > 10 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <span 
            className="text-sm text-gray-600"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            ページへ移動:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  const page = parseInt(target.value);
                  if (page >= 1 && page <= totalPages) {
                    window.location.href = getPageUrl(page);
                  }
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                const page = parseInt(input.value);
                if (page >= 1 && page <= totalPages) {
                  window.location.href = getPageUrl(page);
                }
              }}
              className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              移動
            </button>
          </div>
        </div>
      )}
    </div>
  );
}