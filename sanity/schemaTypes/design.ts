import { defineField, defineType } from 'sanity'

export const designType = defineType({
  name: 'design',
  title: 'Tailoring Design',
  type: 'document',
  fields: [
    defineField({
      name: 'designCode',
      title: 'Design Code',
      type: 'string',
      description: 'Unique catalog identifier (e.g. D-0104, B-901)',
      validation: (Rule) => Rule.required().uppercase(),
    }),
    defineField({
      name: 'title',
      title: 'Design Title',
      type: 'string',
      description: 'E.g. Peacock Zardosi Bridal Maggam Blouse',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.designCode}-${doc.title}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Blouse category, Frock, Kurti, Churidar, or 90s Collection',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Search Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'E.g. bridal, maggam, zardosi, deep back neck, elbow sleeve, velvet',
    }),
    defineField({
      name: 'image',
      title: 'Primary Garment Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (SEO Rich)',
          description: 'Descriptive alt text for Google Image Search rankings',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Intrinsic Width (px)',
      type: 'number',
      description: 'Stored to eliminate Cumulative Layout Shift (CLS)',
    }),
    defineField({
      name: 'height',
      title: 'Intrinsic Height (px)',
      type: 'number',
      description: 'Stored to balance staggered masonry columns',
    }),
    defineField({
      name: 'description',
      title: 'Design Description',
      type: 'text',
      rows: 3,
      description: 'Embroidery details, back-neck cut style, sleeve finish, and occasion suitability.',
    }),
    defineField({
      name: 'fabricOptions',
      title: 'Recommended Fabrics',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Pure Kanchipuram Raw Silk', value: 'Pure Kanchipuram Raw Silk' },
          { title: 'Royal Velvet', value: 'Royal Velvet' },
          { title: 'Banarasi Brocade', value: 'Banarasi Brocade' },
          { title: 'Pure Organza Silk', value: 'Pure Organza Silk' },
          { title: 'Tussar Silk', value: 'Tussar Silk' },
          { title: 'Handloom Cotton', value: 'Handloom Cotton' },
          { title: 'Chiffon & Georgette', value: 'Chiffon & Georgette' },
        ],
      },
    }),
    defineField({
      name: 'workType',
      title: 'Craftsmanship / Embroidery Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hand Maggam Work', value: 'maggam' },
          { title: 'Aari & Zardosi Needlework', value: 'aari-zardosi' },
          { title: 'Kundan & Pearl Studded', value: 'kundan-pearl' },
          { title: 'Cutwork & Thread Embroidery', value: 'cutwork' },
          { title: 'Patchwork & Piping Classic', value: 'classic-piping' },
          { title: 'Retro 90s Vintage Puff', value: 'retro-puff' },
        ],
      },
    }),
    defineField({
      name: 'isNew',
      title: 'Mark as New Arrival',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isTrending',
      title: 'Mark as Trending',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage Hero & Wall',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Sort Order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'designCode',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `[${subtitle || 'NO-CODE'}] ${title}`,
        subtitle: 'Women Only Custom Tailoring',
        media,
      }
    },
  },
})
