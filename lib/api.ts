import { SITE_CONFIG } from './constants'
import catalogData from '@/data/catalog-500-designs.json'

export interface DesignRecord {
  id: string
  designCode: string
  title: string
  slug: string
  categoryName: string
  workType?: string
  fabricOptions?: string[]
  width: number
  height: number
  aspectRatio: number
  imageUrl: string
  description: string
  isFeatured: boolean
  isNew: boolean
  isTrending: boolean
  sortOrder: number
}

export interface TestimonialRecord {
  id: string
  clientName: string
  occasion: string
  rating: number
  text: string
  date: string
  photoUrl?: string
}

export interface FAQRecord {
  id: string
  question: string
  answer: string
  category: 'pricing' | 'delivery' | 'fitting' | 'care'
  order: number
}

// Convert JSON catalog items into strongly typed DesignRecords with reliable placeholder image fallback
function normalizeDesign(raw: any, index: number): DesignRecord {
  const code = raw.designCode || `D-${String(index + 1).padStart(4, '0')}`
  const catSlug = (raw.categoryName || 'Bridal Blouses').toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return {
    id: raw._id || raw.id || `design-${index + 1}`,
    designCode: code,
    title: raw.title || `Bespoke Tailored ${raw.categoryName || 'Blouse'}`,
    slug: raw.slug?.current || raw.slug || `${code.toLowerCase()}-${catSlug}`,
    categoryName: raw.categoryName || 'Bridal Blouses',
    workType: raw.workType || 'Hand Maggam Needlework',
    fabricOptions: raw.fabricOptions || ['Pure Raw Silk', 'Royal Velvet'],
    width: raw.width || 800,
    height: raw.height || 1066,
    aspectRatio: raw.aspectRatio || (raw.width && raw.height ? raw.width / raw.height : 0.75),
    imageUrl:
      raw.imageUrl ||
      raw.image?.asset?.url ||
      `https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=${raw.width || 800}&q=80`,
    description:
      raw.description ||
      `Precision-stitched women's tailoring exclusively crafted at ${SITE_CONFIG.shopName} ${SITE_CONFIG.city}.`,
    isFeatured: Boolean(raw.isFeatured),
    isNew: Boolean(raw.isNew),
    isTrending: Boolean(raw.isTrending),
    sortOrder: raw.sortOrder || index + 1,
  }
}

const ALL_DESIGNS_CACHE: DesignRecord[] = (catalogData as any[]).map(normalizeDesign)

/**
 * Fetch all 500+ designs with pagination
 */
export async function getAllDesigns(page = 1, limit = 50): Promise<{
  designs: DesignRecord[]
  total: number
  hasMore: boolean
  page: number
}> {
  const start = (page - 1) * limit
  const end = start + limit
  const paginated = ALL_DESIGNS_CACHE.slice(start, end)

  return {
    designs: paginated,
    total: ALL_DESIGNS_CACHE.length,
    hasMore: end < ALL_DESIGNS_CACHE.length,
    page,
  }
}

/**
 * Fetch designs filtered by category slug
 */
export async function getDesignsByCategory(categorySlug: string): Promise<DesignRecord[]> {
  if (!categorySlug || categorySlug === 'all') {
    return ALL_DESIGNS_CACHE
  }

  const slugClean = categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '')

  return ALL_DESIGNS_CACHE.filter((d) => {
    const catClean = d.categoryName.toLowerCase().replace(/[^a-z0-9]/g, '')
    return catClean.includes(slugClean) || slugClean.includes(catClean)
  })
}

/**
 * Fetch a single design by its unique design code (e.g. "D-0104")
 */
export async function getDesignByCode(code: string): Promise<DesignRecord | null> {
  const cleanCode = code.trim().toUpperCase()
  return ALL_DESIGNS_CACHE.find((d) => d.designCode === cleanCode) || null
}

/**
 * Fetch a single design by its URL slug
 */
export async function getDesignBySlug(slug: string): Promise<DesignRecord | null> {
  return ALL_DESIGNS_CACHE.find((d) => d.slug === slug) || null
}

/**
 * Fetch featured designs for Hero staggered image wall
 */
export async function getFeaturedDesigns(limit = 40): Promise<DesignRecord[]> {
  const featured = ALL_DESIGNS_CACHE.filter((d) => d.isFeatured)
  return (featured.length > 0 ? featured : ALL_DESIGNS_CACHE).slice(0, limit)
}

/**
 * Search designs by design code, title keywords, category, or fabric tags
 */
export async function searchDesigns(query: string): Promise<DesignRecord[]> {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return ALL_DESIGNS_CACHE.filter((d) => {
    return (
      d.designCode.toLowerCase().includes(q) ||
      d.title.toLowerCase().includes(q) ||
      d.categoryName.toLowerCase().includes(q) ||
      (d.workType && d.workType.toLowerCase().includes(q)) ||
      (d.fabricOptions && d.fabricOptions.some((f) => f.toLowerCase().includes(q)))
    )
  })
}

/**
 * Testimonials seed data
 */
export async function getTestimonials(): Promise<TestimonialRecord[]> {
  return [
    {
      id: 't-1',
      clientName: 'Dr. Ramya Soundararajan',
      occasion: 'Bridal Muhurtham Maggam Blouse',
      rating: 5,
      text: 'The peacock zardosi work on my muhurtham blouse was breathtaking. The armhole curve and back neckline sat completely flush with zero wrinkling. Best tailor in Chennai for wedding blouses!',
      date: '2026-02-14',
    },
    {
      id: 't-2',
      clientName: 'Sangeetha Mahadevan',
      occasion: 'Reception Heavy Velvet Cut Blouse',
      rating: 5,
      text: 'I sent my reference photo on WhatsApp, booked a fitting, and received the blouse in 6 days. Zero trials required — fit was 100% exact on the first wear.',
      date: '2026-02-28',
    },
    {
      id: 't-3',
      clientName: 'Aishwarya & Keerthana',
      occasion: 'Mother & Daughter Grand Party Frocks',
      rating: 5,
      text: 'Stitched matching organza frocks for my daughter’s first birthday. The pleating and fabric finishing looked like a Milan runway piece. Extraordinary precision!',
      date: '2026-03-02',
    },
    {
      id: 't-4',
      clientName: 'Vandhana Krishnan',
      occasion: '90s Retro Puff Sleeve Silk Blouse',
      rating: 5,
      text: 'Finding someone who understands authentic 90s puffed sleeves without looking bulky is impossible. SreeStar nailed the exact vintage proportion.',
      date: '2026-03-10',
    },
    {
      id: 't-5',
      clientName: 'Meenakshi Sundaram',
      occasion: 'Bespoke Office Wear Kurtis & Churidars',
      rating: 5,
      text: 'Five kurtis stitched with bespoke measurements. Clean piping, comfortable breathable armholes, and delivered right on schedule.',
      date: '2026-03-12',
    },
  ]
}

/**
 * FAQs seed data
 */
export async function getFAQs(): Promise<FAQRecord[]> {
  return [
    {
      id: 'faq-1',
      question: 'What is your starting price for custom blouse stitching?',
      answer: 'Simple daily wear blouse stitching begins from ₹550. Designer cuts start from ₹950, and hand-embroidered Bridal Maggam blouses range from ₹2,500 to ₹15,000+ depending on zari density, kundan stones, and zardosi needlework complexity.',
      category: 'pricing',
      order: 1,
    },
    {
      id: 'faq-2',
      question: 'How many days do you take to stitch and deliver?',
      answer: 'Standard tailoring delivery is 4 to 7 working days. For urgent bridal emergencies, we provide our 48-Hour Rush Stitching service upon request.',
      category: 'delivery',
      order: 2,
    },
    {
      id: 'faq-3',
      question: 'Do you offer home measurement service in Chennai?',
      answer: 'Yes! For bridal orders (3 or more blouses), our senior master fitter can visit your location across Chennai for precise body curvature measurements.',
      category: 'fitting',
      order: 3,
    },
    {
      id: 'faq-4',
      question: 'Can I bring my own fabric or reference photo?',
      answer: 'Absolutely. Over 80% of our clients bring their saree blouse piece or send an Instagram/Pinterest reference photo on WhatsApp. Our master tailors replicate or customize any cut to your exact body silhouette.',
      category: 'fitting',
      order: 4,
    },
    {
      id: 'faq-5',
      question: 'Do you stitch sarees or men’s clothing?',
      answer: 'No. We are strictly WOMEN ONLY and we do NOT sell sarees or men\'s wear. Our studio is 100% dedicated to custom blouses, frocks, kurtis, churidars, and retro collections.',
      category: 'care',
      order: 5,
    },
    {
      id: 'faq-6',
      question: 'What is your Perfect Fit Guarantee?',
      answer: 'If any garment stitched by SreeStar requires the slightest fit adjustment, we provide free immediate alterations until it fits with absolute perfection.',
      category: 'fitting',
      order: 6,
    },
    {
      id: 'faq-7',
      question: 'How do I care for my Maggam / Zardosi embroidered blouse?',
      answer: 'Always dry-clean hand-embroidered blouses. Store them wrapped in pure white cotton or muslin fabric away from direct humidity to preserve the zari shine for decades.',
      category: 'care',
      order: 7,
    },
    {
      id: 'faq-8',
      question: 'Can I book a fitting slot online?',
      answer: 'Yes! Click "Book a Fitting +" in the navigation bar to submit your preferred date and design code. Our concierge will confirm your slot on WhatsApp within 2 hours.',
      category: 'delivery',
      order: 8,
    },
  ]
}

/**
 * Studio Settings
 */
export async function getSiteSettings() {
  return SITE_CONFIG
}
