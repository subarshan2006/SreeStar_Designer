'use client'

import React from 'react'

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-maroon focus:text-ivory focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:rounded focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold"
    >
      Skip to main content
    </a>
  )
}
