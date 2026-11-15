'use client'

import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, Scissors, CheckCircle, MessageSquare } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Heading, Caption, Body } from '@/components/ui/typography'

export interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedDesignCode?: string
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedDesignCode,
}: BookingModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [garmentType, setGarmentType] = useState('Bridal Blouse')
  const [preferredDate, setPreferredDate] = useState('')
  const [designCode, setDesignCode] = useState(preselectedDesignCode || '')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedDesignCode) {
      setDesignCode(preselectedDesignCode)
    }
  }, [preselectedDesignCode])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build prefilled WhatsApp confirmation message
    const message = `*Fitting Appointment Request — ${SITE_CONFIG.shopName}*\n\n` +
      `• *Client Name*: ${name}\n` +
      `• *Phone*: ${phone}\n` +
      `• *Garment Type*: ${garmentType}\n` +
      (preferredDate ? `• *Preferred Date*: ${preferredDate}\n` : '') +
      (designCode ? `• *Design Code Ref*: ${designCode}\n` : '') +
      (notes ? `• *Notes*: ${notes}\n` : '') +
      `\n_Sent from ${SITE_CONFIG.shopName} Web Platform_`

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
    setSubmitted(true)

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank')
    }, 700)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a Fitting Appointment"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fade-up"
    >
      <div className="relative w-full max-w-lg bg-ivory rounded-sm shadow-2xl border border-surface-border overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-surface transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <Heading level={3} variant="serif" italic className="text-2xl text-charcoal">
              Fitting Request Prepared!
            </Heading>
            <Body size="base" tone="muted">
              We are redirecting you to WhatsApp to confirm your slot with our master tailors.
            </Body>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSubmitted(false)
                onClose()
              }}
              className="mt-4"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Caption>Studio Appointment • Women Only</Caption>
              <Heading level={2} variant="serif" italic className="text-2xl sm:text-3xl mt-1">
                Book a Fitting +
              </Heading>
              <Body size="xs" tone="muted" className="mt-1">
                Visit our {SITE_CONFIG.city} studio for precision measurements or send your reference design code.
              </Body>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full px-3.5 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                    Garment Silhouette
                  </label>
                  <select
                    value={garmentType}
                    onChange={(e) => setGarmentType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                  >
                    <option value="Bridal Blouse">Bridal Maggam Blouse</option>
                    <option value="Grand Blouse">Grand Heavy Work Blouse</option>
                    <option value="Designer Blouse">Designer / Party Blouse</option>
                    <option value="Daily Wear Blouse">Daily Wear Blouse</option>
                    <option value="Frock">Flared Frock / Gown</option>
                    <option value="Kurti">Custom Kurti</option>
                    <option value="Churidar">Churidar Set</option>
                    <option value="90s Collection">90s Retro Collection</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                    Preferred Fitting Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                  />
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1">
                  Special Notes / Occasion
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Wedding date, specific sleeve length, back neck preference..."
                  className="w-full px-3.5 py-2 bg-surface-card border border-surface-border rounded text-sm text-charcoal focus:outline-none focus:border-maroon"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit & Confirm on WhatsApp →
              </Button>
              <p className="text-[11px] font-mono text-center text-charcoal-subtle mt-2">
                We reply within 2 hours • Perfect Fit Guarantee
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
