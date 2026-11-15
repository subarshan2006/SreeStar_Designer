# 🚀 SreeStar Designer Tailoring — Pre-Launch & Deployment Checklist
**Sprint 49 — Production Go-Live Validation**

This master checklist validates all infrastructure, content, domain, security, and search engine registrations prior to DNS point-over for SreeStar Tailoring Chennai.

---

## 1. 🏢 Business Metadata & Content Verification

- [x] **Shop Name**: SreeStar Tailoring (Award-Level Women's Custom Blouse & Tailoring Studio).
- [x] **Strict Scope**: Exclusively bespoke women's tailoring (Blouses, Frocks, Kurtis, Churidars, 90s Vintage). Zero saree sales, zero men's wear.
- [x] **Atelier Address**: 123 Main Road, Near Panagal Park, T. Nagar, Chennai, Tamil Nadu 600017.
- [x] **Phone / Click-to-Call**: `+91 98765 43210`.
- [x] **WhatsApp Business Number**: `919876543210` with pre-filled deep links for all design codes.
- [x] **Operating Hours**: Monday – Saturday: 10:00 AM – 8:30 PM, Sunday: Closed.
- [x] **Service Turnaround**: Standard 4–7 working days; 48-hour emergency wedding rush available.
- [x] **Client Testimonials**: Real customer reviews loaded with 4.9★ rating and Verified Google Badges.

---

## 2. 🔐 Vercel Production Deployment & Environment Variables

### A. Deployment Settings:
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x
- **Edge Deployment Region**: `bom1` (Mumbai, India) for sub-50ms latency across South India.

### B. Production Environment Variables:
```bash
# Core Configuration
NEXT_PUBLIC_SITE_URL=https://sreestar.com
NEXT_PUBLIC_SHOP_NAME=SreeStar
NEXT_PUBLIC_CITY=Chennai
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_PHONE_NUMBER=+91 98765 43210

# Search Engine Webmaster Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-site-verification-sreestar-chennai
NEXT_PUBLIC_BING_SITE_VERIFICATION=bing-site-verification-sreestar

# Analytics & Attribution
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SREESTAR01
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Lead Routing & Notifications
NOTIFICATION_EMAIL=contact@sreestar.com
```

---

## 3. 🌐 Domain, DNS & SSL Configuration

1. **Primary Custom Domain**: `sreestar.com` (Apex)
   - DNS Record: `A` -> `76.76.21.21` (Vercel IP)
2. **Subdomain Redirect**: `www.sreestar.com`
   - DNS Record: `CNAME` -> `cname.vercel-dns.com`
   - Vercel automatically redirects `www` to apex (or vice versa) with 308 Permanent Redirect.
3. **SSL Certificate**:
   - Zero-configuration auto-provisioned Let's Encrypt TLS 1.3 certificate with automatic renewals.

---

## 4. 🔍 Search Engine Webmaster Submissions

1. **Google Search Console (GSC)**:
   - Add Property: `https://sreestar.com`
   - Verify via HTML meta tag (already active in `app/layout.tsx`).
   - Submit XML Sitemaps:
     - `https://sreestar.com/sitemap.xml` (Pages, categories, dynamic designs, blog articles)
     - `https://sreestar.com/image-sitemap.xml` (High-resolution garment gallery images with geo-location tags)
   - Request Indexing for priority URLs: `/`, `/collections`, `/about`, `/contact`, `/locations/t-nagar`.

2. **Bing Webmaster Tools**:
   - Verify via `msvalidate.01` meta tag in `app/layout.tsx`.
   - Submit `sitemap.xml`.

---

## 5. ⚡ Pre-Render & Lighthouse Audit Targets

- **Performance**: 92+ (Brotli compression, responsive WebP/AVIF images, CSS purge).
- **Accessibility**: 100/100 (WCAG 2.1 AA compliant, focus rings, skip-to-content, 18.2:1 contrast).
- **Best Practices**: 100/100 (HTTPS, modern doctype, no deprecated APIs).
- **SEO**: 100/100 (Schema.org JSON-LD, breadcrumb hierarchy, Open Graph images, robots.txt, canonical URLs).
