import type { Metadata } from 'next'
import { SITE_CONFIG } from './constants'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { DesignRecord } from './api'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'

/**
 * ====================================================================
 * SreeStar Tailoring — SEO Keyword Strategy & Metadata Engine
 * Targeted for Top 3 Google SERP Ranking in Chennai & Tamil Nadu
 * ====================================================================
 */

export const KEYWORD_TARGETS = {
  home: {
    title: `${SITE_CONFIG.shopName} — Custom Blouse Stitching & Women's Tailoring Chennai`,
    desc: `Award-level women's custom tailoring in Chennai. Specializing in Bridal Maggam blouses, grand party frocks, designer kurtis, churidars, and authentic 90s retro collections.`,
    keywords: [
      'custom blouse stitching chennai',
      'women tailoring chennai',
      'bridal maggam work blouse t nagar',
      'designer blouse tailor chennai',
      'grand frock stitching chennai',
      'kurti custom tailor chennai',
      'churidar stitching chennai',
      '90s retro blouse collection',
    ],
  },
  'bridal-blouses': {
    title: `Bridal Blouse Stitching Chennai | Maggam & Zardosi Work | ${SITE_CONFIG.shopName}`,
    desc: `Chennai's finest bridal blouse tailoring atelier. Handcrafted peacock zardosi, kundan stone embellishment, and 100% perfect fit guarantee for muhurtham silk sarees.`,
    keywords: [
      'bridal blouse stitching chennai',
      'maggam work bridal blouse',
      'wedding blouse tailor t nagar',
      'zardosi bridal blouse design',
      'muhurtham blouse stitching chennai',
    ],
  },
  'grand-blouses': {
    title: `Grand Blouse Designs Chennai | Heavy Work Tailoring | ${SITE_CONFIG.shopName}`,
    desc: `Intricate heavy work designer blouses for weddings & receptions. Cutwork, French knots, and thread needlework tailored with zero wrinkling and precision armholes.`,
    keywords: [
      'grand blouse designs chennai',
      'heavy work blouse tailor',
      'reception blouse stitching',
      'cutwork blouse designs chennai',
    ],
  },
  'designer-blouses': {
    title: `Designer Blouse Stitching Chennai | Contemporary Cuts | ${SITE_CONFIG.shopName}`,
    desc: `Modern designer blouses crafted for cocktail parties and evening events. Velvet sweetheart cuts, organza puff sleeves, and corset back tailoring.`,
    keywords: [
      'designer blouse stitching chennai',
      'party wear blouse tailor',
      'corset blouse chennai',
      'boat neck designer blouse',
    ],
  },
  'daily-wear-blouses': {
    title: `Daily Wear Blouse Stitching Chennai | Perfect Comfort Cut | ${SITE_CONFIG.shopName}`,
    desc: `Everyday cotton, semi-silk, and linen blouse tailoring with pure breathable comfort. Free lifetime alterations and durable double-stitch seams.`,
    keywords: [
      'daily wear blouse stitching chennai',
      'cotton blouse tailor',
      'simple blouse stitching t nagar',
      'comfort fit blouse',
    ],
  },
  frocks: {
    title: `Custom Frock Stitching Chennai | Grand Party Frocks | ${SITE_CONFIG.shopName}`,
    desc: `Artisanal custom frocks and grand gown tailoring for birthdays, engagements, and festivities. Premium can-can pleating, net layers, and bespoke children & women sizing.`,
    keywords: [
      'custom frock stitching chennai',
      'grand party frock tailor',
      'mother daughter matching frock chennai',
      'organza frock stitching',
    ],
  },
  kurtis: {
    title: `Custom Kurti Stitching Chennai | A-Line & Straight Fit | ${SITE_CONFIG.shopName}`,
    desc: `Bespoke kurti tailoring tailored to your shoulder and bust measurements. Breathable linings, contrast piping, and designer collar options.`,
    keywords: [
      'kurti stitching chennai',
      'custom kurti tailor chennai',
      'straight cut kurti stitching',
      'office wear kurti tailor',
    ],
  },
  churidars: {
    title: `Custom Churidar Tailor Chennai | Bespoke Salwar Stitching | ${SITE_CONFIG.shopName}`,
    desc: `Expert churidar and salwar kameez tailoring. Perfect gather gathers, comfortable crotch depth, and bespoke neck styling crafted in Chennai.`,
    keywords: [
      'churidar stitching chennai',
      'custom salwar tailor chennai',
      'bespoke churidar stitching',
      'salwar kameez tailoring t nagar',
    ],
  },
  '90s-collection': {
    title: `90s Retro Blouse Designs Chennai | Vintage Puffed Sleeves | ${SITE_CONFIG.shopName}`,
    desc: `Authentic 90s vintage blouse tailoring. High-volume puff sleeves, vintage collar points, potli buttons, and classic South Indian cinema silhouettes.`,
    keywords: [
      '90s style blouse designs chennai',
      'vintage puff sleeve blouse',
      'retro south indian blouse tailoring',
      'classic 90s cinema blouse',
    ],
  },
} as const

/**
 * Generate Dynamic SEO Metadata for a Category Page
 */
export function generateCategoryMetadata(categorySlug: string): Metadata {
  const catMeta = (KEYWORD_TARGETS as Record<string, { title: string; desc: string; keywords: readonly string[] }>)[
    categorySlug
  ]

  const fallbackInfo = CATEGORIES_WITH_META.find((c) => c.id === categorySlug)
  const categoryName = fallbackInfo?.name || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  const title = catMeta?.title || `${categoryName} Stitching Chennai | ${SITE_CONFIG.shopName} Tailoring`
  const description =
    catMeta?.desc ||
    `Explore bespoke ${categoryName} custom stitched in Chennai by ${SITE_CONFIG.shopName}. Handcrafted tailoring with 100% perfect fit guarantee.`

  const canonicalUrl = `${BASE_URL}/collections/${categorySlug}`

  return {
    title,
    description,
    keywords: catMeta?.keywords ? [...catMeta.keywords] : [categoryName, 'custom tailoring chennai', 'blouse stitching'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.shopName,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(categoryName)}&code=${encodeURIComponent(catMeta ? 'CURATED' : 'ARCHIVE')}&cat=${encodeURIComponent(categoryName)}&work=${encodeURIComponent('Bespoke Tailoring')}`,
          width: 1200,
          height: 630,
          alt: `${categoryName} Tailoring — ${SITE_CONFIG.shopName} Chennai`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `${BASE_URL}/api/og?title=${encodeURIComponent(categoryName)}&code=${encodeURIComponent(catMeta ? 'CURATED' : 'ARCHIVE')}&cat=${encodeURIComponent(categoryName)}&work=${encodeURIComponent('Bespoke Tailoring')}`,
      ],
    },
    other: {
      'pinterest-rich-pin': 'true',
    },
  }
}

/**
 * Generate Dynamic SEO Metadata for an Individual Design Detail Page
 */
export function generateDesignMetadata(design: DesignRecord, categorySlug: string): Metadata {
  const title = `${design.designCode} — ${design.title} | ${SITE_CONFIG.shopName} Chennai`
  const description = `${design.title} (${design.designCode}) custom women's tailoring in Chennai. ${design.workType || 'Artisanal handwork'} on ${design.fabricOptions?.[0] || 'pure silk'}. Book fitting.`
  const canonicalUrl = `${BASE_URL}/collections/${categorySlug}/${design.slug}`
  const dynamicOgUrl = `${BASE_URL}/api/og?code=${encodeURIComponent(design.designCode)}&title=${encodeURIComponent(design.title)}&cat=${encodeURIComponent(design.categoryName)}&work=${encodeURIComponent(design.workType || 'Artisanal Handcraft')}`

  return {
    title,
    description,
    keywords: [
      design.designCode,
      design.title.toLowerCase(),
      design.categoryName.toLowerCase(),
      'custom blouse stitching chennai',
      'maggam work blouse',
      'women tailoring atelier',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.shopName,
      type: 'article',
      images: [
        {
          url: dynamicOgUrl,
          width: 1200,
          height: 630,
          alt: generateSeoAltText(design),
        },
        {
          url: design.imageUrl.startsWith('http') ? design.imageUrl : `${BASE_URL}${design.imageUrl}`,
          width: design.width,
          height: design.height,
          alt: generateSeoAltText(design),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [dynamicOgUrl],
    },
    other: {
      'pinterest-rich-pin': 'true',
    },
  }
}

/**
 * Keyword-Rich Descriptive Alt Text Generator for Google Images Search
 */
export function generateSeoAltText(design: {
  title: string
  designCode: string
  workType?: string
  categoryName?: string
}): string {
  const work = design.workType || 'Custom Handcrafted Needlework'
  const cat = design.categoryName || 'Women’s Tailoring'
  return `${design.title} (${design.designCode}) — ${work} ${cat} tailored exclusively at ${SITE_CONFIG.shopName} ${SITE_CONFIG.city}`
}
