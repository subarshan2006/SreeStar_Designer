# 📈 SreeStar Tailoring — Search Console, Analytics & Rank Tracking Playbook

This document defines the SEO instrumentation, webmaster console verification, conversion analytics, and keyword rank tracking architecture for **SreeStar Tailoring**.

---

## 1. Webmaster Console Verifications

The root layout in [app/layout.tsx](file:///Users/subarshan/SreeStar/app/layout.tsx) automatically emits search engine ownership verification tokens:

- **Google Search Console**:
  - Verification Tag: `<meta name="google-site-verification" content="..." />`
  - Configurable via `.env.local`: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- **Bing Webmaster Tools**:
  - Verification Tag: `<meta name="msvalidate.01" content="..." />`
  - Configurable via `.env.local`: `NEXT_PUBLIC_BING_SITE_VERIFICATION`

### Sitemaps to Submit:
1. `https://sreestar.com/sitemap.xml` (Primary architectural sitemap)
2. `https://sreestar.com/image-sitemap.xml` (Google Image Sitemap for 500+ designs)

---

## 2. Google Analytics 4 (GA4) Conversion Tracking

Implemented via [components/seo/GoogleAnalytics.tsx](file:///Users/subarshan/SreeStar/components/seo/GoogleAnalytics.tsx) using measurement ID `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

### Custom High-Value Conversion Events:
| Event Name | Trigger Condition | Parameters Tracked |
|---|---|---|
| `whatsapp_click` | Client clicks any WhatsApp CTA | `designCode`, `pageLocation`, `buttonId` |
| `fitting_booked` | Client submits appointment reservation form | `garmentType`, `preferredDate`, `locality` |
| `design_enquiry` | Lightbox "Enquire on WhatsApp" clicked | `designCode`, `categoryName` |
| `collection_view` | Category archive page viewed | `categorySlug`, `itemCount` |
| `search_query` | User searches via design search bar | `searchTerm`, `resultCount` |

---

## 3. Top 50 Target Keywords Matrix (Chennai & Tamil Nadu)

| Keyword Query | Target URL | Intent | Target Rank |
|---|---|---|---|
| `bridal blouse stitching chennai` | `/collections/bridal-blouses` | Transactional | Top 3 |
| `maggam work blouse chennai` | `/collections/bridal-blouses` | Commercial | Top 3 |
| `custom tailoring women chennai` | `/` | Commercial | Top 3 |
| `best tailor in t nagar for blouses` | `/locations/t-nagar` | Local | Top 1 |
| `wedding blouse stitching chennai` | `/collections/bridal-blouses` | Transactional | Top 3 |
| `grand blouse designs chennai` | `/collections/grand-blouses` | Commercial | Top 3 |
| `designer blouse tailor t nagar` | `/locations/t-nagar` | Local | Top 1 |
| `custom frock stitching chennai` | `/collections/frocks` | Transactional | Top 3 |
| `birthday frock tailor chennai` | `/collections/frocks` | Commercial | Top 3 |
| `kurti stitching chennai` | `/collections/kurtis` | Transactional | Top 3 |
| `custom churidar tailor chennai` | `/collections/churidars` | Transactional | Top 3 |
| `90s retro blouse designs chennai` | `/collections/90s-collection` | Informational | Top 1 |
| `vintage puff sleeve blouse stitching` | `/collections/90s-collection` | Commercial | Top 1 |
| `blouse stitching price chennai` | `/blog/blouse-stitching-price-guide-chennai-2026` | Informational | Top 1 |
| `maggam work vs aari work` | `/blog/maggam-work-vs-aari-work-difference` | Informational | Top 3 |
| `back neck designs for silk saree` | `/blog/10-trending-back-neck-blouse-designs` | Informational | Top 5 |
| `doorstep tailor chennai` | `/contact` | Transactional | Top 1 |
| `women tailor anna nagar` | `/locations/anna-nagar` | Local | Top 3 |
| `bridal blouse mylapore` | `/locations/mylapore` | Local | Top 3 |
| `tailor shop adyar` | `/locations/adyar` | Local | Top 3 |
| `blouse stitching velachery` | `/locations/velachery` | Local | Top 3 |
| `designer tailor nungambakkam` | `/locations/nungambakkam` | Local | Top 3 |
| `48 hour rush blouse stitching` | `/contact` | Urgent Local | Top 1 |
| `peacock zardosi blouse design` | `/collections/bridal-blouses` | Visual Search | Top 3 |
| `kundan work bridal blouse` | `/collections/bridal-blouses` | Commercial | Top 3 |
| `princess cut blouse stitching` | `/collections/designer-blouses` | Commercial | Top 3 |
| `boat neck blouse tailor chennai` | `/collections/designer-blouses` | Commercial | Top 3 |
| `velvet party blouse stitching` | `/collections/designer-blouses` | Commercial | Top 3 |
| `can can party frock tailor` | `/collections/frocks` | Commercial | Top 3 |
| `mother daughter matching frock chennai` | `/blog/grand-frock-designs-daughter-birthday-party` | Commercial | Top 1 |

---

## 4. Pre-Publish CMS Checklist for New Content

Before publishing any new design or article in the Sanity CMS:
- [ ] **Design Code Verified**: Unique uppercase code assigned (e.g. `D-0501`).
- [ ] **Title & Excerpt Length**: Title between 50–60 characters, excerpt between 150–160 characters.
- [ ] **Descriptive Image File**: Uploaded image follows `slugified-garment-title-code.webp` convention.
- [ ] **Alt Text Present**: Keyword-dense alt text including atelier name and city.
- [ ] **Category Assigned**: At least one primary category assigned.
- [ ] **Internal Links Added**: Blog posts contain at least 2 links to collection design codes.
- [ ] **Sitemap Auto-Update**: Trigger automated sitemap refresh.
