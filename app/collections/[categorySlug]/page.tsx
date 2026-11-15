import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption, DesignCodeBadge } from '@/components/ui/typography'
import { getDesignsByCategory } from '@/lib/api'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { SITE_CONFIG } from '@/lib/constants'
import { ArrowLeft, MessageCircle } from 'lucide-react'

export const revalidate = 60 // ISR: regenerate every 60 seconds

export async function generateStaticParams() {
  return CATEGORIES_WITH_META.map((cat) => ({
    categorySlug: cat.id,
  }))
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

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <Navbar activeCategory={categorySlug} />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted hover:text-maroon transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
            <span className="text-surface-border">/</span>
            <span className="text-charcoal font-semibold">Collections</span>
            <span className="text-surface-border">/</span>
            <span className="text-maroon">{categoryInfo.name}</span>
          </Link>

          <span className="font-mono text-xs text-charcoal-subtle">
            Showing {designs.length} designs
          </span>
        </div>

        {/* Category Header */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-maroon" />
            <Caption>{categoryInfo.badge} • Women Only</Caption>
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

            return (
              <div
                key={design.id}
                className={`group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  isStaggered ? 'sm:mt-8' : ''
                }`}
              >
                {/* Image Container with Zero CLS */}
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={design.imageUrl}
                    alt={`${design.title} — ${design.designCode}`}
                    width={design.width}
                    height={design.height}
                    aspectRatio={design.aspectRatio}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Overlaid Design Code Tag */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <DesignCodeBadge code={design.designCode} />
                  </div>

                  {design.isNew && (
                    <div className="absolute top-2.5 right-2.5 z-20">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-maroon text-white rounded">
                        New
                      </span>
                    </div>
                  )}
                </div>

                {/* Garment Details & CTAs */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-1">
                      {design.title}
                    </h3>
                    <p className="font-mono text-[11px] text-charcoal-muted mt-0.5 line-clamp-1">
                      {design.workType}
                    </p>
                  </div>

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
