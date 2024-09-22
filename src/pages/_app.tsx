import Footer from '@/components/footer'
import GlobalStyle from '@/components/global-style'
import Header from '@/components/header'
import MobileNav from '@/components/mobile-nav'
import { NavigationProvider } from '@/context/navigation'
import useIntersectionAnimation from '@/hooks/use-intersection-animation'
import theme from '@/theme'
import Head from 'next/head'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StyleSheetManager, ThemeProvider } from 'styled-components'

interface AppPropsWithSession {
  Component: React.ComponentType<any>
  pageProps: any
}

const App: React.FC<AppPropsWithSession> = ({ Component, pageProps }) => {
  useIntersectionAnimation({
    targetClass: 'animate',
    ignoreClasses: ['ignore'],
  })

  useIntersectionAnimation({
    targetClass: 'animate-opaque',
    ignoreClasses: ['ignore'],
  })

  const client = new QueryClient()

  return (
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={() => true}>
          <QueryClientProvider client={client}>
            <GlobalStyle />
            <Header />
            <MobileNav />
            <Component {...pageProps} />
            <Footer />
          </QueryClientProvider>
        </StyleSheetManager>
      </ThemeProvider>
    </NavigationProvider>
  )
}

export default App
