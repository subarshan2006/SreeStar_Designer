'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.min(100, Math.round((scrolled / docHeight) * 100)) : 0

      setScrollPercent(percent)
      setVisible(scrolled > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  // Circumference for a 20px radius circle = 2 * PI * 20 = 125.6
  const strokeDashoffset = 125.6 - (125.6 * scrollPercent) / 100

  return (
    <button
      type="button"
      onClick={() => scrollTo(0)}
      aria-label="Back to Top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-ivory border border-surface-border text-charcoal shadow-xl hover:shadow-2xl hover:border-maroon flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group focus:outline-none select-none"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#E8E4DC"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#721B29"
          strokeWidth="2.5"
          strokeDasharray="125.6"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
        />
      </svg>

      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-charcoal group-hover:text-maroon" />
    </button>
  )
}
