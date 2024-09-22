import type { HomepageBlocks } from './blocks'

export type TestimonialBlock = Extract<HomepageBlocks, { blockType: 'testimonial' }>
