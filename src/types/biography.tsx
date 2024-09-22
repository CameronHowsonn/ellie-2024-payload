import type { HomepageBlocks } from './blocks'

export type BiographyBlock = Extract<HomepageBlocks, { blockType: 'homepage-biography' }>
