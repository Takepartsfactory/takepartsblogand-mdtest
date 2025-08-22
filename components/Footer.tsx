'use client'

import React from 'react'
import Link from 'next/link'

interface NavigationItem {
  title: string
  href: string
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

interface ContactInfo {
  email: string
  phone: string
  fax?: string
  address: string
  businessHours: string
}

interface CompanyInfo {
  name: string
  nameJa: string
  establishedYear: string
  employees: string
  certification: string[]
  specialties: string[]
}

interface FooterProps {
  navigationItems: NavigationItem[]
  contactInfo: ContactInfo
  companyInfo: CompanyInfo
  socialLinks?: SocialLink[]
  className?: string
}

/**
 * Footer - Comprehensive sitemap and company information in Japanese style
 * 
 * Features:
 * - Comprehensive sitemap navigation
 * - Detailed company information section
 * - Contact details with business hours
 * - Social media links (when provided)
 * - Newsletter signup section
 * - Professional Japanese business layout
 * - Responsive design with mobile optimization
 * - Accessibility compliant
 */
export const Footer: React.FC<FooterProps> = ({
  navigationItems,
  contactInfo,
  companyInfo,
  socialLinks = [],
  className = ''
}) => {
  const currentYear = new Date().getFullYear()

  const defaultSocialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  const activeSocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-japanese mb-2 gradient-text">
                {companyInfo.nameJa}
              </h3>
              <p className="text-sm text-gray-400 font-japanese">
                {companyInfo.name}
              </p>
            </div>
            
            <div className="space-y-3 text-sm font-japanese">
              <div>
                <span className="text-gray-400">設立年:</span>
                <span className="ml-2 text-white">{companyInfo.establishedYear}年</span>
              </div>
              <div>
                <span className="text-gray-400">従業員数:</span>
                <span className="ml-2 text-white">{companyInfo.employees}</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3 font-japanese">認証・資格</h4>
              <div className="space-y-1">
                {companyInfo.certification.map((cert, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-400 font-japanese">
                    <div className="w-2 h-2 bg-brand-red rounded-full mr-2 flex-shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 font-japanese">サイトマップ</h3>
            
            {/* Main Navigation */}
            <nav className="space-y-3 mb-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-400 hover:text-white transition-all duration-300 ease-in-out font-japanese text-sm hover:pl-2 group"
                >
                  <span className="inline-flex items-center">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-red transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Quick Links */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3 font-japanese">クイックリンク</h4>
              <div className="space-y-2">
                <Link href="/services#cnc-machining" className="block text-gray-400 hover:text-white transition-colors duration-300 font-japanese text-xs">
                  CNC旋盤加工
                </Link>
                <Link href="/services#prototype" className="block text-gray-400 hover:text-white transition-colors duration-300 font-japanese text-xs">
                  プロトタイプ製作
                </Link>
                <Link href="/services#mass-production" className="block text-gray-400 hover:text-white transition-colors duration-300 font-japanese text-xs">
                  量産対応
                </Link>
                <Link href="/about#certifications" className="block text-gray-400 hover:text-white transition-colors duration-300 font-japanese text-xs">
                  品質認証
                </Link>
                <Link href="/contact#emergency" className="block text-gray-400 hover:text-white transition-colors duration-300 font-japanese text-xs">
                  緊急対応
                </Link>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 font-japanese">専門分野</h4>
              <div className="space-y-1">
                {companyInfo.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-400 font-japanese">
                    <div className="w-1 h-1 bg-brand-red rounded-full mr-2 flex-shrink-0" />
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 font-japanese">お問い合わせ</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm font-japanese">
                    <p className="text-gray-400 mb-1">住所</p>
                    <p className="text-white leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-sm font-japanese">
                    <p className="text-gray-400 mb-1">電話番号</p>
                    <p className="text-white">{contactInfo.phone}</p>
                    {contactInfo.fax && (
                      <>
                        <p className="text-gray-400 mb-1 mt-2">FAX番号</p>
                        <p className="text-white">{contactInfo.fax}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-sm font-japanese">
                    <p className="text-gray-400 mb-1">メールアドレス</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-white hover:text-brand-red transition-colors duration-300"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm font-japanese">
                    <p className="text-gray-400 mb-1">営業時間</p>
                    <p className="text-white">{contactInfo.businessHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 font-japanese">最新情報</h3>
            
            {/* Newsletter signup */}
            <div className="mb-8">
              <p className="text-sm text-gray-400 mb-4 font-japanese leading-relaxed">
                技術情報や製品情報をお届けします。メールアドレスをご登録ください。
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                  aria-label="メールアドレス"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-sm font-japanese"
                >
                  登録する
                </button>
              </form>
            </div>

            {/* Social media links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 font-japanese">SNS</h4>
              <div className="flex space-x-4">
                {activeSocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red transition-all duration-300 ease-in-out hover:scale-110"
                    aria-label={`${social.name}をフォロー`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick action button */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full btn-secondary text-sm font-japanese"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                お見積り依頼
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals & Quality Badges */}
      <div className="border-t border-gray-800 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-japanese">品質保証・信頼の証</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* ISO Certifications */}
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">ISO 9001</span>
              <span className="text-xs text-gray-400 font-japanese">品質管理</span>
            </div>

            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">ISO 14001</span>
              <span className="text-xs text-gray-400 font-japanese">環境管理</span>
            </div>

            {/* Established Badge */}
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <span className="text-white font-bold text-xs font-japanese">創業<br/>{companyInfo.establishedYear}</span>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">設立年</span>
              <span className="text-xs text-gray-400 font-japanese">信頼の実績</span>
            </div>

            {/* 24/7 Support */}
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">24時間</span>
              <span className="text-xs text-gray-400 font-japanese">緊急対応</span>
            </div>

            {/* Made in Japan */}
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <span className="text-white font-bold text-xs font-japanese">日本<br/>製造</span>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">Made in Japan</span>
              <span className="text-xs text-gray-400 font-japanese">国内生産</span>
            </div>

            {/* Quality Guarantee */}
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-japanese group-hover:text-white transition-colors">品質保証</span>
              <span className="text-xs text-gray-400 font-japanese">±0.005mm</span>
            </div>
          </div>

          {/* Business Registration Info */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-400 font-japanese">
              法人番号：1234567890123 | 東京都知事許可（般-○○）第○○○○○○号 | 
              <span className="text-gray-300">最終更新日：{new Date().toLocaleDateString('ja-JP')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 font-japanese text-center md:text-left">
              <p>&copy; {currentYear} {companyInfo.name}. All rights reserved.</p>
              <p className="mt-1">精密CNC旋盤加工による高品質部品製造</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-japanese"
              >
                プライバシーポリシー
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-japanese"
              >
                利用規約
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-japanese"
              >
                サイトマップ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer