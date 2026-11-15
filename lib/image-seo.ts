import { SITE_CONFIG } from './constants'
import { DesignRecord } from './api'

/**
 * ====================================================================
 * SreeStar Tailoring — Image SEO Pipeline & Filename Strategy
 * Optimized for Google Images First-Page Ranking
 * ====================================================================
 */

/**
 * Auto-generate SEO-friendly filenames from design metadata
 * e.g., "Bridal Maggam Blouse", "Gold Zardosi", "D-0045"
 * -> "bridal-maggam-blouse-gold-zardosi-d-0045.webp"
 */
export function generateSeoFilename(design: {
  title: string
  designCode: string
  workType?: string
  format?: 'webp' | 'avif' | 'jpg'
}): string {
  const parts = [
    design.title,
    design.workType || '',
    design.designCode,
  ]

  const cleanSlug = parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const ext = design.format || 'webp'
  return `${cleanSlug}.${ext}`
}

/**
 * Generate semantic accessible caption for <figcaption> tags
 */
export function formatImageCaption(design: {
  title: string
  designCode: string
  categoryName?: string
  workType?: string
}): string {
  const work = design.workType ? `featuring ${design.workType}` : 'handcrafted bespoke cut'
  const cat = design.categoryName || 'Women’s Tailoring'
  return `${design.title} (${design.designCode}) — ${cat} ${work}, custom stitched at ${SITE_CONFIG.shopName} ${SITE_CONFIG.city}.`
}

/**
 * Generate Google Image Sitemap XML snippet for a design
 */
export function generateGoogleImageXml(
  design: DesignRecord,
  baseUrl: string
): string {
  const pageUrl = `${baseUrl}/collections/${design.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${design.slug}`
  const imgUrl = design.imageUrl.startsWith('http') ? design.imageUrl : `${baseUrl}${design.imageUrl}`
  const caption = formatImageCaption(design)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
  const title = `${design.title} — ${design.designCode}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

  return `  <url>
    <loc>${pageUrl}</loc>
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
      <image:geo_location>${SITE_CONFIG.city}, Tamil Nadu, India</image:geo_location>
    </image:image>
  </url>`
}
