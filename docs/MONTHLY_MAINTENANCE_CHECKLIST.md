# 🛠️ SreeStar Designer Tailoring — Monthly Maintenance & SEO Checklist
**Sprint 50 — Operational Cadence & Search Engine Health Runbook**

This operational schedule ensures SreeStar sustains #1 local rankings for custom women's tailoring in Chennai and keeps technical performance at award-winning velocity.

---

## 1. 📅 Weekly Maintenance Routine (Every Monday)

- [ ] **Google Search Console (GSC) Health**:
  - Check Coverage report for 404 crawl errors or blocked resources.
  - Review Search Performance: impressions, clicks, and top queries (e.g., *"bridal blouse tailor chennai"*).
- [ ] **WhatsApp & Lead Flow Audit**:
  - Test website WhatsApp button and appointment booking form to ensure immediate message delivery.
  - Check notification email delivery in `contact@sreestar.com`.
- [ ] **Design Showcase Refresh**:
  - Upload 2–3 newly finished customer garments to keep the homepage visual wall fresh.

---

## 2. 📆 Monthly SEO & Growth Checklist (First Week of Each Month)

- [ ] **Publish 4 Editorial Blog Articles** (1 per week from `data/blog-posts.json`):
  - Focus on upcoming wedding trends, festive styles, fabric pairing, and blouse measurement tips.
- [ ] **Google Business Profile (GBP) Maintenance**:
  - Upload 10 new high-resolution boutique photos to Google Maps.
  - Post 2 GBP updates (promotions, holiday hours, seasonal bridal booking reminders).
  - Review and respond warmly to all new client reviews within 48 hours.
- [ ] **Core Web Vitals Audit**:
  - Check GSC Core Web Vitals report: verify LCP < 2.5s, INP < 200ms, CLS < 0.1 across 75th percentile of mobile visits.
- [ ] **Wishlist & Search Term Analysis**:
  - Review Google Analytics custom dimension events: discover which design codes are receiving the most hearts and WhatsApp shares.

---

## 3. 🗓️ Quarterly Technical Optimization (Every 3 Months)

- [ ] **A/B Testing Conversion Optimization**:
  - Test subtle adjustments on sticky mobile action buttons (e.g., *"Chat on WhatsApp"* vs *"Enquire on WhatsApp"*).
- [ ] **Broken Link & Redirect Audit**:
  - Run link spider across all internal URLs, categories, and locality landing pages.
- [ ] **Dependency & Security Upgrades**:
  - Run `npm audit` and update Next.js, React, and Sanity CMS packages.
- [ ] **FAQ & Schema Refresh**:
  - Add newly asked client questions to `components/home/TestimonialsAndFAQ.tsx` and `getFAQPageSchema()`.

---

## 4. 🪔 Seasonal Campaign Calendar

| Season | Months | Focus Campaign | Hero Garment Types |
|--------|--------|----------------|-------------------|
| **Bridal Muhurtham Season** | Oct – Feb | Grand Bridal Blouses & Zardozi Sets | Maggam Work Blouses, Pure Silk Cutwork, Bridal 3-Dart |
| **Summer & Casual Wear** | Mar – Jun | Breathable Cotton Kurtis & Casual Salwars | Daily Wear Kurtis, Churidars, Linen & Mulmul Silhouettes |
| **Aadi & Festive Season** | Jul – Sep | Festival Frocks & Grand Temple Blouses | Traditional Kanchipuram Blouses, Anarkali & Long Frocks |
| **Deepavali & Wedding Gala** | Sep – Nov | High-Glamour Necklines & 90s Vintage | Retro Puff Sleeve Blouses, Banarasi Crop Tops, 90s Vintage |

---

## 5. 🛡️ Uptime Monitoring & Emergency Protocol

- **Uptime Monitoring**: Integrated with Vercel Health Monitoring & UptimeRobot (pinging `https://sreestar.com/api/leads` every 5 minutes).
- **Incident Escalation**:
  - High Latency / 5xx error alert -> Check Vercel Deployment status dashboard -> Roll back to previous production deployment with 1-click in Vercel console.
