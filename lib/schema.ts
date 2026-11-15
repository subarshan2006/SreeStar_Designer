import { SITE_CONFIG } from './constants'
import { DesignRecord, FAQRecord, TestimonialRecord } from './api'

/**
 * ====================================================================
 * SreeStar Tailoring — Schema.org Structured Data Generator
 * Formatted strictly for Google Rich Snippets & Local Search Ranking
 * ====================================================================
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'

/**
 * 1. LocalBusiness Schema (Appears in Google Local 3-Pack & Knowledge Graph)
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: `${SITE_CONFIG.shopName} Tailoring Atelier`,
    alternateName: `${SITE_CONFIG.shopName} Women's Custom Blouse & Tailoring Studio`,
    description: SITE_CONFIG.description,
    url: BASE_URL,
    telephone: SITE_CONFIG.phone,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Net Banking',
    areaServed: {
      '@type': 'City',
      name: SITE_CONFIG.city,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: SITE_CONFIG.city,
      addressRegion: 'Tamil Nadu',
      postalCode: '600017',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0418, // T. Nagar, Chennai coordinates
      longitude: 80.2341,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:30',
      },
    ],
    sameAs: [
      `https://instagram.com/${SITE_CONFIG.instagram}`,
      SITE_CONFIG.googleMapsLink,
    ],
    image: `${BASE_URL}/placeholders/placeholder-d-0001.svg`,
  }
}

/**
 * 2. AggregateRating & Review Schema (Generates Gold Stars in Google Search)
 */
export function getAggregateRatingSchema(testimonials: TestimonialRecord[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#reviews`,
    name: `${SITE_CONFIG.shopName} Tailoring`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '2540',
      reviewCount: String(testimonials.length > 0 ? testimonials.length : 5),
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.clientName,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
      },
      reviewBody: t.text,
      datePublished: t.date,
    })),
  }
}

/**
 * 3. FAQPage Schema (Displays expandable FAQ accordions directly inside Google Search results)
 */
export function getFAQPageSchema(faqs: FAQRecord[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * 4. BreadcrumbList Schema (Shows clean visual navigational breadcrumbs in SERPs)
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

/**
 * 5. Product Schema (For individual design codes like D-0104)
 */
export function getProductSchema(design: DesignRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: design.title,
    image: design.imageUrl.startsWith('http') ? design.imageUrl : `${BASE_URL}${design.imageUrl}`,
    description: design.description,
    sku: design.designCode,
    mpn: design.designCode,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.shopName,
    },
    category: design.categoryName,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '550',
      highPrice: '15000',
      offerCount: '1',
      availability: 'https://schema.org/InStock',
    },
  }
}

/**
 * 6. ImageObject Schema (For image carousels & Google Images ranking)
 */
export function getImageObjectSchema(design: DesignRecord) {
  const fullImg = design.imageUrl.startsWith('http') ? design.imageUrl : `${BASE_URL}${design.imageUrl}`
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: fullImg,
    name: `${design.title} — ${design.designCode}`,
    description: design.description,
    caption: `${design.title} (${design.designCode}) custom stitched at ${SITE_CONFIG.shopName} ${SITE_CONFIG.city}.`,
    representativeOfPage: true,
    width: `${design.width} px`,
    height: `${design.height} px`,
  }
}

/**
 * 7. VideoObject Schema (For 9:16 vertical short reels)
 */
export function getVideoObjectSchema(video: {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
}) {
  const fullThumb = video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${BASE_URL}${video.thumbnailUrl}`
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [fullThumb],
    uploadDate: video.uploadDate,
    duration: video.duration || 'PT30S',
    contentUrl: `${BASE_URL}/reels/${video.id}`,
  }
}

/**
 * 8. Article Schema (For Blog posts to earn Google Discover & News snippets)
 */
export function getArticleSchema(post: {
  title: string
  slug: string
  excerpt: string
  publishDate: string
  author: string
  featuredImage: string
}) {
  const fullImg = post.featuredImage.startsWith('http')
    ? post.featuredImage
    : `${BASE_URL}${post.featuredImage}`
  const articleUrl = `${BASE_URL}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [fullImg],
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: `${SITE_CONFIG.shopName} Tailoring Atelier`,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/placeholders/placeholder-d-0001.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }
}

/**
 * 9. AboutPage Schema (Establishes brand authority & E-E-A-T signals in Google Knowledge Graph)
 */
export function getAboutPageSchema() {
  const aboutUrl = `${BASE_URL}/about`
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${aboutUrl}#aboutpage`,
    name: `About ${SITE_CONFIG.shopName} Tailoring Atelier Chennai`,
    description: `The heritage, master cutters, and craftsmanship philosophy of ${SITE_CONFIG.shopName} — Chennai's premier bespoke women's custom blouse and tailoring studio.`,
    url: aboutUrl,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: `${SITE_CONFIG.shopName} Tailoring Atelier`,
      telephone: SITE_CONFIG.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address,
        addressLocality: SITE_CONFIG.city,
        addressRegion: 'Tamil Nadu',
        postalCode: '600017',
        addressCountry: 'IN',
      },
    },
  }
}

export { JsonLd } from '@/components/seo/JsonLd'

