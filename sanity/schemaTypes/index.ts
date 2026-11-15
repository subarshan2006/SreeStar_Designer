import { type SchemaTypeDefinition } from 'sanity'
import { designType } from './design'
import { categoryType } from './category'
import { testimonialType } from './testimonial'
import { faqType } from './faq'
import { siteSettingsType } from './siteSettings'
import { videoType } from './video'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    designType,
    categoryType,
    testimonialType,
    faqType,
    siteSettingsType,
    videoType,
  ],
}
