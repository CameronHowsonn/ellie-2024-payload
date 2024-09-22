import type { HomepageBlocks } from './blocks'

export type ContactFormBlock = Extract<HomepageBlocks, { blockType: 'contact-form' }>

import z from 'zod'

export const ContactFormBlockSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(2, { message: 'Message is required' }),
  ['g-recaptcha-response']: z.any(),
})

export type ContactFormBlockSchemaType = z.infer<typeof ContactFormBlockSchema>
