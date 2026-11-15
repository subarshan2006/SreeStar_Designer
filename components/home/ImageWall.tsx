'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { DesignRecord } from '@/lib/api'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { DesignCodeBadge, Caption, Heading } from '@/components/ui/typography'
import { HeartButton } from '@/components/ui/HeartButton'
import { SITE_CONFIG } from '@/lib/constants'
import { generateSeoAltText } from '@/lib/seo'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { ArrowRight, Eye, MessageCircle, Sparkles } from 'lucide-react'

export interface ImageWallProps {
  designs: DesignRecord[]
  onSelectDesign?: (design: DesignRecord) => void
  onOpenBooking?: (designCode?: string) => void
}

export function ImageWall({
  designs,
  onSelectDesign,
  onOpenBooking,
}: ImageWallProps) {
  const [columnCount, setColumnCount] = useState<number>(5)
  const [scrollY, setScrollY] = useState<number>(0)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const { lenis } = useSmoothScroll()

  // Detect screen size for responsive columns (Desktop: 5–6, Tablet: 3–4, Mobile: 2)
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumnCount(2) // Mobile 2 staggered columns
      } else if (width < 1024) {
        setColumnCount(3) // Tablet 3 columns
      } else if (width < 1440) {
        setColumnCount(5) // Desktop 5 columns
      } else {
        setColumnCount(6) // Wide screens 6 columns
      }
    }

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setIsReducedMotion(mediaQuery.matches)
    }

    updateColumns()
    checkReducedMotion()

    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Synchronize with Lenis scroll stream or RAF fallback for 60fps parallax drift
  useEffect(() => {
    if (isReducedMotion) return

    let rafId: number

    if (lenis) {
      // Connect to Lenis smooth scroll ticker directly
      const onLenisScroll = (e: any) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          setScrollY(e.scroll || window.scrollY)
        }
      }

      lenis.on('scroll', onLenisScroll)
      return () => lenis.off('scroll', onLenisScroll)
    } else {
      // Standalone RAF fallback
      const handleScroll = () => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          setScrollY(window.scrollY)
        }
      }

      const onScrollTick = () => {
        handleScroll()
        rafId = requestAnimationFrame(onScrollTick)
      }

      rafId = requestAnimationFrame(onScrollTick)
      return () => cancelAnimationFrame(rafId)
    }
  }, [lenis, isReducedMotion])

  // Sprint 22: Batched Intersection Observer for staggered card reveals
  useEffect(() => {
    if (isReducedMotion) {
      // If reduced motion, reveal everything immediately
      const allIds = new Set(designs.map((d) => d.id))
      setRevealedIds(allIds)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-design-id')
            if (id) {
              setRevealedIds((prev) => {
                const next = new Set(prev)
                next.add(id)
                return next
              })
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    )

    const cards = containerRef.current?.querySelectorAll('[data-design-id]')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [designs, columnCount, isReducedMotion])

  // Distribute designs across active columns balancing heights (Masonry algorithm)
  const columns: DesignRecord[][] = Array.from({ length: columnCount }, () => [])
  const columnHeights: number[] = Array.from({ length: columnCount }, () => 0)

  // Staggered starting vertical offsets for each column (Sprint 10)
  const columnOffsets = [0, 80, 30, 110, 50, 130]

  // Sprint 21: Precise per-column parallax speed ratios (0.8x to 1.2x variance)
  // Mobile uses a gentle 0.02x factor to maintain strict 60fps on low-end devices
  const isMobile = columnCount === 2
  const columnSpeeds = isMobile
    ? [0.015, 0.035]
    : [0.03, 0.075, 0.02, 0.085, 0.04, 0.065]

  designs.slice(0, 42).forEach((design) => {
    let minIndex = 0
    let minHeight = columnHeights[0]

    for (let c = 1; c < columnCount; c++) {
      if (columnHeights[c] < minHeight) {
        minHeight = columnHeights[c]
        minIndex = c
      }
    }

    columns[minIndex].push(design)
    const cardHeight = design.height / (design.width / 300)
    columnHeights[minIndex] += cardHeight + 24
  })

  return (
    <section
      ref={containerRef}
      aria-label="Curated Image Wall"
      className="relative w-full py-16 sm:py-24 bg-ivory overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-maroon" />
            <Caption>Curated Image Wall • 500+ Tailored Pieces</Caption>
          </div>
          <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl lg:text-6xl mt-2 text-charcoal">
            The Living Design Archive
          </Heading>
          <p className="font-sans text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl">
            Each vertical column drifts at an independent scroll rhythm. Tap or hover any design for code references and direct WhatsApp fitting enquiry.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-maroon hover:text-maroon-hover font-bold border-b border-maroon pb-0.5"
          >
            <span>View All 500+ Designs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Edge-to-Edge Staggered Column Wall (with ~16-20px gutters) */}
      <div className="w-[102vw] -ml-[1vw] px-2 sm:px-4">
        <div
          className="grid gap-3 sm:gap-4 md:gap-5"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((colDesigns, colIdx) => {
            const startOffset = columnOffsets[colIdx % columnOffsets.length]
            const driftSpeed = columnSpeeds[colIdx % columnSpeeds.length]
            const parallaxTranslate = isReducedMotion ? 0 : Math.round((scrollY - 300) * driftSpeed)

            return (
              <div
                key={`col-${colIdx}`}
                className="flex flex-col gap-4 sm:gap-5 transition-transform duration-75 ease-out will-change-transform"
                style={{
                  paddingTop: `${startOffset}px`,
                  transform: `translate3d(0, ${parallaxTranslate}px, 0)`,
                }}
              >
                {colDesigns.map((design, itemIdx) => {
                  const isRevealed = revealedIds.has(design.id)
                  const staggeredDelay = (itemIdx % 5) * 60
                  const waText = `Hi ${SITE_CONFIG.shopName}! I saw design code *${design.designCode}* (${design.title}) on your Image Wall. Can I know more details?`

                  return (
                    <article
                      key={design.id}
                      data-design-id={design.id}
                      onClick={() => {
                        if (onSelectDesign) onSelectDesign(design)
                      }}
                      style={{
                        transitionDelay: `${staggeredDelay}ms`,
                      }}
                      className={`group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer ${
                        isRevealed
                          ? 'opacity-100 translate-y-0 scale-100 [clip-path:inset(0%_0%_0%_0%)]'
                          : 'opacity-0 translate-y-6 scale-[0.97] [clip-path:inset(10%_0%_0%_0%)]'
                      }`}
                    >
                      {/* Semantic Figure & Image Container with Zero Layout Shift */}
                      <figure className="relative flex flex-col m-0">
                        <div className="relative overflow-hidden">
                          <OptimizedImage
                            src={design.imageUrl}
                            alt={generateSeoAltText(design)}
                            width={design.width}
                            height={design.height}
                            aspectRatio={design.aspectRatio}
                            className="group-hover:scale-[1.035] transition-transform duration-700 ease-out"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 z-20 transition-opacity duration-300">
                            <DesignCodeBadge code={design.designCode} />
                          </div>

                          {design.isNew && (
                            <div className="absolute top-2.5 right-2.5 z-20">
                              <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-maroon text-white rounded">
                                New
                              </span>
                            </div>
                          )}

                          {/* Hover Overlay Action Bar */}
                          <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2">
                            <HeartButton designCode={design.designCode} size="md" />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (onSelectDesign) onSelectDesign(design)
                              }}
                              className="p-2.5 bg-white text-charcoal rounded-full shadow-lg hover:bg-gold hover:text-white transition-all transform -translate-y-1 group-hover:translate-y-0"
                              aria-label="Quick View Design"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <a
                              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2.5 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon-hover transition-all transform translate-y-1 group-hover:translate-y-0"
                              aria-label="Enquire on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Semantic Figcaption beneath each image */}
                        <figcaption className="p-3 sm:p-3.5 bg-surface-card flex flex-col justify-between space-y-1.5 border-t border-surface-border/40">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif text-xs sm:text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-1">
                              {design.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-muted">
                            <span className="uppercase tracking-wider">{design.categoryName}</span>
                            <span className="text-maroon font-semibold group-hover:underline">
                              Enquire →
                            </span>
                          </div>
                        </figcaption>
                      </figure>
                    </article>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* End of Wall Banner & "View all 500+ designs" Link */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-surface-border text-xs font-mono text-charcoal-muted">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Curated archive represents 40 of 500+ tailored masterworks</span>
        </div>

        <Heading level={3} variant="serif" italic className="text-2xl sm:text-4xl">
          Looking for a specific back-neck cut or bridal maggam work?
        </Heading>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-charcoal text-white hover:bg-maroon transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold"
          >
            <span>Explore All 500+ Designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => {
              if (onOpenBooking) onOpenBooking()
            }}
            className="inline-flex items-center gap-2 border border-charcoal/30 hover:border-maroon hover:text-maroon transition-colors px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold"
          >
            <span>Book a Fitting +</span>
          </button>
        </div>
      </div>
    </section>
  )
}
