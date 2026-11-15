import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'E.g. Top 50 Bridal Blouse Designs for 2026 Weddings',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Meta Description',
      type: 'text',
      rows: 3,
      description: '150–160 characters summary for Google search snippet',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'category',
      title: 'Article Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bridal Blouses', value: 'bridal-blouses' },
          { title: 'Neckline & Sleeve Cuts', value: 'neckline-sleeves' },
          { title: 'Embroidery & Zardosi', value: 'embroidery' },
          { title: 'Frocks & Gowns', value: 'frocks' },
          { title: 'Kurtis & Churidars', value: 'kurtis-churidars' },
          { title: '90s Vintage Nostalgia', value: '90s-retro' },
          { title: 'Fit & Measurement Guide', value: 'fit-guide' },
          { title: 'Chennai Tailoring Insights', value: 'chennai-guide' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Keyword-rich descriptive alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Senior Master Cutter, SreeStar Atelier',
    }),
    defineField({
      name: 'readTime',
      title: 'Reading Time',
      type: 'string',
      initialValue: '5 min read',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Blog Home',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
