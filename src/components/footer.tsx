import React from 'react'
import Section from './section'
import Container from './container'
import Stack from './stack'
import Text from './text'
import styled from 'styled-components'
import { headerItems } from './header'
import Heading from './heading'
import Link from 'next/link'
import Box from './box'
import InstagramIcon from './icons/instagram'
import FacebookIcon from './icons/facebook'
import SocialLinks from './social-links'
import UseIsMobile from '@/hooks/use-is-mobile'

const colorOptions = ['002f5c', '004987', '004F92', '002A5E', '001A5F']

export const footerSocialLinks: Array<{ url: string; icon: React.FC; linkName: string }> = [
  {
    url: 'https://www.instagram.com/yourfirstclasspa',
    icon: InstagramIcon,
    linkName: 'Instagram Link',
  },
  {
    url: 'https://www.facebook.com/profile.php?id=61566743394529',
    icon: FacebookIcon,
    linkName: 'Facebook Link',
  },
]

const Footer: React.FC = () => {
  const isMobile = UseIsMobile()

  return (
    <FooterSection ariaLabelledBy="footer">
      <FooterElement>
        <Stack gap={6}>
          <Container>
            <FooterInner as={Stack} gap={[4, 4, 0]}>
              <LeftStack gap={4}>
                <Stack gap={2}>
                  {headerItems.map((item, index) => (
                    <Link
                      href={item?.url}
                      key={index}
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
                      <Heading color="var(--white)" as="h3">
                        {item.title}
                      </Heading>
                    </Link>
                  ))}
                </Stack>
              </LeftStack>
              <Right>
                <svg
                  width="360"
                  height="315"
                  viewBox="0 0 360 315"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M238.329 94.3625H121.639C119.708 94.3625 117.951 93.2964 117.058 91.5965C116.164 89.8965 116.309 87.8219 117.403 86.266L175.75 2.27399C176.73 0.890967 178.314 0.0553894 179.986 0.0553894C181.686 0.0553894 183.27 0.890967 184.221 2.27399L242.568 86.266C243.663 87.8507 243.778 89.8965 242.914 91.5965C242.02 93.2964 240.26 94.3625 238.329 94.3625ZM131.523 84.0477H228.482L179.99 14.2629L131.523 84.0477Z"
                    fill="url(#paint0_linear_1_20)"
                  />
                  <path
                    d="M354.791 94.3625H238.329C236.399 94.3625 234.641 93.2964 233.748 91.5965C232.855 89.8965 232.999 87.822 234.094 86.266L292.441 2.27399C293.42 0.890967 295.005 0.0553894 296.676 0.0553894C298.376 0.0553894 299.961 0.890967 300.912 2.27399L330.099 44.2833L359.056 86.2926C360.151 87.8773 360.266 89.9231 359.373 91.623C358.48 93.323 356.722 94.3891 354.792 94.3891L354.791 94.3625ZM248.213 84.0477H344.966L321.598 50.1345L296.675 14.2621L248.213 84.0477Z"
                    fill="url(#paint1_linear_1_20)"
                  />
                  <path
                    d="M121.639 94.3625H5.17711C3.24663 94.3625 1.48904 93.2964 0.595865 91.5965C-0.297311 89.8965 -0.182105 87.8508 0.912794 86.266L26.5854 49.0106C28.199 46.6768 31.426 46.0717 33.7599 47.6852C36.0938 49.2987 36.6989 52.5258 35.0853 54.8597L15.0023 83.9895H111.785L63.3212 14.2047L43.2094 43.1619C41.567 45.4958 38.3688 46.072 36.0349 44.4585C33.701 42.8161 33.1248 39.6179 34.7383 37.284L59.1143 2.21859C60.0939 0.835564 61.6786 0 63.3498 0C65.0498 0 66.6345 0.835564 67.5853 2.21859L125.932 86.2106C127.027 87.7953 127.142 89.8411 126.278 91.5411C125.385 93.241 123.627 94.3071 121.697 94.3071L121.639 94.3625Z"
                    fill="url(#paint2_linear_1_20)"
                  />
                  <path
                    d="M238.329 94.3625C236.629 94.3625 235.045 93.5269 234.094 92.1439L175.747 8.15188C174.652 6.56719 174.537 4.52142 175.401 2.82144C176.295 1.12146 178.052 0.0553894 179.983 0.0553894H296.673C298.604 0.0553894 300.361 1.12146 301.254 2.82144C302.148 4.52142 302.003 6.59596 300.909 8.15188L242.562 92.1439C241.582 93.5269 240 94.3625 238.329 94.3625ZM189.866 10.3705L238.358 80.1553L286.822 10.3705H189.866Z"
                    fill="url(#paint3_linear_1_20)"
                  />
                  <path
                    d="M121.639 10.3705H108.759C105.907 10.3705 103.602 8.06543 103.602 5.21293C103.602 2.36044 105.907 0.0553894 108.759 0.0553894H121.639C124.491 0.0553894 126.796 2.36044 126.796 5.21293C126.796 8.06543 124.491 10.3705 121.639 10.3705Z"
                    fill="url(#paint4_linear_1_20)"
                  />
                  <path
                    d="M121.639 94.3625C119.939 94.3625 118.354 93.5269 117.403 92.1439L59.0567 8.15188C57.9618 6.56719 57.8466 4.52142 58.7109 2.82144C59.6041 1.12146 61.3618 0.0553894 63.2922 0.0553894H93.9201C96.7726 0.0553894 99.0776 2.36044 99.0776 5.21293C99.0776 8.06543 96.7726 10.3705 93.9201 10.3705H73.146L121.609 80.1553L170.073 10.3705H135.901C133.048 10.3705 130.743 8.06543 130.743 5.21293C130.743 2.36044 133.048 0.0553894 135.901 0.0553894H179.927C181.858 0.0553894 183.615 1.12146 184.509 2.82144C185.402 4.52142 185.258 6.59596 184.163 8.15188L125.816 92.1439C124.836 93.5269 123.252 94.3625 121.581 94.3625H121.639Z"
                    fill="url(#paint5_linear_1_20)"
                  />
                  <path
                    d="M179.984 314.061C177.65 314.061 175.604 312.476 174.999 310.229L145.12 197.772C144.4 195.006 146.013 192.182 148.779 191.462C151.517 190.742 154.369 192.355 155.089 195.121L179.955 288.791L231.617 94.3632H128.321L141.922 145.593C142.642 148.359 141.028 151.182 138.262 151.903C135.496 152.623 132.673 151.01 131.952 148.243L116.624 90.5311C116.221 88.9752 116.538 87.3329 117.517 86.0651C118.497 84.7973 120.024 84.0482 121.609 84.0482H238.299C239.913 84.0482 241.411 84.7973 242.391 86.0651C243.37 87.3329 243.687 88.9752 243.284 90.5311L184.937 310.229C184.332 312.505 182.286 314.061 179.952 314.061L179.984 314.061Z"
                    fill="url(#paint6_linear_1_20)"
                  />
                  <path
                    d="M145.294 183.51C143.018 183.51 140.915 181.983 140.309 179.678L136.449 165.099C135.728 162.333 137.342 159.509 140.108 158.789C142.845 158.068 145.697 159.682 146.418 162.448L150.279 177.027C150.999 179.794 149.386 182.617 146.62 183.338C146.187 183.453 145.726 183.51 145.294 183.51Z"
                    fill="url(#paint7_linear_1_20)"
                  />
                  <path
                    d="M179.984 314.061C178.457 314.061 176.959 313.398 175.95 312.101L1.14324 92.4032C-0.0957286 90.8473 -0.326235 88.744 0.538167 86.9576C1.40258 85.1712 3.21777 84.0475 5.17709 84.0475H121.639C124.491 84.0475 126.796 86.3525 126.796 89.205C126.796 92.0575 124.491 94.3626 121.639 94.3626H15.8651L184.019 305.704C185.805 307.951 185.431 311.178 183.183 312.964C182.232 313.714 181.109 314.088 179.985 314.088L179.984 314.061Z"
                    fill="url(#paint8_linear_1_20)"
                  />
                  <path
                    d="M179.984 314.061C178.86 314.061 177.708 313.686 176.786 312.937C174.538 311.151 174.193 307.924 175.95 305.676L350.787 85.978C352.573 83.7305 355.8 83.3848 358.048 85.1424C360.295 86.9289 360.641 90.1559 358.883 92.4033L184.047 312.101C183.038 313.398 181.511 314.061 180.013 314.061L179.984 314.061Z"
                    fill="url(#paint9_linear_1_20)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_20"
                      x1="116.474"
                      y1="0.0553894"
                      x2="243.486"
                      y2="0.0553894"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1_20"
                      x1="233.164"
                      y1="0.0553894"
                      x2="359.969"
                      y2="0.0553894"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1_20"
                      x1="0"
                      y1="0"
                      x2="126.85"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1_20"
                      x1="174.829"
                      y1="0.0553894"
                      x2="301.838"
                      y2="0.0553894"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_1_20"
                      x1="103.602"
                      y1="0.0553894"
                      x2="126.796"
                      y2="0.0553894"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_1_20"
                      x1="58.1389"
                      y1="0.0553894"
                      x2="185.092"
                      y2="0.0553894"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_1_20"
                      x1="116.453"
                      y1="84.0482"
                      x2="243.454"
                      y2="84.0482"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint7_linear_1_20"
                      x1="136.277"
                      y1="158.617"
                      x2="150.45"
                      y2="158.617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint8_linear_1_20"
                      x1="0.0209045"
                      y1="84.0475"
                      x2="185.148"
                      y2="84.0475"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                    <linearGradient
                      id="paint9_linear_1_20"
                      x1="174.834"
                      y1="84.0257"
                      x2="360"
                      y2="84.0257"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#905E25" />
                      <stop offset="0.5" stop-color="#F5EC8B" />
                      <stop offset="1" stop-color="#905E36" />
                    </linearGradient>
                  </defs>
                </svg>
              </Right>
            </FooterInner>
            <FooterCredits>
              <Text color="var(--white)">Website By Cameron Howson</Text>
              <Text color="var(--white)" id="credits">
                &copy; {new Date().getFullYear()} Your PA
              </Text>
            </FooterCredits>
            {colorOptions.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  document.documentElement.style.setProperty('--primary', `#${color}`)
                }}
                id={color}
                style={{
                  backgroundColor: `#${color}`,
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: 'none',
                  marginTop: '2rem',
                  marginLeft: '1rem',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  // darkens the color on hover
                  document.getElementById(color)?.style.setProperty('opacity', '0.5')
                }}
                onMouseLeave={() => {
                  document.getElementById(color)?.style.setProperty('opacity', '1')
                }}
                aria-label={`Change color to ${color}`}
              />
            ))}
          </Container>
        </Stack>
      </FooterElement>
    </FooterSection>
  )
}
export default Footer

export const Right = styled.div`
  @media (max-width: 47.9375rem) {
    position: absolute;
    right: 1rem;
  }

  svg {
    width: 5rem;
    height: 5rem;
  }
  @media (min-width: 48rem) {
    margin-left: auto;
  }
`

const LeftStack = styled(Stack)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;

  h3 {
    font-size: 35px;
  }
`

const SocialStack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
`

const SocialList = styled(Box)`
  display: flex;
  gap: 1rem;

  @media (min-width: 48rem) {
    justify-content: flex-end;
  }
`

const FooterSection = styled(Section)`
  background-color: #1a1a1a;
  padding-block-start: 6rem;
  padding-block-end: 3rem;

  p {
    opacity: 0.5;
  }
`

const FooterCredits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const FooterElement = styled.footer`
  h1 {
    max-width: 26.25rem;
  }

  a {
    text-decoration: none;
    display: block;
    width: max-content;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: var(--opacity-hover);
    }
  }
`

const FooterInner = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 100%;
  width: 100%;
  position: relative;

  @media (max-width: 47.9375rem) {
    padding-block-start: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 48rem) {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
`
