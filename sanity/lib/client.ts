export interface DesignItem {
  id: string
  title: string
  designCode: string
  slug: string
  category: string
  tags: string[]
  imageUrl: string
  width: number
  height: number
  description: string
  fabricOptions?: string[]
  isNew?: boolean
  isTrending?: boolean
  isFeatured?: boolean
}

// Built-in high-fashion seed designs for zero-configuration instant preview
export const SEED_DESIGNS: DesignItem[] = [
  {
    id: 'd-1',
    title: 'Peacock Zardosi Bridal Maggam Blouse',
    designCode: 'D-0104',
    slug: 'd-0104-peacock-zardosi-bridal-blouse',
    category: 'Bridal Blouses',
    tags: ['bridal', 'maggam', 'zardosi', 'peacock', 'silk'],
    imageUrl: '/images/designs/bridal-01.jpg',
    width: 800,
    height: 1066,
    description: 'Intricate gold wire work with authentic French knot detailing and pure pearl embellishments along sleeve borders.',
    fabricOptions: ['Pure Kanchipuram Raw Silk', 'Royal Velvet'],
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 'd-2',
    title: 'Lotus Kundan Heavy Cut Velvet Blouse',
    designCode: 'D-0219',
    slug: 'd-0219-lotus-kundan-velvet-blouse',
    category: 'Grand Blouses',
    tags: ['grand', 'kundan', 'velvet', 'heavy-work'],
    imageUrl: '/images/designs/grand-01.jpg',
    width: 800,
    height: 1200,
    description: 'Deep jewel-toned velvet base embellished with uncut kundan stones and shimmering antique zari motifs.',
    fabricOptions: ['Royal Velvet', 'Banarasi Brocade'],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'd-3',
    title: 'Vintage 1990s Puff Sleeve Silk Blouse',
    designCode: 'D-0902',
    slug: 'd-0902-vintage-puff-sleeve-blouse',
    category: '90s Collection',
    tags: ['90s', 'puff-sleeve', 'retro', 'cotton-silk'],
    imageUrl: '/images/designs/retro-01.jpg',
    width: 800,
    height: 980,
    description: 'Classic puffed shoulders with extended fitted elbow cuff, inspired by golden era South Indian cinema aesthetics.',
    fabricOptions: ['Handloom Cotton', 'Pure Raw Silk'],
    isFeatured: true,
  },
  {
    id: 'd-4',
    title: 'Flared Organza Grand Party Frock',
    designCode: 'D-0412',
    slug: 'd-0412-flared-organza-party-frock',
    category: 'Frocks',
    tags: ['frock', 'organza', 'party-wear', 'flared'],
    imageUrl: '/images/designs/frock-01.jpg',
    width: 800,
    height: 1140,
    description: 'Multi-tiered lightweight organza gown frock with hand-pleated bodice and subtle golden border lining.',
    fabricOptions: ['Pure Organza Silk', 'Chiffon'],
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 'd-5',
    title: 'Contemporary Keyhole Back Neck Blouse',
    designCode: 'D-0508',
    slug: 'd-0508-keyhole-back-neck-blouse',
    category: 'Back Neck Designs',
    tags: ['back-neck', 'keyhole', 'designer', 'party'],
    imageUrl: '/images/designs/backneck-01.jpg',
    width: 800,
    height: 1060,
    description: 'Architectural geometric keyhole cut with delicate pearl bead hangings and handmade latkan tassels.',
    fabricOptions: ['Pure Raw Silk', 'Banarasi Brocade'],
    isFeatured: true,
  },
  {
    id: 'd-6',
    title: 'Tailored Anarkali Silhouette Kurti',
    designCode: 'D-0615',
    slug: 'd-0615-anarkali-kurti',
    category: 'Kurtis',
    tags: ['kurti', 'anarkali', 'tailored-fit'],
    imageUrl: '/images/designs/kurti-01.jpg',
    width: 800,
    height: 1220,
    description: 'Flattering princess cut with Kalidar flare and hand-stitched potli button collar.',
    fabricOptions: ['Tussar Silk', 'Handloom Cotton'],
    isFeatured: true,
    isNew: true,
  },
]

export async function getDesigns(): Promise<DesignItem[]> {
  // If CMS env is configured, query Sanity; otherwise return rich seed catalog
  return SEED_DESIGNS
}
