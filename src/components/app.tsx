import type { AppProps } from 'next/app'
import React from 'react'

interface Props extends AppProps {
  Wrapper?: any
}

const BaseApp: React.FC<Props> = ({ Component, Wrapper, pageProps }) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default BaseApp
