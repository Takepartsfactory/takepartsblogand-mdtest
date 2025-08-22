'use client'

import React from 'react'

export type OrganicBlobVariant = 'primary' | 'secondary' | 'accent'
export type OrganicBlobAnimation = 'blob' | 'float' | 'pulse'
export type OrganicBlobSize = 'small' | 'medium' | 'large'

interface OrganicBlobProps {
  variant?: OrganicBlobVariant
  animation?: OrganicBlobAnimation
  size?: OrganicBlobSize
  className?: string
  opacity?: number
  blur?: boolean
  darkMode?: boolean
}

/**
 * OrganicBlob - Background decorative elements with organic shapes
 * 
 * Features:
 * - Animated organic shapes using CSS transforms
 * - Multiple size variants
 * - Color variants matching brand palette
 * - Blur effects for depth
 * - Various animation patterns (blob, float, pulse)
 */
export const OrganicBlob: React.FC<OrganicBlobProps> = ({
  variant = 'primary',
  animation = 'blob',
  size = 'medium',
  className = '',
  opacity = 20,
  blur = true,
  darkMode = false
}) => {
  // Color variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return darkMode ? 'bg-brand-purple' : 'bg-brand-purple'
      case 'secondary':
        return darkMode ? 'bg-brand-blue' : 'bg-brand-blue'
      case 'accent':
        return darkMode ? 'bg-brand-green' : 'bg-brand-green'
      default:
        return 'bg-brand-purple'
    }
  }

  // Size variant classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-32 h-32'
      case 'medium':
        return 'w-48 h-48'
      case 'large':
        return 'w-64 h-64'
      default:
        return 'w-48 h-48'
    }
  }

  // Animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'blob':
        return 'animate-blob'
      case 'float':
        return 'animate-float'
      case 'pulse':
        return 'animate-pulse'
      default:
        return 'animate-blob'
    }
  }

  // Opacity class
  const getOpacityClass = () => {
    if (opacity <= 10) return 'opacity-10'
    if (opacity <= 20) return 'opacity-20'
    if (opacity <= 30) return 'opacity-30'
    if (opacity <= 40) return 'opacity-40'
    if (opacity <= 50) return 'opacity-50'
    return 'opacity-20'
  }

  const blobClasses = [
    'absolute',
    'rounded-full',
    getSizeClasses(),
    getVariantClasses(),
    getOpacityClass(),
    getAnimationClasses(),
    blur ? 'blur-xl' : '',
    'pointer-events-none',
    'select-none',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={blobClasses}>
      {/* Additional organic shape using pseudo-elements via CSS-in-JS alternative */}
      <div className="absolute inset-0 rounded-full bg-current transform scale-75 translate-x-4 translate-y-4 opacity-70" />
      <div className="absolute inset-0 rounded-full bg-current transform scale-50 -translate-x-2 -translate-y-6 opacity-50" />
    </div>
  )
}

// Additional blob shapes for more variety
export const OrganicShape: React.FC<OrganicBlobProps & { shape?: 'circle' | 'oval' | 'irregular' }> = ({
  variant = 'primary',
  animation = 'blob',
  size = 'medium',
  className = '',
  opacity = 20,
  blur = true,
  darkMode = false,
  shape = 'circle'
}) => {
  // Color variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return darkMode ? 'fill-brand-purple' : 'fill-brand-purple'
      case 'secondary':
        return darkMode ? 'fill-brand-blue' : 'fill-brand-blue'
      case 'accent':
        return darkMode ? 'fill-brand-green' : 'fill-brand-green'
      default:
        return 'fill-brand-purple'
    }
  }

  // Size variant classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-32 h-32'
      case 'medium':
        return 'w-48 h-48'
      case 'large':
        return 'w-64 h-64'
      default:
        return 'w-48 h-48'
    }
  }

  // Animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'blob':
        return 'animate-blob'
      case 'float':
        return 'animate-float'
      case 'pulse':
        return 'animate-pulse'
      default:
        return 'animate-blob'
    }
  }

  // Opacity class
  const getOpacityClass = () => {
    if (opacity <= 10) return 'opacity-10'
    if (opacity <= 20) return 'opacity-20'
    if (opacity <= 30) return 'opacity-30'
    if (opacity <= 40) return 'opacity-40'
    if (opacity <= 50) return 'opacity-50'
    return 'opacity-20'
  }

  const containerClasses = [
    'absolute',
    getSizeClasses(),
    getOpacityClass(),
    getAnimationClasses(),
    blur ? 'blur-xl' : '',
    'pointer-events-none',
    'select-none',
    className
  ].filter(Boolean).join(' ')

  // Different organic shapes using SVG
  const renderShape = () => {
    switch (shape) {
      case 'oval':
        return (
          <svg viewBox="0 0 200 200" className={`w-full h-full ${getVariantClasses()}`}>
            <ellipse cx="100" cy="100" rx="80" ry="60" />
          </svg>
        )
      case 'irregular':
        return (
          <svg viewBox="0 0 200 200" className={`w-full h-full ${getVariantClasses()}`}>
            <path d="M50,100 C50,50 75,25 100,25 C125,25 150,40 150,70 C160,90 140,120 120,130 C100,140 80,135 70,120 C55,110 50,100 50,100 Z" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 200 200" className={`w-full h-full ${getVariantClasses()}`}>
            <circle cx="100" cy="100" r="80" />
          </svg>
        )
    }
  }

  return (
    <div className={containerClasses}>
      {renderShape()}
    </div>
  )
}

export default OrganicBlob