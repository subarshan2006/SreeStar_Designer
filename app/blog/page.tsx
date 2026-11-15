import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { getAllBlogPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getBreadcrumbSchema } from '@/lib/schema'
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Atelier Journal & Tailoring Guides | ${SITE_CONFIG.shopName} Chennai`,
  description: `Master tailoring guides, bridal maggam needlework insights, neckline cuts, 90s vintage blouse aesthetics, and bespoke fitting tips from Chennai's premier atelier.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/blog`,
  },
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Atelier Journal', url: '/blog' },
  ]

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

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
            <span className="text-maroon font-semibold">Atelier Journal</span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle">
            {posts.length} Editorial Articles
          </span>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-maroon" />
            <Caption>Atelier Editorial Journal • Craftsmanship & Guides</Caption>
          </div>
          <Heading level={1} variant="serif" italic className="text-4xl sm:text-6xl text-charcoal">
            The Tailor&apos;s Gazette
          </Heading>
          <Body size="lg" tone="muted" className="max-w-2xl">
            Insights on bridal maggam embroidery, precision body contouring, vintage 90s puffed sleeves, and fabric pairings directly from our master pattern cutters in Chennai.
          </Body>
        </div>

        {/* Featured Top Story */}
        {featuredPost && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-card rounded-sm overflow-hidden border border-surface-border p-6 hover:border-maroon/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded bg-ivory">
                <OptimizedImage
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  width={800}
                  height={500}
                  aspectRatio={16 / 10}
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-maroon text-white rounded">
                    Featured Guide
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 py-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-charcoal-muted">
                    <span className="text-maroon font-semibold uppercase">{featuredPost.categoryLabel}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal group-hover:text-maroon transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs font-mono">
                  <span className="text-charcoal-subtle">{featuredPost.author}</span>
                  <span className="text-maroon font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 19 Additional Article Cards Grid */}
        <section aria-label="Recent Articles">
          <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-8">
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              All Tailoring Guides & Trends
            </h2>
            <span className="font-mono text-xs text-charcoal-muted">
              Page 1 of 1
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between bg-surface-card rounded-sm overflow-hidden border border-surface-border p-5 hover:border-maroon/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-ivory">
                    <OptimizedImage
                      src={post.featuredImage}
                      alt={post.title}
                      width={600}
                      height={375}
                      aspectRatio={16 / 10}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-charcoal/90 text-ivory rounded backdrop-blur">
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-charcoal-subtle">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-charcoal-muted line-clamp-2 font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-border/70 flex items-center justify-between text-xs font-mono text-charcoal-muted group-hover:text-maroon">
                  <span className="text-[11px]">Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
