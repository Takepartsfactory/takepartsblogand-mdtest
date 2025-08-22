'use client';

import { useEffect } from 'react';
import { SocialShare, ReadingProgress, TableOfContents } from '@/components';

interface BlogPostClientProps {
  title: string;
  url: string;
  excerpt?: string;
  slug: string;
  readingTime: number;
  content: string;
}

export default function BlogPostClient({ 
  title, 
  url, 
  excerpt, 
  slug, 
  readingTime, 
  content 
}: BlogPostClientProps) {
  useEffect(() => {
    // Add any client-side JavaScript enhancements here
    // Such as scroll tracking, analytics events, etc.
    
    // Example: Track page view
    console.log(`Viewing blog post: ${title}`);
    
    // Example: Add scroll-based animations
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.dispatchEvent(new CustomEvent('scroll-progress', { detail: scrollPercent }));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [title]);

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress 
        estimatedReadingTime={readingTime}
        showPercentage
      />
      
      {/* Table of Contents */}
      <TableOfContents content={content} />
      
      {/* Social Share Section */}
      <SocialShare
        title={title}
        url={url}
        excerpt={excerpt}
      />
    </>
  );
}