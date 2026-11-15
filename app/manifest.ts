import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.shopName} — Women's Tailoring Studio`,
    short_name: SITE_CONFIG.shopName,
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF9F5',
    theme_color: '#721B29',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
