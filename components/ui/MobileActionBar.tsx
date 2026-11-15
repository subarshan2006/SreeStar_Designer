'use client'

import React from 'react'
import { Phone, MessageCircle, Heart } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { createWhatsAppLink } from '@/lib/whatsapp'
import { trackGaEvent } from '@/components/seo/GoogleAnalytics'
import { useWishlist } from '@/components/providers/WishlistProvider'

export function MobileActionBar() {
  const { count, openDrawer, isLoaded } = useWishlist()

  const handleCallClick = () => {
    trackGaEvent('call_click', { phone: SITE_CONFIG.phone })
  }

  const handleWhatsAppClick = () => {
    trackGaEvent('whatsapp_click', { source: 'mobile_sticky_bar' })
  }

  const waUrl = createWhatsAppLink({
    type: 'general',
  })

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal/95 backdrop-blur-md text-ivory border-t border-white/10 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl flex items-center justify-between"
    >
      {/* Left: Call Atelier */}
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        onClick={handleCallClick}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors"
        aria-label="Call SreeStar Atelier"
      >
        <Phone className="w-3.5 h-3.5 text-gold" />
        <span>Call</span>
      </a>

      {/* Center: Curated Wishlist Trigger */}
      <button
        type="button"
        onClick={openDrawer}
        className="relative inline-flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-white transition-colors"
        aria-label={`View Wishlist (${count} saved)`}
      >
        <Heart className={`w-4 h-4 ${count > 0 ? 'text-maroon fill-maroon' : ''}`} />
        <span className="font-mono text-[11px] uppercase tracking-wider">Wishlist</span>
        {isLoaded && count > 0 && (
          <span className="w-4 h-4 rounded-full bg-maroon text-white text-[9px] font-mono font-bold flex items-center justify-center -ml-0.5">
            {count}
          </span>
        )}
      </button>

      {/* Right: WhatsApp Concierge */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] uppercase tracking-wider font-bold shadow-md transition-all active:scale-95"
        aria-label="Chat with SreeStar on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    </aside>
  )
}
