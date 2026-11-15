#!/usr/bin/env node

/**
 * ====================================================================
 * SreeStar Tailoring — Bulk Design Catalog Generator & Importer
 * ====================================================================
 *
 * This script generates or imports 500+ tailored design records into Sanity CMS
 * or formats them into a high-performance NDJSON dataset.
 *
 * Usage:
 *   node scripts/bulk-upload-designs.mjs --generate
 *   node scripts/bulk-upload-designs.mjs --count=500
 * ====================================================================
 */

import fs from 'fs'
import path from 'path'

const CATEGORIES = [
  { name: 'Bridal Blouses', prefix: 'BR', ratio: 0.30, work: ['Hand Maggam Work', 'Aari & Zardosi Needlework', 'Kundan & Pearl'] },
  { name: 'Grand Blouses', prefix: 'GR', ratio: 0.20, work: ['Velvet Zari Heavy Cut', 'Stone Studded Royal', 'Banarasi Brocade'] },
  { name: 'Designer Blouses', prefix: 'DS', ratio: 0.15, work: ['Contemporary Cut', 'Illusion Mesh Cutwork', 'Sequin Evening'] },
  { name: '90s Collection', prefix: '90', ratio: 0.10, work: ['Vintage Puff Sleeve', 'Classic Retro Collar', 'South Cotton Nostalgia'] },
  { name: 'Frocks', prefix: 'FR', ratio: 0.10, work: ['Flared Organza Gown', 'Pleated Party Frock', 'Silk Occasion Wear'] },
  { name: 'Kurtis', prefix: 'KR', ratio: 0.08, work: ['A-Line Tailored Cut', 'Princess Line Anarkali', 'Straight Comfort Fit'] },
  { name: 'Churidars', prefix: 'CH', ratio: 0.07, work: ['Bespoke Fitting Set', 'Patiala Pleated', 'Classic Churidar'] },
]

const FABRICS = [
  'Pure Kanchipuram Raw Silk',
  'Royal Velvet',
  'Banarasi Brocade',
  'Pure Organza Silk',
  'Tussar Silk',
  'Handloom Cotton',
]

const ADJECTIVES = ['Royal', 'Heritage', 'Intricate', 'Contemporary', 'Celestial', 'Imperial', 'Signature', 'Artisanal']
const MOTIFS = ['Peacock Zardosi', 'Lotus Kundan', 'Temple G願am', 'Floral Vine', 'Mango Paisley', 'Geometric Cutwork', 'Beaded Pearl Droplet']

function generateCatalog(count = 500) {
  console.log(`\n🧵 Generating ${count} design catalog items for SreeStar...`)
  const designs = []

  let currentIndex = 1

  for (const cat of CATEGORIES) {
    const categoryCount = Math.floor(count * cat.ratio)

    for (let i = 0; i < categoryCount; i++) {
      const codeNumber = String(currentIndex).padStart(4, '0')
      const designCode = `D-${codeNumber}`
      const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
      const motif = MOTIFS[Math.floor(Math.random() * MOTIFS.length)]
      const title = `${adj} ${motif} ${cat.name.replace(/s$/, '')}`

      // Randomized realistic portrait aspect ratio dimensions to test staggered masonry
      const widths = [800, 900, 1000]
      const heights = [1000, 1100, 1200, 1280, 1340, 1400]
      const width = widths[Math.floor(Math.random() * widths.length)]
      const height = heights[Math.floor(Math.random() * heights.length)]

      const doc = {
        _type: 'design',
        _id: `design-${codeNumber}`,
        designCode,
        title,
        slug: {
          _type: 'slug',
          current: `${designCode.toLowerCase()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        },
        categoryName: cat.name,
        workType: cat.work[Math.floor(Math.random() * cat.work.length)],
        fabricOptions: [
          FABRICS[Math.floor(Math.random() * FABRICS.length)],
          FABRICS[Math.floor(Math.random() * FABRICS.length)],
        ],
        width,
        height,
        aspectRatio: Number((width / height).toFixed(3)),
        description: `Precision-stitched ${title.toLowerCase()} crafted exclusively at SreeStar Chennai. Perfect armhole curvature, reinforced seams, and custom padding support.`,
        isFeatured: currentIndex <= 40,
        isNew: i % 7 === 0,
        isTrending: i % 5 === 0,
        sortOrder: currentIndex,
      }

      designs.push(doc)
      currentIndex++
    }
  }

  // Ensure output directory exists
  const outDir = path.resolve(process.cwd(), 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const jsonPath = path.join(outDir, 'catalog-500-designs.json')
  fs.writeFileSync(jsonPath, JSON.stringify(designs, null, 2))

  // Write NDJSON format for Sanity dataset import
  const ndjsonPath = path.join(outDir, 'catalog-500-designs.ndjson')
  const ndjsonContent = designs.map((d) => JSON.stringify(d)).join('\n')
  fs.writeFileSync(ndjsonPath, ndjsonContent)

  console.log(`✅ Success! Generated ${designs.length} designs.`)
  console.log(`📁 JSON Catalog: ${jsonPath}`)
  console.log(`📁 Sanity NDJSON: ${ndjsonPath}`)
  console.log(`\nImport into Sanity using:`)
  console.log(`   npx sanity dataset import ${ndjsonPath} production --replace\n`)
}

generateCatalog(500)
