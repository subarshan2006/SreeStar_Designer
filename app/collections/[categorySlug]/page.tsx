import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption, DesignCodeBadge } from '@/components/ui/typography'
import { HeartButton } from '@/components/ui/HeartButton'
import { getDesignsByCategory } from '@/lib/api'
import { SITE_CONFIG, CATEGORIES_WITH_META } from '@/lib/constants'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { generateCategoryMetadata, generateSeoAltText } from '@/lib/seo'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 60 // ISR: regenerate every 60 seconds

export async function generateStaticParams() {
  return CATEGORIES_WITH_META.map((cat) => ({
    categorySlug: cat.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}): Promise<Metadata> {
  const { categorySlug } = await params
  return generateCategoryMetadata(categorySlug)
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params
  const categoryInfo = CATEGORIES_WITH_META.find((c) => c.id === categorySlug) || {
    id: categorySlug,
    name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    badge: 'Custom Silhouette',
    count: '500+',
    desc: 'Bespoke women’s tailoring designs stitched to precision.',
  }

  const designs = await getDesignsByCategory(categorySlug)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: categoryInfo.name, url: `/collections/${categorySlug}` },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <Navbar activeCategory={categorySlug} />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted">
            <Link href="/" className="hover:text-maroon transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-surface-border">/</span>
            <Link href="/collections" className="hover:text-maroon transition-colors">
              Collections
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold">{categoryInfo.name}</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            Showing {designs.length} designs
          </span>
        </div>

        {/* Category Header with Strict H1 */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-maroon" />
            <Caption>{categoryInfo.badge} • Women Only Atelier</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            {categoryInfo.name}
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl">
            {categoryInfo.desc}
          </Body>
        </div>

        {/* Responsive Staggered Garment Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {designs.map((design, idx) => {
            const isStaggered = idx % 2 === 1
            const waText = `Hi ${SITE_CONFIG.shopName}! I am interested in design code *${design.designCode}* (${design.title}). Can I know fitting and stitching details?`
            const detailUrl = `/collections/${categorySlug}/${design.slug}`

            return (
              <div
                key={design.id}
                className={`group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  isStaggered ? 'sm:mt-8' : ''
                }`}
              >
                {/* Image Container with Zero CLS */}
                <Link href={detailUrl} className="relative overflow-hidden block">
                  <OptimizedImage
                    src={design.imageUrl}
                    alt={generateSeoAltText(design)}
                    width={design.width}
                    height={design.height}
                    aspectRatio={design.aspectRatio}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Overlaid Design Code Tag & Heart Action */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <DesignCodeBadge code={design.designCode} />
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                    {design.isNew && (
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-maroon text-white rounded">
                        New
                      </span>
                    )}
                    <HeartButton designCode={design.designCode} size="sm" />
                  </div>
                </Link>

                {/* Garment Details & CTAs */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-3">
                  <Link href={detailUrl} className="block group-hover:text-maroon transition-colors">
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-charcoal line-clamp-1">
                      {design.title}
                    </h3>
                    <p className="font-mono text-[11px] text-charcoal-muted mt-0.5 line-clamp-1">
                      {design.workType}
                    </p>
                  </Link>

                  <div className="pt-2 border-t border-surface-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-charcoal-subtle uppercase">
                      {design.fabricOptions?.[0] || 'Silk'}
                    </span>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-maroon hover:text-maroon-hover font-bold"
                    >
                      <span>Enquire</span>
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
