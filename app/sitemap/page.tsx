import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'
import {
  ArrowLeft,
  Compass,
  FolderTree,
  Search,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react'

export const revalidate = 3600 // Regenerate every hour

export const metadata: Metadata = {
  title: `HTML Sitemap & Directory | ${SITE_CONFIG.shopName} Tailoring Chennai`,
  description: `Complete site index for ${SITE_CONFIG.shopName} women's custom tailoring studio. Access all 500+ bridal blouses, frocks, kurtis, churidars, and appointment bookings.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/sitemap`,
  },
}

export default function HtmlSitemapPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Sitemap', url: '/sitemap' },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
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
            <span className="text-maroon font-semibold">Atelier Directory & Sitemap</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            Architecture Index
          </span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-maroon" />
            <Caption>Atelier Navigational Index</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            Site Directory & Index
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl">
            A comprehensive hierarchical map of all collections, tailoring services, and atelier guides designed for both visitors and search engines.
          </Body>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Section 1: Core Atelier Pages */}
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4">
            <div className="flex items-center gap-2 border-b border-surface-border/80 pb-3">
              <FolderTree className="w-4 h-4 text-maroon" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">Core Atelier Pages</h2>
            </div>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/" className="hover:text-maroon transition-colors flex items-center justify-between">
                  <span>Home & Runway Showcase</span>
                  <span className="text-charcoal-subtle">/</span>
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-maroon transition-colors flex items-center justify-between">
                  <span>Haute Couture Archive (500+)</span>
                  <span className="text-charcoal-subtle">/collections</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-maroon transition-colors flex items-center justify-between">
                  <span>Atelier Story & Master Cutters</span>
                  <span className="text-charcoal-subtle">/#about</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-maroon transition-colors flex items-center justify-between">
                  <span>Book Fitting Appointment</span>
                  <span className="text-charcoal-subtle">/#contact</span>
                </Link>
              </li>
              <li>
                <Link href="/styleguide" className="hover:text-maroon transition-colors flex items-center justify-between">
                  <span>Design System & Tokens</span>
                  <span className="text-charcoal-subtle">/styleguide</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2: Garment Collection Silhouettes */}
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4 md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-surface-border/80 pb-3">
              <Search className="w-4 h-4 text-gold" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                Collection Categories ({CATEGORIES_WITH_META.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {CATEGORIES_WITH_META.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.id}`}
                  className="p-2.5 bg-ivory rounded border border-surface-border/60 hover:border-maroon hover:text-maroon transition-all flex items-center justify-between"
                >
                  <span className="font-sans font-medium text-charcoal">{cat.name}</span>
                  <span className="text-[10px] text-charcoal-muted uppercase">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Popular Local Tailoring Searches */}
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4">
            <div className="flex items-center gap-2 border-b border-surface-border/80 pb-3">
              <ShieldCheck className="w-4 h-4 text-maroon" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">Popular Search Curations</h2>
            </div>
            <ul className="space-y-2 text-xs font-sans text-charcoal-muted">
              <li>
                <Link href="/collections/bridal-blouses" className="hover:text-maroon transition-colors block">
                  • Bridal Maggam Work Blouses Chennai
                </Link>
              </li>
              <li>
                <Link href="/collections/grand-blouses" className="hover:text-maroon transition-colors block">
                  • Heavy Wedding Reception Blouses
                </Link>
              </li>
              <li>
                <Link href="/collections/designer-blouses" className="hover:text-maroon transition-colors block">
                  • Modern Velvet Party Wear Blouses
                </Link>
              </li>
              <li>
                <Link href="/collections/90s-collection" className="hover:text-maroon transition-colors block">
                  • Authentic 90s Vintage Puff Sleeve Designs
                </Link>
              </li>
              <li>
                <Link href="/collections/frocks" className="hover:text-maroon transition-colors block">
                  • Custom Grand Occasion & Birthday Frocks
                </Link>
              </li>
              <li>
                <Link href="/collections/kurtis" className="hover:text-maroon transition-colors block">
                  • Bespoke Fitted Kurtis with Linings
                </Link>
              </li>
              <li>
                <Link href="/collections/churidars" className="hover:text-maroon transition-colors block">
                  • Tailored Churidars & Salwar Suits
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Tailoring Services & Guarantees */}
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4">
            <div className="flex items-center gap-2 border-b border-surface-border/80 pb-3">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">Tailoring Guarantees</h2>
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-charcoal-muted">
              <li className="flex items-start gap-1.5">
                <span className="text-maroon font-bold">✓</span>
                <span>100% Fit Guarantee with Free Alterations</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-maroon font-bold">✓</span>
                <span>48-Hour Emergency Rush Stitching Service</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-maroon font-bold">✓</span>
                <span>At-Home Master Fitting for Bridal Orders</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-maroon font-bold">✓</span>
                <span>Strictly Women Only — Zero Saree or Men’s Sales</span>
              </li>
            </ul>
          </div>

          {/* Section 5: Atelier Studio Contact */}
          <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4">
            <div className="flex items-center gap-2 border-b border-surface-border/80 pb-3">
              <MapPin className="w-4 h-4 text-maroon" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">Atelier Location</h2>
            </div>
            <div className="text-xs space-y-2 text-charcoal-muted">
              <p className="font-semibold text-charcoal">{SITE_CONFIG.shopName} Atelier</p>
              <p>{SITE_CONFIG.address}</p>
              <p className="font-mono text-[11px] text-maroon font-bold">{SITE_CONFIG.workingHours}</p>
              <div className="pt-2 flex items-center gap-3 font-mono text-[11px]">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-maroon flex items-center gap-1 font-bold"
                >
                  <Phone className="w-3 h-3 text-maroon" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-maroon flex items-center gap-1 font-bold text-maroon"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
