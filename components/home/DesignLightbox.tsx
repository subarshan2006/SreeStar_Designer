'use client'

import React, { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, MessageCircle, Scissors, ArrowRight } from 'lucide-react'
import { DesignRecord } from '@/lib/api'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { DesignCodeBadge, Heading, Caption, Body } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'

export interface DesignLightboxProps {
  design: DesignRecord | null
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  onOpenBooking?: (code?: string) => void
}

export function DesignLightbox({
  design,
  onClose,
  onNext,
  onPrev,
  onOpenBooking,
}: DesignLightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Shallow URL routing: update URL query param ?design=CODE when open
  useEffect(() => {
    if (design) {
      const url = new URL(window.location.href)
      url.searchParams.set('design', design.designCode)
      window.history.replaceState({}, '', url.toString())
    } else {
      const url = new URL(window.location.href)
      if (url.searchParams.has('design')) {
        url.searchParams.delete('design')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [design])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!design) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
    }

    if (design) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [design, onClose, onNext, onPrev])

  if (!design) return null

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance && onNext) {
      onNext() // Swiped left -> Next
    } else if (distance < -minSwipeDistance && onPrev) {
      onPrev() // Swiped right -> Prev
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const waText = `Hi ${SITE_CONFIG.shopName}! I am interested in design code *${design.designCode}* (${design.title}). Can I know stitching price and fitting appointment availability?`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${design.title} details`}
      ref={dialogRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        // Close on clicking backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/85 backdrop-blur-md p-3 sm:p-6 lg:p-10 animate-fade-up select-none"
    >
      <div className="relative w-full max-w-5xl bg-ivory rounded-sm shadow-2xl border border-surface-border overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-ivory/80 text-charcoal hover:bg-maroon hover:text-white transition-colors shadow-md focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev & Next Floating Buttons */}
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous Design"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-ivory/90 text-charcoal hover:bg-maroon hover:text-white transition-all shadow-lg hidden sm:block focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {onNext && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next Design"
            className="absolute right-4 md:right-[42%] top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-ivory/90 text-charcoal hover:bg-maroon hover:text-white transition-all shadow-lg hidden sm:block focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Left: Large Image Presentation */}
        <div className="relative md:w-3/5 bg-surface-card flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[440px] md:min-h-[580px]">
          <OptimizedImage
            src={design.imageUrl}
            alt={design.title}
            width={design.width}
            height={design.height}
            aspectRatio={design.aspectRatio}
            priority={true}
            className="object-contain max-h-[85vh] w-full"
          />
        </div>

        {/* Right: Garment Specifications & Direct WhatsApp Enquiry */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <DesignCodeBadge code={design.designCode} />
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal-subtle">
                {design.categoryName}
              </span>
            </div>

            <div>
              <Heading level={2} variant="serif" italic className="text-2xl sm:text-3xl text-charcoal">
                {design.title}
              </Heading>
              <p className="font-mono text-xs text-maroon font-semibold mt-1">
                {design.workType}
              </p>
            </div>

            <Body size="sm" tone="muted" className="leading-relaxed">
              {design.description}
            </Body>

            {/* Fabric Recommendations */}
            <div className="pt-2">
              <Caption>Recommended Fabrics</Caption>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {design.fabricOptions?.map((fab) => (
                  <span
                    key={fab}
                    className="font-mono text-[11px] px-2.5 py-1 bg-surface-card border border-surface-border rounded text-charcoal-muted"
                  >
                    {fab}
                  </span>
                ))}
              </div>
            </div>

            {/* Studio Fit Promise */}
            <div className="p-3 bg-surface-card rounded border border-surface-border text-xs text-charcoal-muted space-y-1">
              <p className="font-semibold text-charcoal flex items-center gap-1.5 font-mono uppercase text-[11px]">
                <span>✓</span> 100% Precision Fit Guarantee
              </p>
              <p className="text-[11px]">
                Custom drafted armhole curve and shoulder balance. Free immediate fitting alterations.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-surface-border">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-maroon text-white hover:bg-maroon-hover px-5 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose()
                if (onOpenBooking) onOpenBooking(design.designCode)
              }}
              className="w-full inline-flex items-center justify-center gap-2 border border-charcoal/30 hover:border-maroon hover:text-maroon px-5 py-3 rounded text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Book a Fitting with this Code</span>
            </button>

            <div className="text-center pt-1">
              <a
                href={`/collections/${design.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-charcoal-muted hover:text-maroon uppercase tracking-wider"
              >
                <span>View More in {design.categoryName}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
