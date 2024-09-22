/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User
    media: Media
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    homepage: Homepage
  }
  locale: null
  user: User & {
    collection: 'users'
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number
  alt: string
  base64?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number
  user: {
    relationTo: 'users'
    value: number | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "homepage".
 */
export interface Homepage {
  id: number
  blocks?:
    | (
        | {
            hero: number | Media
            heroTitle: string
            id?: string | null
            blockName?: string | null
            blockType: 'homepage-hero'
          }
        | {
            title: string
            subtext: {
              root: {
                type: string
                children: {
                  type: string
                  version: number
                  [k: string]: unknown
                }[]
                direction: ('ltr' | 'rtl') | null
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
                indent: number
                version: number
              }
              [k: string]: unknown
            }
            subtext_html?: string | null
            image: number | Media
            imageSmall?: number | Media | null
            id?: string | null
            blockName?: string | null
            blockType: 'homepage-biography'
          }
        | {
            title: string
            services: {
              title: string
              description: {
                root: {
                  type: string
                  children: {
                    type: string
                    version: number
                    [k: string]: unknown
                  }[]
                  direction: ('ltr' | 'rtl') | null
                  format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
                  indent: number
                  version: number
                }
                [k: string]: unknown
              }
              description_html?: string | null
              icon: 'family' | 'plane' | 'calendar' | 'notepad' | 'office' | 'contact'
              id?: string | null
            }[]
            id?: string | null
            blockName?: string | null
            blockType: 'services'
          }
        | {
            quote: {
              root: {
                type: string
                children: {
                  type: string
                  version: number
                  [k: string]: unknown
                }[]
                direction: ('ltr' | 'rtl') | null
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
                indent: number
                version: number
              }
              [k: string]: unknown
            }
            quote_html?: string | null
            author: string
            id?: string | null
            blockName?: string | null
            blockType: 'testimonial'
          }
        | {
            title: string
            subtitle?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'contact-form'
          }
      )[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
