# 📊 SreeStar Designer Tailoring — Analytics & Conversion Tracking Playbook
**Sprint 46 — Production GA4 & Meta Pixel Measurement Architecture**

This playbook defines the full measurement framework for SreeStar Tailoring, tracking high-intent client touchpoints from first discovery to booked consultation and WhatsApp enquiry.

---

## 1. 🎯 Google Analytics 4 (GA4) Architecture

- **Measurement ID**: Configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (e.g., `G-SREESTAR01`)
- **Engine**: Next.js App Router client integration in `components/seo/GoogleAnalytics.tsx` and `lib/analytics.ts`.

### A. Core Event Taxonomy

| Event Name | Trigger Condition | Parameters | Conversion in GA4? |
|------------|-------------------|------------|-------------------|
| `whatsapp_click` | Client clicks any WhatsApp button (sticky bar, detail page, modal) | `source_page`, `design_code`, `timestamp` | **Yes (Key Event)** |
| `call_click` | Client clicks "Call Atelier" or telephone link | `source_page`, `timestamp` | **Yes (Key Event)** |
| `form_submit` | Client submits appointment booking form | `category`, `design_code`, `value`, `currency` | **Yes (Key Event)** |
| `design_enquiry` | Client clicks "Enquire About Design" on detail or lightbox | `design_code`, `category`, `source_page` | **Yes (Micro-conversion)** |
| `wishlist_add` | Client saves a design to their local wishlist | `design_code`, `category` | **Yes (Engagement)** |
| `wishlist_share` | Client shares curated wishlist to WhatsApp | `design_codes`, `count` | **Yes (High Intent)** |
| `lightbox_open` | Client expands high-res garment visual in lightbox | `design_code`, `category` | No |
| `video_play` | Client watches artisanal workshop video | `video_title`, `timestamp` | No |
| `scroll_depth` | Client scrolls 25%, 50%, 75%, or 90% of page height | `percent`, `source_page` | No |

### B. GA4 Custom Dimensions Setup (Admin -> Custom Definitions)

1. **`design_code`**: Scope: *Event*. Parameter: `design_code`. Description: "Bespoke Garment SKU (e.g. SS-BL-001)".
2. **`category`**: Scope: *Event*. Parameter: `category`. Description: "Garment Classification (Bridal Blouse, Kurti, Frock)".
3. **`source_page`**: Scope: *Event*. Parameter: `source_page`. Description: "Origin page path of the conversion action".
4. **`fabric_preference`**: Scope: *Event*. Parameter: `fabric_preference`. Description: "Silk, Raw Silk, Banarasi, Velvet, Cotton".

### C. GA4 Funnel Exploration Visualization

In **GA4 > Explore > Funnel Exploration**:
1. **Step 1: Discovery** — `page_view` on `/` or `/collections`
2. **Step 2: Garment Inspection** — `page_view` on `/collections/[categorySlug]/[slug]` OR `lightbox_open`
3. **Step 3: Curation** — `wishlist_add` OR `category_filter_click`
4. **Step 4: Intent Signal** — `booking_modal_open` OR `scroll_depth` >= 75%
5. **Step 5: Final Conversion** — `whatsapp_click` OR `form_submit` OR `call_click`

---

## 2. 📱 Meta Pixel (Facebook & Instagram Ads)

- **Pixel ID**: Configured via `NEXT_PUBLIC_META_PIXEL_ID`
- **Component**: `components/analytics/MetaPixel.tsx`

### Standard Event Mapping:
- **`PageView`**: Automatic on every page route change.
- **`ViewContent`**: Fired on `DesignDetailPage` with `content_ids: [design.designCode]` and `content_category`.
- **`AddToWishlist`**: Fired when heart button toggles to saved.
- **`Contact`**: Fired when phone call button is clicked.
- **`Lead`**: Fired on WhatsApp enquiry or booking form submission (`value: 1500 INR`).

### Meta Custom Audiences:
1. **Bridal High-Intent**: Visitors who viewed `/collections/bridal-blouses/*` in the last 30 days.
2. **Wishlist Curators**: Visitors who triggered `AddToWishlist` or `WishlistShare`.
3. **Engaged Lookbook Browsers**: Visitors with scroll depth >= 75% who spent > 2 minutes on `/collections`.

---

## 3. 🏷️ UTM Campaign Tracking Protocol

To ensure 100% accurate channel attribution, use these standardized UTM templates:

### A. Instagram Bio Link
```
https://sreestar.com/?utm_source=instagram&utm_medium=bio_link&utm_campaign=permanent_bio
```

### B. Instagram Stories / Reels (Bridal Blouse Showcase)
```
https://sreestar.com/collections/bridal-blouses?utm_source=instagram&utm_medium=story&utm_campaign=bridal_season_2026&utm_content=zardozi_back_reel
```

### C. WhatsApp Business Status / Broadcast
```
https://sreestar.com/collections?utm_source=whatsapp&utm_medium=status_broadcast&utm_campaign=diwali_collection
```

### D. Google Local Ads (T. Nagar / Chennai)
```
https://sreestar.com/contact?utm_source=google&utm_medium=cpc&utm_campaign=chennai_custom_blouse_tailor&utm_term=bridal+blouse+tailor+chennai
```

The script in `lib/analytics.ts` (`captureUtmParameters()`) automatically reads these query parameters upon landing and persists them across the user's session for form submissions and conversion payloads.
