import React from 'react'
import { getFeaturedDesigns } from '@/lib/api'
import { HomeView } from '@/components/home/HomeView'

export const revalidate = 60 // ISR revalidation

export default async function HomePage() {
  const featuredDesigns = await getFeaturedDesigns(42)

  return <HomeView initialDesigns={featuredDesigns} />
}
