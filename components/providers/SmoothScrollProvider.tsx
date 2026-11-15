'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

export interface SmoothScrollContextType {
  lenis: any | null
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lenisInstance, setLenisInstance] = useState<any | null>(null)
  const lenisRef = useRef<any | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      return
    }

    let isMounted = true
    let rafId: number

    // Dynamically import Lenis on client
    import('lenis')
      .then(({ default: Lenis }) => {
        if (!isMounted) return

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.8,
        })

        lenisRef.current = lenis
        setLenisInstance(lenis)

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // Intercept hash links for smooth anchor scroll
        const handleAnchorClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement
          const anchor = target.closest('a')
          if (!anchor) return

          const href = anchor.getAttribute('href')
          if (href && href.startsWith('#') && href.length > 1) {
            const el = document.querySelector(href)
            if (el) {
              e.preventDefault()
              lenis.scrollTo(el, { offset: -80, duration: 1.4 })
            }
          }
        }

        document.addEventListener('click', handleAnchorClick)

        return () => {
          document.removeEventListener('click', handleAnchorClick)
          cancelAnimationFrame(rafId)
          lenis.destroy()
        }
      })
      .catch((err) => {
        // Fallback gracefully to native scroll if Lenis fails to load
        console.warn('Lenis smooth scroll fallback to native:', err)
      })

    return () => {
      isMounted = false
      if (rafId) cancelAnimationFrame(rafId)
      if (lenisRef.current) lenisRef.current.destroy()
    }
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    } else if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
