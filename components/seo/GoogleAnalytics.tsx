'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SREESTAR01'

/**
 * Custom Event Tracking Helper for Conversions
 */
export function trackGaEvent(
  eventName: 'whatsapp_click' | 'fitting_booked' | 'design_enquiry' | 'collection_view' | 'search_query',
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, eventParams)
  }
}

/**
 * Google Analytics 4 Integration Component
 */
export function GoogleAnalytics() {
  useEffect(() => {
    // Expose trackGaEvent globally for debugging in dev
    if (typeof window !== 'undefined') {
      ;(window as any).trackGaEvent = trackGaEvent
    }
  }, [])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}
