'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Heading, Caption, Body } from '@/components/ui/typography'
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ShieldCheck,
  PackageCheck,
  Ruler,
  Compass,
} from 'lucide-react'

export function ProcessAndWhyUs({
  onOpenBooking,
}: {
  onOpenBooking?: () => void
}) {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false)
  const [counts, setCounts] = useState({ designs: 0, clients: 0, years: 0, fit: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  // Animated counters when section scrolls into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasScrolledIntoView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasScrolledIntoView) return

    const duration = 1600
    const frameRate = 30
    const totalFrames = Math.round((duration / 1000) * frameRate)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = Math.min(1, frame / totalFrames)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)

      setCounts({
        designs: Math.round(ease * 500),
        clients: Math.round(ease * 2500),
        years: Math.round(ease * 14),
        fit: Math.round(ease * 100),
      })

      if (frame >= totalFrames) {
        clearInterval(timer)
      }
    }, 1000 / frameRate)

    return () => clearInterval(timer)
  }, [hasScrolledIntoView])

  const processSteps = [
    {
      number: '01',
      title: 'Choose a Design',
      icon: Compass,
      desc: 'Pick from our 500+ blouse & garment catalog, or bring your custom Instagram/Pinterest reference photo.',
    },
    {
      number: '02',
      title: 'Precision Measurements',
      icon: Ruler,
      desc: 'Visit our studio for shoulder slope, armhole curvature, and bust depth drafting, or book a bridal home visit.',
    },
    {
      number: '03',
      title: 'Master Stitching',
      icon: Scissors,
      desc: 'Expert needlework, pure zardosi embroidery, reinforced french seams, and tailored inner lining.',
    },
    {
      number: '04',
      title: 'Personal Fitting Trial',
      icon: HeartHandshake,
      desc: 'Try your finished piece with our master cutter on hand. We provide free immediate alterations on the spot.',
    },
    {
      number: '05',
      title: 'On-Time Delivery',
      icon: PackageCheck,
      desc: 'Handed over in protective garment packaging, pressed and wedding-ready with our 100% Fit Guarantee.',
    },
  ]

  const whyUsPillars = [
    {
      title: '100% Perfect-Fit Guarantee',
      icon: ShieldCheck,
      desc: 'Zero trial-room compromises. Every curve is mapped to your unique posture with free unlimited alterations.',
    },
    {
      title: 'On-Time Wedding Delivery',
      icon: Clock,
      desc: 'Never worry about muhurtham deadlines. Guaranteed on-schedule handover with express 48-hour rush options.',
    },
    {
      title: '500+ Curated Archive',
      icon: Sparkles,
      desc: 'Specialized exclusively in women’s custom tailoring. Zero saree sales, zero distractions—pure craftsmanship.',
    },
    {
      title: 'Artisanal Needlework',
      icon: CheckCircle2,
      desc: 'Authentic hand maggam work, uncut kundan stone setting, french knots, and durable double-stitch seams.',
    },
  ]

  return (
    <div ref={sectionRef} className="w-full bg-surface-card border-t border-surface-border">
      {/* =========================================================
          PART 1: OUR PROCESS (Animated 5-Step Timeline)
          ========================================================= */}
      <section aria-label="Our Tailoring Process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-light border border-maroon/20 text-maroon text-xs font-mono uppercase tracking-wider">
            <span>The SreeStar Journey</span>
          </div>
          <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl text-charcoal">
            From Measurements to Confidence
          </Heading>
          <Body tone="muted" size="base">
            Our 5-step signature tailoring methodology ensures complete fitting satisfaction with zero guesswork.
          </Body>
        </div>

        {/* Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {processSteps.map((step, idx) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="relative bg-ivory rounded-sm p-6 border border-surface-border shadow-sm flex flex-col justify-between space-y-4 hover:border-maroon/50 transition-all hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-maroon bg-maroon-light px-2 py-0.5 rounded">
                      STEP {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-charcoal-muted group-hover:text-maroon transition-colors" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-maroon transition-colors">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-charcoal-muted mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-border/40 font-mono text-[10px] uppercase tracking-wider text-charcoal-subtle">
                  Milestone 0{idx + 1}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* =========================================================
          PART 2: ANIMATED COUNTERS & HERITAGE STATS
          ========================================================= */}
      <section aria-label="Studio Statistics" className="bg-charcoal text-ivory py-16 sm:py-20 border-y border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="pt-4 md:pt-0">
              <p className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shimmer tracking-tight">
                {counts.designs}+
              </p>
              <p className="font-serif italic text-base sm:text-lg text-white mt-1">Unique Bespoke Designs</p>
              <p className="font-mono text-[11px] text-white/60 uppercase tracking-widest mt-0.5">Blouses, Frocks & Kurtis</p>
            </div>

            {/* Stat 2 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shimmer tracking-tight">
                {counts.clients.toLocaleString()}+
              </p>
              <p className="font-serif italic text-base sm:text-lg text-white mt-1">Happy Women Clients</p>
              <p className="font-mono text-[11px] text-white/60 uppercase tracking-widest mt-0.5">Across Chennai & Worldwide</p>
            </div>

            {/* Stat 3 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shimmer tracking-tight">
                {counts.years}+
              </p>
              <p className="font-serif italic text-base sm:text-lg text-white mt-1">Years of Atelier Heritage</p>
              <p className="font-mono text-[11px] text-white/60 uppercase tracking-widest mt-0.5">Master Cutters & Tailors</p>
            </div>

            {/* Stat 4 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shimmer tracking-tight">
                {counts.fit}%
              </p>
              <p className="font-serif italic text-base sm:text-lg text-white mt-1">Perfect-Fit Guarantee</p>
              <p className="font-mono text-[11px] text-white/60 uppercase tracking-widest mt-0.5">Free Alterations Assurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PART 3: WHY US PILLARS & CONVERSION TRIGGER
          ========================================================= */}
      <section aria-label="Why Choose SreeStar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <Caption>Why Women Across Chennai Trust Us</Caption>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl text-charcoal mt-1">
              The SreeStar Advantage
            </Heading>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-maroon text-white px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider hover:bg-maroon-hover transition-colors shadow-sm self-start sm:self-auto"
          >
            <span>Book a Fitting Appointment +</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsPillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <div
                key={pillar.title}
                className="p-6 bg-ivory rounded border border-surface-border hover:border-maroon/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-maroon-light flex items-center justify-center text-maroon mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">{pillar.title}</h3>
                  <p className="font-sans text-xs text-charcoal-muted mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-mono text-maroon font-semibold">
                  Studio Promise ✓
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
