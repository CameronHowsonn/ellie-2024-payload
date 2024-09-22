import type {
  CollectionAfterOperationHook,
  CollectionBeforeChangeHook,
  CollectionBeforeOperationHook,
  CollectionConfig,
} from 'payload/types'
import { getPlaiceholder } from 'plaiceholder'

const afterOperationHook: CollectionAfterOperationHook = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}) => {
  if (!result.url) {
    return result
  }

  try {
    const { url } = result

    const response = await fetch(`${url}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const bufferData = Buffer.from(buffer)

    const { base64 } = await getPlaiceholder(bufferData)

    return {
      ...result,
      base64,
    }
  } catch (error) {
    console.error('Error fetching image', error)

    return {
      ...result,
      base64: null,
    }
  }
}

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  hooks: {
    afterOperation: [afterOperationHook],
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'base64',
      label: 'Base64',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Media
