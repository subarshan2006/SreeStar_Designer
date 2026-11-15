'use client'

import React from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { DesignCodeBadge } from '@/components/ui/typography'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ArrowRight, Sparkles, MessageCircle, Scissors } from 'lucide-react'

export interface HeroCard {
  id: string
  code: string
  title: string
  category: string
  workType: string
  imageUrl: string
  width: number
  height: number
  offsetClass: string
}

const HERO_FEATURED_GARMENTS: HeroCard[] = [
  {
    id: 'hero-1',
    code: 'D-0104',
    title: 'Peacock Zardosi Bridal Silk Blouse',
    category: 'Bridal Blouse',
    workType: 'Maggam & French Knots',
    imageUrl: '/placeholders/placeholder-d-0001.svg',
    width: 800,
    height: 1100,
    offsetClass: 'translate-y-0',
  },
  {
    id: 'hero-2',
    code: 'D-0219',
    title: 'Lotus Kundan Heavy Cut Velvet',
    category: 'Grand Blouse',
    workType: 'Kundan & Zari Work',
    imageUrl: '/placeholders/placeholder-d-0002.svg',
    width: 800,
    height: 1240,
    offsetClass: 'sm:translate-y-12 md:translate-y-16',
  },
  {
    id: 'hero-3',
    code: 'D-0902',
    title: 'Vintage 90s Retro Puff Sleeve',
    category: '90s Collection',
    workType: 'Classic Puff & Extended Cuff',
    imageUrl: '/placeholders/placeholder-d-0003.svg',
    width: 800,
    height: 1040,
    offsetClass: 'sm:-translate-y-6 md:-translate-y-8 hidden md:flex',
  },
  {
    id: 'hero-4',
    code: 'D-0412',
    title: 'Flared Organza Grand Party Frock',
    category: 'Frocks',
    workType: 'Tiered Pleating & Zari Trim',
    imageUrl: '/placeholders/placeholder-d-0004.svg',
    width: 800,
    height: 1200,
    offsetClass: 'sm:translate-y-8 md:translate-y-20 hidden lg:flex',
  },
]

export function HeroSection({
  onOpenBooking,
}: {
  onOpenBooking?: () => void
}) {
  return (
    <section
      aria-label="Hero Showcase"
      className="relative w-full pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-24 overflow-hidden bg-ivory selection:bg-maroon selection:text-ivory"
    >
      {/* Background Subtle Luxury Glow */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-gold-shimmer/35 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10vw] w-[35vw] h-[35vw] rounded-full bg-maroon-light/40 blur-3xl -z-10 pointer-events-none" />

      {/* Top Studio Meta Bar */}
      <div className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 mb-4 sm:mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-surface-border/60 pb-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-maroon animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-charcoal-muted">
            Women&apos;s Tailoring Studio • {SITE_CONFIG.city}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-charcoal-subtle">
          <span>500+ Bespoke Designs</span>
          <span>•</span>
          <span>Zero Saree Sales</span>
          <span>•</span>
          <span className="text-maroon font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Wedding Slots Open
          </span>
        </div>
      </div>

      {/* Giant Wordmark & Tagline Container */}
      <div className="relative w-full max-w-[98vw] mx-auto px-2 sm:px-4">
        {/* Layer 0: The Giant Wordmark Header */}
        <div className="relative z-0 flex flex-col lg:flex-row lg:items-baseline justify-between select-none">
          <h1
            className="font-display font-black uppercase text-charcoal leading-none select-none tracking-tighter m-0 p-0 text-[17.2vw] sm:text-[17vw] md:text-[16.5vw] lg:text-[16vw]"
            style={{
              letterSpacing: '-0.05em',
              lineHeight: 0.82,
            }}
          >
            {SITE_CONFIG.shopName.toUpperCase()}
          </h1>

          {/* Tagline right-aligned with wordmark baseline */}
          <div className="mt-4 lg:mt-0 lg:max-w-xs xl:max-w-sm pl-2 lg:pl-6 text-left">
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-charcoal leading-snug">
              {SITE_CONFIG.tagline}
            </p>
            <p className="font-sans text-xs sm:text-sm text-charcoal-muted mt-2 tracking-normal">
              Specialized in bridal maggam work, grand party wear, designer cuts, and precision silhouettes.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-2 text-xs font-mono uppercase tracking-wider rounded hover:bg-maroon-hover transition-colors"
              >
                <span>Book a Fitting</span>
                <Scissors className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20would%20like%20to%20enquire%20about%20blouse%20stitching.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-charcoal hover:text-maroon transition-colors py-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Layer 1: Overlap Zone (Garments floating in front of Wordmark) */}
        <div className="relative z-10 -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-28 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto px-2">
            {HERO_FEATURED_GARMENTS.map((garment, idx) => {
              const delay = idx * 120

              return (
                <div
                  key={garment.id}
                  className={`group relative flex flex-col bg-surface-card rounded-sm overflow-hidden shadow-xl border border-surface-border transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${garment.offsetClass}`}
                  style={{
                    animationDelay: `${delay}ms`,
                  }}
                >
                  {/* Image Presentation with Zero CLS */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={garment.imageUrl}
                      alt={garment.title}
                      width={garment.width}
                      height={garment.height}
                      priority={idx < 2}
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Top badges */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <DesignCodeBadge code={garment.code} />
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-20">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-maroon text-white rounded">
                        {garment.category}
                      </span>
                    </div>

                    {/* Bottom floating details inside photo */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 text-white flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-mono tracking-widest uppercase text-gold-shimmer">
                          {garment.workType}
                        </p>
                        <h3 className="text-xs sm:text-sm font-serif font-medium line-clamp-1">
                          {garment.title}
                        </h3>
                      </div>
                      <Link
                        href={`/collections/bridal-blouses`}
                        className="text-white hover:text-gold transition-colors p-1"
                        aria-label={`View ${garment.title}`}
                      >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
