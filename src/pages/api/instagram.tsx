import type { NextApiRequest, NextApiResponse } from 'next'

interface InstgramNextApiRequest extends NextApiRequest {
  page: number
}

export default async function handler(req: InstgramNextApiRequest, res: NextApiResponse) {
  const FEED_LIMIT = 10
  const page = req?.body?.page || 1
  const FEED_URL = `https://www.juicer.io/api/feeds/cameron-plain?page=${page}&per=${FEED_LIMIT}`

  try {
    const response = await fetch(FEED_URL)
    const data = await response.json()
    console.log(data)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
