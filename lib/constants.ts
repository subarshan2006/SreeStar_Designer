export const SITE_CONFIG = {
  shopName: process.env.NEXT_PUBLIC_SHOP_NAME || 'SreeStar',
  tagline: "Custom blouses + women's tailoring.",
  subTagline: "Bridal, Grand, Designer Blouses, Frocks, Kurtis, Churidars & 90s Collection",
  description: "Award-level women's custom tailoring and blouse designing studio. Specializing in Bridal Maggam work, designer blouses, party frocks, kurtis, churidars, and authentic 90s retro collections.",
  city: process.env.NEXT_PUBLIC_CITY || 'Chennai',
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'sreestar_tailoring',
  address: '123 Cross Street, Near Temple, T. Nagar, Chennai, Tamil Nadu 600017',
  googleMapsLink: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || 'https://maps.google.com',
  workingHours: 'Mon – Sat: 10:00 AM – 8:30 PM | Sunday by Appointment',
  stats: {
    designsCount: '500+',
    happyClients: '2,500+',
    experienceYears: '14+',
    fitGuarantee: '100% Perfect Fit',
  },
  categories: [
    { id: 'bridal-blouses', name: 'Bridal Blouses', badge: 'Signature Maggam', count: '140+' },
    { id: 'grand-blouses', name: 'Grand Blouses', badge: 'Heavy Work', count: '110+' },
    { id: 'designer-blouses', name: 'Designer Blouses', badge: 'Party & Modern', count: '95+' },
    { id: 'daily-wear-blouses', name: 'Daily Wear Blouses', badge: 'Comfort Cut', count: '60+' },
    { id: 'back-neck-designs', name: 'Back Neck Designs', badge: 'Creative Cuts', count: '85+' },
    { id: 'sleeve-designs', name: 'Sleeve Designs', badge: 'Puff, Bell & Zari', count: '70+' },
    { id: 'frocks', name: 'Frocks & Grand Frocks', badge: 'Occasion Wear', count: '55+' },
    { id: 'kurtis', name: 'Kurtis', badge: 'A-line & Straight', count: '65+' },
    { id: 'churidars', name: 'Churidars', badge: 'Custom Fit', count: '50+' },
    { id: '90s-collection', name: '90s Collection', badge: 'Retro Vintage', count: '40+' },
  ],
} as const

export interface CategoryMeta {
  id: string
  name: string
  badge: string
  count: string
  desc: string
}

export const CATEGORIES_WITH_META: CategoryMeta[] = [
  { id: 'all', name: 'All Designs', badge: 'Full Archive', count: '500+', desc: 'Explore all tailored pieces' },
  { id: 'bridal-blouses', name: 'Bridal / Wedding Blouses', badge: 'Signature Maggam', count: '140+', desc: 'Peacock, floral & zardosi craftsmanship' },
  { id: 'grand-blouses', name: 'Grand Blouses', badge: 'Heavy Work', count: '110+', desc: 'Kundan, stone & velvet wedding wear' },
  { id: 'designer-blouses', name: 'Designer / Party Blouses', badge: 'Modern Cuts', count: '95+', desc: 'Contemporary cuts & evening elegance' },
  { id: 'daily-wear-blouses', name: 'Daily Wear Blouses', badge: 'Comfort Fit', count: '60+', desc: 'Breathable cotton & tailored everyday cuts' },
  { id: 'back-neck-designs', name: 'Back Neck Designs', badge: 'Creative Cuts', count: '85+', desc: 'Drop, pot, illusion & deep cuts' },
  { id: 'sleeve-designs', name: 'Sleeve Designs', badge: 'Puff & Zari', count: '70+', desc: '90s puff, elbow zari & bell sleeves' },
  { id: 'frocks', name: 'Frocks & Grand Frocks', badge: 'Occasion Wear', count: '55+', desc: 'Flared party frocks & grand gowns' },
  { id: 'kurtis', name: 'Kurtis', badge: 'A-Line & Straight', count: '65+', desc: 'Precision-stitched everyday elegance' },
  { id: 'churidars', name: 'Churidars', badge: 'Custom Fit', count: '50+', desc: 'Bespoke bottom & top fitting' },
  { id: '90s-collection', name: '90s Collection', badge: 'Retro Vintage', count: '40+', desc: 'Authentic 1990s South Indian nostalgia' },
  { id: 'new', name: 'New Arrivals', badge: 'Just In', count: '24', desc: 'Latest creations finished this week' },
  { id: 'trending', name: 'Trending Now', badge: 'Most Requested', count: '38', desc: 'Top requested bridal patterns' },
]
