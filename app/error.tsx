'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { RotateCcw, MessageCircle, AlertCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('SreeStar Studio Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between p-6 sm:p-12 select-none">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-maroon" />
          <span>Atelier System Notice</span>
        </span>
        <span className="font-mono text-xs text-charcoal-muted">
          500 • Temporary Glitch
        </span>
      </div>

      <div className="max-w-xl mx-auto text-center space-y-6 my-auto py-12">
        <Caption>Unforeseen Tension</Caption>

        <Heading level={1} variant="serif" italic className="text-3xl sm:text-5xl text-charcoal">
          Something Caught in the Seams
        </Heading>

        <Body tone="muted" size="base">
          A temporary rendering error occurred. Our master tailors have been notified. Please try resetting the viewport or connect directly with our studio concierge.
        </Body>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-maroon text-white hover:bg-maroon-hover transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20noticed%20an%20issue%20on%20the%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-charcoal/30 hover:border-maroon hover:text-maroon transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Notify Concierge</span>
          </a>
        </div>
      </div>

      <div className="text-center border-t border-surface-border pt-4 font-mono text-[11px] text-charcoal-subtle">
        <Link href="/" className="underline hover:text-maroon">
          Return to SreeStar Home
        </Link>
      </div>
    </div>
  )
}
