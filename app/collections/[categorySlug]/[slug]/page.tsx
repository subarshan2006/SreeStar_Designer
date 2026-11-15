import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption, DesignCodeBadge } from '@/components/ui/typography'
import { DesignDetailInteractive } from '@/components/collections/DesignDetailInteractive'
import { getDesignBySlug, getDesignsByCategory, getAllDesigns } from '@/lib/api'
import { SITE_CONFIG } from '@/lib/constants'
import { generateDesignMetadata, generateSeoAltText } from '@/lib/seo'
import { JsonLd, getProductSchema, getBreadcrumbSchema, getImageObjectSchema } from '@/lib/schema'
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  Sparkles,
  Scissors,
  CheckCircle2,
  Ruler,
  Award,
} from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  const { designs } = await getAllDesigns(1, 50)
  return designs.map((d) => ({
    categorySlug: d.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    slug: d.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; slug: string }>
}): Promise<Metadata> {
  const { categorySlug, slug } = await params
  const design = await getDesignBySlug(slug)

  if (!design) {
    return {
      title: `Design Not Found | ${SITE_CONFIG.shopName} Chennai`,
    }
  }

  return generateDesignMetadata(design, categorySlug)
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; slug: string }>
}) {
  const { categorySlug, slug } = await params
  const design = await getDesignBySlug(slug)

  if (!design) {
    notFound()
  }

  const categoryDesigns = await getDesignsByCategory(categorySlug)
  // Show 6 related designs for richer internal linking & discovery
  const relatedDesigns = categoryDesigns
    .filter((d) => d.id !== design.id)
    .slice(0, 6)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: design.categoryName, url: `/collections/${categorySlug}` },
    { name: design.designCode, url: `/collections/${categorySlug}/${design.slug}` },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      {/* Schema.org Structured Data */}
      <JsonLd schema={getProductSchema(design)} />
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getImageObjectSchema(design)} />

      <Navbar activeCategory={categorySlug} />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted flex-wrap">
            <Link href="/" className="hover:text-maroon transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-surface-border">/</span>
            <Link href="/collections" className="hover:text-maroon transition-colors">
              Collections
            </Link>
            <span className="text-surface-border">/</span>
            <Link href={`/collections/${categorySlug}`} className="hover:text-maroon transition-colors">
              {design.categoryName}
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold">{design.designCode}</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle hidden sm:inline-block">
            Atelier Code: {design.designCode}
          </span>
        </nav>

        {/* Master Showcase Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-20">
          {/* Left Column: Interactive Multi-Angle Gallery Viewer */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="sticky top-28">
              <DesignDetailInteractive design={design} categorySlug={categorySlug} />

              {/* Garment Caption Footnote */}
              <div className="mt-3 p-3 bg-charcoal text-ivory flex items-center justify-between text-xs font-mono rounded-sm">
                <span className="flex items-center gap-1.5 text-gold">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Individually Hand-Cut • Zero Mass Production</span>
                </span>
                <span className="text-ivory/60">Chennai Atelier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Specifications & Bespoke Tailoring Details */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Garment Title & Status */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-maroon" />
                  <Caption>Bespoke Women’s Silhouette</Caption>
                </div>
                <Heading level={1} variant="serif" italic className="text-3xl sm:text-4xl lg:text-5xl text-charcoal">
                  {design.title}
                </Heading>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="font-mono text-xs uppercase tracking-widest text-maroon font-bold">
                    Workmanship: {design.workType || 'Artisanal Needlework'}
                  </span>
                  <span className="text-surface-border">•</span>
                  <span className="font-mono text-xs text-charcoal-muted uppercase tracking-wider">
                    Category: {design.categoryName}
                  </span>
                </div>
              </div>

              {/* Garment Editorial Description */}
              <Body size="base" tone="muted" className="leading-relaxed">
                {design.description}
              </Body>

              {/* Specifications Matrix */}
              <div className="border-t border-b border-surface-border py-5 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-charcoal-muted uppercase tracking-wider block text-[10px]">
                      Recommended Fabrics
                    </span>
                    <span className="font-semibold text-charcoal text-xs mt-0.5 block">
                      {design.fabricOptions?.join(', ') || 'Pure Raw Silk, Banarasi, Velvet, Brocade'}
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted uppercase tracking-wider block text-[10px]">
                      Silhouette Style
                    </span>
                    <span className="font-semibold text-charcoal text-xs mt-0.5 block">
                      Princess Cut / 3-Dart Classic
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted uppercase tracking-wider block text-[10px]">
                      Standard Turnaround
                    </span>
                    <span className="font-semibold text-charcoal text-xs mt-0.5 block">
                      4 – 7 Working Days
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted uppercase tracking-wider block text-[10px]">
                      Emergency Rush Service
                    </span>
                    <span className="font-semibold text-maroon text-xs mt-0.5 block">
                      48-Hour Rush Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Bespoke Tailoring Highlights */}
              <div className="grid grid-cols-2 gap-3 bg-surface-card p-4 rounded-sm border border-surface-border text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">100% Fit Guarantee</span>
                    <span className="text-charcoal-muted text-[11px]">Free lifetime adjustment</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Women Only</span>
                    <span className="text-charcoal-muted text-[11px]">Exclusively bespoke atelier</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">18-Point Measurements</span>
                    <span className="text-charcoal-muted text-[11px]">Anatomically contoured fit</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">14+ Years Heritage</span>
                    <span className="text-charcoal-muted text-[11px]">Chennai master craftswomen</span>
                  </div>
                </div>
              </div>

              {/* Atelier Studio Timing & Address Note */}
              <div className="p-4 bg-surface rounded border border-surface-border text-xs text-charcoal-muted space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-charcoal font-semibold">
                  <Clock className="w-4 h-4 text-maroon" />
                  <span>Atelier Consultations & Walk-In Measurements</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Bring your fabric to our studio at <strong>{SITE_CONFIG.address}</strong>. Open {SITE_CONFIG.workingHours}. No prior appointment strictly needed for initial fabric submission.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Linking Engine: Complementary Designs in Same Category */}
        {relatedDesigns.length > 0 && (
          <section aria-label="Related Bespoke Designs" className="border-t border-surface-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Caption>Complementary Silhouettes</Caption>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                  You May Also Like in {design.categoryName}
                </h2>
              </div>
              <Link
                href={`/collections/${categorySlug}`}
                className="text-xs font-mono uppercase tracking-widest text-maroon hover:underline hidden sm:inline-flex items-center gap-1 font-semibold"
              >
                <span>View Full Category ({categoryDesigns.length})</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {relatedDesigns.map((rel) => {
                const relUrl = `/collections/${categorySlug}/${rel.slug}`

                return (
                  <Link
                    key={rel.id}
                    href={relUrl}
                    className="group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <OptimizedImage
                        src={rel.imageUrl}
                        alt={generateSeoAltText(rel)}
                        width={rel.width}
                        height={rel.height}
                        aspectRatio={rel.aspectRatio}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <DesignCodeBadge code={rel.designCode} />
                      </div>
                    </div>

                    <div className="p-3 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-serif text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-1">
                          {rel.title}
                        </h3>
                        <p className="font-mono text-[11px] text-charcoal-muted mt-0.5 line-clamp-1">
                          {rel.workType}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-surface-border/60 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-charcoal-subtle">
                        <span>{rel.fabricOptions?.[0] || 'Silk'}</span>
                        <span className="text-maroon font-bold group-hover:underline">View →</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
