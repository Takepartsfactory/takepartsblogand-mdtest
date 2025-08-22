'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'

export type GlowButtonSize = 'small' | 'medium' | 'large'
export type GlowButtonVariant = 'primary' | 'secondary' | 'solana'

interface GlowButtonProps {
  children: ReactNode
  size?: GlowButtonSize
  variant?: GlowButtonVariant
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  darkMode?: boolean
}

/**
 * GlowButton - Call-to-action buttons with 2025-style glow effects
 * 
 * Features:
 * - Size variants: small, medium, large
 * - Style variants: primary (brand red gradient), secondary (outline)
 * - Animated glow effects on hover
 * - Support for both links and buttons
 * - Rounded corners with modern styling
 * - Accessibility support with proper ARIA attributes
 */
export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  darkMode = false
}) => {
  // Size variant classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm'
      case 'medium':
        return 'px-6 py-3 text-base'
      case 'large':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-6 py-3 text-base'
    }
  }

  // Variant classes
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return {
        base: [
          'bg-gradient-to-r',
          'from-brand-purple',
          'to-brand-blue',
          'text-white',
          'border-2',
          'border-transparent',
          'shadow-[0_0_20px_rgba(153,69,255,0.3)]'
        ].join(' '),
        hover: [
          'hover:shadow-[0_0_30px_rgba(153,69,255,0.5)]',
          'hover:from-brand-purple-dark',
          'hover:to-brand-blue-dark',
          'hover:scale-105'
        ].join(' '),
        active: 'active:scale-95',
        disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
      }
    } else if (variant === 'solana') {
      // Solana special variant with triple gradient
      return {
        base: [
          'bg-gradient-to-r',
          'from-brand-purple',
          'via-brand-blue',
          'to-brand-green',
          'text-white',
          'border-2',
          'border-transparent',
          'shadow-[0_0_25px_rgba(153,69,255,0.3)]',
          'relative',
          'overflow-hidden'
        ].join(' '),
        hover: [
          'hover:shadow-[0_0_40px_rgba(153,69,255,0.4)]',
          'hover:shadow-[0_0_60px_rgba(25,212,238,0.2)]',
          'hover:scale-105',
          'hover:brightness-110'
        ].join(' '),
        active: 'active:scale-95',
        disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
      }
    } else {
      // Secondary variant
      return {
        base: [
          darkMode ? 'bg-transparent' : 'bg-white',
          'text-brand-purple',
          'border-2',
          'border-brand-purple',
          darkMode ? 'shadow-[0_0_15px_rgba(153,69,255,0.2)]' : 'shadow-lg'
        ].join(' '),
        hover: [
          'hover:bg-brand-purple',
          'hover:text-white',
          'hover:shadow-[0_0_25px_rgba(153,69,255,0.4)]',
          'hover:scale-105'
        ].join(' '),
        active: 'active:scale-95',
        disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
      }
    }
  }

  const variantClasses = getVariantClasses()

  // Base classes
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-sans',
    'font-semibold',
    'rounded-xl',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-brand-purple/20',
    getSizeClasses(),
    variantClasses.base,
    variantClasses.hover,
    variantClasses.active,
    variantClasses.disabled,
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ')

  // Ripple effect (simulated with transform)
  const rippleEffect = 'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:transition-transform before:duration-300 active:before:scale-100'

  const finalClasses = `${baseClasses} ${rippleEffect}`

  // Content wrapper
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  )

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <Link 
        href={href} 
        className={finalClasses}
        aria-label={typeof children === 'string' ? children : 'Button link'}
      >
        {content}
      </Link>
    )
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClasses}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {content}
    </button>
  )
}

export default GlowButton