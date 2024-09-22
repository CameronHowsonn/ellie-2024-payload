import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://graph.facebook.com/v11.0/102218858646/insights?metric=page_fans_country&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`

  const response = await fetch(url)
  const data = await response.json()

  res.status(200).json(data)
}
