import type { HomepageBlocks } from './blocks'

export type GalleryBlock = Extract<HomepageBlocks, { blockType: 'gallery' }>
