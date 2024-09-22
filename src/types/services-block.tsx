import type { HomepageBlocks } from './blocks'

export type ServciesBlock = Extract<HomepageBlocks, { blockType: 'services' }>
