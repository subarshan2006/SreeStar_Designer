'use client'

/**
 * ====================================================================
 * SreeStar Tailoring — Unified Analytics & Conversion Engine (GA4 + Meta Pixel)
 * Tracks high-intent client behaviors for bespoke tailoring conversions
 * ====================================================================
 */

export type ConversionEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'form_submit'
  | 'design_enquiry'
  | 'wishlist_add'
  | 'wishlist_share'
  | 'lightbox_open'
  | 'video_play'
  | 'scroll_depth'

export interface ConversionEventParams {
  design_code?: string
  category?: string
  source_page?: string
  fabric_preference?: string
  percent?: number
  value?: number
  currency?: string
  [key: string]: unknown
}

// Window typing declarations
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Track an event across Google Analytics 4 and Meta Pixel simultaneously
 */
export function trackEvent(
  eventName: ConversionEventName,
  params: ConversionEventParams = {}
) {
  if (typeof window === 'undefined') return

  // 1. Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    })
  }

  // 2. Meta Pixel (Facebook Pixel) mapping
  if (window.fbq) {
    switch (eventName) {
      case 'whatsapp_click':
      case 'form_submit':
        window.fbq('track', 'Lead', {
          content_name: params.category || 'Bespoke Tailoring',
          content_category: params.category,
          content_ids: params.design_code ? [params.design_code] : undefined,
          value: params.value || 1500,
          currency: 'INR',
        })
        break

      case 'call_click':
        window.fbq('track', 'Contact', {
          content_name: 'Phone Atelier Consultation',
        })
        break

      case 'design_enquiry':
        window.fbq('track', 'ViewContent', {
          content_name: params.design_code,
          content_category: params.category,
          content_ids: params.design_code ? [params.design_code] : undefined,
        })
        break

      case 'wishlist_add':
        window.fbq('track', 'AddToWishlist', {
          content_ids: params.design_code ? [params.design_code] : undefined,
          content_category: params.category,
        })
        break

      case 'wishlist_share':
        window.fbq('trackCustom', 'WishlistShare', params)
        break

      default:
        window.fbq('trackCustom', eventName, params)
        break
    }
  }
}

/**
 * Convenience helper to track WhatsApp click conversions
 */
export function trackWhatsAppClick(source: string, designCode?: string) {
  trackEvent('whatsapp_click', {
    source_page: source,
    design_code: designCode,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Convenience helper to track phone call conversions
 */
export function trackPhoneClick(source: string) {
  trackEvent('call_click', {
    source_page: source,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Convenience helper to track appointment form submissions
 */
export function trackFormSubmission(garmentType: string, designCode?: string) {
  trackEvent('form_submit', {
    category: garmentType,
    design_code: designCode,
    value: 2000,
    currency: 'INR',
  })
}

/**
 * UTM Parameter Extraction & Storage for Attribution
 */
export function captureUtmParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const captured: Record<string, string> = {}

  utmKeys.forEach((key) => {
    const val = params.get(key)
    if (val) {
      captured[key] = val
      try {
        sessionStorage.setItem(`sreestar_${key}`, val)
      } catch {
        // Safe fallback for restricted storage
      }
    }
  })

  return captured
}
