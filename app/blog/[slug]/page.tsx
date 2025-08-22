import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { 
  getPostBySlug, 
  getAllPosts, 
  getRelatedPosts 
} from '@/lib/mdx';
import { formatJapaneseDate } from '@/lib/mdx-utils';
import MDXComponents from '@/components/MDXComponents';
import { SocialShare, RelatedPosts } from '@/components';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('静的パラメータの生成でエラーが発生しました:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: '記事が見つかりません | Take Parts Factory',
        description: 'お探しの記事は見つかりませんでした。',
      };
    }

    return {
      title: `${post.frontmatter.title} | Take Parts Factory`,
      description: post.frontmatter.excerpt || post.frontmatter.title,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt || post.frontmatter.title,
        type: 'article',
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author || 'Take Parts Factory'],
        images: post.frontmatter.thumbnail ? [
          {
            url: post.frontmatter.thumbnail,
            width: 1200,
            height: 630,
            alt: post.frontmatter.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt || post.frontmatter.title,
        images: post.frontmatter.thumbnail ? [post.frontmatter.thumbnail] : [],
      },
    };
  } catch (error) {
    console.error('メタデータ生成でエラーが発生しました:', error);
    return {
      title: 'エラー | Take Parts Factory',
      description: 'ページの読み込み中にエラーが発生しました。',
    };
  }
}

// Server-side rendered blog post component
async function BlogPostServer({ slug }: { slug: string }) {
  try {
    const [post, relatedPosts] = await Promise.all([
      getPostBySlug(slug),
      getRelatedPosts(slug, 6)
    ]);
    
    if (!post) {
      notFound();
    }

    const currentUrl = `https://take-parts-factory.pages.dev/blog/${slug}`;

    return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Breadcrumb Navigation */}
        <nav className="bg-gradient-to-r from-gray-50 to-gray-100 py-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 text-sm">
              <Link 
                href="/" 
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                ホーム
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link 
                href="/blog" 
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                技術情報
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span 
                className="text-gray-900 font-medium truncate max-w-xs"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                title={post.frontmatter.title}
              >
                {post.frontmatter.title}
              </span>
            </div>
          </div>
        </nav>

        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Article Header */}
          <header className="mb-16">
            {/* Hero Image */}
            {post.frontmatter.thumbnail && (
              <div className="relative aspect-[21/9] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={post.frontmatter.thumbnail}
                  alt={post.frontmatter.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        約{post.readingTime}分で読めます
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {post.frontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors group"
                      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                    >
                      <span className="w-2 h-2 bg-current rounded-full opacity-60 group-hover:opacity-80" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                {post.frontmatter.title}
              </h1>
              
              {/* Excerpt */}
              {post.frontmatter.excerpt && (
                <p 
                  className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12"
                  style={{ 
                    fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                    lineHeight: '1.8'
                  }}
                >
                  {post.frontmatter.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">投稿日</span>
                      <time 
                        dateTime={post.frontmatter.date}
                        className="block text-gray-900 font-semibold"
                        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                      >
                        {formatJapaneseDate(post.frontmatter.date)}
                      </time>
                    </div>
                  </div>
                  
                  {post.frontmatter.author && (
                    <>
                      <div className="w-px h-8 bg-gray-300" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {post.frontmatter.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">著者</span>
                          <div 
                            className="text-gray-900 font-semibold"
                            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                          >
                            {post.frontmatter.author}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">読了時間</span>
                      <div 
                        className="text-gray-900 font-semibold"
                        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
                      >
                        約{post.readingTime}分
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg prose-blue max-w-none"
              style={{ 
                fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                lineHeight: '1.8'
              }}
            >
              <MDXRemote 
                source={post.content} 
                components={MDXComponents}
              />
            </div>
          </div>

          {/* Enhanced Article Footer */}
          <footer className="max-w-4xl mx-auto mt-16 pt-12 space-y-12">
            {/* Social Share Section */}
            <BlogPostClient 
              title={post.frontmatter.title}
              url={currentUrl}
              excerpt={post.frontmatter.excerpt}
              slug={slug}
              readingTime={post.readingTime}
              content={post.content}
            />

            {/* Navigation */}
            <div className="flex items-center justify-center pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                技術情報一覧に戻る
              </Link>
            </div>
          </footer>
        </article>

        {/* Enhanced Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedPosts 
                posts={relatedPosts}
                currentPostSlug={slug}
                title="関連記事"
              />
            </div>
          </aside>
        )}
      </div>
    );
  } catch (error) {
    console.error('記事の読み込みエラー:', error);
    notFound();
  }
}

// Main exported component that handles SSG and client rendering
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostServer slug={params.slug} />;
}