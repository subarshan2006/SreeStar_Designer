'use client'

import React, { useState, useEffect } from 'react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { DesignCodeBadge, Heading, Caption, Body } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { MessageCircle, Scissors, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

export interface SpotlightItem {
  id: string
  code: string
  title: string
  category: string
  embroideryType: string
  fabric: string
  story: string
  hoursCrafted: string
  imageUrl: string
  width: number
  height: number
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'spotlight-1',
    code: 'D-0104',
    title: 'Peacock Zardosi Muhurtham Blouse',
    category: 'Bridal Blouse',
    embroideryType: 'Hand Maggam, French Knots & Pure Pearls',
    fabric: 'Pure Kanchipuram Raw Silk',
    story: 'Crafted over 48 hours of artisanal hand needlework. Symmetrical peacock motifs adorn the elbow cuffs with micro-pearl drop tassels along the deep back curvature.',
    hoursCrafted: '48 Hours Artisanal Work',
    imageUrl: '/placeholders/placeholder-d-0001.svg',
    width: 900,
    height: 1200,
  },
  {
    id: 'spotlight-2',
    code: 'D-0219',
    title: 'Lotus Kundan Reception Velvet Blouse',
    category: 'Grand Blouse',
    embroideryType: 'Uncut Kundan Stones & Antique Gold Zari',
    fabric: 'Royal Deep Wine Velvet',
    story: 'Designed for evening wedding receptions. High-density floral Kundan work glimmers under chandelier lighting with an illusion sweetheart front and pot neck back.',
    hoursCrafted: '36 Hours Precision Work',
    imageUrl: '/placeholders/placeholder-d-0002.svg',
    width: 900,
    height: 1200,
  },
  {
    id: 'spotlight-3',
    code: 'D-0312',
    title: 'Temple Gopuram Zari Muhurtham Blouse',
    category: 'Bridal Blouse',
    embroideryType: 'Traditional Nakshi & Gold Bullion Wire',
    fabric: 'Crimson Vermilion Raw Silk',
    story: 'Inspired by sacred South Indian temple architecture. Intricate gopuram border patterns with reinforced armhole curvature engineered for day-long bridal comfort.',
    hoursCrafted: '52 Hours Master Work',
    imageUrl: '/placeholders/placeholder-d-0003.svg',
    width: 900,
    height: 1200,
  },
  {
    id: 'spotlight-4',
    code: 'D-0418',
    title: 'Flared Organza Grand Gala Frock',
    category: 'Grand Frock',
    embroideryType: 'Micro-Pleated Bodice with Zari Borders',
    fabric: 'Pure Tissue Organza & Satin Lining',
    story: 'Voluminous multi-tiered party gown frock tailored with structured inner crinoline for effortless movement at wedding sangeets and milestone celebrations.',
    hoursCrafted: '28 Hours Atelier Tailoring',
    imageUrl: '/placeholders/placeholder-d-0004.svg',
    width: 900,
    height: 1200,
  },
]

export function BridalSpotlight({
  onOpenBooking,
}: {
  onOpenBooking?: (code?: string) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = SPOTLIGHT_ITEMS[activeIndex]

  // Optional auto-rotate every 7 seconds if user hasn't interacted recently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length)
  }

  const waText = `Hi ${SITE_CONFIG.shopName}! I am enchanted by your Spotlight design *${current.code}* (${current.title}). Can I know fitting and stitching details?`

  return (
    <section
      aria-label="Bridal and Grand Spotlight"
      className="relative w-full py-20 sm:py-28 bg-surface-card border-t border-b border-surface-border overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-maroon" />
              <Caption>Atelier Masterworks • Bridal & Grand Collection</Caption>
            </div>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl lg:text-6xl mt-2 text-charcoal">
              Bridal & Grand Spotlight
            </Heading>
          </div>

          {/* Slide Fraction & Controls */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tracking-widest text-charcoal-muted">
              <span className="font-bold text-maroon text-base">0{activeIndex + 1}</span> / 0{SPOTLIGHT_ITEMS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Spotlight Design"
                className="w-10 h-10 rounded-full border border-surface-border bg-ivory flex items-center justify-center text-charcoal hover:border-maroon hover:bg-maroon hover:text-white transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Spotlight Design"
                className="w-10 h-10 rounded-full border border-surface-border bg-ivory flex items-center justify-center text-charcoal hover:border-maroon hover:bg-maroon hover:text-white transition-colors focus:outline-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Spotlight Presentation: Two-Column Runway Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Portrait Hero Photography (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-ivory rounded-sm overflow-hidden border border-surface-border shadow-2xl">
              <OptimizedImage
                key={current.id}
                src={current.imageUrl}
                alt={current.title}
                width={current.width}
                height={current.height}
                priority={true}
                className="transition-all duration-700 ease-out scale-100"
              />

              {/* Floating Code Badge */}
              <div className="absolute top-4 left-4 z-20">
                <DesignCodeBadge code={current.code} />
              </div>

              {/* Crafting Time Badge */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-charcoal/85 backdrop-blur text-gold-shimmer rounded-full border border-gold/30">
                  {current.hoursCrafted}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Narrative & Dual CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-light border border-maroon/20 text-maroon text-xs font-mono uppercase tracking-wider">
                <span>{current.category}</span>
                <span>•</span>
                <span>Signature Piece</span>
              </div>

              <Heading level={3} variant="serif" italic className="text-3xl sm:text-4xl text-charcoal">
                {current.title}
              </Heading>

              <div className="space-y-1 font-mono text-xs text-charcoal-muted border-l-2 border-maroon pl-3">
                <p className="font-semibold text-charcoal uppercase">{current.embroideryType}</p>
                <p>Base Fabric: {current.fabric}</p>
              </div>

              <Body size="base" tone="muted" className="leading-relaxed">
                {current.story}
              </Body>

              {/* Atelier Fitting Guarantee Box */}
              <div className="p-4 bg-ivory rounded border border-surface-border text-xs text-charcoal-muted space-y-1.5">
                <p className="font-mono text-xs font-bold text-charcoal uppercase flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-maroon" />
                  <span>Custom Drape & Body Geometry</span>
                </p>
                <p className="leading-relaxed">
                  Tailored to your shoulder slope, back depth, and armhole measurements. 100% trial fit guarantee with free immediate adjustments.
                </p>
              </div>
            </div>

            {/* Conversion Actions */}
            <div className="space-y-3 pt-4 border-t border-surface-border">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-maroon text-white hover:bg-maroon-hover px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-bold shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenBooking) onOpenBooking(current.code)
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-charcoal/30 hover:border-maroon hover:text-maroon px-5 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold transition-colors bg-ivory"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book a Fitting</span>
                </button>
              </div>

              {/* Quick Slide Navigation Dots */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                {SPOTLIGHT_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to spotlight design ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                      activeIndex === idx ? 'w-8 bg-maroon' : 'w-2 bg-surface-border hover:bg-charcoal/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
