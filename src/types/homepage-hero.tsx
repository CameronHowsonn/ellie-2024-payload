import type { HomepageBlocks } from './blocks'

export type HomepageHeroBlock = Extract<HomepageBlocks, { blockType: 'homepage-hero' }>
