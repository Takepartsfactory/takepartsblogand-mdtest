import { getAllPosts, getAllTags } from '@/lib/mdx';
import BlogPageClient from './BlogPageClient';

// Generate metadata for the blog page
export const metadata = {
  title: '技術情報・ブログ | Take Parts Factory',
  description: 'CNC旋盤加工、精密部品製造に関する技術情報や最新のノウハウをお届けします。',
  openGraph: {
    title: '技術情報・ブログ | Take Parts Factory',
    description: 'CNC旋盤加工、精密部品製造に関する技術情報や最新のノウハウをお届けします。',
    type: 'website',
  },
};

// Main exported component - handles SSG and client rendering
export default async function BlogPage() {
  // Load data on the server side
  const [posts, tags] = await Promise.all([
    getAllPosts(),
    getAllTags()
  ]);

  return <BlogPageClient initialPosts={posts} initialTags={tags} />;
}