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
          title: `Optimise - Your First Class PA Provider`,
          description: `Hi, my name is Ellie, and I am the owner and founder of Optimise - Your First Class Personal Assistant Provider. With 21 years of experience working for a world-renowned airline, I specialized in looking after VIPs and high-profile customers.`,
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
