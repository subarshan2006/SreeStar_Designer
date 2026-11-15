'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { BookingForm } from '@/components/booking/BookingForm'
import { Heading, Caption } from '@/components/ui/typography'

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a Fitting Appointment"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fade-up overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-ivory rounded-sm shadow-2xl border border-surface-border overflow-hidden p-6 sm:p-8 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-surface transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1">
          <Caption>Direct Atelier Consultation</Caption>
          <Heading level={2} variant="serif" className="text-2xl sm:text-3xl">
            Book a Fitting Appointment
          </Heading>
          <p className="text-xs text-charcoal-muted font-sans">
            Schedule your custom measurement session at our Chennai studio or request doorstep fitting.
          </p>
        </div>

        <BookingForm
          initialDesignCode={preselectedDesignCode}
          onSuccess={() => {}}
        />
      </div>
    </div>
  )
}
