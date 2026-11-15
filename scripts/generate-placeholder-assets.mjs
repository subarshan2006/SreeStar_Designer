#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const OUT_DIR = path.resolve(process.cwd(), 'public/placeholders')
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

const PALETTES = [
  { bg: '#EAD8C7', text: '#3E2723', label: 'Bridal Maggam' },
  { bg: '#DBCBB8', text: '#2E1A1A', label: 'Grand Heavy Work' },
  { bg: '#E5D7CA', text: '#212121', label: 'Designer Cut' },
  { bg: '#DFD0BF', text: '#4A154B', label: 'Party Frock' },
  { bg: '#E8DEC8', text: '#1B5E20', label: 'Tailored Kurti' },
  { bg: '#E2D1C3', text: '#880E4F', label: '90s Retro Blouse' },
]

console.log('🎨 Generating 50 high-fashion labeled placeholder SVGs in public/placeholders/...')

for (let i = 1; i <= 50; i++) {
  const code = `D-${String(i).padStart(4, '0')}`
  const palette = PALETTES[(i - 1) % PALETTES.length]
  const width = 800
  // Varying portrait heights for masonry testing
  const heights = [1000, 1100, 1200, 1280]
  const height = heights[(i - 1) % heights.length]

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg}" />
      <stop offset="100%" stop-color="#FAF9F5" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${palette.text}" stroke-width="0.5" opacity="0.08" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#g${i})" />
  <rect width="100%" height="100%" fill="url(#grid)" />

  <rect x="30" y="30" width="${width - 60}" height="${height - 60}" fill="none" stroke="${palette.text}" stroke-width="1" opacity="0.2" />

  <g transform="translate(${width / 2}, ${height / 2})">
    <circle r="90" fill="${palette.text}" opacity="0.05" />
    <path d="M -40 -20 L 0 -60 L 40 -20 L 20 50 L -20 50 Z" fill="none" stroke="${palette.text}" stroke-width="2" opacity="0.4" />
    <circle cx="0" cy="15" r="8" fill="${palette.text}" opacity="0.5" />

    <text y="90" font-family="serif" font-size="28" font-weight="600" fill="${palette.text}" text-anchor="middle" letter-spacing="1">
      ${palette.label}
    </text>
    <text y="125" font-family="monospace" font-size="18" font-weight="700" fill="#721B29" text-anchor="middle" letter-spacing="3">
      ${code}
    </text>
    <text y="155" font-family="sans-serif" font-size="12" fill="${palette.text}" text-anchor="middle" opacity="0.6" letter-spacing="2">
      SREESTAR BESPOKE TAILORING • CHENNAI
    </text>
  </g>

  <text x="50" y="${height - 50}" font-family="monospace" font-size="12" fill="${palette.text}" opacity="0.5">
    ${width} × ${height}px • ASPECT ${(width / height).toFixed(2)}
  </text>
</svg>
`

  fs.writeFileSync(path.join(OUT_DIR, `placeholder-${code.toLowerCase()}.svg`), svg.trim())
}

// Also generate 5 video reel poster placeholders
console.log('🎬 Generating 5 vertical video poster placeholders in public/placeholders/...')
for (let v = 1; v <= 5; v++) {
  const vWidth = 720
  const vHeight = 1280
  const svg = `
<svg width="${vWidth}" height="${vHeight}" viewBox="0 0 ${vWidth} ${vHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#141413" />
  <circle cx="${vWidth / 2}" cy="${vHeight / 2}" r="60" fill="#721B29" opacity="0.8" />
  <polygon points="${vWidth / 2 - 15},${vHeight / 2 - 25} ${vWidth / 2 + 25},${vHeight / 2} ${vWidth / 2 - 15},${vHeight / 2 + 25}" fill="#FFFFFF" />
  <text x="${vWidth / 2}" y="${vHeight / 2 + 110}" font-family="serif" font-size="24" fill="#FAF9F5" text-anchor="middle" letter-spacing="2">
    REEL 0${v}: FINISHED LOOK SHOWCASE
  </text>
  <text x="${vWidth / 2}" y="${vHeight / 2 + 145}" font-family="monospace" font-size="14" fill="#C5A059" text-anchor="middle" letter-spacing="3">
    9:16 VERTICAL VIDEO POSTER
  </text>
</svg>
`
  fs.writeFileSync(path.join(OUT_DIR, `video-poster-0${v}.svg`), svg.trim())
}

console.log('✅ Generated 50 design placeholder SVGs and 5 video posters successfully!')
