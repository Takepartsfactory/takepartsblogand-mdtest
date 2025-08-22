// Layout Components
export { default as Navigation } from './Navigation'
export { default as Footer } from './Footer'

// Sonos-Inspired Premium Components
export { default as VideoBackground } from './VideoBackground'
export { 
  default as ScrollAnimations, 
  ParallaxElement, 
  FrameSequence 
} from './ScrollAnimations'
export { default as ProductShowcase } from './ProductShowcase'

// Bento Box Layout System Components
export { BentoGrid } from './BentoGrid'
export { BentoBox } from './BentoBox'
export { GlowButton } from './GlowButton'
export { OrganicBlob, OrganicShape } from './OrganicBlob'
export { 
  AnimatedText, 
  AnimatedHeading, 
  AnimatedParagraph, 
  StaggeredText 
} from './AnimatedText'
export { ManufacturingShowcase } from './ManufacturingShowcase'

// Blog Components
export { default as BlogCard } from './BlogCard'
export { default as TagFilter } from './TagFilter'
export { default as TableOfContents } from './TableOfContents'
export { default as SocialShare } from './SocialShare'
export { default as RelatedPosts } from './RelatedPosts'
export { default as ReadingProgress } from './ReadingProgress'
export { default as BlogSearch } from './BlogSearch'
export { default as BlogPagination } from './BlogPagination'

// Japanese UX Enhancement Components
export { default as TestimonialsSection } from './TestimonialsSection'
export { default as TrustSignals } from './TrustSignals'
export { default as SeasonalDecorations } from './SeasonalDecorations'
export { default as Breadcrumbs } from './Breadcrumbs'

// Performance & Loading Components
export { default as OptimizedImage, ResponsiveImage, HeroImage } from './OptimizedImage'
export { 
  default as LoadingSpinner, 
  SkeletonCard, 
  SkeletonText, 
  SkeletonButton, 
  PageLoader, 
  ContentLoader 
} from './LoadingSpinner'

// Re-export types for external use
export type { BentoBoxSize } from './BentoBox'
export type { GlowButtonSize, GlowButtonVariant } from './GlowButton'
export type { 
  OrganicBlobVariant, 
  OrganicBlobAnimation, 
  OrganicBlobSize 
} from './OrganicBlob'
export type { 
  AnimatedTextElement, 
  AnimatedTextAnimation 
} from './AnimatedText'