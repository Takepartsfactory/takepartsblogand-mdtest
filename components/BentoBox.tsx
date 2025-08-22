'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { OrganicBlob } from './OrganicBlob'

export type BentoBoxSize = 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero'

interface BentoBoxProps {
  children?: ReactNode
  title?: string
  description?: string
  image?: string
  size?: BentoBoxSize
  glowEffect?: boolean
  animation?: 'none' | 'float' | 'glow' | 'blob'
  href?: string
  onClick?: () => void
  className?: string
  gradient?: boolean
  solanaTheme?: boolean
  blob?: {
    show: boolean
    variant?: 'primary' | 'secondary' | 'accent'
    animation?: 'blob' | 'float' | 'pulse'
    size?: 'small' | 'medium' | 'large'
  }
  darkMode?: boolean
}

/**
 * BentoBox - Individual content boxes for the Bento Grid layout
 * 
 * Features:
 * - Size variants: small (1x1), medium (2x1), large (2x2), wide (3x1), tall (1x2), hero (3x2)
 * - Optional glow effects for emphasis
 * - Hover animations with smooth transitions
 * - Support for clickable boxes (links)
 * - Organic blob background decorations
 * - Proper shadow and border styling
 */
export const BentoBox: React.FC<BentoBoxProps> = ({
  children,
  title,
  description,
  image,
  size = 'small',
  glowEffect = false,
  animation = 'none',
  href,
  onClick,
  className = '',
  gradient = true,
  blob,
  darkMode = false,
  solanaTheme = false
}) => {
  // Size variant classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1'
      case 'medium':
        return 'col-span-1 md:col-span-2 row-span-1'
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-1 md:row-span-2'
      case 'wide':
        return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1'
      case 'tall':
        return 'col-span-1 row-span-1 md:row-span-2'
      case 'hero':
        return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1 md:row-span-2'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  // Animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'float':
        return 'animate-float'
      case 'glow':
        return 'animate-glow'
      case 'blob':
        return 'animate-blob'
      default:
        return ''
    }
  }

  // Base classes
  const baseClasses = [
    getSizeClasses(),
    'relative',
    'overflow-hidden',
    'rounded-2xl',
    'border',
    solanaTheme ? 'border-brand-dark-border bg-brand-dark-surface' : 
    darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white',
    'shadow-lg',
    solanaTheme ? 'shadow-brand-purple/10' : 
    darkMode ? 'shadow-gray-900/25' : 'shadow-gray-200/25',
    'transition-all',
    'duration-300',
    'ease-in-out',
    // Hover effects
    'hover:scale-[1.02]',
    'hover:shadow-xl',
    solanaTheme ? 'hover:shadow-brand-purple/20' : 
    darkMode ? 'hover:shadow-gray-900/40' : 'hover:shadow-gray-300/40',
    solanaTheme ? 'hover:border-brand-purple/30' : 'hover:border-brand-purple/20',
    // Interactive styles
    (href || onClick) && 'cursor-pointer',
    // Glow effect
    glowEffect && (solanaTheme ? 
      'ring-2 ring-brand-purple/30 shadow-[0_0_20px_rgba(153,69,255,0.3)]' : 
      'ring-2 ring-brand-purple/20 shadow-[0_0_20px_rgba(153,69,255,0.3)]'),
    getAnimationClasses(),
    className
  ].filter(Boolean).join(' ')

  // Gradient overlay classes
  const gradientClasses = gradient ? (
    solanaTheme 
      ? 'bg-gradient-to-br from-transparent via-brand-purple/5 to-brand-blue/10'
      : darkMode 
        ? 'bg-gradient-to-br from-transparent via-transparent to-gray-800/30'
        : 'bg-gradient-to-br from-transparent via-transparent to-black/10'
  ) : ''

  // Content wrapper
  const content = (
    <div className={baseClasses}>
      {/* Organic blob background decoration */}
      {blob?.show && (
        <OrganicBlob
          variant={blob.variant || 'primary'}
          animation={blob.animation || 'blob'}
          size={blob.size || 'medium'}
          className="absolute inset-0 -z-10"
        />
      )}

      {/* Background image */}
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Gradient overlay */}
      {gradient && (
        <div className={`absolute inset-0 ${gradientClasses}`} />
      )}

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-end">
        {title && (
          <h3 className={`font-bold text-lg mb-2 font-sans ${
            solanaTheme ? 'text-white' :
            darkMode ? 'text-white' : 'text-gray-900'
          } ${image ? 'text-white' : ''}`}>
            {title}
          </h3>
        )}
        
        {description && (
          <p className={`text-sm opacity-80 font-sans ${
            solanaTheme ? 'text-gray-300' :
            darkMode ? 'text-gray-300' : 'text-gray-600'
          } ${image ? 'text-white' : ''}`}>
            {description}
          </p>
        )}

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )

  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full h-full">
        {content}
      </button>
    )
  }

  // Render as div
  return content
}

export default BentoBox