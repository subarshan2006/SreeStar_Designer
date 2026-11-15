#!/usr/bin/env node

/**
 * ====================================================================
 * SreeStar Tailoring — Automated CMS Image SEO Renamer Pipeline
 * Converts raw upload filenames into SEO-dense, keyword-rich filenames
 * ====================================================================
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CATALOG_PATH = path.join(__dirname, '../data/catalog-500-designs.json')
const MANIFEST_OUTPUT = path.join(__dirname, '../data/seo-image-manifest.json')

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function generateSeoFilename(design) {
  const parts = [
    design.title,
    design.workType || '',
    design.designCode,
  ]

  const slug = parts
    .filter(Boolean)
    .map(slugify)
    .join('-')
    .replace(/-+/g, '-')

  return `${slug}.webp`
}

function generateAltText(design) {
  const work = design.workType || 'Custom Handcrafted Needlework'
  const cat = design.categoryName || 'Women’s Tailoring'
  return `${design.title} (${design.designCode}) — ${work} ${cat} tailored in Chennai by SreeStar`
}

function runPipeline() {
  console.log('🚀 Running SreeStar CMS Image SEO Renaming Pipeline...')

  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`❌ Catalog file not found at ${CATALOG_PATH}`)
    process.exit(1)
  }

  const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8')
  const catalog = JSON.parse(rawData)

  const manifest = catalog.map((design, index) => {
    const code = design.designCode || `D-${String(index + 1).padStart(4, '0')}`
    const seoFilename = generateSeoFilename({
      title: design.title || `Bespoke ${design.categoryName || 'Blouse'}`,
      designCode: code,
      workType: design.workType,
    })

    const altText = generateAltText({
      title: design.title || `Bespoke ${design.categoryName || 'Blouse'}`,
      designCode: code,
      categoryName: design.categoryName,
      workType: design.workType,
    })

    return {
      designCode: code,
      originalUrl: design.imageUrl || `/placeholders/placeholder-d-${String((index % 50) + 1).padStart(4, '0')}.svg`,
      seoFilename,
      seoPath: `/images/catalog/${seoFilename}`,
      altText,
      category: design.categoryName || 'Bridal Blouses',
      workType: design.workType || 'Artisanal Handcraft',
    }
  })

  fs.writeFileSync(MANIFEST_OUTPUT, JSON.stringify(manifest, null, 2), 'utf-8')

  console.log(`✅ Successfully processed ${manifest.length} catalog items into SEO manifest.`)
  console.log(`📁 Manifest written to: ${MANIFEST_OUTPUT}`)
  console.log(`🌟 Sample SEO Filename: ${manifest[0].seoFilename}`)
  console.log(`🌟 Sample SEO Alt Text: ${manifest[0].altText}`)
}

runPipeline()
