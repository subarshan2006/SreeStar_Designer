/**
 * ====================================================================
 * SreeStar Tailoring — Image Optimization & LQIP Pipeline
 * ====================================================================
 */

export const IMAGE_SIZE_PRESETS = {
  thumbnail: 200,
  card: 400,
  medium: 800,
  large: 1200,
  full: 1920,
} as const

export type ImagePreset = keyof typeof IMAGE_SIZE_PRESETS

/**
 * Returns a high-fashion subtle warm shimmer SVG encoded as base64
 * for zero-latency, zero-CLS blur placeholders.
 */
export function getShimmerPlaceholder(width: number = 800, height: number = 1066): string {
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stop-color="#F2EFE9" offset="20%" />
          <stop stop-color="#E8E2D5" offset="50%" />
          <stop stop-color="#F2EFE9" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#F7F4EE" />
      <rect id="r" width="${width}" height="${height}" fill="url(#shimmer)" opacity="0.6">
        <animate attributeName="x" from="-${width}" to="${width}" dur="1.8s" repeatCount="indefinite" />
      </rect>
    </svg>
  `
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Generates an award-level responsive `sizes` string tailored for:
 * - Mobile (375px–640px): 2 columns edge-to-edge (~50vw)
 * - Tablet (768px–1024px): 3–4 columns (~33vw to 25vw)
 * - Desktop (1280px–1920px+): 5–6 columns (~20vw to 16vw)
 */
export function getResponsiveWallSizes(): string {
  return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 20vw, 16vw'
}

/**
 * Cloudinary & Sanity CDN URL builder with auto WebP/AVIF and quality compression
 */
export function buildOptimizedImageUrl(
  src: string,
  width: number,
  quality: number = 85
): string {
  if (!src) return ''

  // If already full URL or local path
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src
  }

  // Cloudinary optimization pattern
  if (src.includes('res.cloudinary.com')) {
    return src.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`)
  }

  // Sanity CDN optimization pattern
  if (src.includes('cdn.sanity.io')) {
    const separator = src.includes('?') ? '&' : '?'
    return `${src}${separator}w=${width}&q=${quality}&auto=format`
  }

  return src
}
