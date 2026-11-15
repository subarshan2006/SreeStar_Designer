import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Tailoring Studio Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'shopName',
      title: 'Shop / Brand Name',
      type: 'string',
      initialValue: 'SreeStar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: "Custom blouses + women's tailoring.",
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Chennai',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Business Number (digits with country code)',
      type: 'string',
      description: 'E.g. 919876543210',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'E.g. sreestar_tailoring',
    }),
    defineField({
      name: 'address',
      title: 'Studio Physical Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'workingHours',
      title: 'Opening Hours',
      type: 'string',
      initialValue: 'Mon – Sat: 10:00 AM – 8:30 PM | Sunday by Appointment',
    }),
    defineField({
      name: 'stats',
      title: 'Animated Counter Stats',
      type: 'object',
      fields: [
        defineField({ name: 'designsCount', title: 'Total Designs', type: 'string', initialValue: '500+' }),
        defineField({ name: 'happyClients', title: 'Happy Clients', type: 'string', initialValue: '2,500+' }),
        defineField({ name: 'experienceYears', title: 'Years of Experience', type: 'string', initialValue: '14+' }),
        defineField({ name: 'fitGuarantee', title: 'Fit Guarantee Text', type: 'string', initialValue: '100% Perfect Fit' }),
      ],
    }),
  ],
})
