'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'

export type AnimatedTextElement = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
export type AnimatedTextAnimation = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'

interface AnimatedTextProps {
  children: ReactNode
  element?: AnimatedTextElement
  animation?: AnimatedTextAnimation
  delay?: number
  duration?: number
  className?: string
  stagger?: boolean
  staggerDelay?: number
  threshold?: number
  triggerOnce?: boolean
  darkMode?: boolean
}

/**
 * AnimatedText - Text with entrance animations using Intersection Observer
 * 
 * Features:
 * - Fade-up animation on scroll into view
 * - Delay support for staggered animations
 * - Support for h1, h2, h3, p, span, div elements
 * - Intersection Observer for performance
 * - Japanese typography optimization
 * - Stagger effect for children elements
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  element = 'div',
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  className = '',
  stagger = false,
  staggerDelay = 100,
  threshold = 0.1,
  triggerOnce = true,
  darkMode = false
}) => {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px' // Trigger slightly before element is visible
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, triggerOnce, hasTriggered])

  // Animation variant classes
  const getAnimationClasses = () => {
    const baseTransition = `transition-all duration-${duration} ease-out`
    
    switch (animation) {
      case 'fade-up':
        return {
          initial: 'opacity-0 translate-y-8',
          animate: 'opacity-100 translate-y-0',
          transition: baseTransition
        }
      case 'fade-in':
        return {
          initial: 'opacity-0',
          animate: 'opacity-100',
          transition: baseTransition
        }
      case 'slide-left':
        return {
          initial: 'opacity-0 translate-x-8',
          animate: 'opacity-100 translate-x-0',
          transition: baseTransition
        }
      case 'slide-right':
        return {
          initial: 'opacity-0 -translate-x-8',
          animate: 'opacity-100 translate-x-0',
          transition: baseTransition
        }
      default:
        return {
          initial: 'opacity-0 translate-y-8',
          animate: 'opacity-100 translate-y-0',
          transition: baseTransition
        }
    }
  }

  const animationClasses = getAnimationClasses()

  // Build final classes
  const finalClasses = [
    'font-sans', // Japanese typography optimization
    animationClasses.transition,
    isVisible ? animationClasses.animate : animationClasses.initial,
    className
  ].filter(Boolean).join(' ')

  // Style object for delay
  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`
  }

  // Stagger effect for children
  const processChildren = (children: ReactNode): ReactNode => {
    if (!stagger || typeof children !== 'string') {
      return children
    }

    // Split text into words or characters for stagger effect
    const words = children.split(' ')
    return words.map((word, index) => (
      <span
        key={index}
        className={`inline-block ${animationClasses.transition} ${
          isVisible ? animationClasses.animate : animationClasses.initial
        }`}
        style={{
          transitionDelay: `${delay + (index * staggerDelay)}ms`
        }}
      >
        {word}
        {index < words.length - 1 && ' '}
      </span>
    ))
  }

  // Render appropriate element
  const Element = element as keyof JSX.IntrinsicElements

  return React.createElement(
    Element,
    {
      ref: elementRef,
      className: finalClasses,
      style,
      'aria-hidden': !isVisible
    },
    processChildren(children)
  )
}

// Preset components for common use cases
export const AnimatedHeading: React.FC<Omit<AnimatedTextProps, 'element'> & { level?: 1 | 2 | 3 }> = ({
  level = 1,
  ...props
}) => {
  const element = `h${level}` as AnimatedTextElement
  const defaultClasses = level === 1 
    ? 'text-hero font-bold' 
    : level === 2 
    ? 'text-sub-hero font-semibold' 
    : 'text-2xl font-semibold'
  
  return (
    <AnimatedText
      {...props}
      element={element}
      className={`${defaultClasses} ${props.className || ''}`}
    />
  )
}

export const AnimatedParagraph: React.FC<Omit<AnimatedTextProps, 'element'>> = (props) => {
  return (
    <AnimatedText
      {...props}
      element="p"
      className={`text-base leading-relaxed ${props.className || ''}`}
    />
  )
}

export const StaggeredText: React.FC<Omit<AnimatedTextProps, 'stagger'>> = (props) => {
  return (
    <AnimatedText
      {...props}
      stagger={true}
      staggerDelay={75}
    />
  )
}

export default AnimatedText