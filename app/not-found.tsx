import React from 'react'
import Link from 'next/link'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { ArrowLeft, Compass, Scissors } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between p-6 sm:p-12 select-none">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">
          404 • Page Not Found
        </span>
        <span className="font-mono text-xs text-charcoal-muted">
          SreeStar Tailoring Atelier
        </span>
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-6 my-auto py-12">
        <div className="w-16 h-16 mx-auto rounded-full bg-maroon-light flex items-center justify-center text-maroon">
          <Scissors className="w-8 h-8" />
        </div>

        <Caption>Missing Silhouette</Caption>

        <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
          This Pattern Has Moved
        </Heading>

        <Body tone="muted" size="base" className="max-w-md mx-auto">
          The tailored piece or design code you are seeking has either been updated, archived, or drafted under a new collection.
        </Body>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-maroon text-white hover:bg-maroon-hover transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>

          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 border border-charcoal/30 hover:border-maroon hover:text-maroon transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold"
          >
            <Compass className="w-4 h-4" />
            <span>Browse 500+ Designs</span>
          </Link>
        </div>
      </div>

      <div className="text-center border-t border-surface-border pt-4 font-mono text-[11px] text-charcoal-subtle">
        © {new Date().getFullYear()} SreeStar Tailoring. Exclusively for Women.
      </div>
    </div>
  )
}
