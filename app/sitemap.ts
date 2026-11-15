import { MetadataRoute } from 'next'
import { CATEGORIES_WITH_META } from '@/components/navigation/CategoryOverlay'
import { getAllDesigns } from '@/lib/api'
import { CHENNAI_LOCALITIES } from '@/lib/local-seo'
import { getAllBlogPosts } from '@/lib/blog'

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
      url: `${baseUrl}/collections`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/styleguide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Dynamic Blog editorial guides
  const posts = await getAllBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: `${post.publishDate}T00:00:00.000Z`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Dynamic Chennai locality pages for Local SEO
  const localityRoutes: MetadataRoute.Sitemap = CHENNAI_LOCALITIES.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

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

  return [...staticRoutes, ...blogRoutes, ...localityRoutes, ...categoryRoutes, ...designRoutes]
}
