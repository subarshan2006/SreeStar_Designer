'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface GiantWordmarkProps {
  /** The primary brand name text, default "SREESTAR" */
  text?: string
  /** Secondary tagline placed next to the wordmark in Hero variant */
  tagline?: string
  /** Sub-tagline or location/specialty */
  cityNote?: string
  /** Presentation variant */
  variant?: 'hero' | 'footer' | 'inline' | 'watermark'
  /** Text color override class */
  color?: string
  /** Whether this renders an overlap zone container for floating garment images */
  overlap?: boolean
  /** Children placed in the overlap foreground layer (e.g., hero garment cards) */
  children?: React.ReactNode
  /** Extra class names */
  className?: string
  /** Accessible label */
  ariaLabel?: string
}

export function GiantWordmark({
  text = 'SREESTAR',
  tagline = "Custom blouses + women's tailoring.",
  cityNote = 'Chennai • Bespoke Craftsmanship',
  variant = 'hero',
  color,
  overlap = true,
  children,
  className,
  ariaLabel,
}: GiantWordmarkProps) {
  const accessibleName = ariaLabel || `${text} - ${tagline}`

  if (variant === 'footer') {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden select-none pt-12 pb-6 border-t border-surface-border bg-ivory-dark/40',
          className
        )}
        role="region"
        aria-label={accessibleName}
      >
        <div className="max-w-[96vw] mx-auto flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-charcoal-muted px-2 mb-2 font-mono">
            <span>Tailoring Studio</span>
            <span>Est. 2012</span>
            <span>{cityNote}</span>
          </div>

          <div className="relative w-full text-center">
            <h2
              className={cn(
                'font-display font-black tracking-tighter text-charcoal leading-none transition-transform duration-700 select-none uppercase',
                'text-[15.5vw] sm:text-[15.8vw] md:text-[16vw] lg:text-[16.2vw]',
                color
              )}
              style={{
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
              }}
            >
              {text}
            </h2>
          </div>

          <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted border-t border-charcoal/10 pt-4 font-sans gap-2">
            <p>© {new Date().getFullYear()} {text} Tailoring. All rights reserved. Women Only.</p>
            <p className="font-mono text-[11px] tracking-wider uppercase text-charcoal-subtle">
              Award UI • Crafted for Precision
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'watermark') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none select-none absolute inset-x-0 overflow-hidden flex items-center justify-center opacity-[0.035] -z-10',
          className
        )}
      >
        <span
          className="font-display font-black uppercase text-[28vw] leading-none tracking-tighter text-charcoal whitespace-nowrap"
          style={{ letterSpacing: '-0.06em' }}
        >
          {text}
        </span>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn('relative w-full overflow-hidden py-4', className)}>
        <span
          className={cn(
            'block font-display font-bold uppercase tracking-tight text-charcoal text-[10vw] sm:text-[8vw] leading-none',
            color
          )}
        >
          {text}
        </span>
      </div>
    )
  }

  // Default: 'hero' variant with overlapping garment positioning
  return (
    <section
      className={cn(
        'relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] pt-24 sm:pt-28 md:pt-32 overflow-hidden bg-ivory',
        className
      )}
      aria-label={accessibleName}
    >
      {/* Background Subtle Watermark Glow */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-gold-shimmer/30 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10vw] w-[35vw] h-[35vw] rounded-full bg-maroon-light/40 blur-3xl -z-10 pointer-events-none" />

      {/* Top Meta Bar above Wordmark */}
      <div className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 mb-4 sm:mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-surface-border/60 pb-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-maroon animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-charcoal-muted">
            Women&apos;s Tailoring Studio • {cityNote}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-charcoal-subtle">
          <span>500+ Bespoke Designs</span>
          <span>•</span>
          <span>Zero Saree Sales</span>
          <span>•</span>
          <span className="text-maroon font-semibold">Wedding Slots Open</span>
        </div>
      </div>

      {/* Hero Wordmark Container */}
      <div className="relative w-full max-w-[98vw] mx-auto px-2 sm:px-4">
        {/* Layer 0: The Giant Wordmark */}
        <div className="relative z-0 flex flex-col lg:flex-row lg:items-baseline justify-between select-none">
          <h1
            className={cn(
              'font-display font-black uppercase text-charcoal leading-none select-none tracking-tighter m-0 p-0',
              'text-[17.2vw] sm:text-[17vw] md:text-[16.5vw] lg:text-[16vw]',
              color
            )}
            style={{
              letterSpacing: '-0.05em',
              lineHeight: 0.82,
            }}
          >
            {text}
          </h1>

          {/* Tagline right-aligned with wordmark base */}
          <div className="mt-4 lg:mt-0 lg:max-w-xs xl:max-w-sm pl-2 lg:pl-6 text-left">
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-charcoal leading-snug">
              {tagline}
            </p>
            <p className="font-sans text-xs sm:text-sm text-charcoal-muted mt-2 tracking-normal">
              Specialized in bridal maggam work, grand party wear, designer cuts, and precision silhouettes.
            </p>
          </div>
        </div>

        {/* Layer 1: Overlap Zone (Garments floating in front of Wordmark) */}
        {overlap && (
          <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24 lg:-mt-32 pt-2">
            {children || (
              /* High-fashion default overlap showcase cards */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto px-2">
                {/* Garment Card 1 */}
                <div className="group relative aspect-[3/4] bg-surface-card rounded-sm overflow-hidden shadow-xl border border-surface-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
                  <div className="w-full h-full bg-[#EAD8C7] flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[10px] tracking-widest text-charcoal-muted uppercase mb-1">Bridal Maggam</span>
                    <span className="font-serif italic text-base sm:text-lg text-charcoal">Peacock Zardosi</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[11px] font-mono tracking-widest uppercase text-gold-shimmer">D-0104</p>
                      <p className="text-xs sm:text-sm font-serif font-medium">Bridal Silk Blouse</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-maroon rounded">Bridal</span>
                  </div>
                </div>

                {/* Garment Card 2 (Staggered offset) */}
                <div className="group relative aspect-[3/4] bg-surface-card rounded-sm overflow-hidden shadow-xl border border-surface-border mt-6 sm:mt-10 md:mt-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
                  <div className="w-full h-full bg-[#DBCBB8] flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[10px] tracking-widest text-charcoal-muted uppercase mb-1">Grand Blouse</span>
                    <span className="font-serif italic text-base sm:text-lg text-charcoal">Lotus Kundan Cut</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[11px] font-mono tracking-widest uppercase text-gold-shimmer">D-0219</p>
                      <p className="text-xs sm:text-sm font-serif font-medium">Heavy Work Velvet</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-gold text-charcoal font-semibold rounded">Grand</span>
                  </div>
                </div>

                {/* Garment Card 3 */}
                <div className="group relative aspect-[3/4] bg-surface-card rounded-sm overflow-hidden shadow-xl border border-surface-border -mt-2 sm:-mt-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
                  <div className="w-full h-full bg-[#E5D7CA] flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[10px] tracking-widest text-charcoal-muted uppercase mb-1">90s Retro</span>
                    <span className="font-serif italic text-base sm:text-lg text-charcoal">Vintage Puff Sleeve</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[11px] font-mono tracking-widest uppercase text-gold-shimmer">D-0902</p>
                      <p className="text-xs sm:text-sm font-serif font-medium">90s Classic Cotton</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-charcoal text-ivory rounded">90s</span>
                  </div>
                </div>

                {/* Garment Card 4 (Staggered offset) */}
                <div className="group relative aspect-[3/4] bg-surface-card rounded-sm overflow-hidden shadow-xl border border-surface-border mt-8 sm:mt-12 md:mt-16 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
                  <div className="w-full h-full bg-[#DFD0BF] flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[10px] tracking-widest text-charcoal-muted uppercase mb-1">Occasion Wear</span>
                    <span className="font-serif italic text-base sm:text-lg text-charcoal">Flared Organza Frock</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[11px] font-mono tracking-widest uppercase text-gold-shimmer">D-0412</p>
                      <p className="text-xs sm:text-sm font-serif font-medium">Grand Party Frock</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-maroon-accent text-white rounded">Frock</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
