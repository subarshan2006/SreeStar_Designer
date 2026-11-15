# 🧵 SreeStar Tailoring — Award-Level Women's Tailoring Website

An award-level creative website for **SreeStar**, a specialized women's custom tailoring and blouse studio based in Chennai.

> **Business Scope**: Custom stitching and tailoring for **WOMEN ONLY**. 500+ designs covering Bridal Maggam Blouses, Grand Heavy-Work Blouses, Designer/Party Blouses, Frocks, Kurtis, Churidars, and a 90s Vintage Collection. Zero men's wear. Zero saree sales.

---

## 🎨 Design Reference & Visual Language

- **Canvas**: Clean ivory/white canvas (`#FAF9F5`), devoid of clutter and boxed borders. High-resolution garment photography supplies all color.
- **Typography**: Deep Obsidian Charcoal (`#141413`) text for editorial precision. Bold architectural Display font (`Cinzel`), elegant serif (`Playfair Display`), modern sans-serif (`Plus Jakarta Sans`), and monospace design-code badges (`JetBrains Mono`).
- **Accents**: Royal Deep Maroon (`#721B29`) reserved strictly for CTAs and booking actions; Antique Zardosi Gold (`#C5A059`) for luxury highlights.
- **Hero & Wordmark**: Enormous bold wordmark of `SREESTAR` spanning edge-to-edge across the screen with an overlapping foreground zone where garment cards float in front of the text (`z-10` over `z-0`).
- **Fixed Nav**: Plain text with `+` icons using `mix-blend-mode: difference` for effortless contrast over all photo tones.

---

## 🚀 Sprints 1, 2, 3 Implementation Summary

### Sprint 1: Project Scaffolding & Architecture
- [x] Initialized Next.js 15 App Router architecture with React 19 and TypeScript.
- [x] Configured Tailwind CSS with custom theme design tokens.
- [x] Established scalable directory layout: `app/`, `components/`, `lib/`, `public/`.
- [x] Created `.env.example` with CMS (Sanity v3), analytics (GA4 & Meta Pixel), and webhook configurations.
- [x] Configured Git version control and repository standards.

### Sprint 2: Design System & Typography
- [x] Defined luxury color palette: Ivory Canvas, Charcoal typography, Royal Maroon CTA, and Antique Gold accents.
- [x] Loaded luxury font stack: Cinzel Display, Playfair Display Serif, Plus Jakarta Sans, JetBrains Mono.
- [x] Built base typography components in `components/ui/typography.tsx`:
  - `<Heading>` (levels 1–6, serif, display, and sans variants)
  - `<Body>` (sizes lg, base, sm, xs with tonal control)
  - `<Caption>` (uppercase monospace tracking)
  - `<Label>` (tonal badges for categories and collections)
  - `<DesignCodeBadge>` (e.g. `D-0123` with live status indicator)
- [x] Built `<Button>` in `components/ui/Button.tsx` (Primary Maroon, Gold Luxury, Outline, Ghost, Difference Blend).
- [x] Built interactive Living Styleguide page at `/styleguide`.
- [x] Documented responsive breakpoint matrix (Mobile 375px to Ultrawide 1920px+).

### Sprint 3: Giant Wordmark Component
- [x] Engineered `<GiantWordmark>` component in `components/ui/GiantWordmark.tsx`.
- [x] Edge-to-edge scaling using `clamp()` and `vw` units preventing horizontal layout shift.
- [x] Multi-variant support:
  - `hero`: Giant header with tagline and layered garment card overlap zone (`z-10` over `z-0`).
  - `footer`: Full viewport-width bottom architectural wordmark with studio metadata.
  - `watermark`: Subtle, non-intrusive backdrop luxury mark.
  - `inline`: Scalable brand title.
- [x] Fully accessible with `aria-label` and screen-reader hierarchy.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18.17 (v24.x recommended)
- npm >= 9.x

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/SreeStar.git
cd SreeStar

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the main experience or [http://localhost:3000/styleguide](http://localhost:3000/styleguide) to inspect the design system.

---

## 📂 Project Structure

```
SreeStar/
├── app/
│   ├── globals.css          # Design tokens, typography variables, blend modes
│   ├── layout.tsx           # Google Fonts loader, viewport, SEO metadata
│   ├── page.tsx             # Homepage with Hero wordmark & Sprints status
│   └── styleguide/
│       └── page.tsx         # Interactive living styleguide & wordmark switcher
├── components/
│   └── ui/
│       ├── Button.tsx       # Primary Maroon, Gold, Outline & Blend buttons
│       ├── GiantWordmark.tsx# Hero, Footer, Watermark edge-to-edge component
│       └── typography.tsx   # Heading, Body, Caption, Label, DesignCodeBadge
├── lib/
│   ├── constants.ts         # Shop data, categories, studio info & stats
│   └── utils.ts             # Tailwind class merger (clsx + twMerge)
├── planner.md               # Complete 50-Sprint roadmap
├── tailwind.config.ts       # Custom color tokens, screens, fonts
├── tsconfig.json            # Strict TypeScript configuration
└── package.json             # Scripts & dependencies
```
