'use client'

import React, { useState } from 'react'
import { CheckCircle2, Upload, Send, MessageCircle, AlertCircle, X } from 'lucide-react'
import { trackGaEvent } from '@/components/seo/GoogleAnalytics'
import { SITE_CONFIG } from '@/lib/constants'

export interface BookingFormProps {
  initialDesignCode?: string
  initialGarmentType?: string
  onSuccess?: () => void
  className?: string
}

export function BookingForm({
  initialDesignCode = '',
  initialGarmentType = 'Bridal Maggam Blouse',
  onSuccess,
  className = '',
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    garmentType: initialGarmentType,
    preferredDate: '',
    designCode: initialDesignCode,
    notes: '',
    _gotcha: '', // Honeypot field
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoName, setPhotoName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successData, setSuccessData] = useState<{ leadId: string; waUrl: string } | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Photo exceeds 10MB limit. Please choose a smaller image.')
      return
    }

    setPhotoName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string)
      setErrorMessage('')
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    setPhotoName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit appointment request.')
      }

      setSuccessData({ leadId: data.leadId, waUrl: data.waUrl })
      trackGaEvent('fitting_booked', {
        garmentType: formData.garmentType,
        designCode: formData.designCode,
      })

      if (onSuccess) onSuccess()

      // Open WhatsApp automatically
      if (data.waUrl) {
        window.open(data.waUrl, '_blank')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border ${className}`}>
      {successData ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Fitting Request Received!
            </h3>
            <p className="font-mono text-xs text-charcoal-muted">
              Reference: <strong className="text-maroon">{successData.leadId}</strong>
            </p>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto font-sans leading-relaxed pt-1">
              WhatsApp has been triggered with your reservation details. Our master fitter at our {SITE_CONFIG.city} atelier will confirm your measurement slot within <strong>2 hours</strong>.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={successData.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-maroon hover:bg-maroon-hover text-ivory font-mono text-xs uppercase tracking-wider font-bold rounded shadow transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Conversation</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSuccessData(null)
                setFormData({
                  name: '',
                  phone: '',
                  garmentType: initialGarmentType,
                  preferredDate: '',
                  designCode: '',
                  notes: '',
                  _gotcha: '',
                })
                setPhotoPreview(null)
              }}
              className="text-xs font-mono text-charcoal-muted hover:text-charcoal underline"
            >
              Book Another Garment
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Honeypot field (hidden from legitimate users) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData._gotcha}
              onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-input" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                Your Full Name *
              </label>
              <input
                id="name-input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Ramya Soundararajan"
                className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-sans"
              />
            </div>

            <div>
              <label htmlFor="phone-input" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                WhatsApp Mobile Number *
              </label>
              <input
                id="phone-input"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="garment-select" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                Garment Silhouette *
              </label>
              <select
                id="garment-select"
                value={formData.garmentType}
                onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-sans"
              >
                <option value="Bridal Maggam Blouse">Bridal Maggam Blouse (Hand Zardosi)</option>
                <option value="Grand Wedding Blouse">Grand Heavy Work Blouse</option>
                <option value="Designer Party Blouse">Designer / Velvet Cocktail Blouse</option>
                <option value="Daily Wear Blouse">Daily Wear Comfort Cut</option>
                <option value="Grand Frock">Grand Party Frock</option>
                <option value="Bespoke Kurti">Bespoke Kurti (A-Line / Straight)</option>
                <option value="Custom Churidar">Custom Churidar / Salwar</option>
                <option value="90s Retro Collection">90s Retro Vintage Puffed Sleeves</option>
              </select>
            </div>

            <div>
              <label htmlFor="date-input" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                Preferred Fitting Date
              </label>
              <input
                id="date-input"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="code-input" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                Catalog Design Code (Optional)
              </label>
              <input
                id="code-input"
                type="text"
                value={formData.designCode}
                onChange={(e) => setFormData({ ...formData, designCode: e.target.value })}
                placeholder="e.g. D-0104, D-0045"
                className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-mono uppercase"
              />
            </div>

            {/* Reference Photo Upload Preview */}
            <div>
              <label className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
                Reference Photo (Optional)
              </label>
              {photoPreview ? (
                <div className="flex items-center justify-between p-2 bg-ivory rounded border border-surface-border">
                  <span className="text-[11px] truncate max-w-[180px] text-charcoal font-sans">
                    {photoName}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-rose-600 hover:text-rose-800 p-1"
                    title="Remove Photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-ivory hover:bg-surface-card rounded border border-dashed border-surface-border hover:border-maroon cursor-pointer text-charcoal-muted transition-colors">
                  <Upload className="w-3.5 h-3.5 text-maroon" />
                  <span className="text-[11px]">Upload Saree / Reference</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes-input" className="block text-charcoal-muted uppercase tracking-wider mb-1 font-semibold">
              Measurements & Styling Notes (Optional)
            </label>
            <textarea
              id="notes-input"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us your saree color, occasion date, or specific neckline requirements..."
              className="w-full px-3.5 py-2.5 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-charcoal font-sans resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-maroon hover:bg-maroon-hover disabled:opacity-60 text-ivory font-mono uppercase text-xs tracking-widest font-bold rounded shadow-md transition-all hover:scale-[1.01]"
          >
            {isLoading ? (
              <span>Submitting Reservation...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirm Reservation on WhatsApp</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-charcoal-subtle text-center">
            Strictly Women Only Atelier • 100% Free Lifetime Alteration Guarantee
          </p>
        </form>
      )}
    </div>
  )
}
