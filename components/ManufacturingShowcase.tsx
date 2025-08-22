'use client'

import React from 'react'
import { BentoGrid } from './BentoGrid'
import { BentoBox } from './BentoBox'
import { GlowButton } from './GlowButton'
import { AnimatedText, AnimatedHeading, AnimatedParagraph } from './AnimatedText'

interface ManufacturingShowcaseProps {
  darkMode?: boolean
}

/**
 * ManufacturingShowcase - Comprehensive example implementation
 * 
 * Showcases Take Parts Factory's CNC lathe manufacturing capabilities
 * with Japanese-inspired Bento Box layout design
 */
export const ManufacturingShowcase: React.FC<ManufacturingShowcaseProps> = ({
  darkMode = false
}) => {
  return (
    <div className={`w-full ${darkMode ? 'bg-brand-black text-white' : 'bg-brand-gray text-gray-900'}`}>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <AnimatedHeading
            level={1}
            className={darkMode ? 'text-white' : 'text-brand-black'}
            delay={100}
          >
            Precision CNC Manufacturing
          </AnimatedHeading>
          <AnimatedParagraph
            className={`mt-6 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            delay={300}
          >
            Take Parts Factory delivers exceptional CNC lathe manufacturing with Japanese-inspired 
            precision and quality. From difficult materials to complex geometries, we excel where others cannot.
          </AnimatedParagraph>
        </div>

        {/* Main Bento Grid */}
        <BentoGrid 
          cols={{ mobile: 1, tablet: 3, desktop: 6 }}
          gap={6}
          className="mb-16"
        >
          {/* Hero Capability Box */}
          <BentoBox
            size="hero"
            title="Difficult Materials Mastery"
            description="Inconel, Titanium, Hardened Steels - We machine what others cannot with precision and efficiency."
            glowEffect={true}
            animation="glow"
            darkMode={darkMode}
            blob={{
              show: true,
              variant: 'primary',
              animation: 'blob',
              size: 'large'
            }}
            className="relative overflow-hidden"
          >
            <div className="mt-4">
              <GlowButton
                variant="primary"
                size="medium"
                href="/capabilities"
                darkMode={darkMode}
              >
                Explore Capabilities
              </GlowButton>
            </div>
          </BentoBox>

          {/* Precision Box */}
          <BentoBox
            size="tall"
            title="Micron Precision"
            description="±0.0001″ tolerances achieved consistently through advanced tooling and process control."
            animation="float"
            darkMode={darkMode}
            gradient={true}
          />

          {/* Quality Assurance Box */}
          <BentoBox
            size="medium"
            title="Quality First"
            description="ISO 9001:2015 certified with comprehensive inspection protocols."
            darkMode={darkMode}
            blob={{
              show: true,
              variant: 'secondary',
              animation: 'pulse',
              size: 'medium'
            }}
          />

          {/* Fast Delivery Box */}
          <BentoBox
            size="wide"
            title="Rapid Turnaround"
            description="Quick quotes, faster delivery. From prototype to production with unmatched speed."
            animation="float"
            darkMode={darkMode}
          >
            <div className="mt-4 flex gap-3">
              <GlowButton
                variant="secondary"
                size="small"
                href="/quote"
                darkMode={darkMode}
              >
                Get Quote
              </GlowButton>
            </div>
          </BentoBox>

          {/* Materials Expertise */}
          <BentoBox
            size="large"
            title="Materials Expertise"
            description="Specialized in challenging alloys and exotic materials that demand precision machining."
            darkMode={darkMode}
            gradient={true}
          />

          {/* Equipment Box */}
          <BentoBox
            size="medium"
            title="Advanced Equipment"
            description="State-of-the-art CNC lathes with live tooling and multi-axis capabilities."
            animation="blob"
            darkMode={darkMode}
            blob={{
              show: true,
              variant: 'accent',
              animation: 'float',
              size: 'small'
            }}
          />
        </BentoGrid>

        {/* Services Grid */}
        <div className="mb-16">
          <AnimatedHeading
            level={2}
            className={`text-center mb-12 ${darkMode ? 'text-white' : 'text-brand-black'}`}
            delay={100}
          >
            Our Services
          </AnimatedHeading>

          <BentoGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 4 }}
            gap={4}
          >
            <BentoBox
              size="small"
              title="CNC Turning"
              description="High-precision turning operations for complex geometries."
              darkMode={darkMode}
            />

            <BentoBox
              size="small"
              title="Live Tooling"
              description="Milling, drilling, and threading operations in a single setup."
              darkMode={darkMode}
            />

            <BentoBox
              size="small"
              title="Prototyping"
              description="Rapid prototype development with production-quality results."
              darkMode={darkMode}
              glowEffect={true}
            />

            <BentoBox
              size="small"
              title="Production Runs"
              description="Scalable manufacturing from small batches to high volume."
              darkMode={darkMode}
            />
          </BentoGrid>
        </div>

        {/* Technology Showcase */}
        <div className="mb-16">
          <AnimatedHeading
            level={2}
            className={`text-center mb-12 ${darkMode ? 'text-white' : 'text-brand-black'}`}
            delay={100}
          >
            Technology & Equipment
          </AnimatedHeading>

          <BentoGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={6}
          >
            <BentoBox
              size="large"
              title="Multi-Axis CNC Lathes"
              description="Advanced 5-axis capabilities for complex part geometries and reduced setup times."
              animation="float"
              darkMode={darkMode}
              blob={{
                show: true,
                variant: 'primary',
                animation: 'blob',
                size: 'medium'
              }}
            />

            <BentoBox
              size="tall"
              title="Quality Control"
              description="In-process monitoring and post-machining inspection using coordinate measuring machines."
              darkMode={darkMode}
              gradient={true}
            />

            <BentoBox
              size="medium"
              title="CAM Programming"
              description="Advanced CAM programming for optimal tool paths and surface finishes."
              darkMode={darkMode}
            />

            <BentoBox
              size="wide"
              title="Material Handling"
              description="Automated bar feeders and part catchers for lights-out manufacturing."
              animation="glow"
              darkMode={darkMode}
            />
          </BentoGrid>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <AnimatedText
            element="div"
            className={`p-12 rounded-3xl border-2 ${
              darkMode 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-gray-200 bg-white/80'
            } backdrop-blur-sm`}
            animation="fade-up"
            delay={200}
          >
            <AnimatedHeading
              level={2}
              className={`mb-6 ${darkMode ? 'text-white' : 'text-brand-black'}`}
              delay={300}
            >
              Ready to Start Your Project?
            </AnimatedHeading>
            <AnimatedParagraph
              className={`mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              delay={400}
            >
              Get a quote for your precision machining project. Our expert team is ready to 
              tackle your most challenging manufacturing requirements.
            </AnimatedParagraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GlowButton
                variant="primary"
                size="large"
                href="/contact"
                darkMode={darkMode}
              >
                Get Started Today
              </GlowButton>
              <GlowButton
                variant="secondary"
                size="large"
                href="/portfolio"
                darkMode={darkMode}
              >
                View Our Work
              </GlowButton>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  )
}

export default ManufacturingShowcase