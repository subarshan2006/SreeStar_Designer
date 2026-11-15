import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'videoReel',
  title: 'Video Reel / Fitting Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g. Velvet Zardosi Bridal Back-Neck Close-Up',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Compressed MP4 / WebM URL or Cloudinary CDN',
      type: 'url',
      description: 'Vertical 9:16 video link for auto-looping reels section',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image (Instant LQIP / Cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Reel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Finished Garment Look', value: 'finished-look' },
          { title: 'Embroidery & Maggam Close-Up', value: 'embroidery-closeup' },
          { title: 'Behind the Scenes & Workshop', value: 'workshop' },
          { title: 'Client Fitting Moment', value: 'client-fitting' },
        ],
      },
      initialValue: 'finished-look',
    }),
    defineField({
      name: 'linkedDesignCode',
      title: 'Associated Design Code (Optional)',
      type: 'string',
      description: 'E.g. D-0104',
    }),
  ],
})
