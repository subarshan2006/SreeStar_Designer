'use client'

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({
  children,
  strength = 18,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !buttonRef.current) return

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    // Relative position from center of button
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Scale down to a subtle 8-10px max pull
    const pullX = (distanceX / (width / 2)) * (strength / 2)
    const pullY = (distanceY / (height / 2)) * (strength / 2)

    setPosition({ x: pullX, y: pullY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
      }}
      className={cn('inline-block will-change-transform', className)}
      {...props}
    >
      {children}
    </div>
  )
}
