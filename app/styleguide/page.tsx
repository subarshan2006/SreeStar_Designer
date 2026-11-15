'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heading, Body, Caption, Label, DesignCodeBadge } from '@/components/ui/typography'
import { Button } from '@/components/ui/Button'
import { GiantWordmark } from '@/components/ui/GiantWordmark'
import { ArrowLeft, Check, Sparkles, Copy, Layers } from 'lucide-react'

export default function StyleguidePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [wordmarkVariant, setWordmarkVariant] = useState<'hero' | 'footer' | 'watermark'>('hero')
  const [overlapToggle, setOverlapToggle] = useState(true)

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const colorPalettes = [
    {
      category: 'Canvas & Surfaces (Ivory)',
      description: 'Clean ivory/white canvas that lets garment photography supply all color.',
      colors: [
        { name: 'Canvas Base', token: 'bg-ivory', hex: '#FAF9F5', text: 'text-charcoal' },
        { name: 'Ivory Dark', token: 'bg-ivory-dark', hex: '#F2EFE9', text: 'text-charcoal' },
        { name: 'Surface Card', token: 'bg-surface-card', hex: '#F8F5EE', text: 'text-charcoal' },
        { name: 'Surface Border', token: 'bg-surface-border', hex: '#E8E4DC', text: 'text-charcoal' },
        { name: 'Pure Elevated', token: 'bg-surface-elevated', hex: '#FFFFFF', text: 'text-charcoal', border: true },
      ],
    },
    {
      category: 'Text & Neutral UI (Charcoal)',
      description: 'High contrast black and warm charcoal for editorial typography.',
      colors: [
        { name: 'Deep Charcoal', token: 'bg-charcoal', hex: '#141413', text: 'text-ivory' },
        { name: 'Charcoal Light', token: 'bg-charcoal-light', hex: '#2B2926', text: 'text-ivory' },
        { name: 'Muted Slate', token: 'bg-charcoal-muted', hex: '#635F59', text: 'text-ivory' },
        { name: 'Subtle Slate', token: 'bg-charcoal-subtle', hex: '#8C867E', text: 'text-ivory' },
        { name: 'Faint Slate', token: 'bg-charcoal-faint', hex: '#C2BCB3', text: 'text-charcoal' },
      ],
    },
    {
      category: 'Brand Primary & CTAs (Royal Maroon)',
      description: 'Reserved strictly for CTAs, booking action triggers, and subtle alerts.',
      colors: [
        { name: 'Royal Maroon', token: 'bg-maroon', hex: '#721B29', text: 'text-ivory' },
        { name: 'Maroon Hover', token: 'bg-maroon-hover', hex: '#54121D', text: 'text-ivory' },
        { name: 'Maroon Light', token: 'bg-maroon-light', hex: '#FAEFF1', text: 'text-maroon' },
        { name: 'Maroon Accent', token: 'bg-maroon-accent', hex: '#8E2435', text: 'text-ivory' },
        { name: 'Maroon Border', token: 'bg-maroon-border', hex: '#E3C1C7', text: 'text-charcoal' },
      ],
    },
    {
      category: 'Luxury Accents (Antique Zardosi Gold)',
      description: 'Nod to bridal zari work, counter highlights, and delicate craftsmanship tags.',
      colors: [
        { name: 'Antique Gold', token: 'bg-gold', hex: '#C5A059', text: 'text-charcoal' },
        { name: 'Gold Light', token: 'bg-gold-light', hex: '#DFC58B', text: 'text-charcoal' },
        { name: 'Dark Gold', token: 'bg-gold-dark', hex: '#9A7836', text: 'text-ivory' },
        { name: 'Gold Shimmer', token: 'bg-gold-shimmer', hex: '#F5EBD4', text: 'text-gold-dark' },
        { name: 'Gold Accent', token: 'bg-gold-accent', hex: '#D4AF37', text: 'text-charcoal' },
      ],
    },
  ]

  const breakpoints = [
    { name: 'Mobile', width: '375px', token: 'xs', usage: '2 staggered columns, collapsed sticky actions' },
    { name: 'Phablet / Small Tablet', width: '640px', token: 'sm', usage: '2 expanded staggered columns' },
    { name: 'Tablet', width: '768px', token: 'md', usage: '3–4 columns with smooth drift' },
    { name: 'Laptop / Desktop', width: '1024px', token: 'lg', usage: 'Full navigation, 4–5 staggered columns' },
    { name: 'Wide Screen', width: '1280px', token: 'xl', usage: 'Award grid: 5 columns edge-to-edge' },
    { name: '2K Monitor', width: '1536px', token: '2xl', usage: '6 columns edge-to-edge, parallax drift' },
    { name: 'Ultrawide', width: '1920px+', token: '3xl', usage: 'Maximum architectural wordmark scaling' },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-32">
      {/* Top Header */}
      <header className="border-b border-surface-border bg-ivory-light/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-charcoal-muted hover:text-maroon transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
            <span className="text-surface-border">/</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-maroon" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-charcoal">
                Sprint 2 & 3: Design System & Wordmark
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label tone="maroon">Women Only</Label>
            <Label tone="gold">Award UI</Label>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-24">
        {/* Intro Section */}
        <section className="space-y-4">
          <Caption>Design Tokens & Architectural Guidelines</Caption>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            Visual Language & Living Styleguide
          </Heading>
          <Body size="lg" tone="muted" className="max-w-3xl">
            Clean ivory/white canvas where garment images provide all chromatic vibrancy.
            Deep charcoal text ensures editorial clarity. Royal maroon and antique gold accents trigger
            high-intent conversion.
          </Body>
        </section>

        {/* Section 1: Color Tokens */}
        <section className="space-y-8">
          <div className="border-b border-surface-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <Caption>Sprint 2 — Token Matrix</Caption>
              <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
                01. Chromatic System & Surfaces
              </Heading>
            </div>
            <p className="font-mono text-xs text-charcoal-subtle">
              Click any swatch to copy HEX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {colorPalettes.map((group) => (
              <div
                key={group.category}
                className="p-6 bg-surface-card rounded-sm border border-surface-border space-y-4 shadow-sm"
              >
                <div>
                  <h3 className="font-serif text-lg font-medium text-charcoal">{group.category}</h3>
                  <p className="text-xs text-charcoal-muted font-sans mt-0.5">{group.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {group.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => copyToClipboard(c.hex)}
                      className={`group relative p-3 rounded text-left transition-all hover:scale-[1.02] hover:shadow-md ${c.token} ${c.text} ${c.border ? 'border border-surface-border' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[11px] font-mono tracking-wider opacity-80 uppercase">{c.hex}</span>
                        {copiedColor === c.hex ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <p className="text-xs font-semibold font-sans leading-tight">{c.name}</p>
                      <p className="text-[10px] font-mono opacity-70 mt-0.5">{c.token}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography System */}
        <section className="space-y-8">
          <div className="border-b border-surface-border pb-4">
            <Caption>Sprint 2 — Typography Scale</Caption>
            <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
              02. Typographic Scale & Font Stack
            </Heading>
            <Body tone="muted" size="sm" className="mt-1">
              Display: Cinzel / Playfair • Headings: Playfair Display Serif • Body: Plus Jakarta Sans • Codes: JetBrains Mono
            </Body>
          </div>

          <div className="space-y-8 p-6 sm:p-8 bg-surface-card rounded-sm border border-surface-border">
            <div className="space-y-2 border-b border-surface-border/60 pb-6">
              <Caption>Display Font — Hero & Wordmark Scale</Caption>
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase text-charcoal">
                SREESTAR TAILORING
              </h2>
            </div>

            <div className="space-y-2 border-b border-surface-border/60 pb-6">
              <Caption>Heading 1 — Serif Italic</Caption>
              <Heading level={1} variant="serif" italic>
                &ldquo;Every blouse begins with your measurements and ends with your confidence.&rdquo;
              </Heading>
            </div>

            <div className="space-y-2 border-b border-surface-border/60 pb-6">
              <Caption>Heading 2 — Section Headers</Caption>
              <Heading level={2} variant="serif">
                Bridal & Grand Spotlight Collection
              </Heading>
            </div>

            <div className="space-y-2 border-b border-surface-border/60 pb-6">
              <Caption>Heading 3 — Category Titles</Caption>
              <Heading level={3} variant="sans">
                Heavy Zardosi & Peacock Maggam Embroidery
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-surface-border/60 pb-6">
              <div className="space-y-2">
                <Caption>Body Large & Regular</Caption>
                <Body size="lg">
                  Award-level bespoke stitching engineered with milimetric armhole curve precision, tailored exclusively for women.
                </Body>
                <Body size="base" tone="muted">
                  We guarantee 100% fitting accuracy across wedding blouses, party frocks, daily kurtis, and authentic 90s vintage silhouettes.
                </Body>
              </div>

              <div className="space-y-3">
                <Caption>Badges & Design Codes</Caption>
                <div className="flex flex-wrap gap-2 pt-1">
                  <DesignCodeBadge code="D-0123" />
                  <DesignCodeBadge code="BRIDAL-904" />
                  <DesignCodeBadge code="FROCK-022" />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Label tone="maroon">Wedding Season</Label>
                  <Label tone="gold">500+ Designs</Label>
                  <Label tone="charcoal">Women Only</Label>
                  <Label tone="muted">Chennai Studio</Label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Giant Wordmark Showcase (Sprint 3) */}
        <section className="space-y-6">
          <div className="border-b border-surface-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Caption>Sprint 3 — Core Deliverable</Caption>
              <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
                03. Giant Wordmark Component (`&lt;GiantWordmark /&gt;`)
              </Heading>
              <Body tone="muted" size="sm" className="mt-1">
                Edge-to-edge `vw`-scaled architectural typography with garment overlap layer.
              </Body>
            </div>

            {/* Interactive Mode Switcher */}
            <div className="flex items-center gap-2 bg-surface-card p-1.5 rounded border border-surface-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setWordmarkVariant('hero')}
                className={`px-3 py-1.5 rounded transition-colors ${wordmarkVariant === 'hero' ? 'bg-maroon text-white font-semibold' : 'text-charcoal-muted hover:text-charcoal'}`}
              >
                Hero Variant
              </button>
              <button
                type="button"
                onClick={() => setWordmarkVariant('footer')}
                className={`px-3 py-1.5 rounded transition-colors ${wordmarkVariant === 'footer' ? 'bg-maroon text-white font-semibold' : 'text-charcoal-muted hover:text-charcoal'}`}
              >
                Footer Variant
              </button>
              <button
                type="button"
                onClick={() => setWordmarkVariant('watermark')}
                className={`px-3 py-1.5 rounded transition-colors ${wordmarkVariant === 'watermark' ? 'bg-maroon text-white font-semibold' : 'text-charcoal-muted hover:text-charcoal'}`}
              >
                Watermark Mode
              </button>
            </div>
          </div>

          {/* Interactive controls */}
          {wordmarkVariant === 'hero' && (
            <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted bg-surface-card px-4 py-2 rounded border border-surface-border">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-maroon" />
                <span>Overlap Zone: Images floating in front of wordmark (`z-10` over `z-0`)</span>
              </div>
              <button
                type="button"
                onClick={() => setOverlapToggle(!overlapToggle)}
                className="text-maroon underline font-semibold cursor-pointer"
              >
                {overlapToggle ? 'Hide Overlap Cards' : 'Show Overlap Cards'}
              </button>
            </div>
          )}

          {/* Live Render Container */}
          <div className="border border-surface-border rounded-sm overflow-hidden bg-ivory shadow-lg relative min-h-[500px]">
            <GiantWordmark
              text="SREESTAR"
              tagline="Custom blouses + women's tailoring."
              cityNote="Chennai Studio"
              variant={wordmarkVariant}
              overlap={overlapToggle}
            />
          </div>
        </section>

        {/* Section 4: Interactive Buttons & CTAs */}
        <section className="space-y-6">
          <div className="border-b border-surface-border pb-4">
            <Caption>Conversion Engine Triggers</Caption>
            <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
              04. CTAs, Buttons & Difference Blend Nav
            </Heading>
          </div>

          <div className="p-8 bg-surface-card rounded-sm border border-surface-border space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" iconRight={<Sparkles className="w-4 h-4" />}>
                Book a Fitting +
              </Button>
              <Button variant="gold" size="md">
                WhatsApp Enquiry
              </Button>
              <Button variant="outline" size="md">
                + Collections
              </Button>
              <Button variant="ghost" size="md">
                View 500+ Designs →
              </Button>
            </div>

            {/* Difference Blend Simulation */}
            <div className="relative p-8 rounded bg-gradient-to-r from-charcoal via-maroon to-gold text-white overflow-hidden">
              <p className="text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Mix-Blend-Mode Simulation (Nav stays readable over any image color)
              </p>
              <div className="flex items-center gap-8 text-sm font-mono uppercase tracking-widest blend-difference">
                <span>+ Collections</span>
                <span>About / Gallery / Contact</span>
                <span className="font-bold underline">Book a Fitting +</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Responsive Breakpoints Matrix */}
        <section className="space-y-6">
          <div className="border-b border-surface-border pb-4">
            <Caption>Architectural Grid Scaling</Caption>
            <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
              05. Breakpoint Matrix (Mobile to Ultrawide)
            </Heading>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-surface-border bg-surface text-charcoal-muted font-mono text-xs uppercase">
                  <th className="py-3 px-4">Breakpoint</th>
                  <th className="py-3 px-4">Width</th>
                  <th className="py-3 px-4">Tailwind Prefix</th>
                  <th className="py-3 px-4">Staggered Wall & Wordmark Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {breakpoints.map((bp) => (
                  <tr key={bp.token} className="hover:bg-surface-card/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-charcoal">{bp.name}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-charcoal-muted">{bp.width}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-maroon font-semibold">{bp.token}:</td>
                    <td className="py-3.5 px-4 text-xs text-charcoal-muted">{bp.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
