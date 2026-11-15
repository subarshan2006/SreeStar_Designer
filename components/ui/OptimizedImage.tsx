'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getShimmerPlaceholder, getResponsiveWallSizes } from '@/lib/image'

export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: number
  priority?: boolean
  sizes?: string
  className?: string
  containerClassName?: string
  quality?: number
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 1066,
  aspectRatio,
  priority = false,
  sizes,
  className,
  containerClassName,
  quality = 85,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const computedAspectRatio = aspectRatio || (width && height ? width / height : 0.75)
  const defaultSizes = sizes || getResponsiveWallSizes()
  const shimmerPlaceholder = getShimmerPlaceholder(width, height)

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-surface-card select-none',
        containerClassName
      )}
      style={{
        aspectRatio: computedAspectRatio,
      }}
    >
      {/* Background Shimmer placeholder while loading */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{ backgroundImage: `url("${shimmerPlaceholder}")` }}
          aria-hidden="true"
        />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-surface text-center">
          <span className="font-mono text-xs text-charcoal-subtle uppercase">Image Unavailable</span>
          <span className="font-serif italic text-xs text-charcoal-muted mt-1">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={defaultSizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onLoad={() => {
            setIsLoaded(true)
            if (onLoad) onLoad()
          }}
          onError={() => setHasError(true)}
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.02] blur-sm',
            className
          )}
        />
      )}
    </div>
  )
}
