import React, { useContext } from 'react'
import styled from 'styled-components'
import Heading from './heading'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Headroom from 'react-headroom'
import Container from './container'
import NavigationContext from '@/context/navigation'
import Text from '@/components/text'
import SocialLinks from '@/components/social-links'

export const headerItems: Array<{ title: string; url: string }> = [
  { title: 'Biography', url: '#biography' },
  { title: 'Services', url: '#services' },
  { title: 'Contact', url: '#contact' },
]

const Header: React.FC = () => {
  const router = useRouter()
  const isHomepage = router.pathname === '/'
  const { isOpen, toggle } = useContext(NavigationContext)

  return (
    <HeaderElement id="header-container">
      <Headroom
        style={{
          zIndex: 10,
        }}
        className={isOpen ? 'mobile-header-open' : ''}
        pinStart={isHomepage ? 300 : 0}
        onPin={() => {
          document.body.classList.add('headroom-pinned')
          document.body.classList.remove('headroom-unpinned')
        }}
        onUnpin={() => {
          document.body.classList.remove('headroom-pinned')
          document.body.classList.add('headroom-unpinned')
        }}
      >
        <Container>
          <HeaderInner>
            <div></div>
            <HeaderButton
              $isOpen={isOpen}
              onClick={() => {
                toggle()
              }}
            >
              <span></span>
            </HeaderButton>
            <HeaderNav>
              <HeaderNavBox>
                {headerItems.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    className={router.pathname === item.url ? 'active' : ''}
                    color="var(--purple)"
                    onClick={(e) => {
                      // Smooth scroll to anchor
                      e.preventDefault()
                      window.history.pushState({}, '', item.url)
                      const target = document.querySelector(item.url)
                      if (target) {
                        target.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                    }}
                  >
                    <Text
                      variant="medium"
                      color="var(--white)"
                      style={{
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.title}
                    </Text>
                  </Link>
                ))}
              </HeaderNavBox>
            </HeaderNav>
            <HeaderEnd>
              <SocialLinks showTitle={false} />
            </HeaderEnd>
          </HeaderInner>
        </Container>
      </Headroom>
    </HeaderElement>
  )
}

export default Header

const HeaderButton = styled.button<{
  $isOpen: boolean
}>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 48rem) {
    display: none;
  }

  &:before,
  &:after,
  span {
    background-color: var(--purple);
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    transition: all 0.3s;
    width: 1.5rem;
    transform-origin: center;
    background-color: var(--white);

    .headroom--pinned & {
      background-color: var(--slate);
    }

    .nav-open & {
      background-color: var(--white);
    }
  }

  &:before {
    top: 0.925rem;
  }

  &:after {
    bottom: 0.925rem;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
        z-index: 9999;
        span {
            background-color: transparent;
            display: none;
        }

        &:before {
            transform: rotate(45deg);
            top: 50%;
        }

        &:after {
            transform: rotate(-45deg);
            bottom: 50%;
        }
    `}
`

const HeaderElement = styled.header`
  position: fixed;
  width: 100%;
  z-index: 5;
  transition: all 0.2s cubic-bezier(0.15, 0.41, 0.69, 0.94);

  .video-playing & {
    transform: translateY(-100%);
  }

  h5 {
    .nav-open & {
      color: var(--white);
    }

    max-width: 8rem;
  }

  .headroom-unpinned & {
    pointer-events: none;
  }

  p {
    font-size: 0.875rem;
  }

  h4 {
    .nav-open & {
      color: var(--tallisGrey);
    }
  }

  .headroom--unfixed {
    a,
    svg path,
    h4 {
      color: white;
      fill: white;
    }

    .container {
      padding: 0;
    }
  }

  .mobile-header-open {
    background-color: var(--white);
    .nav-open & {
      background-color: var(--primary);
    }
  }

  a {
    text-decoration: none;
  }

  .headroom {
    z-index: 5;
    transition: all 0.2s cubic-bezier(0.15, 0.41, 0.69, 0.94);
    background-color: var(--white);
    .nav-open & {
      background-color: var(--slate);
    }
    padding: 1rem 0;

    &.headroom--pinned {
      @media (min-width: 48rem) {
        box-shadow: 0 0.025rem 0.01rem rgba(0, 0, 0, 0.1);
      }
      a {
        p {
          color: var(--slate);
        }
      }
    }

    &.headroom--unfixed {
      z-index: 5;
      background-color: transparent;

      @media (min-width: 48rem) {
        padding: 2.275rem;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, var(--black), transparent);
          z-index: 0;
          opacity: 0.8;
        }
      }
    }
  }
`

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  @media (min-width: 48rem) {
    padding: 1rem;
  }
`

const HeaderNav = styled.nav`
  display: none;
  position: relative;
  z-index: 1;

  @media (min-width: 48rem) {
    display: block;
  }
`

const HeaderNavBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0;

  a {
    padding: 0 1rem;
  }

  a {
    text-decoration: none;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`

const HeaderEnd = styled.div`
  display: none;
  position: relative;
  z-index: 1;

  @media (min-width: 48rem) {
    display: block;
  }
`
