'use client'

import React, { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 })
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isFinePointer || prefersReduced) {
      setEnabled(false)
      return
    }

    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Detect hovered element type
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')

      const isGarmentImage =
        target.closest('[data-design-id]') ||
        target.closest('.group\\/image') ||
        target.closest('article')

      if (isGarmentImage && !isInteractive) {
        setCursorType('view')
      } else if (isInteractive) {
        setCursorType('hover')
      } else {
        setCursorType('default')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  // Smooth lerp loop for the outer trailing ring
  useEffect(() => {
    if (!enabled) return

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, cursorPos.x, 0.18),
        y: lerp(prev.y, cursorPos.y, 0.18),
      }))
      rafRef.current = requestAnimationFrame(updateTrailing)
    }

    rafRef.current = requestAnimationFrame(updateTrailing)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, cursorPos])

  if (!enabled || !isVisible) return null

  const isHovered = cursorType === 'hover'
  const isView = cursorType === 'view'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Center Precision Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-charcoal mix-blend-difference transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 0 : isView ? 0 : 1})`,
        }}
      />

      {/* Trailing Luxury Ring */}
      <div
        className="fixed rounded-full transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: 'translate3d(-50%, -50%, 0)',
          width: isHovered ? '46px' : isView ? '56px' : '28px',
          height: isHovered ? '46px' : isView ? '56px' : '28px',
          backgroundColor: isView ? 'rgba(114, 27, 41, 0.88)' : isHovered ? 'rgba(197, 160, 89, 0.25)' : 'transparent',
          borderColor: isView ? '#721B29' : isHovered ? '#C5A059' : 'rgba(20, 20, 19, 0.35)',
          borderWidth: isView ? '0px' : '1px',
          color: isView ? '#FAF9F5' : '#141413',
        }}
      >
        {isView && <span>View</span>}
      </div>
    </div>
  )
}
