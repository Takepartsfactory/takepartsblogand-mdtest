import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Sonos-inspired animation classes
    'magnetic-btn',
    'hover-3d',
    'hover-3d-reverse',
    'bento-hover',
    'text-fluid-sm',
    'text-fluid-base', 
    'text-fluid-lg',
    'text-fluid-xl',
    'text-fluid-2xl',
    'text-fluid-3xl',
    'video-background',
    'video-overlay',
    'parallax-slow',
    'parallax-medium',
    'parallax-fast',
    'frame-sequence',
    'zoom-on-hover',
    'backdrop-blur-premium',
    'backdrop-blur-premium-dark',
    'scroll-indicator',
    'observe-slide-up',
    'observe-fade-in',
    'observe-scale-in',
    'stagger-children',
    'gpu-accelerated',
    // Patterns for dynamic classes
    { pattern: /^(magnetic-btn|hover-3d|bento-hover|parallax-)/ },
    { pattern: /^text-fluid-(sm|base|lg|xl|2xl|3xl)$/ },
    { pattern: /^observe-(slide-up|fade-in|scale-in)$/ },
    { pattern: /^backdrop-blur-premium(-dark)?$/ },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // Solana-inspired primary colors
          purple: '#9945FF',
          'purple-light': '#C084FC',
          'purple-dark': '#7C3AED',
          'purple-glow': '#A855F7',
          
          // Solana's blue gradient colors
          blue: '#19D4EE',
          'blue-light': '#00D4F7',
          'blue-dark': '#0891B2',
          'blue-glow': '#06B6D4',
          
          // Solana's green accent
          green: '#14F195',
          'green-light': '#34D399',
          'green-dark': '#059669',
          'green-glow': '#10B981',
          
          // Dark theme colors
          black: '#0A0A0B',
          'dark-bg': '#0F0F10',
          'dark-surface': '#1A1A1B',
          'dark-border': '#2A2A2B',
          gray: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Inter', 'system-ui', 'sans-serif'],
        japanese: ['Noto Sans JP', 'Yu Gothic', 'Hiragino Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 8vw, 6rem)',
        'sub-hero': 'clamp(1.5rem, 4vw, 3rem)',
        'display': 'clamp(3rem, 10vw, 8rem)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-delay': 'fade-in 0.6s ease-out 0.2s both',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { 'box-shadow': '0 0 20px #9945FF' },
          'to': { 'box-shadow': '0 0 30px #9945FF, 0 0 40px #7C3AED' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 5px rgba(153, 69, 255, 0.4)' },
          '50%': { 'box-shadow': '0 0 20px rgba(153, 69, 255, 0.8), 0 0 30px rgba(124, 58, 237, 0.4)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Solana-inspired gradient backgrounds
        'hero-gradient': 'linear-gradient(135deg, #9945FF 0%, #19D4EE 50%, #0A0A0B 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #7C3AED 0%, #0891B2 50%, #000000 100%)',
        'solana-gradient': 'linear-gradient(135deg, #9945FF 0%, #19D4EE 100%)',
        'solana-gradient-reverse': 'linear-gradient(135deg, #19D4EE 0%, #9945FF 100%)',
        'solana-dark': 'linear-gradient(135deg, #0F0F10 0%, #1A1A1B 100%)',
        'purple-blue-gradient': 'linear-gradient(45deg, #9945FF 0%, #19D4EE 100%)',
        'blue-green-gradient': 'linear-gradient(45deg, #19D4EE 0%, #14F195 100%)',
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
export default config
