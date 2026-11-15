import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { getFeaturedDesigns } from '@/lib/api'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: `Haute Couture Collections | 500+ Bespoke Women's Tailoring Designs | ${SITE_CONFIG.shopName} Chennai`,
  description: `Browse 500+ custom women's tailoring designs: Bridal Maggam work, heavy grand blouses, designer cuts, frocks, kurtis, churidars, and authentic 90s vintage collections.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/collections`,
  },
}

export default async function CollectionsIndexPage() {
  const featuredGarments = await getFeaturedDesigns(12)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <Navbar activeCategory="all" />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted">
            <Link href="/" className="hover:text-maroon transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold">Collections Archive</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            {CATEGORIES_WITH_META.length} Curated Categories • 500+ Designs
          </span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
            <Caption>Handcrafted Artisanal Catalog • Women Only</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl lg:text-7xl text-charcoal">
            The Atelier Collections
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl text-base sm:text-lg">
            Every garment in our archive is bespoke, cut individually to your measurements with zero mass production. Explore our signature silhouettes below.
          </Body>
        </div>

        {/* Category Grid */}
        <section aria-label="Garment Categories" className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES_WITH_META.map((cat, idx) => {
              const previewImg = `/placeholders/placeholder-d-${String((idx % 50) + 1).padStart(4, '0')}.svg`

              return (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.id}`}
                  className="group relative flex flex-col justify-between bg-surface-card rounded-sm overflow-hidden border border-surface-border p-5 hover:border-maroon/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-ivory border border-surface-border/60">
                      <OptimizedImage
                        src={previewImg}
                        alt={`${cat.name} Collection — ${SITE_CONFIG.shopName}`}
                        width={600}
                        height={450}
                        aspectRatio={4 / 3}
                        className="group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-charcoal/90 text-ivory rounded backdrop-blur">
                          {cat.count}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-maroon text-[11px] font-mono uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{cat.badge}</span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal group-hover:text-maroon transition-colors">
                        {cat.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-surface-border/70 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-charcoal group-hover:text-maroon">
                    <span>Explore Silhouettes</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured Runway Garments Preview */}
        <section aria-label="Featured Runway Garments">
          <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
            <div>
              <Caption>Handpicked Highlights</Caption>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                Trending on the Runway
              </h2>
            </div>
            <Link
              href="/collections/bridal-blouses"
              className="text-xs font-mono uppercase tracking-widest text-maroon hover:underline hidden sm:inline-block"
            >
              View Bridal Collection →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {featuredGarments.map((design) => {
              const catSlug = design.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              const detailUrl = `/collections/${catSlug}/${design.slug}`

              return (
                <Link
                  key={design.id}
                  href={detailUrl}
                  className="group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <OptimizedImage
                      src={design.imageUrl}
                      alt={design.title}
                      width={design.width}
                      height={design.height}
                      aspectRatio={design.aspectRatio}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-charcoal/90 text-ivory rounded backdrop-blur">
                        {design.designCode}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 flex flex-col justify-between flex-1">
                    <h3 className="font-serif text-xs font-semibold text-charcoal line-clamp-1 group-hover:text-maroon transition-colors">
                      {design.title}
                    </h3>
                    <p className="font-mono text-[10px] text-charcoal-muted mt-0.5">
                      {design.workType || 'Artisanal Fit'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
