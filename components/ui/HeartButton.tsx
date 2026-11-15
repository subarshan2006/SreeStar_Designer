'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/components/providers/WishlistProvider'

export interface HeartButtonProps {
  designCode: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function HeartButton({
  designCode,
  className = '',
  size = 'md',
}: HeartButtonProps) {
  const { isInWishlist, toggleWishlist, isLoaded } = useWishlist()
  const active = isLoaded && isInWishlist(designCode)

  const sizeClasses = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-8 h-8 p-2',
    lg: 'w-10 h-10 p-2.5',
  }[size]

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size]

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(designCode)
      }}
      className={`rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center focus:outline-none ${sizeClasses} ${
        active
          ? 'bg-maroon text-white shadow-lg scale-105'
          : 'bg-charcoal/60 text-white/90 hover:bg-charcoal/90 hover:scale-110'
      } ${className}`}
      aria-label={active ? `Remove ${designCode} from wishlist` : `Save ${designCode} to wishlist`}
      title={active ? 'Saved in Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        className={`${iconSizes} transition-transform ${
          active ? 'fill-current scale-110' : 'stroke-[2]'
        }`}
      />
    </button>
  )
}
