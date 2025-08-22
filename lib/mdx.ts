import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

// Client-side compatibility check
const isServer = typeof window === 'undefined';

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
  description?: string;
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

// Content directories
const POSTS_PATH = path.join(process.cwd(), 'content/posts');
const PAGES_PATH = path.join(process.cwd(), 'content/pages');

/**
 * Calculate reading time in Japanese (assuming 400 characters per minute)
 */
function calculateReadingTime(content: string): number {
  const charactersPerMinute = 400;
  const characterCount = content.length;
  return Math.ceil(characterCount / charactersPerMinute);
}

/**
 * Format Japanese date from ISO string or date object
 */
export function formatJapaneseDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
}

/**
 * Get all blog posts sorted by date (most recent first)
 * Uses React cache for performance optimization
 */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  try {
    // Return empty array on client-side for now
    if (!isServer) {
      return [];
    }
    
    // Ensure posts directory exists
    if (!fs.existsSync(POSTS_PATH)) {
      console.warn('投稿ディレクトリが見つかりません:', POSTS_PATH);
      return [];
    }

    const files = fs.readdirSync(POSTS_PATH);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const posts = mdxFiles.map((file) => {
      try {
        const slug = file.replace(/\.mdx$/, '');
        const fullPath = path.join(POSTS_PATH, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const frontmatter = data as PostFrontmatter;
        
        // Skip unpublished posts
        if (frontmatter.published === false) {
          return null;
        }

        // Skip posts with invalid or missing dates
        if (!frontmatter.date) {
          console.warn(`投稿にdate フィールドがありません: ${file}`);
          return null;
        }

        // Validate date format
        const postDate = new Date(frontmatter.date);
        if (isNaN(postDate.getTime())) {
          console.warn(`無効な日付フォーマット: ${file} - ${frontmatter.date}`);
          return null;
        }

        return {
          slug,
          frontmatter,
          content,
          readingTime: calculateReadingTime(content)
        } as Post;
      } catch (error) {
        console.error(`投稿ファイルの処理エラー: ${file}`, error);
        return null;
      }
    }).filter(Boolean) as Post[];

    // Sort by date (most recent first) with safe date parsing
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      
      // Fallback for invalid dates
      const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
      const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
      
      return timeB - timeA;
    });

  } catch (error) {
    console.error('投稿の取得中にエラーが発生しました:', error);
    return [];
  }
});

/**
 * Get a single blog post by slug
 * Uses React cache for performance optimization
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    // Return null on client-side for now
    if (!isServer) {
      return null;
    }
    
    const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      console.warn('記事が見つかりません:', slug);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    // Check if post is published
    if (frontmatter.published === false) {
      return null;
    }

    return {
      slug,
      frontmatter,
      content,
      readingTime: calculateReadingTime(content)
    };

  } catch (error) {
    console.error('記事の取得中にエラーが発生しました:', error);
    return null;
  }
});

/**
 * Get page content by slug
 * Uses React cache for performance optimization
 */
export const getPageContent = cache(async (slug: string): Promise<Page | null> => {
  try {
    // Return null on client-side for now
    if (!isServer) {
      return null;
    }
    
    // Handle home page
    const pageSlug = slug === 'home' || slug === '' ? 'home' : slug;
    const fullPath = path.join(PAGES_PATH, `${pageSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      console.warn('ページが見つかりません:', pageSlug);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as PageFrontmatter;

    // Check if page is published
    if (frontmatter.published === false) {
      return null;
    }

    return {
      slug: pageSlug,
      frontmatter,
      content
    };

  } catch (error) {
    console.error('ページの取得中にエラーが発生しました:', error);
    return null;
  }
});

/**
 * Get posts filtered by tag
 * Uses React cache for performance optimization
 */
export const getPostsByTag = cache(async (tag: string): Promise<Post[]> => {
  try {
    // Return empty array on client-side for now
    if (!isServer) {
      return [];
    }
    
    const allPosts = await getAllPosts();
    return allPosts.filter(post => 
      post.frontmatter.tags?.includes(tag)
    );
  } catch (error) {
    console.error('タグ別投稿の取得中にエラーが発生しました:', error);
    return [];
  }
});

/**
 * Get all unique tags from all posts
 */
export const getAllTags = cache(async (): Promise<string[]> => {
  try {
    // Return empty array on client-side for now
    if (!isServer) {
      return [];
    }
    
    const allPosts = await getAllPosts();
    const tagSet = new Set<string>();
    
    allPosts.forEach(post => {
      post.frontmatter.tags?.forEach(tag => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
  } catch (error) {
    console.error('タグの取得中にエラーが発生しました:', error);
    return [];
  }
});

/**
 * Get related posts based on shared tags
 */
export const getRelatedPosts = cache(async (currentSlug: string, limit: number = 3): Promise<Post[]> => {
  try {
    // Return empty array on client-side for now
    if (!isServer) {
      return [];
    }
    
    const currentPost = await getPostBySlug(currentSlug);
    if (!currentPost || !currentPost.frontmatter.tags) {
      return [];
    }

    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
      .filter(post => post.slug !== currentSlug)
      .map(post => {
        const sharedTags = post.frontmatter.tags?.filter(tag => 
          currentPost.frontmatter.tags?.includes(tag)
        ) || [];
        return { post, relevance: sharedTags.length };
      })
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit)
      .map(item => item.post);

    return relatedPosts;
  } catch (error) {
    console.error('関連記事の取得中にエラーが発生しました:', error);
    return [];
  }
});

/**
 * Get site configuration
 */
export const getSiteConfig = cache(async () => {
  try {
    // Return default config on client-side
    if (!isServer) {
      return {
        siteName: 'Take Parts Factory',
        siteDescription: '日本の製造業・部品製造会社',
        language: 'ja',
        url: 'https://take-parts-factory.pages.dev'
      };
    }
    
    const configPath = path.join(process.cwd(), 'content/config.json');
    const configContents = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configContents);
  } catch (error) {
    console.error('サイト設定の取得中にエラーが発生しました:', error);
    return {
      siteName: 'Take Parts Factory',
      siteDescription: '日本の製造業・部品製造会社',
      language: 'ja'
    };
  }
});