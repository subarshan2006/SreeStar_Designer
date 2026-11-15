'use client'

import React, { useState } from 'react'
import { Heading, Caption, Body } from '@/components/ui/typography'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { MessageCircle, CheckCircle, Flame, Calendar, Sparkles } from 'lucide-react'

export function FinalCTA() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [garmentType, setGarmentType] = useState('Bridal Maggam Blouse')
  const [preferredDate, setPreferredDate] = useState('')
  const [designCode, setDesignCode] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message =
      `*Wedding Season Fitting Booking — ${SITE_CONFIG.shopName}*\n\n` +
      `• *Client Name*: ${name}\n` +
      `• *Phone*: ${phone}\n` +
      `• *Garment Type*: ${garmentType}\n` +
      (preferredDate ? `• *Preferred Date*: ${preferredDate}\n` : '') +
      (designCode ? `• *Design Code Ref*: ${designCode}\n` : '') +
      (notes ? `• *Occasion / Notes*: ${notes}\n` : '') +
      `\n_Sent from ${SITE_CONFIG.shopName} Online Atelier_`

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
    setSubmitted(true)

    setTimeout(() => {
      window.open(waUrl, '_blank')
    }, 700)
  }

  return (
    <section
      aria-label="Book a Fitting and Final Call to Action"
      className="relative w-full py-20 sm:py-28 bg-surface-card border-t border-surface-border overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Urgency & Atelier Guarantee (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-mono uppercase tracking-wider font-semibold">
              <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Wedding season slots filling fast 🔥</span>
            </div>

            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl text-charcoal">
              Begin Your Custom Fitting
            </Heading>

            <Body size="base" tone="muted" className="leading-relaxed">
              Every blouse begins with your measurements and ends with your confidence. Reserve your master tailor fitting slot or connect with our concierge directly on WhatsApp.
            </Body>

            {/* Quick Guarantees */}
            <div className="space-y-3 pt-2 font-mono text-xs text-charcoal-muted">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Precision Armhole & Neckline Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-maroon" />
                <span>Guaranteed On-Schedule Delivery for Weddings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>Zero Saree Sales • Exclusively Dedicated to Women&apos;s Tailoring</span>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-surface-border/60">
              <p className="font-sans text-xs text-charcoal-muted mb-2">
                Prefer direct WhatsApp messaging?
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20would%20like%20to%20reserve%20a%20fitting%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-bold shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Intent Fast Booking Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-ivory rounded-sm p-8 sm:p-10 border border-surface-border shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <Heading level={3} variant="serif" italic className="text-2xl sm:text-3xl text-charcoal">
                    Fitting Request Prepared!
                  </Heading>
                  <Body size="base" tone="muted" className="max-w-md mx-auto">
                    Redirecting you to WhatsApp to confirm your slot with our master fitter.
                  </Body>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-surface-border pb-3">
                    <Caption>Atelier Appointment Booking</Caption>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal mt-0.5">
                      Reserve Your Fitting Slot
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sundaram"
                        className="w-full px-3.5 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Garment Silhouette
                      </label>
                      <select
                        value={garmentType}
                        onChange={(e) => setGarmentType(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                      >
                        <option value="Bridal Maggam Blouse">Bridal Maggam Blouse</option>
                        <option value="Grand Velvet Blouse">Grand Heavy Work Blouse</option>
                        <option value="Designer Party Blouse">Designer / Party Blouse</option>
                        <option value="Daily Wear Blouse">Daily Wear Blouse</option>
                        <option value="Grand Party Frock">Grand Party Frock / Gown</option>
                        <option value="Custom Kurti">Custom Tailored Kurti</option>
                        <option value="Churidar Set">Churidar Set</option>
                        <option value="90s Retro Blouse">90s Retro Collection</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Design Code (Optional)
                      </label>
                      <input
                        type="text"
                        value={designCode}
                        onChange={(e) => setDesignCode(e.target.value)}
                        placeholder="e.g. D-0104"
                        className="w-full px-3.5 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal font-mono uppercase focus:outline-none focus:border-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                        Occasion / Wedding Date
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Wedding Reception in Nov"
                        className="w-full px-3.5 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg">
                      Submit & Confirm on WhatsApp →
                    </Button>
                    <p className="text-[11px] font-mono text-center text-charcoal-subtle mt-2.5">
                      🔒 Zero spam • Your details are sent directly to our master tailor
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
