'use client'

import React, { useEffect, useRef, useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { Caption } from '@/components/ui/typography'
import { Scissors, Sparkles } from 'lucide-react'

export interface WelcomeScrubTextProps {
  shopName?: string
}

export function WelcomeScrubText({
  shopName = SITE_CONFIG.shopName,
}: WelcomeScrubTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false)

  const statement = `Welcome to ${shopName}. Every blouse begins with your measurements and ends with your confidence. From bridal blouses to everyday kurtis, we stitch each piece with care, precision, and your story.`
  const words = statement.split(' ')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleScroll = () => {
      if (mediaQuery.matches || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollableDistance = rect.height - window.innerHeight

      if (totalScrollableDistance <= 0) return

      // Progress ranges from 0.0 (top hits viewport) to 1.0 (bottom meets bottom of viewport)
      const scrolled = -rect.top
      const rawProgress = scrolled / totalScrollableDistance
      const progress = Math.max(0, Math.min(1, rawProgress))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      aria-label="Welcome Manifesto"
      className="relative w-full min-h-[185vh] sm:min-h-[225vh] bg-ivory selection:bg-maroon selection:text-ivory select-none"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-8 md:px-14 py-10 sm:py-16 overflow-hidden">
        {/* Background Delicate Studio Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.035] -z-10"
        >
          <span className="font-display font-black text-[28vw] uppercase tracking-tighter text-charcoal">
            {shopName}
          </span>
        </div>

        {/* Top Meta Pin Badge */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-surface-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-maroon animate-ping" />
            <Caption>The SreeStar Philosophy • Craftsmanship & Fit</Caption>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-charcoal-subtle">
            <Scissors className="w-3.5 h-3.5 text-maroon" />
            <span>Zero Saree Sales • Women Only Tailoring</span>
          </div>
        </div>

        {/* Center: The Word-by-Word Scroll Scrub Text */}
        <div className="max-w-5xl mx-auto w-full my-auto py-6 sm:py-8">
          <blockquote className="font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.3] sm:leading-[1.2]">
            {words.map((word, idx) => {
              // Evenly distribute each word's reveal threshold across 0.05 to 0.92 scroll range
              const wordStart = 0.04 + (idx / words.length) * 0.88
              const wordWindow = 0.06 // smooth fade window

              let wordProgress = 0
              if (isReducedMotion) {
                wordProgress = 1
              } else if (scrollProgress >= wordStart + wordWindow) {
                wordProgress = 1
              } else if (scrollProgress <= wordStart) {
                wordProgress = 0
              } else {
                wordProgress = (scrollProgress - wordStart) / wordWindow
              }

              // Smoothly interpolate opacity (0.12 -> 1.0) and vertical translation (8px -> 0px)
              const opacity = 0.12 + 0.88 * wordProgress
              const translateY = Math.round(8 * (1 - wordProgress))
              const isFullyVisible = wordProgress >= 0.85

              return (
                <span
                  key={`${word}-${idx}`}
                  className="inline-block transition-transform duration-100 ease-out mr-[0.24em]"
                  style={{
                    opacity,
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    color: isFullyVisible ? '#141413' : '#A8A399',
                  }}
                >
                  {word}
                </span>
              )
            })}
          </blockquote>

          {/* Progress Indicator Line with Gold Accent */}
          <div className="mt-8 sm:mt-12 flex items-center gap-4 max-w-xs">
            <div className="h-[2px] flex-1 bg-surface-border overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-maroon to-gold transition-all duration-150 ease-out"
                style={{
                  width: `${Math.round((isReducedMotion ? 1 : scrollProgress) * 100)}%`,
                }}
              />
            </div>
            <span className="font-mono text-[10px] text-charcoal-subtle uppercase tracking-widest">
              {Math.min(100, Math.round((isReducedMotion ? 1 : scrollProgress) * 100))}% Read
            </span>
          </div>
        </div>

        {/* Bottom Tailor's Signature & Credo */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-surface-border/60 pt-4 text-xs font-mono text-charcoal-muted">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Chennai Master Atelier • 14+ Years of Precision Cutting</span>
          </div>
          <span className="text-charcoal-subtle uppercase tracking-widest text-[11px]">
            Scroll to explore Category Index ↓
          </span>
        </div>
      </div>
    </section>
  )
}
