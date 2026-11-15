# 🖼️ SreeStar Tailoring — Image SEO & Performance Engineering Strategy

This document details the Image SEO infrastructure implemented for **SreeStar Tailoring** to secure top positions in Google Images search for queries related to bridal blouses, maggam needlework, designer frocks, kurtis, churidars, and 90s vintage tailoring in Chennai.

---

## 1. Google Image Search Ranking Factors

Google Images prioritizes six primary criteria when indexing and ranking visual media:
1. **Descriptive, Slugified Filenames**: `artisanal-peacock-zardosi-bridal-blouse-kundan-pearl-d-0001.webp` (avoiding generic names like `IMG_9021.jpg`).
2. **Contextual Alt Text**: Every image must feature an informative, unique, keyword-dense `<img alt="...">` tag.
3. **Semantic Hierarchy**: Images wrapped within semantic HTML5 `<figure>` and `<figcaption>` elements provide search spiders with structured contextual descriptions.
4. **Image XML Sitemap**: Dedicated `<image:image>` entries in an XML sitemap submitted to Google Search Console.
5. **Layout Stability (Cumulative Layout Shift = 0.00)**: Container aspect ratio reservations to prevent layout jumping while images load.
6. **Next-Generation Formats**: AVIF and WebP delivery with automatic quality and dimension downsampling.

---

## 2. Format Negotiation & Delivery Chain

Configured in [next.config.mjs](file:///Users/subarshan/SreeStar/next.config.mjs):
```js
images: {
  formats: ['image/avif', 'image/webp'],
}
```
Browsers negotiate supported formats via the `Accept` HTTP header:
- **AVIF**: ~30% smaller than WebP at identical visual fidelity (served to modern Chrome, Safari 16+, Firefox).
- **WebP**: High-efficiency fallback for older Chromium and mobile WebViews.
- **JPEG/PNG**: Final fallback for legacy crawlers.

### Image Weight Budget Targets:
| Placement | Max File Size | Target Resolution | Aspect Ratio |
|---|---|---|---|
| **Hero Garment Overlap** | < 250 KB | 1200 × 1600 px | 3:4 |
| **Runway Masonry Cards** | < 80 KB | 800 × 1066 px | 3:4 |
| **Thumbnail & Lightbox Nav** | < 30 KB | 400 × 533 px | 3:4 |
| **Dynamic Open Graph Card** | < 200 KB | 1200 × 630 px | 1.91:1 |

---

## 3. Semantic Figure & Figcaption Markup

All runway masonry cards on the living image wall use semantic markup:
```html
<figure class="relative flex flex-col m-0">
  <div class="relative overflow-hidden">
    <img src="..." alt="Artisanal Peacock Zardosi Bridal Blouse (D-0045) — Handcrafted..." />
  </div>
  <figcaption class="p-3.5 bg-surface-card">
    <h4>Artisanal Peacock Zardosi Bridal Blouse</h4>
    <div class="flex justify-between text-[10px]">
      <span>Bridal Blouses</span>
      <span>Enquire →</span>
    </div>
  </figcaption>
</figure>
```

---

## 4. Google Image Sitemap Specification

Implemented at endpoint: `/image-sitemap.xml` (referenced in [app/robots.ts](file:///Users/subarshan/SreeStar/app/robots.ts)):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://sreestar.com/collections/bridal-blouses/d-0001-bridal-blouses</loc>
    <image:image>
      <image:loc>https://sreestar.com/placeholders/placeholder-d-0001.svg</image:loc>
      <image:title>Artisanal Peacock Zardosi Bridal Blouse — D-0001</image:title>
      <image:caption>Artisanal Peacock Zardosi Bridal Blouse (D-0001) — Bridal Blouses featuring Kundan &amp; Pearl, custom stitched at SreeStar Chennai.</image:caption>
      <image:geo_location>Chennai, Tamil Nadu, India</image:geo_location>
    </image:image>
  </url>
  <!-- 500+ design entries -->
</urlset>
```

---

## 5. Automated CMS Renaming Pipeline

Run the renaming CLI to synchronize new design assets into SEO-compliant filenames:
```bash
node scripts/seo-rename-images.mjs
```
This inspects the design catalog and generates [data/seo-image-manifest.json](file:///Users/subarshan/SreeStar/data/seo-image-manifest.json) mapping design codes to canonical slugified names.
