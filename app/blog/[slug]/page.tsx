import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Heading, Body, Caption } from '@/components/ui/typography'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'
import { getDesignByCode } from '@/lib/api'
import { SITE_CONFIG } from '@/lib/constants'
import { JsonLd, getBreadcrumbSchema, getArticleSchema } from '@/lib/schema'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MessageCircle,
  Scissors,
  ArrowRight,
} from 'lucide-react'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: `Article Not Found | ${SITE_CONFIG.shopName} Chennai`,
    }
  }

  const title = `${post.title} | ${SITE_CONFIG.shopName} Chennai`
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'}/blog/${post.slug}`

  return {
    title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: SITE_CONFIG.shopName,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const relatedDesigns = await Promise.all(
    (post.relatedDesignCodes || []).map((code) => getDesignByCode(code))
  )
  const validDesigns = relatedDesigns.filter(Boolean)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Atelier Journal', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  const waText = `Hi ${SITE_CONFIG.shopName}! I read your guide "${post.title}" on the Atelier Journal. Can I enquire about custom stitching and fitting options?`

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between selection:bg-maroon selection:text-ivory">
      <JsonLd schema={getArticleSchema(post)} />
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
            <Link href="/blog" className="hover:text-maroon transition-colors">
              Journal
            </Link>
            <span className="text-surface-border">/</span>
            <span className="text-maroon font-semibold truncate max-w-[200px] sm:max-w-md">
              {post.categoryLabel}
            </span>
          </div>

          <span className="font-mono text-xs text-charcoal-subtle hidden sm:inline-block">
            {post.readTime}
          </span>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto space-y-8">
          {/* Article Header */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-charcoal-muted">
              <span className="px-2.5 py-1 bg-maroon-light text-maroon font-bold rounded uppercase">
                {post.categoryLabel}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{post.author}</span>
              </span>
            </div>

            <Heading level={1} variant="serif" italic className="text-3xl sm:text-5xl lg:text-6xl text-charcoal leading-tight">
              {post.title}
            </Heading>

            <Body size="lg" tone="muted" className="text-base sm:text-xl font-serif italic text-charcoal-muted max-w-3xl">
              &ldquo;{post.excerpt}&rdquo;
            </Body>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-surface-border bg-surface-card shadow-lg">
            <OptimizedImage
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={675}
              aspectRatio={16 / 9}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Paragraphs */}
          <div className="prose prose-lg max-w-none text-charcoal leading-relaxed space-y-6 font-sans text-base sm:text-lg pt-4 border-b border-surface-border pb-10">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-charcoal/90 leading-8">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Associated Bespoke Garment Showcase (Internal Linking Engine) */}
          {validDesigns.length > 0 && (
            <div className="bg-surface-card p-6 sm:p-8 rounded-sm border border-surface-border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Caption>Archive References</Caption>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal mt-1">
                    Designs Mentioned in This Guide
                  </h3>
                </div>
                <Link href="/collections" className="text-xs font-mono uppercase text-maroon hover:underline">
                  Full Catalog →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {validDesigns.map((d) => {
                  if (!d) return null
                  const catSlug = d.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

                  return (
                    <Link
                      key={d.id}
                      href={`/collections/${catSlug}/${d.slug}`}
                      className="group flex flex-col bg-ivory rounded border border-surface-border/80 overflow-hidden hover:border-maroon transition-all"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <OptimizedImage
                          src={d.imageUrl}
                          alt={d.title}
                          width={d.width}
                          height={d.height}
                          aspectRatio={d.aspectRatio}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-charcoal/90 text-ivory rounded">
                            {d.designCode}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-serif text-xs font-semibold text-charcoal line-clamp-1 group-hover:text-maroon">
                          {d.title}
                        </h4>
                        <span className="text-[10px] font-mono text-maroon font-bold mt-1 inline-block">
                          View Silhouette →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Embedded Appointment & WhatsApp CTA Banner */}
          <div className="bg-charcoal text-ivory p-8 rounded-sm shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                <Scissors className="w-4 h-4" />
                <span>Bespoke Tailoring Atelier • Chennai</span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Ready to Commission Your Bespoke Blouse?
              </h3>
              <p className="text-xs text-ivory/70 max-w-md">
                Bring your saree piece to our T. Nagar studio or request our doorstep master measurement service across Chennai.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-maroon hover:bg-maroon-hover text-white text-xs font-mono uppercase tracking-widest font-bold rounded text-center transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Atelier</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-widest font-semibold rounded text-center transition-colors border border-white/20"
              >
                <span>Book Fitting</span>
              </Link>
            </div>
          </div>

          {/* Related Articles in Same Category */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-surface-border pt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Caption>Further Reading</Caption>
                  <h3 className="font-serif text-2xl font-semibold text-charcoal mt-1">
                    Related Tailoring Guides
                  </h3>
                </div>
                <Link href="/blog" className="text-xs font-mono uppercase text-maroon hover:underline">
                  View All Guides →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group bg-surface-card p-4 rounded border border-surface-border hover:border-maroon/50 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded bg-ivory mb-3">
                      <OptimizedImage
                        src={rel.featuredImage}
                        alt={rel.title}
                        width={400}
                        height={250}
                        aspectRatio={16 / 10}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-maroon uppercase font-bold">
                      {rel.categoryLabel}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors line-clamp-2 mt-1">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] font-mono text-charcoal-muted mt-2 inline-flex items-center gap-1">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}
