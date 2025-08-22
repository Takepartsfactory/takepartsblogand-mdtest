'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Post, formatJapaneseDate } from '@/lib/mdx-utils';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({ post, featured = false, className = '' }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardClasses = `
    group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
    transition-all duration-500 ease-out transform hover:-translate-y-2
    ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
    ${className}
  `;

  return (
    <article 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Thumbnail Image with Gradient Overlay */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-video'}`}>
          {post.frontmatter.thumbnail && !imageError ? (
            <Image
              src={post.frontmatter.thumbnail}
              alt={post.frontmatter.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium">技術記事</p>
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
              約{post.readingTime}分で読めます
            </span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                注目記事
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontmatter.tags.slice(0, featured ? 4 : 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                >
                  {tag}
                </span>
              ))}
              {post.frontmatter.tags.length > (featured ? 4 : 3) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{post.frontmatter.tags.length - (featured ? 4 : 3)}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 
            className={`font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
            style={{ 
              fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
              display: '-webkit-box',
              WebkitLineClamp: featured ? 3 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {post.frontmatter.title}
          </h3>

          {/* Excerpt */}
          {post.frontmatter.excerpt && (
            <div className="relative mb-4">
              <p 
                className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-75'
                } ${featured ? 'text-base' : 'text-sm'}`}
                style={{ 
                  fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                  lineHeight: '1.7',
                  display: '-webkit-box',
                  WebkitLineClamp: featured ? 4 : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {post.frontmatter.excerpt}
              </p>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time 
                dateTime={post.frontmatter.date}
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {formatJapaneseDate(post.frontmatter.date)}
              </time>
            </div>
            
            {/* Read More Arrow */}
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="text-sm font-medium mr-2">続きを読む</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
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
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">
                    {post.frontmatter.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p 
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                  >
                    {post.frontmatter.author}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}