import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPageContent, getAllPosts } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';

// Generate static params for all pages
export async function generateStaticParams() {
  try {
    // Define static pages that should be generated
    const staticPages = [
      'about',
      'services', 
      'products',
      'contact'
    ];

    return staticPages.map((slug) => ({
      slug: slug,
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
    const page = await getPageContent(params.slug);
    
    if (!page) {
      return {
        title: 'ページが見つかりません | Take Parts Factory',
        description: 'お探しのページは見つかりませんでした。',
      };
    }

    return {
      title: `${page.frontmatter.title} | Take Parts Factory`,
      description: page.frontmatter.description || page.frontmatter.title,
      openGraph: {
        title: page.frontmatter.title,
        description: page.frontmatter.description || page.frontmatter.title,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: page.frontmatter.title,
        description: page.frontmatter.description || page.frontmatter.title,
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

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const page = await getPageContent(params.slug);
    
    if (!page) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              {page.frontmatter.title}
            </h1>
            
            {page.frontmatter.description && (
              <p 
                className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
                style={{ 
                  fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
                  lineHeight: '1.7'
                }}
              >
                {page.frontmatter.description}
              </p>
            )}
          </header>

          {/* Page Content */}
          <div 
            className="prose prose-lg max-w-none"
            style={{ 
              fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif'
            }}
          >
            <MDXRemote 
              source={page.content} 
              components={MDXComponents}
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('ページの表示でエラーが発生しました:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            エラーが発生しました
          </h1>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            ページの読み込み中に問題が発生しました。
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    );
  }
}