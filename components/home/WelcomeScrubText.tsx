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

      // Progress goes from 0 (when top hits top of viewport) to 1 (when bottom meets bottom of viewport)
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance))
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
      className="relative w-full min-h-[220vh] bg-ivory selection:bg-maroon selection:text-ivory"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-8 md:px-14 py-12 sm:py-16 overflow-hidden">
        {/* Background Delicate Studio Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.03] -z-10"
        >
          <span className="font-display font-black text-[25vw] uppercase tracking-tighter text-charcoal">
            {shopName}
          </span>
        </div>

        {/* Top Meta Pin Badge */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-surface-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-maroon" />
            <Caption>The SreeStar Philosophy • Craftsmanship & Fit</Caption>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-charcoal-subtle">
            <Scissors className="w-3.5 h-3.5 text-maroon" />
            <span>Zero Saree Sales • Women Only Tailoring</span>
          </div>
        </div>

        {/* Center: The Word-by-Word Scroll Scrub Text */}
        <div className="max-w-5xl mx-auto w-full my-auto py-8">
          <blockquote className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.25] sm:leading-[1.2]">
            {words.map((word, idx) => {
              // Calculate threshold for this word (0.05 to 0.95 range)
              const wordThreshold = 0.05 + (idx / words.length) * 0.88
              const isRevealed = isReducedMotion || scrollProgress >= wordThreshold

              return (
                <span
                  key={`${word}-${idx}`}
                  className="inline-block transition-all duration-300 ease-out mr-[0.26em]"
                  style={{
                    opacity: isRevealed ? 1 : 0.12,
                    transform: isRevealed ? 'translateY(0px)' : 'translateY(8px)',
                    color: isRevealed ? '#141413' : '#A39E96',
                  }}
                >
                  {word}
                </span>
              )
            })}
          </blockquote>

          {/* Progress Indicator Line */}
          <div className="mt-8 sm:mt-12 flex items-center gap-4 max-w-xs">
            <div className="h-[2px] flex-1 bg-surface-border overflow-hidden rounded-full">
              <div
                className="h-full bg-maroon transition-all duration-150 ease-out"
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
