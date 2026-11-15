# 📋 Client Content Replacement Checklist

> Use this checklist to replace all placeholder assets with your genuine studio photography, pricing, and business credentials before public launch (Sprint 49).

---

## 📸 1. Photography & Visual Assets

| Target | Required Specs | Status | Current Placeholder Location |
| :--- | :--- | :---: | :--- |
| **Hero Overlap Blouses** | 4 vertical portrait photos (~1200×1600px, WebP or JPG) | ⏳ Ready to replace | `components/ui/GiantWordmark.tsx` |
| **Bridal & Grand Spotlight** | 5 high-resolution bridal maggam blouses with close-up embroidery | ⏳ Ready to replace | `data/catalog-500-designs.json` |
| **Curated Image Wall** | 30 to 50 portrait garment photos across all 10 categories | ⏳ Ready to replace | `public/placeholders/placeholder-d-*.svg` |
| **Vertical Video Reels** | 5 vertical 9:16 short clips (MP4, 10–15s each, muted) | ⏳ Ready to replace | `public/placeholders/video-poster-*.svg` |
| **Founder / Tailor Portrait** | 1 authentic workshop photo of the master fitter or craftsman | ⏳ Ready to replace | About page placeholder |

---

## 🏢 2. Business & Studio Metadata

Update these fields in [`.env.local`](file:///Users/subarshan/SreeStar/.env.example) or [siteSettings](file:///Users/subarshan/SreeStar/sanity/schemaTypes/siteSettings.ts):

- [ ] **WhatsApp Business Number**: Replace placeholder number with real business WhatsApp (e.g. `919876543210`).
- [ ] **Physical Address**: Exact studio location in Chennai (or chosen city) for Google Maps link.
- [ ] **Google Maps Direct URL**: Link for client directions.
- [ ] **Instagram Handle**: E.g. `@sreestar_tailoring`.
- [ ] **Opening Hours**: E.g. `Mon–Sat: 10:00 AM – 8:30 PM`.
- [ ] **Years of Heritage**: E.g. `14+ years`.
- [ ] **Total Happy Clients Count**: E.g. `2,500+`.

---

## 💰 3. Pricing & Policy Rules

Update in [FAQ Section](file:///Users/subarshan/SreeStar/lib/api.ts):

- [ ] Starting price for simple daily blouse stitching (currently set to `₹550`).
- [ ] Starting price for designer cuts (currently set to `₹950`).
- [ ] Bridal maggam handwork price range (currently set to `₹2,500 – ₹15,000+`).
- [ ] Express / Rush order turnaround window (currently set to `48-Hour Rush`).
- [ ] Home measurement criteria (currently set to `Orders with 3+ blouses`).

---

## 🌟 4. Testimonials & Google Reviews

- [ ] Supply 5 authentic client quotes with occasion names (e.g., *Muhurtham Bridal Blouse*, *Reception Velvet Blouse*).
- [ ] Supply Google Review link to embed directly in the testimonial slider.
