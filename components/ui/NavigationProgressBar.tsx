'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationProgressBar() {
  const pathname = usePathname()
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
    const timer = setTimeout(() => {
      setAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!animating) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2.5px] z-[999] pointer-events-none overflow-hidden bg-transparent"
    >
      <div className="h-full bg-gradient-to-r from-maroon via-gold to-maroon animate-[shimmer_1s_infinite] w-full" />
    </div>
  )
}
