'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { X, Heart, MessageCircle, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/components/providers/WishlistProvider'
import { createWhatsAppLink } from '@/lib/whatsapp'
import { trackGaEvent } from '@/components/seo/GoogleAnalytics'
import { SITE_CONFIG } from '@/lib/constants'

export function WishlistDrawer() {
  const { wishlist, isDrawerOpen, closeDrawer, removeFromWishlist, clearWishlist } = useWishlist()

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, closeDrawer])

  if (!isDrawerOpen) return null

  const handleShareWishlist = () => {
    trackGaEvent('wishlist_share', { count: wishlist.length })
    const waUrl = createWhatsAppLink({
      type: 'wishlist_share',
      designCodes: wishlist,
    })
    window.open(waUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-ivory text-charcoal h-full shadow-2xl flex flex-col justify-between z-10 border-l border-surface-border">
        {/* Header */}
        <div className="p-6 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-maroon fill-maroon" />
            <h2 className="font-serif text-xl font-bold">
              My Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 rounded-full hover:bg-surface text-charcoal-muted hover:text-charcoal transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-surface-card border border-surface-border flex items-center justify-center">
                <Heart className="w-8 h-8 text-charcoal-subtle" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-charcoal-muted max-w-xs font-sans">
                  Tap the heart icon on any bridal blouse, frock, kurti, or vintage cut to curate your personalized fitting lookbook.
                </p>
              </div>
              <Link
                href="/collections"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon text-ivory text-xs font-mono uppercase tracking-wider font-bold rounded shadow transition-colors"
              >
                <span>Browse 500+ Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted pb-2 border-b border-surface-border/60">
                <span>Saved Garment Codes</span>
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-charcoal-subtle hover:text-maroon flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {wishlist.map((code) => {
                const singleWa = createWhatsAppLink({
                  type: 'design_enquiry',
                  designCode: code,
                })

                return (
                  <div
                    key={code}
                    className="p-3.5 bg-surface-card rounded border border-surface-border flex items-center justify-between group hover:border-maroon/50 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-sm font-bold text-charcoal block">
                        {code}
                      </span>
                      <span className="text-[11px] font-sans text-charcoal-muted">
                        Bespoke Women’s Silhouette
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={singleWa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-maroon text-white rounded hover:bg-maroon-hover transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(code)}
                        className="p-2 hover:bg-surface text-charcoal-subtle hover:text-maroon rounded transition-colors"
                        title="Remove from wishlist"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-surface-border bg-surface-card space-y-3">
            <button
              type="button"
              onClick={handleShareWishlist}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-maroon hover:bg-maroon-hover text-ivory font-mono uppercase text-xs tracking-widest font-bold rounded shadow-lg transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share {wishlist.length} Designs on WhatsApp</span>
            </button>

            <p className="text-[10px] font-mono text-charcoal-subtle text-center">
              Our {SITE_CONFIG.city} atelier will review all {wishlist.length} designs and reply with fitting slots.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
