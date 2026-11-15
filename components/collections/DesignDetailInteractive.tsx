'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  MessageCircle,
  Share2,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Phone,
  ZoomIn,
} from 'lucide-react'
import { DesignRecord } from '@/lib/api'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { DesignCodeBadge } from '@/components/ui/typography'
import { HeartButton } from '@/components/ui/HeartButton'
import { BookingModal } from '@/components/navigation/BookingModal'
import { SITE_CONFIG } from '@/lib/constants'
import { createWhatsAppLink } from '@/lib/whatsapp'

export interface DesignDetailInteractiveProps {
  design: DesignRecord
  categorySlug?: string
}

interface AngleView {
  id: string
  label: string
  cropClass: string
  description: string
}

const ANGLE_VIEWS: AngleView[] = [
  {
    id: 'full',
    label: 'Full Silhouette',
    cropClass: 'object-cover object-center',
    description: 'Complete silhouette drape & proportion',
  },
  {
    id: 'neckline',
    label: 'Neckline & Border',
    cropClass: 'object-cover object-top scale-125 origin-top',
    description: 'Front neckline embroidery & piping finish',
  },
  {
    id: 'embroidery',
    label: 'Hand Needlework Macro',
    cropClass: 'object-cover object-center scale-150 origin-center',
    description: 'Artisanal Zardozi & Aari thread precision',
  },
  {
    id: 'back',
    label: 'Back & Tassel (Latkan)',
    cropClass: 'object-cover object-bottom scale-125 origin-bottom',
    description: 'Deep back neckline, dori ties & latkan styling',
  },
]

export function DesignDetailInteractive({
  design,
  categorySlug: _categorySlug,
}: DesignDetailInteractiveProps) {
  const [selectedAngle, setSelectedAngle] = useState(0)
  const [isFullscreenZoom, setIsFullscreenZoom] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [hasWebShare, setHasWebShare] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setHasWebShare(true)
    }
  }, [])

  // Keyboard navigation for fullscreen zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreenZoom) return
      if (e.key === 'Escape') setIsFullscreenZoom(false)
      if (e.key === 'ArrowRight') {
        setSelectedAngle((prev) => (prev + 1) % ANGLE_VIEWS.length)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedAngle((prev) => (prev - 1 + ANGLE_VIEWS.length) % ANGLE_VIEWS.length)
      }
    }

    if (isFullscreenZoom) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreenZoom])

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
    if (distance > 50) {
      // swipe left -> next
      setSelectedAngle((prev) => (prev + 1) % ANGLE_VIEWS.length)
    } else if (distance < -50) {
      // swipe right -> prev
      setSelectedAngle((prev) => (prev - 1 + ANGLE_VIEWS.length) % ANGLE_VIEWS.length)
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : ''
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleWebShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${design.title} | ${SITE_CONFIG.shopName}`,
          text: `Take a look at this custom tailoring design (${design.designCode}) by ${SITE_CONFIG.shopName} Chennai:`,
          url,
        })
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink()
    }
  }

  const currentView = ANGLE_VIEWS[selectedAngle]
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareWaText = `Hey! Check out this custom design *${design.designCode}* (${design.title}) at ${SITE_CONFIG.shopName} Chennai: ${currentUrl}`
  const shareWaLink = `https://wa.me/?text=${encodeURIComponent(shareWaText)}`

  const atelierEnquiryLink = createWhatsAppLink({
    type: 'design_enquiry',
    designCode: design.designCode,
    title: design.title,
  })

  return (
    <>
      <div className="space-y-6">
        {/* Main Hero Viewer Container */}
        <div
          className="relative bg-surface-card rounded-sm overflow-hidden border border-surface-border shadow-xl select-none group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Display Area */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
            <div
              className={`w-full h-full transition-transform duration-500 ease-out ${currentView.cropClass}`}
            >
              <OptimizedImage
                src={design.imageUrl}
                alt={`${design.title} - ${currentView.label} (${design.designCode})`}
                width={design.width}
                height={design.height}
                aspectRatio={design.aspectRatio}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlaid Badges: Top Left */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <DesignCodeBadge code={design.designCode} />
              <span className="font-mono text-[11px] uppercase font-bold tracking-widest px-2.5 py-1 bg-charcoal/90 text-ivory rounded backdrop-blur border border-white/10">
                {design.categoryName}
              </span>
            </div>

            {/* Overlaid Badges: Top Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {design.isNew && (
                <span className="font-mono text-xs uppercase font-bold tracking-widest px-3 py-1 bg-maroon text-white rounded shadow-md">
                  Fresh Creation
                </span>
              )}
              <HeartButton designCode={design.designCode} size="md" />
            </div>

            {/* Zoom Action Button: Bottom Right */}
            <button
              type="button"
              onClick={() => setIsFullscreenZoom(true)}
              aria-label="View Fullscreen High-Resolution"
              className="absolute bottom-4 right-4 z-20 p-2.5 bg-charcoal/85 hover:bg-maroon text-ivory rounded-full shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3"
            >
              <ZoomIn className="w-4 h-4" />
              <span className="hidden sm:inline">Macro Zoom</span>
            </button>

            {/* Angle Indicator Overlay: Bottom Left */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-charcoal/80 text-ivory/90 rounded backdrop-blur border border-white/10">
              Angle {selectedAngle + 1} of {ANGLE_VIEWS.length}: {currentView.label}
            </div>

            {/* Previous / Next Arrows (Visible on hover on desktop, always accessible via swipe) */}
            <button
              type="button"
              onClick={() =>
                setSelectedAngle(
                  (prev) => (prev - 1 + ANGLE_VIEWS.length) % ANGLE_VIEWS.length
                )
              }
              aria-label="Previous view angle"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-charcoal/60 hover:bg-charcoal text-ivory opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden sm:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setSelectedAngle((prev) => (prev + 1) % ANGLE_VIEWS.length)
              }
              aria-label="Next view angle"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-charcoal/60 hover:bg-charcoal text-ivory opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden sm:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Angle Thumbnails Row */}
          <div className="p-3 bg-surface-card border-t border-surface-border">
            <p className="text-[11px] font-mono uppercase tracking-wider text-charcoal-muted mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Multi-Angle Atelier Inspect:</span>
            </p>
            <div className="grid grid-cols-4 gap-2">
              {ANGLE_VIEWS.map((angle, idx) => {
                const isActive = selectedAngle === idx
                return (
                  <button
                    key={angle.id}
                    type="button"
                    onClick={() => setSelectedAngle(idx)}
                    aria-label={`View ${angle.label}`}
                    aria-current={isActive}
                    className={`relative rounded overflow-hidden border text-left p-1.5 transition-all ${
                      isActive
                        ? 'border-maroon ring-2 ring-maroon/20 bg-ivory shadow-sm'
                        : 'border-surface-border hover:border-charcoal-muted/50 bg-surface'
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-1">
                      <div className={`w-full h-full ${angle.cropClass}`}>
                        <OptimizedImage
                          src={design.imageUrl}
                          alt=""
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span
                      className={`block text-[10px] font-mono leading-tight truncate ${
                        isActive ? 'text-maroon font-bold' : 'text-charcoal-muted'
                      }`}
                    >
                      {angle.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Social Share & Engagement Suite */}
        <div className="bg-surface-card p-4 rounded-sm border border-surface-border space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-maroon" />
              <span>Share Silhouette</span>
            </span>
            <span className="text-[11px] text-charcoal-subtle">
              Code: {design.designCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Share to Friends/Family */}
            <a
              href={shareWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-mono text-xs uppercase tracking-wider font-semibold rounded border border-[#25D366]/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Share with Bridesmaids / Family</span>
            </a>

            {/* Native Web Share or Copy Link */}
            {hasWebShare ? (
              <button
                type="button"
                onClick={handleWebShare}
                aria-label="Share via apps"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-surface hover:bg-ivory text-charcoal font-mono text-xs uppercase tracking-wider font-semibold rounded border border-surface-border transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            ) : null}

            {/* Copy Direct Link Button with Toast */}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy design link"
              className="relative inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-surface hover:bg-ivory text-charcoal font-mono text-xs uppercase tracking-wider font-semibold rounded border border-surface-border transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Primary Atelier CTAs Row */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <a
              href={atelierEnquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-maroon hover:bg-maroon-hover text-ivory font-mono uppercase text-xs tracking-widest font-bold rounded shadow-lg transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp About {design.designCode}</span>
            </a>

            <HeartButton designCode={design.designCode} size="lg" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface-card hover:bg-ivory border border-surface-border text-charcoal font-mono uppercase text-xs tracking-wider font-semibold rounded transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-maroon" />
              <span>Call Atelier</span>
            </a>

            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface-card hover:bg-ivory border border-surface-border text-charcoal font-mono uppercase text-xs tracking-wider font-semibold rounded transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book a Fitting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isFullscreenZoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${design.title} High-Resolution Fullscreen View`}
          className="fixed inset-0 z-[120] bg-charcoal/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-ivory border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gold block">
                {design.designCode} • {design.categoryName}
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold">{design.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ivory/60 hidden sm:inline">
                Angle: {currentView.label}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreenZoom(false)}
                aria-label="Close fullscreen view"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Image Canvas */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative max-h-[75vh] aspect-[3/4] max-w-full rounded shadow-2xl overflow-hidden">
              <div className={`w-full h-full ${currentView.cropClass}`}>
                <OptimizedImage
                  src={design.imageUrl}
                  alt={design.title}
                  width={design.width}
                  height={design.height}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Prev/Next buttons */}
            <button
              type="button"
              onClick={() =>
                setSelectedAngle(
                  (prev) => (prev - 1 + ANGLE_VIEWS.length) % ANGLE_VIEWS.length
                )
              }
              aria-label="Previous angle"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal/80 hover:bg-maroon text-ivory transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setSelectedAngle((prev) => (prev + 1) % ANGLE_VIEWS.length)
              }
              aria-label="Next angle"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal/80 hover:bg-maroon text-ivory transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Angle Switcher & Enquiry */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {ANGLE_VIEWS.map((angle, idx) => (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => setSelectedAngle(idx)}
                  className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all ${
                    selectedAngle === idx
                      ? 'bg-maroon text-white font-bold'
                      : 'bg-white/10 text-ivory/80 hover:bg-white/20'
                  }`}
                >
                  {angle.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={atelierEnquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-maroon hover:bg-maroon-hover text-white font-mono text-xs uppercase tracking-widest font-bold rounded"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal with Pre-Selected Design Code */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDesignCode={design.designCode}
      />
    </>
  )
}
