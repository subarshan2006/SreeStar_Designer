import type { Metadata, Viewport } from 'next'
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#FAF9F5',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sreestar.com'),
  title: {
    default: `${SITE_CONFIG.shopName} — Award-Level Women's Custom Blouse & Tailoring Studio Chennai`,
    template: `%s | ${SITE_CONFIG.shopName} Chennai`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'bridal blouse stitching chennai',
    'maggam work blouse chennai',
    'custom tailoring women chennai',
    'designer blouse tailor t nagar',
    'grand frock stitching chennai',
    'kurti custom tailor chennai',
    'churidar stitching chennai',
    '90s retro blouse designs',
    'women tailoring shop chennai',
  ],
  authors: [{ name: SITE_CONFIG.shopName }],
  creator: SITE_CONFIG.shopName,
  publisher: SITE_CONFIG.shopName,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_CONFIG.shopName} — Custom Blouses & Women's Tailoring Studio Chennai`,
    description: SITE_CONFIG.description,
    url: 'https://sreestar.com',
    siteName: SITE_CONFIG.shopName,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-sreestar-chennai',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || 'bing-site-verification-sreestar',
    },
  },
}

import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { WishlistProvider } from '@/components/providers/WishlistProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WishlistDrawer } from '@/components/ui/WishlistDrawer'
import { MobileActionBar } from '@/components/ui/MobileActionBar'
import { SkipToContent } from '@/components/ui/SkipToContent'
import { JsonLd, getLocalBusinessSchema } from '@/lib/schema'
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-ivory text-charcoal font-sans antialiased selection:bg-maroon selection:text-ivory pb-16 md:pb-0">
        <SkipToContent />
        <GoogleAnalytics />
        <MetaPixel />
        <ScrollDepthTracker />
        <JsonLd schema={getLocalBusinessSchema()} />
        <WishlistProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <div id="main-content">{children}</div>
            <ScrollToTop />
            <WishlistDrawer />
            <MobileActionBar />
          </SmoothScrollProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
