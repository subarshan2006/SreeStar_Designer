# 🌐 SreeStar Tailoring — Social SEO & Open Graph Specification Guide

This document specifies the Open Graph (OG), Twitter Card, WhatsApp link preview, and Pinterest Rich Pin architecture configured for the **SreeStar Tailoring** platform.

---

## 1. Architecture Overview

Social platforms crawl metadata tags and dynamic images when a URL is pasted into WhatsApp, Twitter/X, Instagram DMs, Facebook, or Pinterest.

SreeStar utilizes Next.js App Router native dynamic image generation via `@vercel/og` (`next/og`) running on the Vercel Edge Runtime for sub-50ms generation times.

### Key Asset Routes:
| Asset / Route | Endpoint | Resolution | Format | Purpose |
|---|---|---|---|---|
| **Root Open Graph** | `/opengraph-image` | 1200 × 630 px | PNG | Shared home page link preview |
| **Root Twitter Card** | `/twitter-image` | 1200 × 630 px | PNG | Twitter Summary Large Image card |
| **Dynamic Garment Card** | `/api/og?code=...&title=...` | 1200 × 630 px | PNG | Tailored preview for each of the 500+ design detail pages |
| **Category Share Card** | `/api/og?title=...&cat=...` | 1200 × 630 px | PNG | High-end social card for category collections |

---

## 2. Platform-Specific Behaviors & Specifications

### A. WhatsApp Link Previews
- **Target Dimensions**: 1200 × 630 px (1.91:1 aspect ratio).
- **File Weight Constraint**: Below 300KB (WhatsApp drops previews for oversized images).
- **Tags Used**:
  - `<meta property="og:title" content="..." />`
  - `<meta property="og:description" content="..." />`
  - `<meta property="og:image" content="..." />`
  - `<meta property="og:image:width" content="1200" />`
  - `<meta property="og:image:height" content="630" />`
- **Cache-Busting Technique**: If WhatsApp caches an old preview during testing, append a cache-buster query parameter (e.g. `https://sreestar.com/collections/bridal-blouses/d-0045-bridal-blouses?v=2`).

### B. Twitter / X Cards
- **Card Type**: `summary_large_image`
- **Tags Used**:
  - `<meta name="twitter:card" content="summary_large_image" />`
  - `<meta name="twitter:title" content="..." />`
  - `<meta name="twitter:description" content="..." />`
  - `<meta name="twitter:image" content="..." />`
  - `<meta name="twitter:site" content="@sreestar_tailoring" />`

### C. Pinterest Rich Pins
- Configured with `<meta name="pinterest-rich-pin" content="true" />` and Product Schema.org JSON-LD.
- Pinterest crawlers extract product availability, brand name (*SreeStar*), and design title directly into rich pins.

### D. Facebook & Instagram Stories
- Handled through standard Open Graph protocol (`og:url`, `og:type`, `og:title`, `og:image`).

---

## 3. Dynamic Design OG Generator Parameters

The `/api/og` endpoint accepts URL query parameters to dynamically generate cards:
- `code`: The design code (e.g., `D-0045`).
- `title`: Garment title (e.g., `Bridal Peacock Maggam Work Blouse`).
- `cat`: Category name (e.g., `Bridal Blouses`).
- `work`: Handcraft technique (e.g., `Gold Zardosi & French Knots`).

**Example Request**:
```
https://sreestar.com/api/og?code=D-0045&title=Bridal%20Peacock%20Maggam%20Work%20Blouse&cat=Bridal%20Blouses&work=Gold%20Zardosi
```

---

## 4. Verification Checklist & Testing Tools

To verify social card rendering in production:
1. **Facebook Sharing Debugger**:
   - URL: `https://developers.facebook.com/tools/debug/`
   - Paste any SreeStar URL and click **Scrape Again** to clear Facebook's cache.
2. **Twitter Card Validator**:
   - Paste link into a Twitter post composer to preview card.
3. **LinkedIn Post Inspector**:
   - URL: `https://www.linkedin.com/post-inspector/`
4. **WhatsApp Web Test**:
   - Send link in a test WhatsApp conversation; verify that the gold-framed charcoal card with design code appears instantly.
