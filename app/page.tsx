import React from 'react'
import { getFeaturedDesigns, getTestimonials, getFAQs } from '@/lib/api'
import { HomeView } from '@/components/home/HomeView'
import { JsonLd, getAggregateRatingSchema, getFAQPageSchema } from '@/lib/schema'

export const revalidate = 60 // ISR revalidation

export default async function HomePage() {
  const [featuredDesigns, testimonials, faqs] = await Promise.all([
    getFeaturedDesigns(42),
    getTestimonials(),
    getFAQs(),
  ])

  return (
    <>
      <JsonLd schema={getAggregateRatingSchema(testimonials)} />
      <JsonLd schema={getFAQPageSchema(faqs)} />
      <HomeView initialDesigns={featuredDesigns} />
    </>
  )
}

