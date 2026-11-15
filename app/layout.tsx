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
  title: `${SITE_CONFIG.shopName} — Award-Level Women's Custom Blouse & Tailoring Studio`,
  description: SITE_CONFIG.description,
  keywords: [
    'bridal blouse stitching',
    'maggam work blouse',
    'custom tailoring women chennai',
    'designer blouse tailor',
    'grand frock stitching',
    'kurti custom tailor',
    'churidar stitching',
    '90s retro blouse designs',
  ],
  authors: [{ name: SITE_CONFIG.shopName }],
  openGraph: {
    title: `${SITE_CONFIG.shopName} — Custom Blouses & Women's Tailoring`,
    description: SITE_CONFIG.description,
    type: 'website',
    locale: 'en_IN',
  },
}

import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

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
      <body className="min-h-screen bg-ivory text-charcoal font-sans antialiased selection:bg-maroon selection:text-ivory">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
