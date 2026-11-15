import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Garment Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'E.g. Bridal Blouses, Grand Frocks, Kurtis, 90s Collection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Highlight Label',
      type: 'string',
      description: 'E.g. Signature Maggam, Occasion Wear, Retro Vintage',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Cover / Hero Garment Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seoMeta',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
      ],
    }),
  ],
})
