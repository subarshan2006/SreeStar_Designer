import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Client Review & Fitting Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion / Garment Stitched',
      type: 'string',
      description: 'E.g. Wedding Reception Bridal Blouse, Daughter Grand Frock',
    }),
    defineField({
      name: 'photo',
      title: 'Client Finished Look / Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fitting / Delivery Date',
      type: 'date',
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Maps Review Link',
      type: 'url',
    }),
  ],
})
