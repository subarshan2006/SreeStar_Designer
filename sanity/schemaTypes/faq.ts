import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'Frequently Asked Questions (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'FAQ Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pricing & Packages', value: 'pricing' },
          { title: 'Delivery & Rush Orders', value: 'delivery' },
          { title: 'Fitting & Measurements', value: 'fitting' },
          { title: 'Maggam & Handwork Care', value: 'care' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
})
