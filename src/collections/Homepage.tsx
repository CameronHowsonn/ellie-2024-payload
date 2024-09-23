import type { Block, GlobalConfig } from 'payload/types'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

const HomepageHeroBlock: Block = {
  slug: 'homepage-hero',
  labels: {
    singular: 'Homepage Hero',
    plural: 'Homepage Heroes',
  },
  fields: [
    {
      name: 'hero',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroTitle',
      label: 'Hero Title',
      type: 'text',
      required: true,
    },
  ],
}

const HomepageBiographyBlock: Block = {
  slug: 'homepage-biography',
  labels: {
    singular: 'Homepage Text Intro',
    plural: 'Homepage Text Intros',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtext',
      label: 'Subtext',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('subtext', { name: 'subtext_html' }),
    {
      name: 'image',
      label: 'Image (Large)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageSmall',
      label: 'Image (Small)',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

const ContactFormBlock: Block = {
  slug: 'contact-form',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
    },
  ],
}

const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      label: 'Services',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
          }),
        },
        lexicalHTML('description', { name: 'description_html' }),
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Family',
              value: 'family',
            },
            {
              label: 'Plane',
              value: 'plane',
            },
            {
              label: 'Calendar',
              value: 'calendar',
            },
            {
              label: 'Notepad',
              value: 'notepad',
            },
            {
              label: 'Office',
              value: 'office',
            },
            {
              label: 'Contact',
              value: 'contact',
            },
          ],
        },
      ],
    },
  ],
}

const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      type: 'array',
      name: 'testimonials',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'quote',
          label: 'Quote',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
          }),
        },
        lexicalHTML('quote', { name: 'quote_html' }),
        {
          name: 'author',
          label: 'Author',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HomepageHeroBlock,
        HomepageBiographyBlock,
        ServicesBlock,
        TestimonialBlock,
        ContactFormBlock,
      ],
    },
  ],
}

export default Homepage
