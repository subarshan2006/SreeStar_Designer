# 🧵 SreeStar Designer Tailoring — Design Upload Standard Operating Procedure (SOP)
**Sprint 50 — Boutique Atelier Content Management Manual**

This document provides step-by-step instructions for the SreeStar boutique staff and content managers to photograph, format, code, and publish new custom women's tailoring creations.

---

## 1. 🏷️ Atelier Design Code Naming System

Every garment created in the atelier must receive a standardized design code before being photographed and cataloged. This ensures clients can reference exact designs via WhatsApp:

| Category | Code Prefix | Example | Format |
|----------|-------------|---------|--------|
| **Bridal Blouses** | `SS-BL-` | `SS-BL-049` | `SS-BL-XXX` (3 digits) |
| **Aari / Maggam Work Blouses** | `SS-AA-` | `SS-AA-012` | `SS-AA-XXX` (3 digits) |
| **Grand / Party Frocks** | `SS-FR-` | `SS-FR-022` | `SS-FR-XXX` (3 digits) |
| **Designer Kurtis** | `SS-KT-` | `SS-KT-015` | `SS-KT-XXX` (3 digits) |
| **Churidars & Salwars** | `SS-CH-` | `SS-CH-018` | `SS-CH-XXX` (3 digits) |
| **90s Retro Collection** | `SS-90-` | `SS-90-008` | `SS-90-XXX` (3 digits) |

> [!IMPORTANT]
> **Strict Policy**: Never delete or re-assign an existing design code. If a design is retired or archived, mark it as `archived` in the CMS so existing links from WhatsApp chats or Pinterest do not break.

---

## 2. 📸 Photography & Visual Guidelines

To preserve SreeStar's luxury visual identity:
1. **Aspect Ratio**: Always capture or crop portrait photos in **3:4 aspect ratio** (e.g., 1200px × 1600px).
2. **Lighting**: Soft, warm daylight or professional studio softbox. Avoid direct smartphone flash reflections on metallic zari or stones.
3. **Multi-Angle Capture Requirement**:
   - Photo 1: **Full Silhouette View** (Draped on mannequin or live model).
   - Photo 2: **Front Neckline Detail** (Showcasing cut, piping, and front hooks).
   - Photo 3: **Embroidery Macro** (Close-up of zari, cut-beads, pearls, or French knots).
   - Photo 4: **Back Styling & Latkan** (Deep neckline, dori ties, handcrafted tassels).
4. **File Format & Compression**:
   - Save photos as `.webp` or high-quality `.jpg`.
   - Max file size: < 350 KB per image (handled automatically by Next.js image optimization).

---

## 3. ✍️ SEO Title & Description Formula

When entering new garments into `data/designs.json` or the Sanity Studio dashboard:

- **Title Formula**: `[Garment Type] with [Workmanship/Pattern] — [Fabric Name]`
  - *Example*: *"Bridal Blouse with Handcrafted Lotus Maggam Work — Pure Raw Silk"*
- **Work Type**: Select from:
  - `Aari Hand Embroidery`, `Zardozi Needlework`, `Cutwork Border`, `Princess Cut Tailoring`, `Katori Fit`, `Vintage Puff Sleeve`.
- **Fabric Options**: List 2–4 compatible client fabrics:
  - *Example*: `["Pure Raw Silk", "Banarasi Brocade", "Kanchipuram Silk", "Velvet"]`.
- **SEO Alt Text**:
  - Automatically generated: `"[Title] - [Code] custom hand-tailored [Category] in Chennai with [Workmanship] at SreeStar Tailoring"`.

---

## 4. 🚀 Verification Checklist Before Publishing

- [ ] Design code matches physical boutique garment tag.
- [ ] Category pill correctly assigned.
- [ ] Fabric recommendations and estimated stitching hours listed.
- [ ] 3:4 aspect ratio image rendered without distortion.
- [ ] Tested WhatsApp enquiry button with phone: verifies code is injected in chat.
