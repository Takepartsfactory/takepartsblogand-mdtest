import Link from 'next/link';
import { GlowButton } from '@/components/GlowButton';
import { OrganicBlob } from '@/components/OrganicBlob';

export const metadata = {
  title: 'ページが見つかりません | Take Parts Factory',
  description: 'お探しのページは見つかりませんでした。',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <OrganicBlob 
        variant="primary" 
        animation="blob" 
        size="large"
        className="absolute top-20 left-10 opacity-10"
      />
      <OrganicBlob 
        variant="secondary" 
        animation="float" 
        size="medium"
        className="absolute bottom-32 right-16 opacity-15"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* 404 Number with modern styling */}
        <div className="mb-12 animate-fade-up">
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-bold gradient-text mb-4 select-none">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-brand-red/10 animate-pulse select-none">
              404
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-brand-red to-red-600 mx-auto rounded-full animate-scale-in"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12 animate-fade-in-delay">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-japanese">
            ページが見つかりません
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-japanese max-w-lg mx-auto">
            申し訳ございませんが、お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-6 animate-scale-in">
          <GlowButton size="large" href="/" className="w-full sm:w-auto font-japanese">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            ホームページに戻る
          </GlowButton>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
            <GlowButton variant="secondary" href="/blog" className="font-japanese">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              技術情報
            </GlowButton>
            
            <GlowButton variant="secondary" href="/about" className="font-japanese">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              会社概要
            </GlowButton>
            
            <GlowButton variant="secondary" href="/contact" className="font-japanese">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              お問い合わせ
            </GlowButton>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-up">
          <div className="card-modern p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 font-japanese">
              お探しの情報が見つからない場合
            </h3>
            
            <div className="text-left text-gray-600 dark:text-gray-300 space-y-4 font-japanese">
              <p className="text-center mb-4">以下の方法でお探しの情報を見つけることができます：</p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 flex-shrink-0"></div>
                  <span>ホームページから目的のページに移動する</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 flex-shrink-0"></div>
                  <span>技術情報・ブログページで関連記事を検索する</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full mt-2 flex-shrink-0"></div>
                  <span>お問い合わせフォームからご質問いただく</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 animate-fade-in-delay">
          <div className="glass-effect p-6 rounded-2xl border border-brand-red/20 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 font-japanese text-center">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 text-center font-japanese">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+81-3-1234-5678</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@take-parts-factory.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>平日 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}