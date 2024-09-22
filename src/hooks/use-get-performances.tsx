import { useQuery } from 'react-query'
import qs from 'qs'

const fetchPerformances = async (
  type: 'past' | 'future',
  limit: number,
  sort: 'asc' | 'desc' = 'asc',
) => {
  let query

  const timeNow = new Date()
  const startOfToday = new Date(timeNow)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(timeNow)
  endOfToday.setHours(23, 59, 59, 999)

  if (type === 'past') {
    query = {
      date: {
        less_than: startOfToday,
      },
    }
  }

  if (type === 'future') {
    query = {
      date: {
        greater_than_equal: startOfToday,
      },
    }
  }

  const stringifiedQuery = qs.stringify({
    where: query,
    sort: sort === 'asc' ? 'date' : '-date',
  })

  const response = await fetch(
    `${process.env.FRONTEND_API_URL}/api/single-performance?depth=2&${stringifiedQuery}&limit=${limit}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export const useFetchPerformances = (
  type: 'past' | 'future',
  limit: number,
  sort: 'asc' | 'desc' = 'asc',
) => {
  return useQuery(
    [`events`, `${type}--${limit}--${sort}`],
    () => fetchPerformances(type, limit, sort),
    {
      keepPreviousData: true,
    },
  )
}
