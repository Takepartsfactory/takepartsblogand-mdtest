'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollAnimationsProps {
  children: React.ReactNode
  className?: string
  animation?: 'slide-up' | 'fade-in' | 'scale-in' | 'stagger'
  delay?: number
  threshold?: number
}

/**
 * ScrollAnimations - Enhanced Intersection Observer animations inspired by Sonos
 * 
 * Features:
 * - Multiple animation types (slide-up, fade-in, scale-in, stagger)
 * - Customizable thresholds and delays
 * - Performance optimized with proper cleanup
 * - Respects user's reduced motion preferences
 * - GPU acceleration for smooth animations
 */
export const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.1
}) => {
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsInView(true)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Add delay if specified
            if (delay > 0) {
              setTimeout(() => {
                setIsInView(true)
                setHasAnimated(true)
              }, delay)
            } else {
              setIsInView(true)
              setHasAnimated(true)
            }
          }
        })
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px' // Start animation slightly before element comes into view
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay, threshold, hasAnimated])

  const getAnimationClass = () => {
    const baseClass = 'gpu-accelerated'
    
    switch (animation) {
      case 'slide-up':
        return `${baseClass} observe-slide-up ${isInView ? 'in-view' : ''}`
      case 'fade-in':
        return `${baseClass} observe-fade-in ${isInView ? 'in-view' : ''}`
      case 'scale-in':
        return `${baseClass} observe-scale-in ${isInView ? 'in-view' : ''}`
      case 'stagger':
        return `${baseClass} stagger-children`
      default:
        return baseClass
    }
  }

  return (
    <div 
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * ParallaxElement - Smooth parallax scrolling effect
 */
interface ParallaxElementProps {
  children: React.ReactNode
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 'medium',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Only animate when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * getSpeedMultiplier()
        element.style.transform = `translateZ(0) translateY(${yPos}px)`
      }
    }

    const getSpeedMultiplier = () => {
      switch (speed) {
        case 'slow': return 0.1
        case 'medium': return 0.3
        case 'fast': return 0.5
        default: return 0.3
      }
    }

    // Use requestAnimationFrame for smooth animation
    let ticking = false
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', smoothScroll, { passive: true })
    handleScroll() // Initial position

    return () => {
      window.removeEventListener('scroll', smoothScroll)
    }
  }, [speed])

  return (
    <div 
      ref={elementRef}
      className={`parallax-${speed} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * FrameSequence - Sonos-style scroll-triggered frame animation
 */
interface FrameSequenceProps {
  frames: string[] // Array of image URLs
  className?: string
  triggerOffset?: number
}

export const FrameSequence: React.FC<FrameSequenceProps> = ({
  frames,
  className = '',
  triggerOffset = 0
}) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || frames.length === 0) return

    // Preload all frames
    frames.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress through the element
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop - triggerOffset) / (windowHeight + elementHeight)
      ))
      
      // Map scroll progress to frame index
      const frameIndex = Math.floor(scrollProgress * (frames.length - 1))
      setCurrentFrame(Math.max(0, Math.min(frames.length - 1, frameIndex)))
    }

    // Use requestAnimationFrame for smooth animation
    let ticking = false
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', smoothScroll, { passive: true })
    handleScroll() // Initial frame

    return () => {
      window.removeEventListener('scroll', smoothScroll)
    }
  }, [frames, triggerOffset])

  if (frames.length === 0) return null

  return (
    <div 
      ref={elementRef}
      className={`frame-sequence ${className}`}
      style={{
        backgroundImage: `url(${frames[currentFrame]})`
      }}
    />
  )
}

export default ScrollAnimations