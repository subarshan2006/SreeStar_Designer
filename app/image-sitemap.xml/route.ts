import { getAllDesigns } from '@/lib/api'
import { generateGoogleImageXml } from '@/lib/image-seo'

export const revalidate = 3600 // Cache XML for 1 hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'
  const { designs } = await getAllDesigns(1, 500)

  const xmlEntries = designs.map((d) => generateGoogleImageXml(d, baseUrl)).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
