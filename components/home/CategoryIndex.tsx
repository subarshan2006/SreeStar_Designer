'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Caption } from '@/components/ui/typography'
import { ArrowUpRight } from 'lucide-react'

export interface CategoryIndexItem {
  id: string
  number: string
  title: string
  badge: string
  count: string
  desc: string
  previewImage: string
}

export const CATEGORY_INDEX_LIST: CategoryIndexItem[] = [
  {
    id: 'bridal-blouses',
    number: '01',
    title: 'Bridal Blouses',
    badge: 'Signature Maggam & Zardosi',
    count: '140+ Designs',
    desc: 'Intricate peacock, kundan & temple embroidery for muhurtham silk sarees.',
    previewImage: '/placeholders/placeholder-d-0001.svg',
  },
  {
    id: 'grand-blouses',
    number: '02',
    title: 'Grand Blouses',
    badge: 'Heavy Work & Velvet',
    count: '110+ Designs',
    desc: 'Dense stone work, jewel-toned velvets, and opulent reception cutwork.',
    previewImage: '/placeholders/placeholder-d-0002.svg',
  },
  {
    id: 'designer-blouses',
    number: '03',
    title: 'Designer Blouses',
    badge: 'Modern & Party Wear',
    count: '95+ Designs',
    desc: 'Contemporary necklines, illusion sheer backs, and minimal chic cuts.',
    previewImage: '/placeholders/placeholder-d-0003.svg',
  },
  {
    id: 'frocks',
    number: '04',
    title: 'Frocks & Gowns',
    badge: 'Occasion & Flared Wear',
    count: '55+ Designs',
    desc: 'Multi-tiered organza gowns, party frocks, and mother-daughter sets.',
    previewImage: '/placeholders/placeholder-d-0004.svg',
  },
  {
    id: 'kurtis',
    number: '05',
    title: 'Custom Kurtis',
    badge: 'A-Line & Straight Fit',
    count: '65+ Designs',
    desc: 'Flawless everyday cuts tailored with reinforced seams and princess panels.',
    previewImage: '/placeholders/placeholder-d-0005.svg',
  },
  {
    id: 'churidars',
    number: '06',
    title: 'Churidars',
    badge: 'Bespoke Fit Sets',
    count: '50+ Designs',
    desc: 'Exact waist, hip, and ankle tapering with comfort-lined materials.',
    previewImage: '/placeholders/placeholder-d-0006.svg',
  },
  {
    id: '90s-collection',
    number: '07',
    title: '90s Collection',
    badge: 'Retro Vintage Nostalgia',
    count: '40+ Designs',
    desc: 'Classic South Indian cinema puffed sleeves, high collars, and vintage piping.',
    previewImage: '/placeholders/placeholder-d-0007.svg',
  },
]

export function CategoryIndex() {
  const [activeItem, setActiveItem] = useState<CategoryIndexItem | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track cursor movement across section for floating magnetic preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      // Relative coordinates inside the section
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    const sectionEl = sectionRef.current
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Category Index"
      className="relative w-full py-20 sm:py-28 bg-ivory text-charcoal overflow-hidden select-none border-t border-surface-border"
    >
      {/* Floating Cursor-Following Image Preview (Desktop Only) */}
      {activeItem && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 hidden lg:block rounded-sm overflow-hidden shadow-2xl border-2 border-ivory transition-transform duration-200 ease-out"
          style={{
            left: `${mousePos.x + 40}px`,
            top: `${mousePos.y - 120}px`,
            width: '280px',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <div className="relative aspect-[3/4] bg-surface-card overflow-hidden">
            <OptimizedImage
              src={activeItem.previewImage}
              alt={activeItem.title}
              width={600}
              height={800}
              priority={true}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="font-mono text-[10px] tracking-widest uppercase text-gold-shimmer">
                {activeItem.badge}
              </span>
              <p className="font-serif text-sm font-medium">{activeItem.title}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-maroon" />
              <Caption>Architectural Taxonomy • Zero Saree Sales</Caption>
            </div>
            <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl lg:text-6xl mt-2 text-charcoal">
              Category Index
            </Heading>
          </div>
          <p className="font-mono text-xs text-charcoal-muted max-w-xs text-right hidden sm:block">
            Hover to preview silhouettes • Tap to view full collection archive
          </p>
        </div>

        {/* Desktop Editorial Typographic List */}
        <div className="hidden md:flex flex-col divide-y divide-surface-border">
          {CATEGORY_INDEX_LIST.map((item) => {
            const isHovered = activeItem?.id === item.id
            const isAnyHovered = activeItem !== null

            return (
              <Link
                key={item.id}
                href={`/collections/${item.id}`}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className={`group py-7 sm:py-9 flex items-center justify-between transition-all duration-300 ${
                  isAnyHovered && !isHovered ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs sm:text-sm text-charcoal-subtle group-hover:text-maroon transition-colors">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal group-hover:text-maroon group-hover:translate-x-2 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-charcoal-muted mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs tracking-wider text-charcoal-muted uppercase px-3 py-1 bg-surface-card rounded-full border border-surface-border">
                    {item.count}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-surface-border flex items-center justify-center text-charcoal group-hover:border-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile Stacked Luxury Image Cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {CATEGORY_INDEX_LIST.map((item) => (
            <Link
              key={item.id}
              href={`/collections/${item.id}`}
              className="group relative aspect-[16/9] rounded-sm overflow-hidden border border-surface-border shadow-md block"
            >
              <OptimizedImage
                src={item.previewImage}
                alt={item.title}
                width={800}
                height={450}
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-shimmer">
                    {item.number} • {item.badge}
                  </span>
                  <h3 className="font-serif text-xl font-medium mt-0.5">{item.title}</h3>
                  <p className="text-[11px] font-sans text-ivory-dark/80 line-clamp-1">{item.desc}</p>
                </div>

                <span className="font-mono text-[11px] px-2.5 py-1 bg-white/20 backdrop-blur rounded text-white font-semibold">
                  {item.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
