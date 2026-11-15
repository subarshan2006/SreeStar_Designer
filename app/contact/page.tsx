'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/schema'
import { BookingForm } from '@/components/booking/BookingForm'
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  ShieldCheck,
  Navigation,
  Instagram,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact & Atelier', url: '/contact' },
  ]

  const instagramPosts = [
    {
      id: 'ig-1',
      title: 'Peacock Maggam Zardosi Hand Needlework in Progress',
      code: 'D-0001',
      views: '14.2K',
    },
    {
      id: 'ig-2',
      title: 'Flawless Skeleton Fitting Trial for Muhurtham Bride',
      code: 'D-0045',
      views: '28.5K',
    },
    {
      id: 'ig-3',
      title: 'Authentic 90s Vintage High-Volume Puffed Sleeve Tutorial',
      code: 'D-0010',
      views: '42.1K',
    },
    {
      id: 'ig-4',
      title: 'Can-Can Pleating Craftsmanship for Grand Party Frocks',
      code: 'D-0021',
      views: '19.8K',
    },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getLocalBusinessSchema()} />
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb Trail */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted">
            <Link href="/" className="hover:text-maroon transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold">Contact & Fitting Studio</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            Flagship Atelier • T. Nagar
          </span>
        </div>

        {/* Page Header with Single Strict H1 */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
              <MapPin className="w-4 h-4" />
              <span>Chennai Flagship Studio</span>
            </div>
            <span className="text-surface-border">•</span>
            <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full font-mono text-[11px] font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>We reply within 2 hours</span>
            </span>
          </div>

          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            Visit Our Atelier or Reserve a Fitting
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl">
            Experience bespoke tailoring firsthand. Meet our master cutters, browse pure silk and velvet swatches, and have measurements taken to millimeter precision.
          </Body>
        </div>

        {/* Two-Column Grid: Form & Studio Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Full Lead Capture & Booking Form */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-border">
              <div className="flex items-center gap-2 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
                <Calendar className="w-4 h-4" />
                <span>Fitting Appointment Reservation</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-semibold">
                Online Slots Open
              </span>
            </div>

            <BookingForm
              initialGarmentType="Bridal Maggam Blouse"
              className="shadow-sm"
            />
          </div>

          {/* Right Column: Google Maps & Atelier Details */}
          <div className="lg:col-span-6 space-y-6">
            {/* Embedded Google Map */}
            <div className="bg-surface-card rounded-sm overflow-hidden border border-surface-border shadow-sm">
              <div className="aspect-[16/9] w-full bg-ivory relative">
                <iframe
                  title="SreeStar Tailoring Atelier Chennai Location"
                  src="https://maps.google.com/maps?q=T.+Nagar,+Chennai,+Tamil+Nadu+600017&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-charcoal text-ivory text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gold shrink-0" />
                  <span>Located in Prime T. Nagar Tailoring Hub</span>
                </div>
                <a
                  href={`https://maps.google.com/?daddr=${encodeURIComponent(SITE_CONFIG.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Studio Hours & NAP Consistency */}
            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4 text-xs font-mono">
              <div className="border-b border-surface-border pb-3 flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold text-charcoal">
                  Official Atelier Information (NAP)
                </h2>
                <span className="text-[10px] text-maroon font-bold uppercase">
                  Verified Local Atelier
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">{SITE_CONFIG.shopName} Tailoring Atelier</span>
                    <span className="text-charcoal-muted leading-relaxed block">{SITE_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Phone / Direct Line</span>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-maroon hover:underline font-bold">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Studio Working Hours</span>
                    <span className="text-charcoal-muted block">{SITE_CONFIG.workingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Studio Policy</span>
                    <span className="text-charcoal-muted block">Strictly Women Only • Zero Saree Sales • Zero Men&apos;s Wear</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20am%20outside%20the%20studio%20and%20need%20directions.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 p-3.5 bg-maroon text-ivory rounded font-bold uppercase tracking-wider text-[11px] hover:bg-maroon-hover transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Atelier</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 p-3.5 bg-surface text-charcoal border border-surface-border rounded font-bold uppercase tracking-wider text-[11px] hover:bg-ivory transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-maroon" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Reels & Visual Social Feed Section */}
        <section aria-label="Instagram Atelier Feed" className="mb-16 bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-surface-border">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
                <Instagram className="w-4 h-4" />
                <span>@{SITE_CONFIG.instagram}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
                Behind the Scenes on Instagram
              </h2>
            </div>

            <a
              href={`https://instagram.com/${SITE_CONFIG.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal text-ivory rounded font-mono text-xs uppercase tracking-wider font-bold hover:bg-maroon transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Follow @{SITE_CONFIG.instagram}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={`https://instagram.com/${SITE_CONFIG.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-ivory rounded border border-surface-border/70 hover:border-maroon transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-maroon">{post.code}</span>
                    <span className="text-charcoal-subtle">{post.views} Views</span>
                  </div>
                  <p className="text-xs font-serif font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-2">
                    {post.title}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-border/50 flex items-center justify-between text-[10px] font-mono text-charcoal-muted">
                  <span>Watch Reel</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-maroon" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Doorstep Measurements Across Chennai */}
        <section aria-label="Doorstep Measurements Across Chennai" className="bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <Caption>At-Home Convenience</Caption>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Doorstep Bridal Measurements Across Chennai
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
              Planning a wedding or family celebration with 3 or more blouses? Avoid Chennai traffic—our Senior Master Fitter travels directly to your residence across <strong>T. Nagar, Anna Nagar, Mylapore, Adyar, Velachery, and Nungambakkam</strong> with measurement tapes, neck cut charts, and embroidery swatch folders.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20am%20interested%20in%20your%20Doorstep%20Bridal%20Measurement%20service%20in%20Chennai.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-maroon font-bold hover:underline"
              >
                <span>Request Home Measurement Visit →</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
