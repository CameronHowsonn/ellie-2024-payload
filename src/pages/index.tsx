import createPage from '@/lib/create-page'
import styled from 'styled-components'
import type { GetStaticProps } from 'next'
import type { HomepageBlocks } from '@/types/blocks'
import { ComponentMapper } from '@/lib/component-mapper'
import type { Homepage } from '@/payload-types'

interface Props {
  data: Homepage
}

const Index = createPage<Props>((data) => {
  return (
    <>
      {data?.data?.blocks?.map((block: HomepageBlocks) => {
        const Component: keyof JSX.IntrinsicElements | React.ComponentType<any> =
          ComponentMapper[block?.blockType]

        if (!Component) return null
        return <Component key={block.id} block={block} />
      })}
    </>
  )
})

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const fetchUrl = `${process.env.API_URL}/api/globals/homepage?depth=2`

  try {
    const homepageCmsFetch = await fetch(fetchUrl)
    const homepageCmsData = (await homepageCmsFetch.json()) as Homepage

    return {
      props: {
        data: homepageCmsData,
        meta: {
          title: `Your PA - Your First Class Personal Assistant`,
          description: `Delivering VIP service to high-profile clients, I know what it takes to provide exceptional care and anticipate every need - often before it's even voiced.`,
        },
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`
