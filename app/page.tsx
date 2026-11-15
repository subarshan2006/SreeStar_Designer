import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { GiantWordmark } from '@/components/ui/GiantWordmark'
import { Button } from '@/components/ui/Button'
import { Heading, Body, Caption, Label, DesignCodeBadge } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { ArrowRight, Sparkles, CheckCircle2, Sliders, Scissors, Calendar, ShieldCheck, Layers } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      {/* =========================================================
          SPRINT 4: AWARD-LEVEL FIXED NAV (with Category Overlay & Booking Sheet)
          ========================================================= */}
      <Navbar />

      {/* =========================================================
          SPRINT 3: HERO SECTION WITH GIANT WORDMARK & OVERLAP ZONE
          ========================================================= */}
      <section className="relative w-full pt-4">
        <GiantWordmark
          text={SITE_CONFIG.shopName.toUpperCase()}
          tagline={SITE_CONFIG.tagline}
          cityNote={`${SITE_CONFIG.city} Studio`}
          variant="hero"
          overlap={true}
        />
      </section>

      {/* =========================================================
          SPRINT 1, 2, 3 COMPLETION BANNER & ARCHITECTURE REPORT
          ========================================================= */}
      <section id="sprints" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-12">
        <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <Caption>Milestone Achieved • Sprints 1, 2 & 3</Caption>
            </div>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl">
              Foundation, Design System & Giant Wordmark
            </Heading>
          </div>
          <Link href="/styleguide">
            <Button variant="outline" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Living Styleguide
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sprint 1 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-4 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 01</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Scaffolding & Architecture
            </Heading>
            <ul className="space-y-2 text-xs font-sans text-charcoal-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                Next.js 15 App Router & React 19 architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                Folder schema: app, components, lib, public
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                .env.example with CMS & analytics slots
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                Git repository initialized with main branch
              </li>
            </ul>
          </div>

          {/* Sprint 2 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-4 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 02</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Design System & Tokens
            </Heading>
            <ul className="space-y-2 text-xs font-sans text-charcoal-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
                Ivory canvas (#FAF9F5) + Charcoal (#141413)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
                Royal Maroon (#721B29) + Antique Gold (#C5A059)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
                Cinzel, Playfair Display, Plus Jakarta Sans
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
                Interactive Styleguide page at /styleguide
              </li>
            </ul>
          </div>

          {/* Sprint 3 Card */}
          <div className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-4 hover:border-maroon/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">Sprint 03</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Heading level={4} variant="serif" className="text-xl">
              Giant Wordmark Component
            </Heading>
            <ul className="space-y-2 text-xs font-sans text-charcoal-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Responsive clamp() & vw edge-to-edge scaling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Layered overlap zone with floating garments (z-10)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Variants: Hero, Footer, Watermark, Inline
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Tested across mobile, tablet, 2K & ultrawide
              </li>
            </ul>
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
            <div
              key={cat.id}
              className="p-4 bg-surface-card rounded border border-surface-border hover:border-maroon/50 transition-all hover:-translate-y-1 group"
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
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          TRUST SIGNALS & APPOINTMENT PREVIEW
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
            <Link href="/styleguide">
              <Button variant="primary" size="lg" className="w-full">
                Explore Styleguide
              </Button>
            </Link>
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
          SPRINT 3: FOOTER VARIANT OF GIANT WORDMARK
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
