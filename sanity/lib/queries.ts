export const ALL_DESIGNS_QUERY = `
  *[_type == "design"] | order(sortOrder asc, _createdAt desc) {
    _id,
    title,
    designCode,
    "slug": slug.current,
    "categories": categories[]->{
      _id,
      name,
      "slug": slug.current,
      badge
    },
    tags,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip
        }
      },
      alt
    },
    width,
    height,
    description,
    fabricOptions,
    workType,
    isNew,
    isTrending,
    isFeatured
  }
`

export const FEATURED_DESIGNS_QUERY = `
  *[_type == "design" && isFeatured == true] | order(sortOrder asc)[0...40] {
    _id,
    title,
    designCode,
    "slug": slug.current,
    "category": categories[0]->name,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    width,
    height,
    isNew,
    isTrending
  }
`

export const DESIGNS_BY_CATEGORY_QUERY = `
  *[_type == "design" && $categorySlug in categories[]->slug.current] | order(sortOrder asc) {
    _id,
    title,
    designCode,
    "slug": slug.current,
    image,
    width,
    height,
    description
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    shopName,
    tagline,
    city,
    phone,
    whatsappNumber,
    instagramHandle,
    address,
    googleMapsLink,
    workingHours,
    stats
  }
`

export const FAQS_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(date desc) {
    _id,
    clientName,
    occasion,
    rating,
    text,
    date,
    googleReviewUrl
  }
`

export const VIDEO_REELS_QUERY = `
  *[_type == "videoReel"] | order(_createdAt desc) {
    _id,
    title,
    videoUrl,
    poster,
    type,
    linkedDesignCode
  }
`
