// Client-safe MDX utilities
// This file contains only utilities that can be used in both server and client components

// TypeScript types for content structure
export interface PostFrontmatter {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  thumbnail?: string;
  author?: string;
  published?: boolean;
}

export interface PageFrontmatter {
  title: string;
  date?: string;
  excerpt?: string;
  published?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

export interface Page {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

export interface SiteConfig {
  company?: {
    name: string;
    nameJa: string;
    establishedYear: string;
    employees: string;
    certification: string[];
    specialties: string[];
  };
  contact?: {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  navigation?: Array<{
    name: string;
    href: string;
  }>;
}

// Utility function for formatting Japanese dates
export function formatJapaneseDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];
  
  return `${year}年${month}月${day}日（${weekday}）`;
}

// Reading time calculation
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed for Japanese
  const words = content.length / 2; // Rough estimation for Japanese characters
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Slug generation utility
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
}

// Content excerpt generation
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax and HTML tags
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

// Tag normalization
export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

// Sort posts by date (newest first)
export function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

// Filter posts by tag
export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(post => 
    post.frontmatter.tags?.some(postTag => 
      normalizeTag(postTag) === normalizeTag(tag)
    )
  );
}

// Search posts by title and content
export function searchPosts(posts: Post[], query: string): Post[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.frontmatter.title.toLowerCase().includes(lowercaseQuery) ||
    post.frontmatter.excerpt?.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get unique tags from posts
export function extractTagsFromPosts(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => {
      tagSet.add(tag);
    });
  });
  return Array.from(tagSet).sort();
}

// Get related posts based on tags
export function getRelatedPostsByTags(posts: Post[], currentPost: Post, limit: number = 6): Post[] {
  if (!currentPost.frontmatter.tags || currentPost.frontmatter.tags.length === 0) {
    return posts
      .filter(post => post.slug !== currentPost.slug)
      .slice(0, limit);
  }

  const relatedPosts = posts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const commonTags = post.frontmatter.tags?.filter(tag => 
        currentPost.frontmatter.tags?.includes(tag)
      ) || [];
      return {
        post,
        relevance: commonTags.length
      };
    })
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .map(item => item.post);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = posts
      .filter(post => 
        post.slug !== currentPost.slug && 
        !relatedPosts.some(rp => rp.slug === post.slug)
      )
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...recentPosts];
  }

  return relatedPosts.slice(0, limit);
}