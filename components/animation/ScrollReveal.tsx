'use client'

import React, { useEffect, useRef, useState } from 'react'
import { getRevealStyles, RevealVariant } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export interface ScrollRevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.15,
  className,
  once = true,
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsRevealed(true)
      return
    }

    const currentEl = elementRef.current
    if (!currentEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          if (once) {
            observer.unobserve(currentEl)
          }
        } else if (!once) {
          setIsRevealed(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(currentEl)

    return () => {
      observer.disconnect()
    }
  }, [threshold, once])

  const { className: variantClassName, style: variantStyle } = getRevealStyles(variant, delay)

  return (
    <div
      ref={elementRef}
      data-revealed={isRevealed}
      style={variantStyle}
      className={cn(variantClassName, className)}
    >
      {children}
    </div>
  )
}
