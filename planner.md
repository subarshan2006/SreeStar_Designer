# 🏆 Award-Level Women's Tailoring Website — 50-Sprint Master Plan

> **This is NOT a boutique website.** This is a custom stitching & tailoring website for **women only** — Blouses, Frocks, Kurtis, Churidars, and 90s Collection. Sarees are styling context only.

---

## 📐 Project Overview

```
Phase 1 (Foundation) → Phase 2 (Core Pages) → Phase 3 (Animation System) → Phase 4 (SEO Engine) → Phase 5 (Conversion & Polish) → Phase 6 (Launch & Growth)
   Sprints 1–8            Sprints 9–18            Sprints 19–28              Sprints 29–38             Sprints 39–45               Sprints 46–50
```

---

## 🎯 Tech Stack Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15 (App Router)** | SSR/SSG for SEO, image optimization built-in |
| Styling | **Tailwind CSS 4** | Utility-first, fast iteration |
| Animation | **GSAP + ScrollTrigger + Lenis** | Award-level scroll animations, 60fps |
| CMS | **Sanity v3** | Real-time preview, image pipeline, bulk upload |
| Hosting | **Vercel** | Edge network, automatic optimization |
| Analytics | **GA4 + Meta Pixel** | Conversion tracking |
| Media CDN | **Cloudinary or Vercel Image Optimization** | Auto WebP/AVIF, srcset, blur placeholders |

---

## 🏗️ PHASE 1 — FOUNDATION (Sprints 1–8)

### Sprint 1 — Project Scaffolding & Architecture
- [x] Initialize Next.js 15 project with App Router
- [x] Configure Tailwind CSS with custom theme tokens
- [x] Set up folder structure: `app/`, `components/`, `lib/`, `data/`, `public/`
- [x] Configure ESLint, Prettier, Husky pre-commit hooks
- [x] Create `.env` structure for API keys, CMS, analytics
- [x] Initialize Git repo with branching strategy (main → develop → feature/*)
- [x] Create `README.md` with project overview and setup instructions

### Sprint 2 — Design System & Typography
- [x] Define color palette: ivory/white canvas, black/charcoal text, maroon CTA, gold accents
- [x] Select & load fonts: bold display font (wordmark), elegant serif (headings), clean sans-serif (body)
- [x] Create Tailwind theme extensions: `colors`, `fontFamily`, `spacing`, `screens`
- [x] Build base typography components: `<Heading>`, `<Body>`, `<Caption>`, `<Label>`
- [x] Create a style guide page at `/styleguide` for internal reference
- [x] Define responsive breakpoints: mobile (375), tablet (768), desktop (1280), wide (1536)

### Sprint 3 — Giant Wordmark Component
- [x] Design/implement bold wordmark of shop name using SVG or large `vw`-scaled text
- [x] Make it responsive: edge-to-edge on every screen width
- [x] Build `<GiantWordmark>` component with props: `size`, `color`, `overlap`, `reveal`
- [x] Test on mobile (375px) through ultrawide (2560px)
- [x] Add aria-label for accessibility
- [x] Create variant: hero wordmark (with overlap zone) vs footer wordmark (with reveal animation)

### Sprint 4 — Navigation System
- [x] Build minimal fixed nav: no background, plain text, mix-blend-mode: difference
- [x] Left: "+ Collections" (opens fullscreen category panel)
- [x] Centre-right: "About / Gallery / Contact" links
- [x] Right: "Book a Fitting +" CTA button
- [x] Mobile collapse: "+ Menu" hamburger + "Book" button
- [x] Build fullscreen category overlay panel with animated open/close
- [x] Categories in panel: All, Bridal/Wedding Blouses, Grand Blouses, Designer/Party Blouses, Daily Wear, Back Neck Designs, Sleeve Designs, Frocks, Grand Frocks, Kurtis, Churidars, 90s Collection, New, Trending
- [x] Keyboard navigation support (Escape to close, Tab through items)
- [x] Test mix-blend-mode across browsers (Safari, Chrome, Firefox)

### Sprint 5 — CMS Setup (Sanity v3)
- [x] Initialize Sanity Studio project
- [x] Define schema: `design` (id, title, slug, category[], tags[], image, width, height, designCode, description, fabricOptions, isNew, isTrending, isFeatured, sortOrder)
- [x] Define schema: `category` (name, slug, description, heroImage, seoMeta)
- [x] Define schema: `testimonial` (clientName, photo, rating, text, date)
- [x] Define schema: `faq` (question, answer, order)
- [x] Define schema: `siteSettings` (shopName, city, phone, whatsapp, instagram, address, mapsLink, hours, logo, tagline)
- [x] Define schema: `video` (title, file, poster, type: reel/behind-the-scenes)
- [x] Set up Sanity image pipeline (auto-crop, hotspot)
- [x] Create bulk upload script for 500+ design images
- [x] Write a "How to Add Designs" guide document
- [x] Deploy Sanity Studio configuration (embeddable `/studio` route)

### Sprint 6 — Image Pipeline & Optimization System
- [x] Set up Cloudinary or Vercel image optimization
- [x] Build `<OptimizedImage>` component with: srcset, WebP/AVIF, lazy-load, blur-up placeholder (LQIP)
- [x] Store intrinsic `width` and `height` in CMS for zero layout shift
- [x] Create image size presets: thumbnail (200w), card (400w), medium (800w), large (1200w), full (1920w)
- [x] Build blur placeholder generation (base64 or blurhash)
- [x] Configure Next.js `next/image` with remote patterns for CMS
- [x] Test CLS (Cumulative Layout Shift) = 0 on all pages

### Sprint 7 — Data Layer & API
- [x] Build Sanity client with GROQ queries
- [x] Create data-fetching functions: `getAllDesigns()`, `getDesignsByCategory()`, `getDesign(slug)`, `getFeaturedDesigns()`, `getTestimonials()`, `getFAQs()`, `getSiteSettings()`
- [x] Implement ISR (Incremental Static Regeneration) for design pages
- [x] Build search utility: search by design code, title, tags
- [x] Create category URL structure: `/collections/bridal-blouses`, `/collections/kurtis`, etc.
- [x] Set up Sanity webhook → Vercel revalidation for instant content updates

### Sprint 8 — Placeholder Content & Asset Prep
- [x] Create 50 clearly labeled placeholder images (different aspect ratios, portrait & landscape)
- [x] Label each: "Bridal Blouse — D-0001", "Grand Frock — D-0025", etc.
- [x] Create 5 placeholder vertical video posters
- [x] Seed CMS with 50 placeholder designs across all categories
- [x] Add 5 placeholder testimonials
- [x] Add 8 FAQs with realistic content
- [x] Fill siteSettings with placeholder shop info
- [x] Create a content replacement checklist for the client

---

## 📄 PHASE 2 — CORE PAGES (Sprints 9–18)

### Sprint 9 — Hero Section (Home)
- [x] Giant wordmark spanning full viewport width at the top
- [x] Short tagline positioned to the right: "Custom blouses + women's tailoring."
- [x] Image overlay zone: 3–5 garment images sit IN FRONT of the wordmark, partially covering it
- [x] Use CSS `z-index` layering so images overlap the text naturally
- [x] Subtle intro load animation: images slide up with staggered delay per column
- [x] Responsive: wordmark scales via `clamp()` or `vw` units
- [x] Mobile: 2-column staggered layout, wordmark still visible behind images

### Sprint 10 — Staggered Image Wall Component
- [x] Build `<ImageWall>` component: edge-to-edge grid, 5–6 vertical columns
- [x] Small even gutters (~16–20px), outer columns cropped by screen edges
- [x] Each column starts at a different vertical offset (staggered, not flat)
- [x] Images keep natural aspect ratios and stack tightly
- [x] Auto-distribute images across columns, balancing column heights (masonry algorithm)
- [x] Caption beneath each image: design name + code (e.g., "Bridal Maggam Blouse — D-0123")
- [x] Responsive columns: desktop 5–6, tablet 3–4, mobile 2
- [x] Mobile: still edge-to-edge and offset
- [x] Virtualization: only render images near viewport (react-virtual or intersection observer)

### Sprint 11 — Image Wall Interactions
- [x] Desktop hover: image scales slightly (1.03x), caption fades in with opacity transition
- [x] Mobile tap: same scale + caption behavior
- [x] Column parallax: each column drifts at slightly different scroll speed via GSAP ScrollTrigger
- [x] End of wall: "View all 500+ designs →" link
- [x] Click/tap image → open lightbox (Sprint 12)
- [x] Lazy-loading: load images as columns scroll into view
- [x] Performance: requestAnimationFrame for scroll parallax, `will-change: transform`

### Sprint 12 — Lightbox / Quick-View
- [x] Full-screen lightbox overlay with large image
- [x] Swipe/arrow to navigate to next/previous design
- [x] Display: design code, category, description
- [x] CTA buttons: "Enquire on WhatsApp about this design" (pre-filled message with design code)
- [x] CTA buttons: "Book a Fitting"
- [x] Close button + Escape key + click-outside to close
- [x] URL updates without full navigation (shallow routing)
- [x] Keyboard accessible: arrow keys to navigate, Tab through CTAs
- [x] Smooth open/close animation (scale + fade)

### Sprint 13 — Welcome Text (Scroll-Scrubbed)
- [x] Full-screen pinned section after the image wall
- [x] Large statement text (e.g., "Welcome to [SHOP NAME]. Every blouse begins with your measurements and ends with your confidence...")
- [x] GSAP ScrollTrigger with `scrub: true` and `pin: true`
- [x] Words reveal one by one as user scrolls: each word transitions from faint/invisible → full opacity with a small upward slide
- [x] Scrolling back up hides words in reverse
- [x] When last word is fully visible, release the pin and continue scroll
- [x] `prefers-reduced-motion`: show full text immediately, no animation
- [x] Test on mobile: ensure pinning works with touch scroll

### Sprint 14 — Category Index Section
- [x] Large typographic list of categories: Bridal Blouses, Grand Blouses, Designer Blouses, Frocks, Kurtis, Churidars, 90s Collection
- [x] Desktop: hovering a category name shows a floating preview image that follows the cursor (GSAP magnetic effect)
- [x] Each category links to its filtered collection page
- [x] Mobile: stacked image cards with category name overlay
- [x] Staggered reveal animation on scroll (words slide up)
- [x] Accessible: all items are links with descriptive text

### Sprint 15 — Bridal & Grand Spotlight Section
- [x] Pinned scroll section (GSAP ScrollTrigger pin)
- [x] Wedding/grand blouse designs change one after another as user scrolls
- [x] Large full-width images with short descriptive text alongside
- [x] Progress indicator (dots or fraction: 1/5)
- [x] Each slide has "Enquire" and "Book" CTAs
- [x] Smooth crossfade or clip-path reveal between slides
- [x] `prefers-reduced-motion`: simple scroll with no pinning

### Sprint 16 — Video Reels Section
- [x] Horizontal scrollable row of vertical short videos
- [x] Lazy-load: download only when scrolled into view
- [x] Muted autoplay when in viewport (Intersection Observer)
- [x] Tap/click to unmute + show controls
- [x] Poster image displayed before video loads
- [x] Compressed MP4/WebM formats
- [x] YouTube/Instagram embeds load only on click (facade pattern)
- [x] Mobile: swipeable horizontal scroll

### Sprint 17 — Process Timeline + Why Us + Counters
- [x] **Our Process**: animated horizontal timeline
  - Steps: Choose a Design → Measurements → Stitching → Fitting → Delivery
  - Each step reveals with a scroll-triggered animation (icon + text)
  - Connected by animated line that draws as you scroll
- [x] **Why Us**: 3–4 value cards with icons
  - Perfect-fit guarantee, on-time delivery, premium finishing, 500+ designs
- [x] **Animated Counters**: numbers count up when scrolled into view
  - 500+ Designs, [X]+ Happy Clients, [Y] Years
  - Use GSAP or CountUp.js with intersection observer trigger

### Sprint 18 — Testimonials + FAQ + Final CTA + Footer
- [x] **Testimonials**: carousel/slider with client photos, star ratings, review text
  - Link to Google Reviews page
  - Auto-rotate with pause on hover/focus
  - Accessible: ARIA live region for screen readers
- [x] **FAQ Accordion**: expand/collapse with smooth height animation
  - Topics: pricing, delivery time, home measurements, alterations, rush orders
  - Schema.org FAQPage markup for SEO
- [x] **Final CTA Section**:
  - Booking form: name, phone, garment type, preferred date, design code, reference photo upload, message
  - Form submits to WhatsApp + email + Google Sheet
  - Large WhatsApp button
  - Urgency line: "Wedding season slots filling fast 🔥"
  - Success animation + auto-reply confirmation
- [x] **Footer**:
  - Contact details, map link, opening hours, social links, quick links
  - GIANT wordmark of shop name spanning full width (vw-sized)
  - Wordmark slides/reveals up as footer enters viewport (GSAP ScrollTrigger)
  - Copyright line below wordmark

---

## 🎞️ PHASE 3 — ANIMATION SYSTEM (Sprints 19–28)

### Sprint 19 — Lenis Smooth Scroll Integration
- [x] Install and configure Lenis for smooth scroll across the site
- [x] Integrate Lenis with GSAP ScrollTrigger (`ScrollTrigger.scrollerProxy` or native integration)
- [x] Test smooth scroll on: Chrome, Safari, Firefox, iOS Safari, Android Chrome
- [x] Handle edge cases: hash links, back button, programmatic scroll
- [x] Respect `prefers-reduced-motion`: disable smooth scroll when set
- [x] Measure scroll performance: maintain 60fps

### Sprint 20 — GSAP ScrollTrigger Core Setup
- [x] Initialize GSAP with ScrollTrigger plugin
- [x] Create animation utility hooks: `useScrollReveal()`, `useParallax()`, `useScrubText()`
- [x] Build `<ScrollReveal>` wrapper component (fade-up, slide-in, scale, clip-path)
- [x] Configure global defaults: `ease`, `duration`, `stagger`
- [x] Set up ScrollTrigger debug markers (dev mode only)
- [x] Create animation config file for easy global tuning

### Sprint 21 — Column Parallax System
- [x] Apply per-column parallax to `<ImageWall>`: each column moves at a unique speed
- [x] Speed variance: column 1 at 0.8x, column 2 at 1.0x, column 3 at 0.9x, etc.
- [x] Use `ScrollTrigger` with `scrub: true` for butter-smooth parallax
- [x] Only animate `transform: translateY()` for GPU compositing
- [x] Disable parallax on mobile if performance drops below 60fps
- [x] Test with 50+ images loaded

### Sprint 22 — Staggered Image Reveal Animations
- [x] Images reveal with clip-path or mask animation as they enter viewport
- [x] Stagger per column: images in same column animate sequentially
- [x] Options: `clip-path: inset()` wipe, scale from 0.95 → 1, opacity 0 → 1
- [x] Use `IntersectionObserver` + GSAP for lazy initialization (don't create 500 ScrollTriggers)
- [x] Batch animations: use `ScrollTrigger.batch()` for performance
- [x] `prefers-reduced-motion`: simple opacity fade only

### Sprint 23 — Word-by-Word Scroll Scrub Perfection
- [x] Refine the Welcome Text scrub from Sprint 13
- [x] Split text into `<span>` per word using SplitText or custom splitter
- [x] Each word animates: `opacity: 0.15 → 1`, `y: 8px → 0`
- [x] Scrub timeline: evenly distribute word animations across scroll distance
- [x] Pin container for the duration of the reveal
- [x] Add subtle color shift: words go from grey → charcoal/black
- [x] Test on long text (40+ words) and short text (15 words)
- [x] Mobile: reduce pin distance, larger words

### Sprint 24 — Page Transitions
- [x] Implement smooth page transitions between routes
- [x] Transition type: crossfade with subtle slide, or clip-path wipe
- [x] Use Next.js App Router `template.tsx` or `framer-motion` `AnimatePresence`
- [x] Ensure scroll position resets on new page
- [x] Maintain transition during client-side navigation
- [x] Loading state: subtle progress bar or fade
- [x] Fallback for no-JS: instant navigation

### Sprint 25 — Magnetic Buttons & Custom Cursor
- [x] **Magnetic buttons**: CTA buttons subtly attract toward the cursor when nearby
  - Use GSAP `quickTo()` for smooth magnetic pull
  - Apply to: "Book a Fitting", "WhatsApp", primary CTAs
  - Subtle effect (max 8–10px pull), not jarring
- [x] **Custom cursor** (desktop only):
  - Default: small dot or crosshair
  - On interactive elements: grows, changes color
  - On images: shows "View" or "+" icon
  - On CTAs: shows "Click" or arrow
  - Hide on mobile / touch devices
  - Accessible: don't hide the native cursor for keyboard users

### Sprint 26 — Micro-Animations & Polish
- [x] Button hover states: subtle scale, color shift, underline slide
- [x] Link hover: underline draws from left to right
- [x] Nav items: letter-spacing expansion on hover
- [x] Card hover: subtle shadow lift
- [x] Form field focus: border color transition, label float animation
- [x] Loading skeleton animations for images (shimmer effect)
- [x] Scroll-to-top button with smooth appearance
- [x] "Back to top" appears after scrolling past fold

### Sprint 27 — Bridal Spotlight & Footer Reveals
- [x] Refine Bridal Spotlight pinned section:
  - Images transition with clip-path reveal (circle expand or horizontal wipe)
  - Text fades and slides in sync with image change
  - Scroll-controlled: each "page" of content maps to a scroll distance
- [x] Footer giant wordmark reveal:
  - Wordmark slides up from below as footer enters viewport
  - Use `clip-path` or `translateY` with ScrollTrigger
  - Reveal completes as footer is fully in view
  - Subtle parallax on the wordmark itself

### Sprint 28 — Animation Performance Audit
- [x] Profile all animations using Chrome DevTools Performance tab
- [x] Ensure 60fps across all sections on mid-range devices
- [x] Identify and fix layout thrashing (no width/height animations)
- [x] Audit `will-change` usage (apply only when animating, remove after)
- [x] Lazy-initialize ScrollTriggers: only create when section is near viewport
- [x] Kill ScrollTriggers on route change to prevent memory leaks
- [x] Test on: iPhone 12 (Safari), Pixel 6 (Chrome), iPad (Safari), low-end Android
- [x] Create performance budget: JS bundle < 200KB gzipped, LCP < 2.5s
- [x] `prefers-reduced-motion` audit: every animation has a reduced/no-motion fallback

---

## 🔍 PHASE 4 — SEO ENGINE (Sprints 29–38)

### Sprint 29 — Technical SEO Foundation
- [x] Configure `next-sitemap` for automatic XML sitemap generation
- [x] Create `robots.txt` with proper allow/disallow rules
- [x] Set up canonical URLs for all pages
- [x] Implement `next/metadata` API for dynamic meta tags on every page
- [x] Configure `viewport`, `themeColor`, and `manifest.json`
- [x] Set `<html lang="en">` (or `lang="ta"` for Tamil content)
- [x] Create 404 and 500 error pages with navigation back to home

### Sprint 30 — Schema.org Structured Data
- [ ] **LocalBusiness** schema on every page:
  ```json
  {
    "@type": "LocalBusiness",
    "name": "[SHOP NAME]",
    "description": "Custom women's tailoring...",
    "address": { "..." },
    "telephone": "...",
    "openingHours": "...",
    "geo": { "latitude": "...", "longitude": "..." },
    "image": "...",
    "priceRange": "$$"
  }
  ```
- [ ] **Product** schema on each design detail page
- [ ] **FAQPage** schema on FAQ section and page
- [ ] **Review** / **AggregateRating** schema for testimonials
- [ ] **BreadcrumbList** schema for navigation
- [ ] **ImageObject** schema for gallery images with descriptive alt text
- [ ] **VideoObject** schema for video reels
- [ ] Validate all schema with Google Rich Results Test

### Sprint 31 — Keyword Strategy & On-Page SEO
- [ ] Research and map primary keywords per page:

| Page | Primary Keywords |
|------|-----------------|
| Home | "custom blouse stitching [CITY]", "women's tailoring [CITY]" |
| Bridal Blouses | "bridal blouse designs", "wedding blouse stitching [CITY]", "maggam work blouse" |
| Grand Blouses | "grand blouse designs", "heavy work blouse [CITY]" |
| Designer Blouses | "designer blouse stitching", "party wear blouse [CITY]" |
| Frocks | "custom frock stitching [CITY]", "grand frock designs" |
| Kurtis | "kurti stitching [CITY]", "custom kurti tailor" |
| Churidars | "churidar stitching [CITY]", "custom churidar tailor" |
| 90s Collection | "90s style blouse designs", "retro blouse collection" |
| About | "[SHOP NAME] tailor [CITY]", "best tailor [CITY]" |
| Contact | "book fitting [CITY]", "tailor appointment [CITY]" |

- [ ] Write unique `<title>` tags (50–60 chars) for every page
- [ ] Write unique `<meta description>` (150–160 chars) for every page
- [ ] Add `<h1>` with primary keyword on every page (only one `<h1>`)
- [ ] Use semantic heading hierarchy: h1 → h2 → h3
- [ ] Add keyword-rich alt text to all images (e.g., "bridal maggam work blouse design with gold zardosi — D-0045")

### Sprint 32 — URL Architecture & Internal Linking
- [ ] Clean URL structure:
  - `/` — Home
  - `/collections` — All designs
  - `/collections/bridal-blouses` — Category page
  - `/collections/bridal-blouses/design-code-d-0045` — Design detail
  - `/about` — About page
  - `/contact` — Contact / Book a Fitting
  - `/gallery` — Full gallery (optional, can redirect to /collections)
- [ ] Implement breadcrumbs on all pages with schema
- [ ] Build internal linking strategy:
  - Every design links to its category
  - Every category links to related categories
  - "You may also like" section on design pages
  - Blog posts (future) link to relevant categories
  - Footer contains all category links
- [ ] Create an HTML sitemap page at `/sitemap`
- [ ] Prevent duplicate content: canonical tags, trailing slash consistency

### Sprint 33 — Open Graph & Social SEO
- [ ] OG tags for every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter Card tags: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Generate dynamic OG images for design detail pages (design photo + shop name overlay)
- [ ] Use `next/og` (Vercel OG) for dynamic image generation
- [ ] Test sharing on: WhatsApp, Instagram stories, Facebook, Twitter
- [ ] Pinterest: add `<meta name="pinterest" content="nopin">` selectively or enable rich pins

### Sprint 34 — Image SEO
- [ ] Descriptive file names: `bridal-maggam-blouse-gold-zardosi-D0045.webp` (not `IMG_2847.jpg`)
- [ ] Build a CMS image rename pipeline: auto-generate SEO-friendly filenames from design title + code
- [ ] Alt text on every image: descriptive, keyword-rich, unique
- [ ] `<figcaption>` on gallery images
- [ ] Image sitemap: add `<image:image>` entries to XML sitemap
- [ ] Implement structured data `ImageObject` for key images
- [ ] Optimize image file sizes: target < 100KB for cards, < 300KB for hero
- [ ] Serve AVIF → WebP → JPEG fallback chain

### Sprint 35 — Local SEO
- [ ] **Google Business Profile** optimization guide:
  - Claim and verify listing
  - Add all categories: "Tailor", "Women's Clothing Store", "Blouse Shop"
  - Upload 50+ photos to GBP
  - Add services: blouse stitching, kurti stitching, frock stitching, etc.
  - Collect and respond to reviews
  - Post weekly updates
- [ ] Embed Google Maps on contact page with proper API key
- [ ] NAP (Name, Address, Phone) consistency across all pages
- [ ] Add city/area name to key headings: "Bridal Blouse Stitching in [CITY]"
- [ ] Create location-specific landing pages if multiple areas served
- [ ] Local citations: list on Justdial, Sulekha, IndiaMART, Google Maps, Yelp, Yellow Pages
- [ ] Encourage Google reviews with post-delivery WhatsApp message template

### Sprint 36 — Content SEO (Blog Foundation)
- [ ] Set up blog CMS schema in Sanity: `blogPost` (title, slug, body, featuredImage, category, tags, author, publishDate, seoMeta)
- [ ] Create `/blog` listing page and `/blog/[slug]` detail page
- [ ] Plan first 20 blog posts (titles + target keywords):
  1. "Top 50 Bridal Blouse Designs for 2026 Weddings"
  2. "How to Choose the Perfect Blouse Design for Your Saree"
  3. "Maggam Work vs Aari Work: What's the Difference?"
  4. "10 Trending Back Neck Blouse Designs This Season"
  5. "Grand Frock Designs for Your Daughter's Birthday Party"
  6. "How Custom Kurti Stitching Works: A Complete Guide"
  7. "Sleeve Design Ideas: From Simple to Statement"
  8. "Why Custom-Stitched Blouses Fit Better Than Ready-Made"
  9. "Wedding Season Blouse Preparation: When to Start"
  10. "90s Blouse Designs Making a Comeback"
  11. "How to Take Body Measurements for Perfect Blouse Fitting"
  12. "Designer Party Wear Blouse Ideas for Every Occasion"
  13. "Churidar Stitching Guide: Fabrics, Styles, and Fits"
  14. "Gold Zardosi Work Blouses: Everything You Need to Know"
  15. "Best Blouse Tailors in [CITY]: What to Look For"
  16. "Blouse Stitching Price Guide in [CITY] (2026)"
  17. "Heavy Work Blouses for Grand Occasions"
  18. "How We Stitch 500+ Unique Designs Every Year"
  19. "Frock Designs for Girls: Casual to Grand Party Wear"
  20. "Your First Custom Blouse: What to Expect"
- [ ] Add Article schema to blog posts
- [ ] Internal link blog posts → collection pages → design details
- [ ] Add blog post CTAs: "See this design" → collection, "Book a fitting" → contact

### Sprint 37 — Page Speed & Core Web Vitals
- [ ] **LCP (Largest Contentful Paint) < 2.5s**:
  - Preload hero image with `priority` flag
  - Inline critical CSS
  - Use `next/font` for font preloading
  - Server-side render above-the-fold content
- [ ] **FID / INP (Interaction to Next Paint) < 200ms**:
  - Defer non-critical JS (analytics, animations below fold)
  - Code-split GSAP: load only when needed
  - Use `dynamic()` imports for heavy components
- [ ] **CLS (Cumulative Layout Shift) < 0.1**:
  - Set explicit width/height on all images
  - Reserve space for dynamic content (testimonials, videos)
  - No layout-shifting fonts (use `font-display: swap` with size-adjust)
- [ ] Compress all JS/CSS with Brotli
- [ ] Enable HTTP/2 push for critical assets
- [ ] Run Lighthouse CI in build pipeline: fail if Performance < 90
- [ ] Test on WebPageTest with 4G throttling from India

### Sprint 38 — SEO Monitoring & Tools Setup
- [ ] Set up Google Search Console and submit sitemap
- [ ] Set up Google Analytics 4 with enhanced measurements
- [ ] Configure Bing Webmaster Tools
- [ ] Set up rank tracking for top 50 keywords (Ahrefs/SEMrush/Ubersuggest)
- [ ] Create SEO dashboard: organic traffic, keyword rankings, top pages, Core Web Vitals
- [ ] Set up crawl monitoring: check for 404s, broken links, redirect chains
- [ ] Install and configure `next-seo` or custom SEO component for easy per-page overrides
- [ ] Create an SEO checklist for every new design/blog post added to CMS

---

## 💰 PHASE 5 — CONVERSION & POLISH (Sprints 39–45)

### Sprint 39 — WhatsApp Integration
- [ ] Build WhatsApp link generator: `https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE]`
- [ ] Pre-filled messages per context:
  - Design enquiry: "Hi! I'm interested in design [CODE] — [NAME]. Can I know more?"
  - Fitting booking: "Hi! I'd like to book a fitting appointment."
  - Wishlist share: "Hi! Here are the designs I liked: [CODE1], [CODE2], [CODE3]"
- [ ] Sticky WhatsApp button on mobile (bottom-right, always visible)
- [ ] Sticky call button on mobile (bottom-left)
- [ ] WhatsApp click tracking: GA4 event `whatsapp_click` with design code
- [ ] Call click tracking: GA4 event `call_click`
- [ ] A/B test button positions and colors

### Sprint 40 — Booking Form & Lead Capture
- [ ] Build booking form component:
  - Fields: name, phone, garment type (dropdown), preferred date, design code (optional), reference photo upload, message
  - Validation: phone format, required fields, file size limit
- [ ] Form submission pipeline:
  - → WhatsApp API (pre-filled message to shop)
  - → Email notification (via Resend or SendGrid)
  - → Google Sheet (via Google Sheets API or Zapier)
- [ ] Success state: confetti/checkmark animation + "We'll reply within 2 hours" message
- [ ] Auto-reply: send WhatsApp confirmation to client
- [ ] Form tracking: GA4 event `form_submit` with garment type
- [ ] Anti-spam: honeypot field + rate limiting

### Sprint 41 — Wishlist / Heart Feature
- [ ] Heart icon on every design card and lightbox
- [ ] Save to localStorage (no login required)
- [ ] Wishlist page/panel showing saved designs
- [ ] "Share my wishlist on WhatsApp" button → sends all design codes in one message
- [ ] Heart count animation (fill + scale bounce)
- [ ] Persist across sessions (localStorage)
- [ ] Tracking: GA4 event `wishlist_add`, `wishlist_share`

### Sprint 42 — Collections Page (Full Gallery)
- [ ] Full edge-to-edge staggered image wall with ALL designs
- [ ] Filter via "+" panel: category filters with animated transitions
- [ ] Filtering animation: images fade/slide out, new ones fade/slide in (GSAP Flip)
- [ ] Infinite scroll or "Load More" button (paginated API calls)
- [ ] Search by design code or keyword
- [ ] URL updates with filters: `/collections?category=bridal-blouses&sort=new`
- [ ] Each category has its own URL: `/collections/bridal-blouses`
- [ ] Sort: New First, Trending, All
- [ ] Show design count: "Showing 48 of 500+ designs"
- [ ] Skeleton loading states for new batches

### Sprint 43 — About Page
- [ ] Shop story section with founder/tailor portrait
- [ ] Workshop behind-the-scenes video (lazy-loaded)
- [ ] Values section: craftsmanship, precision, personal touch
- [ ] Team section with photos
- [ ] Milestones timeline (year founded, 100th client, 500 designs, etc.)
- [ ] Staggered image wall as a visual strip (reuse `<ImageWall>` component)
- [ ] CTA: "Book a Fitting" + "View Our Designs"
- [ ] SEO: About page targets "[SHOP NAME] tailor [CITY]"

### Sprint 44 — Contact Page
- [ ] Full booking/enquiry form (same as Sprint 40 but full-page layout)
- [ ] Click-to-call button with phone number
- [ ] WhatsApp button
- [ ] Embedded Google Maps (lazy-loaded iframe)
- [ ] Opening hours display
- [ ] "We reply within 2 hours" promise badge
- [ ] Address with directions link
- [ ] Instagram feed embed or link

### Sprint 45 — Design Detail Page
- [ ] Large hero image with gallery (thumbnails or swipe)
- [ ] Design code prominently displayed
- [ ] Category breadcrumb
- [ ] Description and fabric/work options
- [ ] "Enquire on WhatsApp" button (pre-filled with design code)
- [ ] "Book a Fitting" button
- [ ] Heart/wishlist toggle
- [ ] "You may also like" row (same category, 4–6 designs)
- [ ] Share buttons: WhatsApp, copy link
- [ ] SEO: Product schema, unique title/description, optimized image

---

## 🚀 PHASE 6 — LAUNCH & GROWTH (Sprints 46–50)

### Sprint 46 — Analytics & Conversion Tracking
- [ ] **GA4 Setup**:
  - Page views, scroll depth, time on page
  - Events: `whatsapp_click`, `call_click`, `form_submit`, `design_enquiry`, `wishlist_add`, `wishlist_share`, `lightbox_open`, `video_play`
  - Conversions: mark WhatsApp click, call click, form submit as conversions
  - Custom dimensions: design code, category, source page
- [ ] **Meta Pixel**:
  - PageView, ViewContent (design detail), Contact (form submit), Lead (WhatsApp click)
  - Custom audiences: visitors who viewed bridal designs, visitors who used wishlist
- [ ] UTM tracking guide for Instagram bio link, WhatsApp status, Google Ads
- [ ] Create conversion funnel visualization in GA4

### Sprint 47 — Accessibility Audit
- [ ] Run axe-core automated audit on all pages
- [ ] Manual keyboard navigation test: Tab through all interactive elements
- [ ] Screen reader testing (VoiceOver on Mac/iOS, TalkBack on Android)
- [ ] Color contrast audit: all text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Focus styles: visible focus ring on all interactive elements
- [ ] Alt text audit: every image has descriptive, unique alt text
- [ ] ARIA labels on: nav, buttons, lightbox, carousel, accordion
- [ ] `prefers-reduced-motion`: verify all animations are disabled/simplified
- [ ] `prefers-color-scheme`: consider dark mode support (optional)
- [ ] Target: Lighthouse Accessibility 95+

### Sprint 48 — Cross-Browser & Device Testing
- [ ] Test on browsers: Chrome, Safari, Firefox, Edge, Samsung Internet
- [ ] Test on devices: iPhone 13/14/15, iPad, Pixel, Samsung Galaxy, OnePlus
- [ ] Test on OS: iOS Safari, Android Chrome, Android WebView (Instagram in-app browser!)
- [ ] Verify: animations, smooth scroll, lightbox, form submission, WhatsApp links
- [ ] Fix Safari-specific issues: `position: sticky`, `overflow`, smooth scroll, `dvh`
- [ ] Fix iOS-specific: 100vh issue (use `dvh`), momentum scroll, input zoom
- [ ] Test Instagram in-app browser (common traffic source)
- [ ] Performance testing on low-end Android (< $150 phone)

### Sprint 49 — Pre-Launch & Deployment
- [ ] Final content review: replace all placeholders with real content
- [ ] Real images uploaded to CMS with proper titles, codes, categories
- [ ] Real shop info: name, address, phone, hours, map link
- [ ] Real testimonials uploaded
- [ ] Real videos uploaded
- [ ] Domain setup: purchase and configure domain
- [ ] SSL certificate (automatic with Vercel)
- [ ] Deploy to Vercel production
- [ ] Configure custom domain in Vercel
- [ ] Set up Vercel Analytics for Web Vitals monitoring
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request Google indexing for all key pages
- [ ] Final Lighthouse audit: Performance 90+, Accessibility 95+, SEO 100
- [ ] Create launch checklist and sign-off

### Sprint 50 — Post-Launch Growth & Maintenance Plan
- [ ] **Week 1**: Monitor Search Console for crawl errors, fix immediately
- [ ] **Week 2**: Publish first 5 blog posts (from Sprint 36 content plan)
- [ ] **Week 3–4**: Submit to local directories (Justdial, Sulekha, etc.)
- [ ] **Monthly**:
  - Publish 4 blog posts (1/week)
  - Add new designs to CMS
  - Update Google Business Profile with new photos
  - Review and respond to Google reviews
  - Check Core Web Vitals in Search Console
  - Review keyword rankings and adjust content
- [ ] **Quarterly**:
  - A/B test CTAs (button text, colors, positions)
  - Refresh OG images for social sharing
  - Audit broken links and fix 404s
  - Review and update FAQ content
  - Performance audit and optimization
- [ ] **Seasonal campaigns**:
  - Wedding season (Oct–Feb): bridal blouse push
  - Festival season: grand blouse + frock campaigns
  - Summer: kurti + daily wear content
- [ ] Create a "Design Upload SOP" document for ongoing use
- [ ] Create a "Monthly SEO Checklist" document
- [ ] Set up uptime monitoring (Vercel built-in or UptimeRobot)

---

## 📊 Sprint Timeline Summary

| Phase | Sprints | Duration (est.) | Milestone |
|-------|---------|----------------|-----------|
| Foundation | 1–8 | ~2 weeks | Project scaffold, CMS, image pipeline ready |
| Core Pages | 9–18 | ~3 weeks | All home sections + page shells complete |
| Animation | 19–28 | ~2.5 weeks | Award-level animations, 60fps verified |
| SEO Engine | 29–38 | ~2.5 weeks | Full SEO stack, schema, blog foundation |
| Conversion | 39–45 | ~2 weeks | WhatsApp, forms, wishlist, all pages polished |
| Launch | 46–50 | ~1.5 weeks | Analytics, testing, deploy, growth plan |
| **Total** | **50** | **~13.5 weeks** | **🏆 Production-ready award-level website** |

---

## 📋 Information Needed Before Sprint 1

| # | Item | Example |
|---|------|---------|
| 1 | Shop Name | "SreeStar Tailoring" |
| 2 | City | "Chennai" |
| 3 | Phone / WhatsApp number | +91 98765 43210 |
| 4 | Instagram handle | @sreestar_tailoring |
| 5 | Full address | "123 Main Road, T Nagar, Chennai 600017" |
| 6 | Google Maps link | https://maps.google.com/... |
| 7 | Logo file (or should I create a wordmark?) | logo.png or "create one" |
| 8 | Opening hours | "Mon–Sat 10AM–8PM, Sun Closed" |
| 9 | Years in business | "12 years" |
| 10 | Approximate happy client count | "2000+" |
| 11 | Starting price range | "Blouses from ₹500" |
| 12 | Any real design photos ready? | Yes / Not yet |

---

> **Recommended approach**: Start building Phases 1–3 with placeholder content while gathering real photos and business details. Real content can be swapped in at Sprint 49 without touching any code — that's the power of the CMS-driven architecture.
