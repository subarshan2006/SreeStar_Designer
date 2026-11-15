import { SITE_CONFIG } from './constants'

export interface ChennaiLocality {
  slug: string
  name: string
  zone: string
  travelTime: string
  landmark: string
  highlights: string[]
  doorstepMeasurementAvailable: boolean
}

export const CHENNAI_LOCALITIES: ChennaiLocality[] = [
  {
    slug: 't-nagar',
    name: 'T. Nagar',
    zone: 'Central Chennai (Flagship Studio)',
    travelTime: 'Walking distance (Studio located on Cross Street)',
    landmark: 'Near Temple, Cross Street',
    highlights: [
      'Walk-in fittings & measurement consultations',
      'Full physical swatch book & embroidery sample wall',
      'Direct interaction with Master Cutter',
      '48-Hour rush stitching pick-up hub',
    ],
    doorstepMeasurementAvailable: true,
  },
  {
    slug: 'anna-nagar',
    name: 'Anna Nagar',
    zone: 'North-West Chennai',
    travelTime: '20–25 mins via Inner Ring Road',
    landmark: 'Serving 2nd Avenue, Roundtana & Shanthi Colony',
    highlights: [
      'Bridal order doorstep master measurements',
      'Matching mother-daughter party frock consultations',
      'Curated courier delivery with zero-crease packaging',
    ],
    doorstepMeasurementAvailable: true,
  },
  {
    slug: 'mylapore',
    name: 'Mylapore',
    zone: 'South Chennai Cultural Hub',
    travelTime: '10–15 mins via Luz Church Road',
    landmark: 'Near Kapaleeshwarar Temple & Luz Corner',
    highlights: [
      'Traditional South Indian Muhurtham silk saree blouses',
      'Authentic 90s vintage puffed sleeves & retro cuts',
      'Pure zari & temple jewelry embroidery motifs',
    ],
    doorstepMeasurementAvailable: true,
  },
  {
    slug: 'adyar',
    name: 'Adyar & Besant Nagar',
    zone: 'South Coastal Chennai',
    travelTime: '15–20 mins via Sardar Patel Road',
    landmark: 'Serving Gandhinagar, Kasturibai Nagar & Elliot’s Beach',
    highlights: [
      'Designer cocktail blouses & modern neckline cuts',
      'Minimalist linen & semi-silk comfortable everyday tailoring',
      'Home measurement visits for bridal groups (3+ blouses)',
    ],
    doorstepMeasurementAvailable: true,
  },
  {
    slug: 'velachery',
    name: 'Velachery',
    zone: 'South Chennai Tech Corridor',
    travelTime: '20–25 mins via GST / Inner Ring Road',
    landmark: 'Serving Bypass Road & Phoenix Marketcity corridor',
    highlights: [
      'Contemporary office-wear tailored kurtis & churidars',
      'Weekend fitting consultations by WhatsApp appointment',
      'Doorstep fitting & alteration support',
    ],
    doorstepMeasurementAvailable: true,
  },
  {
    slug: 'nungambakkam',
    name: 'Nungambakkam',
    zone: 'Central Chennai Fashion District',
    travelTime: '10–12 mins via Sterling Road',
    landmark: 'Near High Commission & College Road',
    highlights: [
      'High-fashion velvet party blouses & corset cuts',
      'Organza grand occasion frocks & evening gowns',
      'Express 48-hour emergency bridal stitching',
    ],
    doorstepMeasurementAvailable: true,
  },
]

/**
 * Generate Localized Schema for Chennai Neighborhood Landing Pages
 */
export function getLocalityLocalBusinessSchema(locality: ChennaiLocality) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/locations/${locality.slug}#localbusiness`,
    name: `${SITE_CONFIG.shopName} Tailoring — ${locality.name}, Chennai`,
    description: `Bespoke women's custom tailoring and bridal blouse stitching serving ${locality.name}, Chennai. Handcrafted maggam needlework, frocks, kurtis, and churidars with 100% fit guarantee.`,
    url: `${baseUrl}/locations/${locality.slug}`,
    telephone: SITE_CONFIG.phone,
    priceRange: '₹₹',
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: locality.name,
      },
      {
        '@type': 'City',
        name: 'Chennai',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600017',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0418,
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
  }
}
