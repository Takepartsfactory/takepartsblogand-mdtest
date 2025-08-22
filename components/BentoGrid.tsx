'use client'

import React from 'react'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  rows?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
  nested?: boolean
}

/**
 * BentoGrid - Main container component for Bento Box layouts
 * 
 * Features:
 * - Responsive grid system (1 col mobile, 2-4 cols tablet, 4-6 cols desktop)
 * - Auto-sizing rows with 200px base height
 * - Proper gap spacing for Japanese aesthetic
 * - Support for nested grids
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className = '',
  cols = {
    mobile: 1,
    tablet: 3,
    desktop: 6
  },
  rows = {
    mobile: undefined,
    tablet: undefined,
    desktop: undefined
  },
  gap = 6,
  nested = false
}) => {
  // Generate responsive grid column classes
  const getGridColsClass = () => {
    const mobileClass = cols.mobile ? `grid-cols-${cols.mobile}` : 'grid-cols-1'
    const tabletClass = cols.tablet ? `md:grid-cols-${cols.tablet}` : 'md:grid-cols-3'
    const desktopClass = cols.desktop ? `lg:grid-cols-${cols.desktop}` : 'lg:grid-cols-6'
    
    return `${mobileClass} ${tabletClass} ${desktopClass}`
  }

  // Generate responsive grid row classes if specified
  const getGridRowsClass = () => {
    if (!rows.mobile && !rows.tablet && !rows.desktop) return ''
    
    const mobileClass = rows.mobile ? `grid-rows-${rows.mobile}` : ''
    const tabletClass = rows.tablet ? `md:grid-rows-${rows.tablet}` : ''
    const desktopClass = rows.desktop ? `lg:grid-rows-${rows.desktop}` : ''
    
    return `${mobileClass} ${tabletClass} ${desktopClass}`.trim()
  }

  // Generate gap class
  const getGapClass = () => {
    switch (gap) {
      case 1: return 'gap-1'
      case 2: return 'gap-2'
      case 3: return 'gap-3'
      case 4: return 'gap-4'
      case 6: return 'gap-6'
      case 8: return 'gap-8'
      default: return 'gap-6'
    }
  }

  const gridClasses = [
    'grid',
    getGridColsClass(),
    getGridRowsClass(),
    getGapClass(),
    'auto-rows-[200px]', // Base row height for Japanese aesthetic
    nested ? 'h-full' : 'w-full',
    'place-items-stretch', // Ensure items fill their grid cells
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

export default BentoGrid