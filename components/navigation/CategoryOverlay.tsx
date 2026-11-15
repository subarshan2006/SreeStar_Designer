'use client'

import React, { useEffect, useRef } from 'react'
import { X, ArrowRight, MessageCircle, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG, CATEGORIES_WITH_META } from '@/lib/constants'
import { Heading, Caption } from '@/components/ui/typography'

export { CATEGORIES_WITH_META }

export interface CategoryOverlayProps {
  isOpen: boolean
  onClose: () => void
  activeCategory?: string
  onSelectCategory?: (categoryId: string) => void
}

export function CategoryOverlay({
  isOpen,
  onClose,
  activeCategory = 'all',
  onSelectCategory,
}: CategoryOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key press & prevent body scrolling when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Collections and Categories Navigation"
      className="fixed inset-0 z-[100] bg-ivory text-charcoal flex flex-col justify-between animate-fade-up overflow-y-auto"
    >
      {/* Top Bar of Overlay */}
      <div className="w-full max-w-[96vw] mx-auto px-4 sm:px-8 py-6 flex items-center justify-between border-b border-surface-border">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-maroon animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">
            {SITE_CONFIG.shopName} Archive • 500+ Tailored Designs
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close collections overlay"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal hover:text-maroon transition-colors px-3 py-1.5 rounded border border-charcoal/20 hover:border-maroon"
        >
          <span>Close</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* Main Categories Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex-1">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <Caption>Curated Women&apos;s Tailoring Taxonomy</Caption>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl mt-1">
              Select a Collection
            </Heading>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted">
            <span>Women Only</span>
            <span>•</span>
            <span className="text-maroon font-semibold">Zero Saree Sales</span>
          </div>
        </div>

        {/* Category Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {CATEGORIES_WITH_META.map((cat, idx) => {
            const isSelected = activeCategory === cat.id

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.id)
                  }
                  onClose()
                }}
                className={`group relative p-4 sm:p-5 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-maroon bg-maroon-light/50 shadow-sm'
                    : 'border-surface-border bg-surface-card hover:border-charcoal/40 hover:bg-ivory-light hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[11px] text-charcoal-subtle">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-surface text-charcoal-muted rounded-full border border-surface-border">
                      {cat.count}
                    </span>
                    {cat.id === 'bridal-blouses' && (
                      <span className="w-2 h-2 rounded-full bg-maroon" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal group-hover:text-maroon transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-maroon" />
                  </h3>
                  <p className="text-xs text-charcoal-muted font-sans mt-1">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono text-charcoal-subtle">
                  <span>{cat.badge}</span>
                  <span className="uppercase text-[10px] tracking-widest text-maroon font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Archive →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Concierge & Fast Booking Footer */}
      <div className="w-full bg-surface-card border-t border-surface-border py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
          <div className="flex flex-wrap items-center gap-6 text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-maroon" />
              <span>{SITE_CONFIG.city} Studio</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-charcoal" />
              <span>{SITE_CONFIG.phone}</span>
            </span>
            <span className="hidden md:inline-block font-mono text-[11px]">
              Mon–Sat: 10AM–8:30PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20am%20browsing%20your%20collections%20and%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-maroon text-white px-4 py-2 rounded text-xs font-mono uppercase tracking-wider hover:bg-maroon-hover transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
