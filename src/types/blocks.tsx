import type { Homepage } from '@/payload-types'

export type HomepageBlocks = NonNullable<Homepage['blocks']>[number]
