import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { getAllDesigns } from '@/lib/api'
import { SITE_CONFIG, CATEGORIES_WITH_META } from '@/lib/constants'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'
import { CollectionsGalleryView } from '@/components/collections/CollectionsGalleryView'
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
  const { designs } = await getAllDesigns(1, 500)

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
            <span className="text-maroon font-semibold">Haute Couture Gallery</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            {CATEGORIES_WITH_META.length} Categories • 500+ Silhouettes
          </span>
        </div>

        {/* Page Header with Single H1 */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
            <Caption>Handcrafted Artisanal Catalog • Women Only</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl lg:text-7xl text-charcoal">
            The Living Design Archive
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl text-base sm:text-lg">
            Every garment in our archive is bespoke, individually drafted to your body measurements with zero mass production. Search by design code, filter by silhouette, or enquire on WhatsApp.
          </Body>
        </div>

        {/* Interactive Collections Full Gallery (Search + Category Filter + Sort + Lightbox + Wishlist) */}
        <Suspense
          fallback={
            <div className="py-24 text-center font-mono text-xs text-charcoal-muted">
              Loading Haute Couture Gallery...
            </div>
          }
        >
          <CollectionsGalleryView allDesigns={designs} />
        </Suspense>

        {/* Visual Category Taxonomy Reference */}
        <section aria-label="Curated Categories Reference" className="mt-24 pt-16 border-t border-surface-border">
          <div className="mb-10 space-y-2">
            <Caption>Categorical Taxonomy</Caption>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              Browse Silhouettes by Category
            </h2>
            <p className="text-xs text-charcoal-muted max-w-xl font-sans">
              Looking for dedicated category lookbooks? Explore our 13 specialized collections.
            </p>
          </div>

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
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-charcoal group-hover:text-maroon transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-surface-border/70 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-charcoal group-hover:text-maroon">
                    <span>Explore Category</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
