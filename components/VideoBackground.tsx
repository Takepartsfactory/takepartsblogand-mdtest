'use client'

import React, { useState, useRef, useEffect } from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  fallbackImage: string
  overlayOpacity?: number
  className?: string
  children?: React.ReactNode
}

/**
 * VideoBackground - Sonos-inspired video background with intelligent fallbacks
 * 
 * Features:
 * - Automatic video loading with fallback to image
 * - Mobile-optimized (uses fallback image on mobile)
 * - Intersection Observer for performance
 * - Progressive enhancement approach
 * - Accessibility considerations (respects reduced motion)
 */
export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImage,
  overlayOpacity = 0.4,
  className = '',
  children
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile devices and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Don't play video on mobile or if user prefers reduced motion
    if (!isMobile && !prefersReducedMotion && videoSrc) {
      setShouldPlayVideo(true)
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [videoSrc, isMobile])

  // Intersection Observer for performance
  useEffect(() => {
    if (!shouldPlayVideo || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(console.error)
          } else if (videoRef.current) {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    
    return () => observer.disconnect()
  }, [shouldPlayVideo])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    setIsVideoLoaded(false)
    setShouldPlayVideo(false)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Fallback Image - Always present for immediate loading */}
      <div
        className="video-background"
        style={{
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Video - Only on desktop and when supported */}
      {shouldPlayVideo && videoSrc && (
        <video
          ref={videoRef}
          className={`video-background transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div 
        className="video-overlay"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(0, 0, 0, ${overlayOpacity}) 0%,
            rgba(0, 0, 0, ${overlayOpacity * 0.5}) 50%,
            rgba(0, 0, 0, ${overlayOpacity}) 100%
          )`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default VideoBackground