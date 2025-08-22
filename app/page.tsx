import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPageContent, getSiteConfig, getAllPosts } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import { BentoGrid, BentoBox } from '@/components';
import { GlowButton } from '@/components';
import { OrganicBlob } from '@/components';
import { VideoBackground, ScrollAnimations, ParallaxElement, ProductShowcase } from '@/components';
import Link from 'next/link';

// Generate metadata for the home page
export async function generateMetadata() {
  try {
    const siteConfig = await getSiteConfig();
    const page = await getPageContent('home');
    
    return {
      title: page?.frontmatter.title || 'NC旋盤加工の限界を超える | Take Parts Factory',
      description: page?.frontmatter.description || siteConfig.siteDescription,
      openGraph: {
        title: page?.frontmatter.title || 'NC旋盤加工の限界を超える | Take Parts Factory',
        description: page?.frontmatter.description || siteConfig.siteDescription,
        type: 'website',
        locale: 'ja_JP',
        siteName: siteConfig.siteName,
      },
      twitter: {
        card: 'summary_large_image',
        title: page?.frontmatter.title || 'NC旋盤加工の限界を超える | Take Parts Factory',
        description: page?.frontmatter.description || siteConfig.siteDescription,
      },
      keywords: siteConfig.seo?.keywords || [],
    };
  } catch (error) {
    console.error('ホームページのメタデータ生成でエラーが発生しました:', error);
    return {
      title: 'NC旋盤加工の新たな可能性 | Take Parts Factory',
      description: '精密CNC旋盤加工による高品質部品製造',
    };
  }
}

export default async function Home() {
  try {
    const page = await getPageContent('home');
    const siteConfig = await getSiteConfig();
    const recentPosts = await getAllPosts();
    const latestPosts = recentPosts.slice(0, 3);

    return (
      <div className="min-h-screen">
        {/* Hero Section - Full-screen Solana-inspired */}
        <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-brand-dark-bg via-brand-dark-surface to-brand-black">
          {/* Video Background with Fallback */}
          <VideoBackground
            fallbackImage="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            overlayOpacity={0.6}
            className="absolute inset-0"
          >
            {/* Full-width organic blob decorations with parallax */}
            <ParallaxElement speed="slow" className="absolute inset-0 w-full h-full">
              <OrganicBlob 
                variant="primary" 
                animation="blob" 
                size="large"
                className="absolute top-10 -left-20 opacity-15 scale-150"
              />
            </ParallaxElement>
            
            <ParallaxElement speed="medium" className="absolute inset-0 w-full h-full">
              <OrganicBlob 
                variant="secondary" 
                animation="float" 
                size="large"
                className="absolute bottom-10 -right-20 opacity-20 scale-125"
              />
            </ParallaxElement>
            
            <ParallaxElement speed="fast" className="absolute inset-0 w-full h-full">
              <OrganicBlob 
                variant="accent" 
                animation="pulse" 
                size="medium"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 scale-200"
              />
            </ParallaxElement>

            {/* Full-screen hero content - centered and impactful */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ScrollAnimations animation="stagger" className="text-center w-full px-6 sm:px-12 lg:px-16">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 text-shadow-lg font-japanese leading-tight">
                  NC旋盤加工の限界を超える
                </h1>
                
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-16 leading-relaxed font-japanese max-w-4xl mx-auto">
                  精密技術と革新的なアプローチで、お客様の製造ニーズを実現します
                </p>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <GlowButton size="large" href="/contact" className="magnetic-btn font-japanese text-lg px-8 py-4">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    無料お見積り
                  </GlowButton>
                  
                  <GlowButton size="large" variant="secondary" href="/about" className="magnetic-btn font-japanese text-lg px-8 py-4">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    会社概要
                  </GlowButton>
                </div>
              </ScrollAnimations>
            </div>

            {/* Enhanced scroll indicator - positioned at bottom center */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="scroll-indicator" />
            </div>

            {/* Full-screen parallax decorative particles */}
            <ParallaxElement speed="slow" className="absolute inset-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 left-1/12 w-3 h-3 bg-white/15 rounded-full animate-pulse" />
              <div className="absolute top-3/4 right-1/12 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300" />
              <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-white/10 rounded-full animate-pulse delay-700" />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1000" />
              <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500" />
            </ParallaxElement>
          </VideoBackground>
        </section>

        {/* Company Strengths - Bento Grid */}
        <section className="py-24 bg-brand-dark-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimations animation="slide-up" className="text-center mb-16">
              <h2 className="text-fluid-2xl font-bold text-white mb-6 font-japanese solana-text-gradient">
                私たちの強み
              </h2>
              <p className="text-fluid-lg text-gray-300 max-w-3xl mx-auto font-japanese">
                長年の経験と最新技術で、お客様のニーズにお応えします
              </p>
            </ScrollAnimations>

            <ScrollAnimations animation="stagger">
              <BentoGrid gap={6}>
              <BentoBox
                size="large"
                title="難削材加工"
                description="ステンレス鋼、チタン、インコネルなど、加工困難な材料も高精度で対応"
                glowEffect
                animation="glow"
                solanaTheme
                className="bento-hover hover-3d solana-card"
                blob={{ show: true, variant: 'primary', animation: 'blob', size: 'medium' }}
              >
                <div className="mt-4">
                  <div className="flex items-center text-sm text-brand-blue font-japanese">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    公差±0.01mm達成
                  </div>
                </div>
              </BentoBox>

              <BentoBox
                size="medium"
                title="短納期対応"
                description="お急ぎの案件も最短3日で対応可能"
                solanaTheme
                className="bento-hover hover-3d solana-card"
              >
                <div className="mt-4">
                  <div className="text-2xl font-bold text-brand-green font-japanese">
                    最短3日
                  </div>
                </div>
              </BentoBox>

              <BentoBox
                size="medium"
                title="品質保証"
                description="ISO 9001:2015認証による徹底した品質管理"
                solanaTheme
                className="bento-hover hover-3d-reverse solana-card"
              >
                <div className="mt-4">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-brand-purple/20 text-brand-purple text-xs rounded-full font-japanese">
                      ISO 9001
                    </span>
                    <span className="px-2 py-1 bg-brand-blue/20 text-brand-blue text-xs rounded-full font-japanese">
                      ISO 14001
                    </span>
                  </div>
                </div>
              </BentoBox>

              <BentoBox
                size="wide"
                title="小ロット対応"
                description="プロトタイプから大量生産まで、柔軟な生産体制でお客様をサポート"
                solanaTheme
                className="bento-hover hover-3d solana-card"
                blob={{ show: true, variant: 'accent', animation: 'float', size: 'large' }}
              >
                <div className="mt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-brand-purple">1個〜</div>
                      <div className="text-xs text-gray-400 font-japanese">プロトタイプ</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-brand-blue">100個〜</div>
                      <div className="text-xs text-gray-400 font-japanese">小ロット</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-brand-green">10,000個〜</div>
                      <div className="text-xs text-gray-400 font-japanese">大量生産</div>
                    </div>
                  </div>
                </div>
              </BentoBox>

              <BentoBox
                size="medium"
                title="24時間見積り"
                description="迅速な対応でお客様の時間を大切にします"
                solanaTheme
                className="bento-hover hover-3d-reverse solana-card"
              >
                <div className="mt-4">
                  <div className="flex items-center text-sm text-brand-blue font-japanese">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    24時間以内回答
                  </div>
                </div>
              </BentoBox>

              <BentoBox
                size="small"
                title="技術サポート"
                description="設計段階からのアドバイス"
                solanaTheme
                className="bento-hover hover-3d solana-card"
              />
            </BentoGrid>
            </ScrollAnimations>
          </div>
        </section>

        {/* Product Showcase with Frame Animation */}
        <ProductShowcase />

        {/* Recent Blog Posts */}
        {latestPosts.length > 0 && (
          <section className="py-24 bg-brand-dark-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimations animation="slide-up" className="text-center mb-16">
                <h2 className="text-fluid-2xl font-bold text-white mb-6 font-japanese solana-text-gradient">
                  最新の技術情報
                </h2>
                <p className="text-fluid-lg text-gray-300 max-w-3xl mx-auto font-japanese">
                  製造技術の最新トレンドと実践的なノウハウをお届けします
                </p>
              </ScrollAnimations>

              <ScrollAnimations animation="stagger">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map((post, index) => (
                  <article 
                    key={post.slug} 
                    className="solana-card hover-3d zoom-on-hover group gpu-accelerated"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="p-6">
                        {post.frontmatter.thumbnail && (
                          <div className="mb-4 zoom-on-hover">
                            <img 
                              src={post.frontmatter.thumbnail} 
                              alt={post.frontmatter.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <time className="text-sm text-gray-400 font-japanese">
                            {new Date(post.frontmatter.date).toLocaleDateString('ja-JP')}
                          </time>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-400 font-japanese">
                            {post.readingTime}分で読める
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors duration-300 font-japanese">
                          {post.frontmatter.title}
                        </h3>

                        {post.frontmatter.excerpt && (
                          <p className="text-gray-300 line-clamp-3 font-japanese">
                            {post.frontmatter.excerpt}
                          </p>
                        )}

                        {post.frontmatter.tags && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-brand-purple/20 text-brand-purple text-xs rounded-full font-japanese"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
                </div>
              </ScrollAnimations>

              <ScrollAnimations animation="scale-in" delay={300} className="text-center mt-12">
                <GlowButton variant="secondary" href="/blog" size="large" className="magnetic-btn font-japanese">
                  技術情報をもっと見る
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </GlowButton>
              </ScrollAnimations>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-brand-purple to-brand-blue relative overflow-hidden">
          <ParallaxElement speed="medium" className="absolute inset-0">
            <OrganicBlob 
              variant="primary" 
              animation="blob" 
              size="large"
              className="absolute top-0 right-0 opacity-20"
            />
          </ParallaxElement>
          
          <ScrollAnimations animation="slide-up" className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-fluid-2xl font-bold text-white mb-6 font-japanese">
              お客様のニーズを形に
            </h2>
            <p className="text-fluid-lg text-blue-100 mb-8 font-japanese">
              図面をお送りいただければ、24時間以内にお見積りをご提示いたします
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlowButton size="large" variant="secondary" href="/contact" className="magnetic-btn font-japanese">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                無料お見積り依頼
              </GlowButton>
              
              <GlowButton size="large" variant="secondary" href={`tel:${siteConfig.contact?.phone || '+81-3-1234-5678'}`} className="magnetic-btn font-japanese">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                今すぐお電話
              </GlowButton>
            </div>
          </ScrollAnimations>
        </section>

        {/* MDX Content */}
        {page && (
          <section className="py-24 bg-brand-dark-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none prose-invert font-japanese scroll-animate">
                <MDXRemote 
                  source={page.content} 
                  components={MDXComponents}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('ホームページの表示でエラーが発生しました:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark-bg">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4 font-japanese">
            エラーが発生しました
          </h1>
          <p className="text-gray-300 mb-6 font-japanese">
            ホームページの読み込み中に問題が発生しました。しばらく時間をおいてから再度お試しください。
          </p>
          
          <GlowButton href="/" className="font-japanese">
            ページを再読み込み
          </GlowButton>
        </div>
      </div>
    );
  }
}
