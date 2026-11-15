import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { CHENNAI_LOCALITIES, getLocalityLocalBusinessSchema } from '@/lib/local-seo'
import { getFeaturedDesigns } from '@/lib/api'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  Navigation,
} from 'lucide-react'

export const revalidate = 3600

export async function generateStaticParams() {
  return CHENNAI_LOCALITIES.map((loc) => ({
    locality: loc.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locality: string }>
}): Promise<Metadata> {
  const { locality: slug } = await params
  const loc = CHENNAI_LOCALITIES.find((l) => l.slug === slug)

  if (!loc) {
    return {
      title: `Location Not Found | ${SITE_CONFIG.shopName} Chennai`,
    }
  }

  const title = `Bridal Blouse Stitching in ${loc.name}, Chennai | ${SITE_CONFIG.shopName} Tailoring`
  const description = `Bespoke women's custom tailoring & blouse stitching serving ${loc.name}, Chennai. Handcrafted maggam needlework, frocks, kurtis, and doorstep measurement service with 100% fit guarantee.`
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/locations/${loc.slug}`

  return {
    title,
    description,
    keywords: [
      `bridal blouse stitching ${loc.name.toLowerCase()}`,
      `blouse tailor ${loc.name.toLowerCase()} chennai`,
      `women tailoring ${loc.name.toLowerCase()}`,
      `maggam work blouse ${loc.name.toLowerCase()}`,
      'custom tailor chennai',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.shopName,
      type: 'website',
    },
  }
}

export default async function LocalityLandingPage({
  params,
}: {
  params: Promise<{ locality: string }>
}) {
  const { locality: slug } = await params
  const loc = CHENNAI_LOCALITIES.find((l) => l.slug === slug)

  if (!loc) {
    notFound()
  }

  const designs = await getFeaturedDesigns(6)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/contact' },
    { name: loc.name, url: `/locations/${loc.slug}` },
  ]

  const waText = `Hi ${SITE_CONFIG.shopName}! I reside in ${loc.name}, Chennai and would like to enquire about bespoke blouse tailoring and fitting options.`

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getLocalityLocalBusinessSchema(loc)} />
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <main className="max-w-[96vw] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 w-full">
        {/* Breadcrumb Trail */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal-muted">
            <Link href="/" className="hover:text-maroon transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-surface-border">/</span>
            <Link href="/contact" className="hover:text-maroon transition-colors">
              Chennai Atelier
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold">{loc.name}</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            {loc.zone}
          </span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-maroon" />
            <Caption>Serving {loc.name} & Surrounding Chennai Localities</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            Custom Blouse Stitching & Tailoring for {loc.name}
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl">
            Whether visiting our flagship T. Nagar atelier or booking our at-home bridal measurement master fitter, experience award-level women&apos;s tailoring with a 100% perfect fit guarantee.
          </Body>
        </div>

        {/* Locality Service Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
            <div className="flex items-center gap-2 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
              <Navigation className="w-4 h-4" />
              <span>Proximity & Travel</span>
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">Distance to Studio</h2>
            <p className="text-xs font-mono text-charcoal-muted">
              {loc.travelTime}
            </p>
            <p className="text-xs text-charcoal-subtle font-sans pt-1">
              Landmark: {loc.landmark}
            </p>
          </div>

          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
            <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Doorstep Service</span>
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">Home Measurements</h2>
            <p className="text-xs font-mono text-charcoal-muted">
              Available across {loc.name} for orders of 3 or more bridal garments.
            </p>
            <p className="text-xs text-charcoal-subtle font-sans pt-1">
              Senior master cutter visits with measuring tapes and swatches.
            </p>
          </div>

          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
            <div className="flex items-center gap-2 text-maroon text-xs font-mono uppercase tracking-wider font-bold">
              <Clock className="w-4 h-4" />
              <span>Turnaround Guarantee</span>
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">48-Hr Emergency Rush</h2>
            <p className="text-xs font-mono text-charcoal-muted">
              Standard: 4–7 Days | Rush: 48 Hours
            </p>
            <p className="text-xs text-charcoal-subtle font-sans pt-1">
              100% Free Lifetime Alterations guarantee included.
            </p>
          </div>
        </div>

        {/* Locality Highlights & WhatsApp Booking */}
        <div className="bg-surface-card p-8 rounded-sm border border-surface-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8 space-y-4">
            <Caption>Why Clients in {loc.name} Choose {SITE_CONFIG.shopName}</Caption>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              Tailored Precision for Weddings, Receptions & Festivities
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-charcoal-muted pt-2">
              {loc.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-maroon hover:bg-maroon-hover text-ivory font-mono uppercase text-xs tracking-widest font-bold rounded shadow-md transition-all text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Appointment for {loc.name}</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ivory hover:bg-surface border border-surface-border text-charcoal font-mono uppercase text-xs tracking-wider font-semibold rounded text-center transition-colors"
            >
              <Phone className="w-4 h-4 text-maroon" />
              <span>Call Atelier ({SITE_CONFIG.phone})</span>
            </a>
          </div>
        </div>

        {/* Sample Trending Designs */}
        <section aria-label="Popular Tailored Designs" className="border-t border-surface-border pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Caption>Trending in Chennai</Caption>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                Popular Silhouettes Requested from {loc.name}
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs font-mono uppercase tracking-widest text-maroon hover:underline hidden sm:inline-block"
            >
              Explore All 500+ Silhouettes →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {designs.map((design) => {
              const catSlug = design.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              const detailUrl = `/collections/${catSlug}/${design.slug}`

              return (
                <Link
                  key={design.id}
                  href={detailUrl}
                  className="group relative flex flex-col bg-surface-card rounded-sm overflow-hidden border border-surface-border hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src={design.imageUrl}
                      alt={`${design.title} — ${design.designCode}`}
                      width={design.width}
                      height={design.height}
                      aspectRatio={design.aspectRatio}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-charcoal/90 text-ivory rounded backdrop-blur">
                        {design.designCode}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5">
                    <h3 className="font-serif text-xs font-semibold text-charcoal line-clamp-1 group-hover:text-maroon transition-colors">
                      {design.title}
                    </h3>
                    <p className="font-mono text-[10px] text-charcoal-muted mt-0.5">
                      {design.categoryName}
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
