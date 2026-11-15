'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, captureUtmParameters } from '@/lib/analytics'

export function ScrollDepthTracker() {
  const pathname = usePathname()
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Reset tracked depths on navigation
    trackedDepths.current = new Set()
    captureUtmParameters()

    const handleScroll = () => {
      if (typeof window === 'undefined') return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const currentScroll = window.scrollY
      const scrollPercent = Math.min(Math.round((currentScroll / scrollHeight) * 100), 100)

      const thresholds = [25, 50, 75, 90]

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold)
          trackEvent('scroll_depth', {
            percent: threshold,
            source_page: pathname,
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
