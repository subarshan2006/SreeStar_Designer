'use client'

import React, { useState, useRef } from 'react'
import { Heading, Caption } from '@/components/ui/typography'
import { Volume2, VolumeX, Play, MessageCircle, Instagram } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export interface ReelItem {
  id: string
  title: string
  category: string
  code: string
  duration: string
  posterUrl: string
  videoUrl?: string
}

const CURATED_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Bridal Peacock Maggam Close-Up',
    category: 'Hand Maggam Work',
    code: 'D-0104',
    duration: '0:15',
    posterUrl: '/placeholders/video-poster-01.svg',
  },
  {
    id: 'reel-2',
    title: 'Lotus Kundan Velvet Back-Neck 360°',
    category: 'Reception Heavy Work',
    code: 'D-0219',
    duration: '0:18',
    posterUrl: '/placeholders/video-poster-02.svg',
  },
  {
    id: 'reel-3',
    title: 'Master Cutter Armhole Drape & Fitting',
    category: 'Precision Cutwork',
    code: 'D-0312',
    duration: '0:12',
    posterUrl: '/placeholders/video-poster-03.svg',
  },
  {
    id: 'reel-4',
    title: 'Flared Organza Gala Frock Twirl',
    category: 'Occasion Gowns',
    code: 'D-0418',
    duration: '0:14',
    posterUrl: '/placeholders/video-poster-04.svg',
  },
  {
    id: 'reel-5',
    title: '1990s Retro Puff Sleeve Fitting Moment',
    category: 'Retro Heritage',
    code: 'D-0902',
    duration: '0:16',
    posterUrl: '/placeholders/video-poster-05.svg',
  },
]

export function VideoReels({
  onSelectReelCode,
}: {
  onSelectReelCode?: (code: string) => void
}) {
  const [activeAudioReel, setActiveAudioReel] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleSound = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveAudioReel((prev) => (prev === reelId ? null : reelId))
  }

  return (
    <section
      ref={containerRef}
      aria-label="Atelier Video Reels"
      className="relative w-full py-20 sm:py-28 bg-ivory text-charcoal overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-maroon animate-pulse" />
            <Caption>Behind The Seams • Finished Garment Reels</Caption>
          </div>
          <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl mt-2 text-charcoal">
            Finished Looks & Fitting Moments
          </Heading>
          <p className="font-sans text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl">
            Watch our master tailors stitch intricate bullion knots, drape structured organza pleats, and verify milimetric fitting precision.
          </p>
        </div>

        <a
          href={`https://instagram.com/${SITE_CONFIG.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal hover:text-maroon font-semibold border border-surface-border px-3.5 py-2 rounded bg-surface-card hover:bg-ivory transition-colors"
        >
          <Instagram className="w-3.5 h-3.5 text-maroon" />
          <span>Follow @{SITE_CONFIG.instagram}</span>
        </a>
      </div>

      {/* Horizontal Scrollable Reel Container */}
      <div className="w-full overflow-x-auto scrollbar-none px-4 sm:px-8 lg:px-12 pb-4">
        <div className="flex items-center gap-4 sm:gap-6 min-w-max">
          {CURATED_REELS.map((reel) => {
            const isMuted = activeAudioReel !== reel.id
            const waText = `Hi ${SITE_CONFIG.shopName}! I saw your reel *${reel.title}* (${reel.code}). Can I know more about stitching this?`

            return (
              <div
                key={reel.id}
                onClick={() => {
                  if (onSelectReelCode) onSelectReelCode(reel.code)
                }}
                className="group relative w-[240px] sm:w-[280px] md:w-[310px] aspect-[9/16] rounded-sm overflow-hidden bg-charcoal border border-surface-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex-shrink-0"
              >
                {/* Poster Background */}
                <img
                  src={reel.posterUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Ambient Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/40 group-hover:from-charcoal/95 transition-all" />

                {/* Top Overlay: Category & Audio Switcher */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/20 backdrop-blur text-white rounded">
                    {reel.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleSound(reel.id, e)}
                    aria-label={isMuted ? 'Unmute Reel' : 'Mute Reel'}
                    className="p-2 rounded-full bg-black/40 backdrop-blur text-white hover:bg-maroon transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold-shimmer" />}
                  </button>
                </div>

                {/* Center Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-maroon/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Bottom Overlay: Title, Code & WhatsApp Enquiry */}
                <div className="absolute bottom-4 inset-x-4 z-20 text-white space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gold-shimmer">
                    <span>{reel.code}</span>
                    <span>{reel.duration}</span>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-medium line-clamp-2 leading-snug">
                    {reel.title}
                  </h3>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Tap for details
                    </span>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-gold-shimmer hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
