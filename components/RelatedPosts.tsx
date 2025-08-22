'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Post, formatJapaneseDate } from '@/lib/mdx-utils';

interface RelatedPostsProps {
  posts: Post[];
  currentPostSlug?: string;
  title?: string;
  className?: string;
}

export default function RelatedPosts({ 
  posts, 
  currentPostSlug, 
  title = "関連記事", 
  className = '' 
}: RelatedPostsProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Filter out current post if provided
  const filteredPosts = posts.filter(post => post.slug !== currentPostSlug);

  if (filteredPosts.length === 0) return null;

  const handleImageError = (slug: string) => {
    setImageErrors(prev => ({ ...prev, [slug]: true }));
  };

  return (
    <section className={`${className}`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            {title}
          </h2>
        </div>
        <p 
          className="text-gray-600 max-w-2xl mx-auto"
          style={{ 
            fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
            lineHeight: '1.7'
          }}
        >
          このトピックに関連する他の記事もご覧ください
        </p>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto" />
      </div>

      {/* Related Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(0, 6).map((post, index) => (
          <article
            key={post.slug}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                {post.frontmatter.thumbnail && !imageErrors[post.slug] ? (
                  <Image
                    src={post.frontmatter.thumbnail}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(post.slug)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-gray-500 text-center p-4">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">技術記事</p>
                    </div>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Reading Time Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                    約{post.readingTime}分
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.frontmatter.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {post.frontmatter.tags.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        +{post.frontmatter.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Title */}
                <h3 
                  className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300"
                  style={{ 
                    fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.frontmatter.title}
                </h3>

                {/* Excerpt */}
                {post.frontmatter.excerpt && (
                  <p 
                    className="text-gray-600 text-sm mb-4 leading-relaxed"
                    style={{ 
                      fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {post.frontmatter.excerpt}
                  </p>
                )}

                {/* Meta and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <time 
                    dateTime={post.frontmatter.date}
                    className="text-xs text-gray-500"
                    style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                  >
                    {formatJapaneseDate(post.frontmatter.date)}
                  </time>
                  
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-xs font-medium mr-1">読む</span>
                    <svg 
                      className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Author */}
                {post.frontmatter.author && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">
                          {post.frontmatter.author.charAt(0)}
                        </span>
                      </div>
                      <span 
                        className="text-xs text-gray-600"
                        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                      >
                        {post.frontmatter.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View All Link */}
      {filteredPosts.length > 6 && (
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            すべての技術記事を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}