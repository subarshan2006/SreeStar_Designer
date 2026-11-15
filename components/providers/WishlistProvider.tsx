'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { trackGaEvent } from '@/components/seo/GoogleAnalytics'

interface WishlistContextType {
  wishlist: string[]
  isLoaded: boolean
  isDrawerOpen: boolean
  count: number
  isInWishlist: (designCode: string) => boolean
  toggleWishlist: (designCode: string) => void
  removeFromWishlist: (designCode: string) => void
  clearWishlist: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

const STORAGE_KEY = 'sreestar_curated_wishlist_v1'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setWishlist(parsed)
        }
      }
    } catch {
      // LocalStorage error fallback
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const saveToStorage = (updated: string[]) => {
    setWishlist(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Ignore storage quota errors
    }
  }

  const isInWishlist = (code: string) => {
    const clean = code.trim().toUpperCase()
    return wishlist.includes(clean)
  }

  const toggleWishlist = (code: string) => {
    const clean = code.trim().toUpperCase()
    if (isInWishlist(clean)) {
      const next = wishlist.filter((item) => item !== clean)
      saveToStorage(next)
    } else {
      const next = [...wishlist, clean]
      saveToStorage(next)
      trackGaEvent('wishlist_add', { designCode: clean })
    }
  }

  const removeFromWishlist = (code: string) => {
    const clean = code.trim().toUpperCase()
    const next = wishlist.filter((item) => item !== clean)
    saveToStorage(next)
  }

  const clearWishlist = () => {
    saveToStorage([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoaded,
        isDrawerOpen,
        count: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
