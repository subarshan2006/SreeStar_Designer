'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DesignRecord } from '@/lib/api'
import { Navbar } from '@/components/navigation/Navbar'
import { BookingModal } from '@/components/navigation/BookingModal'
import { HeroSection } from '@/components/home/HeroSection'
import { ImageWall } from '@/components/home/ImageWall'
import { DesignLightbox } from '@/components/home/DesignLightbox'
import { WelcomeScrubText } from '@/components/home/WelcomeScrubText'
import { CategoryIndex } from '@/components/home/CategoryIndex'
import { GiantWordmark } from '@/components/ui/GiantWordmark'
import { Button } from '@/components/ui/Button'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { ArrowRight, CheckCircle2, Scissors, Calendar, ShieldCheck, Sparkles } from 'lucide-react'

export interface HomeViewProps {
  initialDesigns: DesignRecord[]
}

export function HomeView({ initialDesigns }: HomeViewProps) {
  const [selectedDesign, setSelectedDesign] = useState<DesignRecord | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false)
  const [preselectedCode, setPreselectedCode] = useState<string>('')

  const handleOpenBooking = (code?: string) => {
    if (code) setPreselectedCode(code)
    setIsBookingOpen(true)
  }

  const handleNextDesign = () => {
    if (!selectedDesign) return
    const currentIndex = initialDesigns.findIndex((d) => d.id === selectedDesign.id)
    if (currentIndex !== -1 && currentIndex < initialDesigns.length - 1) {
      setSelectedDesign(initialDesigns[currentIndex + 1])
    } else {
      setSelectedDesign(initialDesigns[0])
    }
  }

  const handlePrevDesign = () => {
    if (!selectedDesign) return
    const currentIndex = initialDesigns.findIndex((d) => d.id === selectedDesign.id)
    if (currentIndex > 0) {
      setSelectedDesign(initialDesigns[currentIndex - 1])
    } else {
      setSelectedDesign(initialDesigns[initialDesigns.length - 1])
    }
  }

  return (
    <main className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      {/* =========================================================
          SPRINT 4: AWARD-LEVEL FIXED NAV (with Category Overlay)
          ========================================================= */}
      <Navbar />

      {/* =========================================================
          SPRINT 9: HERO SECTION (Wordmark + Staggered Cards)
          ========================================================= */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* =========================================================
          SPRINT 10 & 11: STAGGERED IMAGE WALL (Parallax Drift)
          ========================================================= */}
      <ImageWall
        designs={initialDesigns}
        onSelectDesign={(design) => setSelectedDesign(design)}
        onOpenBooking={(code) => handleOpenBooking(code)}
      />

      {/* =========================================================
          SPRINT 13: WELCOME TEXT (Scroll-Scrubbed Pin Section)
          ========================================================= */}
      <WelcomeScrubText />

      {/* =========================================================
          SPRINT 14: CATEGORY INDEX (Typographic List & Floating Cursor Preview)
          ========================================================= */}
      <CategoryIndex />

      {/* =========================================================
          QUICK-VIEW LIGHTBOX MODAL (Sprint 11 & 12)
          ========================================================= */}
      <DesignLightbox
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
        onNext={handleNextDesign}
        onPrev={handlePrevDesign}
        onOpenBooking={(code) => handleOpenBooking(code)}
      />

      {/* =========================================================
          FITTING BOOKING MODAL
          ========================================================= */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false)
          setPreselectedCode('')
        }}
        preselectedDesignCode={preselectedCode}
      />

      {/* =========================================================
          SPRINT PROGRESS & ARCHITECTURE STATUS
          ========================================================= */}
      <section id="sprints" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-12">
        <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <Caption>Milestone Achieved • Sprints 1 through 11</Caption>
            </div>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl">
              Foundation & Core Experience Active
            </Heading>
          </div>
          <Link href="/styleguide">
            <Button variant="outline" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Living Styleguide
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sprint 9 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-3 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 09</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Hero Section & Overlap
            </Heading>
            <p className="text-xs font-sans text-charcoal-muted leading-relaxed">
              Giant architectural wordmark with 4 floating garment cards overlapping the text with staggered intro slide-up.
            </p>
          </div>

          {/* Sprint 10 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-3 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 10</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Staggered Image Wall
            </Heading>
            <p className="text-xs font-sans text-charcoal-muted leading-relaxed">
              5–6 vertical columns edge-to-edge, balanced with a masonry algorithm and staggered vertical offsets.
            </p>
          </div>

          {/* Sprint 11 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-3 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 11</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Wall Interactions & Parallax
            </Heading>
            <p className="text-xs font-sans text-charcoal-muted leading-relaxed">
              Independent column scroll drift speeds, hover scale (1.03x), smooth caption fade, and instant Quick-View Lightbox.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY TAXONOMY PREVIEW (Women Only Tailoring)
          ========================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-8">
        <div className="border-b border-surface-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <Caption>Women&apos;s Tailoring Taxonomy • Zero Saree Sales</Caption>
            <Heading level={2} variant="serif" className="text-3xl sm:text-4xl">
              Curated Silhouette Categories
            </Heading>
          </div>
          <span className="font-mono text-xs text-charcoal-muted">
            500+ Tailored Designs Across 10 Categories
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SITE_CONFIG.categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.id}`}
              className="p-4 bg-surface-card rounded border border-surface-border hover:border-maroon/50 transition-all hover:-translate-y-1 group block"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[11px] text-charcoal-subtle">
                  0{i + 1}
                </span>
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-maroon-light text-maroon rounded">
                  {cat.count}
                </span>
              </div>
              <h3 className="font-serif text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] font-sans text-charcoal-muted mt-1">
                {cat.badge}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          STUDIO TRUST & FITTING ASSURANCE
          ========================================================= */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-surface-card border border-surface-border rounded-sm p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-maroon" />
              <Caption>Master Fitting Guarantee</Caption>
            </div>
            <Heading level={3} variant="serif" italic className="text-2xl sm:text-3xl text-charcoal">
              &ldquo;No trial room compromises. Every cut matches your unique body curvature.&rdquo;
            </Heading>
            <Body tone="muted" size="base">
              Founded over a decade ago in {SITE_CONFIG.city}, {SITE_CONFIG.shopName} crafts bespoke bridal blouses, heavy maggam zardosi creations, elegant kurtis, and festive frocks. We do not sell sarees or men&apos;s wear — our whole mastery is dedicated to tailored perfection for women.
            </Body>
            <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-charcoal-subtle">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-maroon" />
                <span>On-Time Wedding Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>Handcrafted Maggam Work</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center items-stretch lg:border-l lg:border-surface-border lg:pl-8">
            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="w-full"
            >
              <Button variant="primary" size="lg" className="w-full">
                Book a Fitting +
              </Button>
            </button>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20would%20like%20to%20enquire%20about%20blouse%20stitching.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="gold" size="md" className="w-full">
                WhatsApp Booking
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          GIANT FOOTER WORDMARK
          ========================================================= */}
      <footer id="contact" className="w-full">
        <GiantWordmark
          text={SITE_CONFIG.shopName.toUpperCase()}
          cityNote={`${SITE_CONFIG.city} Studio`}
          variant="footer"
        />
      </footer>
    </main>
  )
}
