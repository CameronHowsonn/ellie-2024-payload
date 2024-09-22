import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Script from 'next/script'

export interface DefaultPageProps {
  errorCode?: number
  meta: PageMetaProps
}

interface PageMetaProps {
  title: string
  description: string
  image: string
  url: string
}

export default function createPage<Props>(
  Page: NextPage<Props>,
): NextPage<DefaultPageProps & Props> {
  return function PageWrapper(props: Props & DefaultPageProps) {
    return (
      <>
        <PageMeta {...props.meta} />
        <Page {...props} />
      </>
    )
  }
}
const PageMeta = ({ title, description, image, url }: PageMetaProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="theme-color" content="#101015" />
      </Head>
    </>
  )
}
