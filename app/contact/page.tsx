'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/schema'
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Send,
  Navigation,
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    garmentType: 'Bridal Maggam Blouse',
    preferredDate: '',
    designCode: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const text = `Hi ${SITE_CONFIG.shopName}! I would like to book a tailoring fitting appointment:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Garment: ${formData.garmentType}
• Preferred Date: ${formData.preferredDate || 'Earliest Available'}
• Design Code: ${formData.designCode || 'To discuss in studio'}
• Notes: ${formData.notes || 'None'}`

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(waUrl, '_blank')
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact & Atelier', url: '/contact' },
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
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-maroon" />
            <Caption>Chennai Flagship Studio • Strictly Women Only</Caption>
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
          {/* Left Column: Interactive Booking Form */}
          <div className="lg:col-span-6 bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border shadow-sm">
            <div className="mb-6 pb-4 border-b border-surface-border">
              <div className="flex items-center gap-2 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
                <Calendar className="w-4 h-4" />
                <span>Fitting Appointment Reservation</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal mt-1">
                Schedule Your Measurement Session
              </h2>
              <p className="text-xs text-charcoal-muted font-sans mt-1">
                Submitting confirms your preferred slot directly with our WhatsApp concierge.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-maroon-light rounded border border-maroon/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-maroon mx-auto" />
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Appointment Request Initiated!
                </h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  WhatsApp has opened with your reservation details. Our master fitter will confirm your exact slot within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs uppercase text-maroon font-bold underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ramya Soundararajan"
                      className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="garmentType" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                      Garment Silhouette *
                    </label>
                    <select
                      id="garmentType"
                      value={formData.garmentType}
                      onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal"
                    >
                      <option value="Bridal Maggam Blouse">Bridal Maggam Blouse</option>
                      <option value="Grand Wedding Blouse">Grand Heavy Work Blouse</option>
                      <option value="Designer Party Blouse">Designer / Party Blouse</option>
                      <option value="Daily Wear Blouse">Daily Wear Comfort Cut</option>
                      <option value="Grand Frock">Grand Party Frock</option>
                      <option value="Bespoke Kurti">Bespoke Kurti</option>
                      <option value="Custom Churidar">Custom Churidar</option>
                      <option value="90s Retro Collection">90s Retro Vintage Blouse</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                      Preferred Date
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="designCode" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                    Design Reference Code (Optional)
                  </label>
                  <input
                    id="designCode"
                    type="text"
                    value={formData.designCode}
                    onChange={(e) => setFormData({ ...formData, designCode: e.target.value })}
                    placeholder="e.g. D-0045, D-0104, or photo reference"
                    className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-charcoal-muted uppercase tracking-wider mb-1">
                    Custom Requests / Neckline Ideas
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your saree color, occasion date, or specific neckline requirements..."
                    className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-maroon hover:bg-maroon-hover text-ivory font-mono uppercase text-xs tracking-widest font-bold rounded shadow-md transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Open WhatsApp Concierge</span>
                </button>

                <p className="text-[11px] text-charcoal-subtle text-center pt-1">
                  Urgent emergency wedding order? Ask for our <strong>48-Hour Rush Service</strong>.
                </p>
              </form>
            )}
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

              <div className="p-5 flex items-center justify-between bg-charcoal text-ivory text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gold" />
                  <span>Located in Prime T. Nagar Tailoring Hub</span>
                </div>
                <a
                  href={SITE_CONFIG.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline font-bold"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Studio Hours & NAP Consistency */}
            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4 text-xs font-mono">
              <div className="border-b border-surface-border pb-3">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Official Atelier Information (NAP)
                </h3>
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
                    <span className="font-bold text-charcoal block">Working Hours</span>
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
                  className="inline-flex items-center justify-center gap-1.5 p-3 bg-maroon text-ivory rounded font-bold uppercase tracking-wider text-[11px] hover:bg-maroon-hover transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 p-3 bg-surface text-charcoal border border-surface-border rounded font-bold uppercase tracking-wider text-[11px] hover:bg-ivory transition-colors"
                >
                  <Phone className="w-4 h-4 text-maroon" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Doorstep Measurements Across Chennai */}
        <div className="bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border">
          <div className="max-w-3xl space-y-3">
            <Caption>Convenience & Comfort</Caption>
            <h3 className="font-serif text-2xl font-semibold text-charcoal">
              Doorstep Bridal Measurements Across Chennai
            </h3>
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
        </div>
      </main>
    </div>
  )
}
