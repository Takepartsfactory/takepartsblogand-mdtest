import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/mdx";

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: 'swap',
  preload: true,
  fallback: ['Yu Gothic', 'Hiragino Sans', 'MS PGothic', 'system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-noto-sans-jp'
});

// Static metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://take-parts-factory.pages.dev'),
  title: {
    default: 'Take Parts Factory - 精密CNC旋盤加工による高品質部品製造',
    template: '%s | Take Parts Factory'
  },
  description: '日本の製造技術を活かし、CNC旋盤加工による精密部品製造を行っています。プロトタイプから大量生産まで、お客様のニーズにお応えします。',
  keywords: ['CNC旋盤', '精密加工', '部品製造', '金属加工', '製造業', '日本製', '高品質', 'プロトタイプ'],
  authors: [{ name: 'Take Parts Factory' }],
  creator: 'Take Parts Factory',
  publisher: 'Take Parts Factory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://take-parts-factory.pages.dev',
    siteName: 'Take Parts Factory',
    title: 'Take Parts Factory - 精密CNC旋盤加工による高品質部品製造',
    description: '日本の製造技術を活かし、CNC旋盤加工による精密部品製造を行っています。プロトタイプから大量生産まで、お客様のニーズにお応えします。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Take Parts Factory - 精密CNC旋盤加工',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take Parts Factory - 精密CNC旋盤加工による高品質部品製造',
    description: '日本の製造技術を活かし、CNC旋盤加工による精密部品製造を行っています。',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification if needed
    // google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get site configuration
  const siteConfig = await getSiteConfig();

  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notosansjp/v52/k3kCo84MPvpLmixcA63oeAL7Iqp5JRXD.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Core Web Vitals tracking
              function sendToAnalytics(metric) {
                console.log('Performance metric:', metric);
                // Send to your analytics service
              }
              
              // CLS tracking
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  sendToAnalytics({
                    name: 'CLS',
                    value: entry.value,
                    delta: entry.value
                  });
                }
              }).observe({type: 'layout-shift', buffered: true});
              
              // LCP tracking
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  sendToAnalytics({
                    name: 'LCP',
                    value: entry.startTime,
                    delta: entry.startTime
                  });
                }
              }).observe({type: 'largest-contentful-paint', buffered: true});
              
              // FID tracking
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  sendToAnalytics({
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    delta: entry.processingStart - entry.startTime
                  });
                }
              }).observe({type: 'first-input', buffered: true});
            `,
          }}
        />
      </head>
      <body className={`${notoSansJP.variable} ${notoSansJP.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-red text-white px-4 py-2 rounded-lg z-50 transition-all duration-300"
        >
          メインコンテンツへスキップ
        </a>

        {/* Navigation */}
        <Navigation 
          items={siteConfig.navigation || []}
          siteName={siteConfig.company?.nameJa || 'テイクパーツファクトリー'}
        />

        {/* Main content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer 
          navigationItems={siteConfig.navigation || []}
          contactInfo={siteConfig.contact || {
            email: 'info@take-parts-factory.com',
            phone: '+81-3-1234-5678',
            address: '〒123-4567 東京都港区芝公園1-2-3 製造ビル5F',
            businessHours: '平日 9:00-18:00（土日祝日休み）'
          }}
          companyInfo={siteConfig.company || {
            name: 'Take Parts Factory',
            nameJa: 'テイクパーツファクトリー',
            establishedYear: '2015',
            employees: '50名',
            certification: ['ISO 9001:2015', 'ISO 14001:2015'],
            specialties: ['CNC旋盤加工', '精密部品製造', '金属加工', 'プロトタイプ製作', '大量生産対応']
          }}
        />


        {/* Performance optimization scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Optimize animations based on user preference
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01s');
              }
              
              // Intersection Observer for scroll animations
              if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('in-view');
                    }
                  });
                }, { threshold: 0.1 });
                
                document.addEventListener('DOMContentLoaded', () => {
                  document.querySelectorAll('.scroll-animate').forEach(el => {
                    observer.observe(el);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

