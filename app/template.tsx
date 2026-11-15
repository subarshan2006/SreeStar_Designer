'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationProgressBar } from '@/components/ui/NavigationProgressBar'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { lenis } = useSmoothScroll()

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenis])

  return (
    <>
      <NavigationProgressBar />
      <div className="animate-fade-up min-h-screen">
        {children}
      </div>
    </>
  )
}
