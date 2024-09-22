import NavigationContext from '@/context/navigation'
import useGetElementHeight from '@/hooks/use-get-element-height'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { headerItems } from './header'
import Heading from './heading'
import Container from './container'
import { useRouter } from 'next/router'
import SocialLinks from '@/components/social-links'

const MobileNav: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { isOpen, toggle } = useContext(NavigationContext)
  const headerHeight = useGetElementHeight('headroom-wrapper')

  const router = useRouter()

  router?.events?.on('routeChangeComplete', () => {
    if (isOpen) {
      toggle()
    }
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <MobileNavContainer
        aria-hidden={!isOpen}
        $headerHeight={headerHeight}
        className={!isMounted ? 'mobile-nav-hidden' : ''}
      >
        <MobileNavContent aria-hidden={!isOpen} $headerHeight={headerHeight}>
          <Container className="mobile-nav-container">
            <MobileNavUl>
              {headerItems.map((item, index) => (
                <li key={index}>
                  <Heading as="h1" color="var(--white)">
                    <Link
                      href={item.url}
                      onClick={(e) => {
                        // Smooth scroll to anchor
                        e.preventDefault()
                        toggle()
                        const target = document.querySelector(item.url)
                        if (target) {
                          target.scrollIntoView({
                            behavior: 'smooth',
                          })
                        }
                      }}
                    >
                      {item.title}
                    </Link>
                  </Heading>
                </li>
              ))}
              <SocialLinks />
            </MobileNavUl>
          </Container>
        </MobileNavContent>
      </MobileNavContainer>
    </>
  )
}

export default MobileNav

const MobileNavSocials = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;
  padding: 3rem 0;
  border-top: 0.5px solid var(--borderWhite);

  svg path {
    fill: var(--white);
  }
`

const MobileNavUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: start;
  height: 100%;
  padding: 3rem 0;
  margin: 0;
  list-style: none;
  gap: 0.5rem;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  transform: translateY(1rem);
  transition-delay: 0.5s;

  .nav-open & {
    opacity: 1;
    transform: translateY(0);
  }

  svg,
  svg path {
    fill: var(--white);
  }

  a {
    color: var(--white);
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: var(--slate);
    }
  }
`

const MobileNavContainer = styled.div<{
  $headerHeight: number
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
  max-height: calc(100% - ${(props) => props.$headerHeight}px);
  height: 100%;
  transform: translateY(${(props) => props.$headerHeight}px);

  .socials {
    margin-top: 2rem;
  }

  &.mobile-nav-hidden {
    display: none;
  }

  @media (min-width: 48rem) {
    display: none;
  }

  &[aria-hidden='true'] {
    pointer-events: none;
  }
`

const MobileNavContent = styled.div<{
  $headerHeight: number
}>`
  background-color: var(--primary);
  width: 100vw;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateY(0);
  min-height: 80vh;

  &[aria-hidden='true'] {
    transform: translateY(calc(-100% - ${(props) => props.$headerHeight}px));
  }

  h1,
  a {
    text-decoration: none;
  }

  .mobile-nav-container {
    height: 100%;
  }
`
