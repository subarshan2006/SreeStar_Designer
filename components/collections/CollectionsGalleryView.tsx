'use client'

import React, { useState, useMemo, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DesignRecord } from '@/lib/api'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { DesignCodeBadge } from '@/components/ui/typography'
import { HeartButton } from '@/components/ui/HeartButton'
import { DesignLightbox } from '@/components/home/DesignLightbox'
import { BookingModal } from '@/components/navigation/BookingModal'
import { createWhatsAppLink } from '@/lib/whatsapp'
import { generateSeoAltText } from '@/lib/seo'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import {
  Search,
  SlidersHorizontal,
  X,
  MessageCircle,
  Eye,
  Sparkles,
  ChevronDown,
  Loader2,
} from 'lucide-react'

export interface CollectionsGalleryViewProps {
  allDesigns: DesignRecord[]
  initialCategory?: string
}

const ITEMS_PER_PAGE = 24

export function CollectionsGalleryView({
  allDesigns,
  initialCategory = 'all',
}: CollectionsGalleryViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || initialCategory
  )
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured')
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false)
  const [bookingDesignCode, setBookingDesignCode] = useState<string>('')
  const [, startTransition] = useTransition()

  // Sync state to URL without reloading
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory)
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (sortBy && sortBy !== 'featured') params.set('sort', sortBy)

    const queryStr = params.toString()
    const targetUrl = queryStr ? `/collections?${queryStr}` : '/collections'

    startTransition(() => {
      window.history.replaceState(null, '', targetUrl)
    })
  }, [selectedCategory, searchQuery, sortBy])

  // Filter & Sort Logic
  const filteredDesigns = useMemo(() => {
    let result = allDesigns

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'new') {
        result = result.filter((d) => d.isNew)
      } else if (selectedCategory === 'trending') {
        result = result.filter((d) => d.isTrending)
      } else {
        const cleanCat = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, '')
        result = result.filter((d) => {
          const itemCat = d.categoryName.toLowerCase().replace(/[^a-z0-9]/g, '')
          return itemCat.includes(cleanCat) || cleanCat.includes(itemCat)
        })
      }
    }

    // 2. Keyword Search (Design code, title, work type, fabrics)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((d) => {
        return (
          d.designCode.toLowerCase().includes(q) ||
          d.title.toLowerCase().includes(q) ||
          d.categoryName.toLowerCase().includes(q) ||
          (d.workType && d.workType.toLowerCase().includes(q)) ||
          (d.fabricOptions && d.fabricOptions.some((f) => f.toLowerCase().includes(q)))
        )
      })
    }

    // 3. Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'new') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      }
      if (sortBy === 'trending') {
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)
      }
      if (sortBy === 'code') {
        return a.designCode.localeCompare(b.designCode)
      }
      // Default: featured first, then sortOrder
      if (a.isFeatured !== b.isFeatured) {
        return b.isFeatured ? 1 : -1
      }
      return a.sortOrder - b.sortOrder
    })
  }, [allDesigns, selectedCategory, searchQuery, sortBy])

  // Paginated slice
  const visibleDesigns = useMemo(() => {
    return filteredDesigns.slice(0, visibleCount)
  }, [filteredDesigns, visibleCount])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
      setIsLoadingMore(false)
    }, 300)
  }

  const handleOpenBooking = (code?: string) => {
    setBookingDesignCode(code || '')
    setIsBookingOpen(true)
  }

  const activeLightboxDesign =
    activeLightboxIndex !== null ? visibleDesigns[activeLightboxIndex] : null

  return (
    <>
      {/* Lightbox Quick View */}
      {activeLightboxDesign && (
        <DesignLightbox
          design={activeLightboxDesign}
          onClose={() => setActiveLightboxIndex(null)}
          onNext={() => {
            if (activeLightboxIndex < visibleDesigns.length - 1) {
              setActiveLightboxIndex(activeLightboxIndex + 1)
            }
          }}
          onPrev={() => {
            if (activeLightboxIndex > 0) {
              setActiveLightboxIndex(activeLightboxIndex - 1)
            }
          }}
          onOpenBooking={(code) => handleOpenBooking(code)}
        />
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDesignCode={bookingDesignCode}
      />

      {/* Control Bar: Category Pills + Search + Sort */}
      <section aria-label="Collections Filter & Search Controls" className="mb-10 space-y-6">
        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {CATEGORIES_WITH_META.map((cat) => {
            const isSelected = selectedCategory === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setVisibleCount(ITEMS_PER_PAGE)
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-maroon text-ivory border-maroon shadow-md font-bold'
                    : 'bg-surface-card text-charcoal border-surface-border hover:border-charcoal/40 hover:bg-ivory'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1.5 text-[10px] opacity-70`}>({cat.count})</span>
              </button>
            )
          })}
        </div>

        {/* Search Bar + Sort Matrix Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-surface-card rounded-sm border border-surface-border">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(ITEMS_PER_PAGE)
              }}
              placeholder="Search by code (e.g. D-0104), cutwork, zardosi, velvet..."
              className="w-full pl-10 pr-9 py-2 bg-ivory rounded border border-surface-border focus:border-maroon focus:outline-none text-xs font-mono text-charcoal placeholder:text-charcoal-subtle"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-maroon" />
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-2 bg-ivory rounded border border-surface-border text-xs font-mono uppercase text-charcoal focus:border-maroon focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="new">New Arrivals</option>
                  <option value="trending">Trending Now</option>
                  <option value="code">Design Code (A-Z)</option>
                </select>
                <ChevronDown className="w-3 h-3 text-charcoal-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Design Counter */}
            <span className="font-mono text-xs text-charcoal-muted whitespace-nowrap">
              Showing <strong className="text-charcoal">{visibleDesigns.length}</strong> of{' '}
              <strong className="text-charcoal">{filteredDesigns.length}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Runway Gallery Grid */}
      {visibleDesigns.length === 0 ? (
        <div className="text-center py-20 bg-surface-card rounded border border-surface-border space-y-4 my-8">
          <Sparkles className="w-8 h-8 text-gold mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-charcoal">
              No Matching Silhouettes Found
            </h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto font-sans">
              No garments matched &ldquo;{searchQuery}&rdquo;. Try another search keyword or clear filters.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="px-4 py-2 bg-maroon text-ivory text-xs font-mono uppercase tracking-wider rounded font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <section aria-label="Collections Garment Grid">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {visibleDesigns.map((design, idx) => {
              const catSlug = design.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              const detailUrl = `/collections/${catSlug}/${design.slug}`
              const waUrl = createWhatsAppLink({
                type: 'design_enquiry',
                designCode: design.designCode,
                title: design.title,
              })

              return (
                <figure
                  key={design.id}
                  className="group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl m-0"
                >
                  {/* Image Container with Zero CLS */}
                  <div
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="relative overflow-hidden cursor-pointer"
                  >
                    <OptimizedImage
                      src={design.imageUrl}
                      alt={generateSeoAltText(design)}
                      width={design.width}
                      height={design.height}
                      aspectRatio={design.aspectRatio}
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <DesignCodeBadge code={design.designCode} />
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                      {design.isNew && (
                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-maroon text-white rounded">
                          New
                        </span>
                      )}
                      <HeartButton designCode={design.designCode} size="sm" />
                    </div>

                    {/* Hover Quick View Overlay Action */}
                    <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveLightboxIndex(idx)
                        }}
                        className="p-2.5 bg-white text-charcoal rounded-full shadow-lg hover:bg-gold hover:text-white transition-all transform -translate-y-1 group-hover:translate-y-0"
                        title="Quick View Lightbox"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon-hover transition-all transform translate-y-1 group-hover:translate-y-0"
                        title="Enquire on WhatsApp"
                        aria-label="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Semantic Figcaption Details */}
                  <figcaption className="p-3 bg-surface-card flex flex-col justify-between flex-1 space-y-2 border-t border-surface-border/50">
                    <div
                      onClick={() => router.push(detailUrl)}
                      className="cursor-pointer group-hover:text-maroon transition-colors"
                    >
                      <h3 className="font-serif text-xs sm:text-sm font-semibold text-charcoal line-clamp-1">
                        {design.title}
                      </h3>
                      <p className="font-mono text-[10px] text-charcoal-muted mt-0.5 line-clamp-1">
                        {design.workType || 'Artisanal Needlework'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-surface-border/50 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-charcoal-subtle uppercase">
                        {design.fabricOptions?.[0] || 'Silk'}
                      </span>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-maroon font-bold hover:underline inline-flex items-center gap-0.5 uppercase tracking-wider"
                      >
                        <span>Enquire</span>
                        <MessageCircle className="w-3 h-3" />
                      </a>
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {/* "Load More" Pagination Control */}
      {visibleCount < filteredDesigns.length && (
        <div className="pt-14 pb-8 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal hover:bg-maroon text-ivory font-mono text-xs uppercase tracking-widest font-semibold rounded shadow-lg transition-all duration-300 disabled:opacity-60"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
                <span>Fetching Next Silhouettes...</span>
              </>
            ) : (
              <>
                <span>Load More Designs (+{Math.min(ITEMS_PER_PAGE, filteredDesigns.length - visibleCount)})</span>
                <span className="text-gold font-bold">+</span>
              </>
            )}
          </button>

          <p className="font-mono text-xs text-charcoal-muted mt-3">
            Showing {visibleDesigns.length} of {filteredDesigns.length} curated designs
          </p>
        </div>
      )}
    </>
  )
}
