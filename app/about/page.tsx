import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { SITE_CONFIG } from '@/lib/constants'
import { getFeaturedDesigns } from '@/lib/api'
import { createWhatsAppLink } from '@/lib/whatsapp'
import { JsonLd, getAboutPageSchema, getBreadcrumbSchema } from '@/lib/schema'
import {
  ArrowLeft,
  Scissors,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ArrowRight,
  Award,
  Users,
  Compass,
} from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `About Our Atelier | 14+ Years Women's Custom Tailoring | ${SITE_CONFIG.shopName} Chennai`,
  description: `Discover the story of ${SITE_CONFIG.shopName} — Chennai's premier bespoke women's custom blouse and tailoring studio. 14+ years of master cutting, zero saree sales, and 100% fit guarantee.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/about`,
  },
}

export default async function AboutPage() {
  const featuredGarments = await getFeaturedDesigns(8)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Our Atelier', url: '/about' },
  ]

  const waUrl = createWhatsAppLink({
    type: 'general',
  })

  const milestones = [
    {
      year: '2012',
      title: 'Atelier Founded in T. Nagar',
      desc: 'Opened our doors on Cross Street with two pedal sewing machines and an uncompromising vow: Women-only custom tailoring, zero saree sales, zero mass production.',
    },
    {
      year: '2016',
      title: '1,000th Bridal Blouse Milestone',
      desc: 'Established our in-house Maggam Embroidery wing, bringing master zardosi and kundan needleworkers directly under one atelier roof.',
    },
    {
      year: '2020',
      title: 'Doorstep Bridal Fitting Service',
      desc: 'Introduced complimentary at-home measurement consultations for bridal parties (3+ blouses) across Chennai to remove wedding traffic stress.',
    },
    {
      year: '2024',
      title: '500+ Silhouette Code Archive',
      desc: 'Cataloged over five hundred unique bespoke designs across Bridal Maggam, Grand Party Frocks, Kurtis, Churidars, and authentic 90s vintage cuts.',
    },
    {
      year: '2026',
      title: 'The Living Digital Atelier',
      desc: 'Launched our award-level digital archive with zero-CLS previews, 48-hour emergency rush service, and instantaneous WhatsApp consultations.',
    },
  ]

  const team = [
    {
      name: 'Master S. Perumal',
      role: 'Senior Master Pattern Cutter',
      exp: '18+ Years Experience',
      desc: 'Trained under master tailors in golden-era Madras. Expert in 3-dart curvature geometry, princess cuts, and deep back neck balance.',
    },
    {
      name: 'Ustad Irfan & Artisans',
      role: 'Head Maggam & Zardosi Craftsman',
      exp: '15+ Years Needlework Mastery',
      desc: 'Specializes in 3D padded peacock motifs, antique zari thread twisting, genuine Swarovski crystals, and delicate French knot borders.',
    },
    {
      name: 'S. Soundarya',
      role: 'Bridal Stylist & Fitting Concierge',
      exp: '8+ Years Styling Bridal Groups',
      desc: 'Coordinates saree border harmonizations, jewelry neckline pairing, and ensures zero-delay delivery for Chennai weddings.',
    },
  ]

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getAboutPageSchema()} />
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
            <span className="text-maroon font-semibold">About Our Atelier</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            Heritage & Craftsmanship
          </span>
        </div>

        {/* Hero Section: Story & Founder Philosophy */}
        <section aria-label="Atelier Heritage" className="mb-20">
          <div className="max-w-4xl mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-maroon" />
              <Caption>The SreeStar Tailoring Story • Founded 2012</Caption>
            </div>
            <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl lg:text-7xl text-charcoal">
              Fourteen Years of Tailored Precision. Zero Compromise.
            </Heading>
            <Body size="lg" tone="muted" className="max-w-3xl text-base sm:text-lg">
              We started with a radical principle in a city flooded with generic saree shops: We would never sell sarees. We would never stitch men&apos;s suits. We would dedicate every fiber of our mastery strictly to bespoke women&apos;s tailoring.
            </Body>
          </div>

          {/* Founder Portrait & Manifesto Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-surface-card rounded-sm border border-surface-border p-6 sm:p-10 shadow-sm items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden rounded bg-ivory border border-surface-border/60">
              <OptimizedImage
                src="/placeholders/placeholder-d-0001.svg"
                alt="Master Cutter at work in SreeStar Atelier Chennai"
                width={800}
                height={1066}
                aspectRatio={3 / 4}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-charcoal/90 text-ivory backdrop-blur rounded text-xs font-mono">
                <span className="font-bold block text-gold">Master Cutting Room</span>
                <span className="text-[11px] text-ivory/70">123 Cross Street, T. Nagar Atelier</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-maroon uppercase tracking-widest font-bold">
                  The Founder&apos;s Creed
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal leading-snug">
                  &ldquo;A great blouse is not merely stitched fabric. It is an architectural bridge between an heirloom saree and your confidence.&rdquo;
                </h2>
              </div>

              <div className="space-y-4 text-sm text-charcoal-muted font-sans leading-relaxed">
                <p>
                  When a woman drapes a six-yard Kanjeevaram silk saree passed down through generations, the garment that holds the entire ensemble together is her blouse. If the armhole pinches, if the shoulder slips, or if the neckline gapes, the beauty of the saree is lost.
                </p>
                <p>
                  At SreeStar, we reject assembly-line industrial methods. Every single blouse begins with twelve body curvature measurements taken with millimeter precision. We draft an individual pattern on drafting paper, cut the silk with zero tension distortion, and execute hand-embroidered maggam needlework with heirloom durability.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-border text-xs font-mono">
                <div>
                  <span className="text-2xl font-serif font-bold text-maroon block">2,500+</span>
                  <span className="text-charcoal-subtle text-[11px]">Happy Brides & Clients</span>
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-maroon block">500+</span>
                  <span className="text-charcoal-subtle text-[11px]">Unique Design Codes</span>
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-maroon block">100%</span>
                  <span className="text-charcoal-subtle text-[11px]">Fit Guarantee Pledge</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier Core Pillars / Values Section */}
        <section aria-label="Core Values" className="mb-20">
          <div className="mb-10 space-y-2">
            <Caption>Pillars of Haute Couture</Caption>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
              The Four Principles We Never Break
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
              <div className="w-10 h-10 rounded bg-maroon-light flex items-center justify-center text-maroon">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal">1. Millimeter Precision</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-sans">
                No cookie-cutter templates. Every garment is drafted individually based on your posture, shoulder slope, and bust apex distance.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
              <div className="w-10 h-10 rounded bg-amber-50 flex items-center justify-center text-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal">2. Heirloom Needlework</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-sans">
                We use authentic antique gold zardosi threads, Swarovski kundan stones, and genuine French knots anchored with durable double-knot seams.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-50 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal">3. 100% Fit Guarantee</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-sans">
                If your finished blouse requires the slightest adjustment, our master tailors provide immediate, free alterations until it sits flawlessly.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-3">
              <div className="w-10 h-10 rounded bg-purple-50 flex items-center justify-center text-purple-700">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal">4. Women-Only Sanctuary</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-sans">
                Our studio is 100% dedicated to women. We do not sell sarees or men&apos;s wear, ensuring a private, dignified, and comfortable measurement experience.
              </p>
            </div>
          </div>
        </section>

        {/* Master Artisans Team Section */}
        <section aria-label="Master Cutters Team" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-surface-border">
            <div>
              <Caption>The Hands Behind the Needles</Caption>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mt-1">
                Meet Our Master Cutters & Artisans
              </h2>
            </div>
            <span className="font-mono text-xs text-charcoal-muted">
              Over 40+ Years of Combined Haute Couture Mastery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-surface-card p-6 rounded-sm border border-surface-border space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-maroon text-[11px] font-mono font-bold uppercase">
                    <Users className="w-3.5 h-3.5" />
                    <span>{member.exp}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal">{member.name}</h3>
                  <p className="font-mono text-xs text-charcoal-subtle uppercase">{member.role}</p>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-sans pt-2">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border/60 text-[11px] font-mono text-charcoal-subtle">
                  📍 Chennai Atelier Resident
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Atelier Milestones Timeline */}
        <section aria-label="Atelier Milestones" className="mb-20">
          <div className="mb-10 space-y-2">
            <Caption>Fourteen Years of Growth</Caption>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
              Our Journey Through the Decades
            </h2>
          </div>

          <div className="space-y-6 border-l-2 border-surface-border pl-6 sm:pl-8 ml-2 sm:ml-4">
            {milestones.map((m) => (
              <div key={m.year} className="relative space-y-1.5">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-ivory border-4 border-maroon" />

                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-maroon">{m.year}</span>
                  <span className="text-surface-border">•</span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-charcoal">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans max-w-2xl">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Strip of Finished Creations */}
        <section aria-label="Atelier Showcase Strip" className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-surface-border">
            <div>
              <Caption>From the Atelier Cutting Table</Caption>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                Recent Masterpieces Finished This Season
              </h2>
            </div>
            <Link href="/collections" className="text-xs font-mono uppercase text-maroon hover:underline hidden sm:inline-block">
              View All 500+ Silhouettes →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {featuredGarments.map((item) => (
              <div key={item.id} className="relative aspect-[3/4] overflow-hidden rounded bg-surface-card border border-surface-border">
                <OptimizedImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  aspectRatio={item.aspectRatio}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 left-1.5 z-10">
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-charcoal/90 text-ivory rounded backdrop-blur">
                    {item.designCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Atelier CTA Banner */}
        <section aria-label="Book Atelier Consultation" className="bg-surface-card rounded-sm border border-surface-border p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-light text-maroon rounded-full text-xs font-mono font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Experience Bespoke Precision</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
              Ready to Experience the SreeStar Difference?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
              Visit our flagship studio in T. Nagar, Chennai, or schedule a consultation with our master cutter over WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-maroon hover:bg-maroon-hover text-ivory font-mono text-xs uppercase tracking-widest font-bold rounded shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Studio Fitting</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-ivory font-mono text-xs uppercase tracking-widest font-bold rounded shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Master Fitter</span>
            </a>

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface hover:bg-ivory text-charcoal border border-surface-border font-mono text-xs uppercase tracking-widest font-semibold rounded transition-colors"
            >
              <span>Browse 500+ Designs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-[11px] font-mono text-charcoal-subtle pt-2">
            📍 {SITE_CONFIG.address} • Open {SITE_CONFIG.workingHours} • Strictly Women Only
          </p>
        </section>
      </main>
    </div>
  )
}
