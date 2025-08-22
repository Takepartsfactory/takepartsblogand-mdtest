'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  title: string
  href: string
}

interface NavigationProps {
  items: NavigationItem[]
  siteName?: string
  className?: string
}

/**
 * Navigation - Modern sticky header with mobile menu and dark mode toggle
 * 
 * Features:
 * - Sticky header with backdrop blur effect
 * - Smooth mobile hamburger menu animation
 * - Dark mode toggle with smooth transitions
 * - Japanese typography with company name
 * - Scroll-triggered header styling changes
 * - Active page highlighting
 * - Accessible keyboard navigation
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  siteName = 'テイクパーツファクトリー',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isOpen])

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out gpu-accelerated
          ${isScrolled 
            ? 'backdrop-blur-premium-dark shadow-xl border-b border-white/10' 
            : 'bg-transparent'
          }
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center space-x-3 group"
                aria-label="ホームに戻る"
              >
                <div className="w-10 h-10 magnetic-btn flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold font-japanese text-white group-hover:text-brand-red-glow transition-colors duration-300">
                    {siteName}
                  </h1>
                  <p className="text-xs text-gray-300 font-japanese">
                    Take Parts Factory
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium font-japanese transition-all duration-400 ease-in-out japanese-hover link-lift gpu-accelerated
                      ${isActivePage(item.href)
                        ? 'magnetic-btn text-white shadow-lg glow-red'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover-3d'
                      }
                    `}
                    aria-current={isActivePage(item.href) ? 'page' : undefined}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-400 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-red/50 magnetic-btn gpu-accelerated"
                aria-label={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-400 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-red/50 magnetic-btn gpu-accelerated"
                  aria-expanded={isOpen}
                  aria-label="メニューを開く"
                >
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`
            lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-in-out gpu-accelerated
            ${isOpen 
              ? 'opacity-100 visible translate-y-0 scale-100' 
              : 'opacity-0 invisible -translate-y-4 scale-95'
            }
          `}
        >
          <div className="backdrop-blur-premium-dark border-t border-white/10 shadow-2xl">
            <div className="px-4 py-6 space-y-3">
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-3 rounded-xl text-base font-medium font-japanese transition-all duration-400 ease-in-out gpu-accelerated
                    ${isActivePage(item.href)
                      ? 'magnetic-btn text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover-3d'
                    }
                    animate-slide-in-left
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-current={isActivePage(item.href) ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="block w-full magnetic-btn text-center font-japanese animate-fade-in-delay text-white px-6 py-3 rounded-xl"
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-red to-red-600 z-50 transition-all duration-300 ease-out"
        style={{ 
          width: `${typeof window !== 'undefined' ? Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) : 0}%` 
        }}
      />
    </>
  )
}

export default Navigation