import { MetadataRoute } from 'next'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { getAllDesigns } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'
  const currentDate = new Date().toISOString()

  // Base core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/styleguide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Dynamic category collection pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES_WITH_META.map((cat) => ({
    url: `${baseUrl}/collections/${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Dynamic design item pages (sample top indexed designs)
  const { designs } = await getAllDesigns(1, 100)
  const designRoutes: MetadataRoute.Sitemap = designs.map((d) => ({
    url: `${baseUrl}/collections/${d.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${d.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...categoryRoutes, ...designRoutes]
}
