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

const colorOptions = [
  '#B026FF',
  '#CEA2FD',
  '#7C9EBD',
  '#4B5E2F',
  '#00798C',
  '#C64191',
  '#449DD1',
  '#FF6978',
]

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
            </FooterInner>
            <FooterCredits>
              <Text color="var(--white)">Website By Cameron Howson</Text>
              <Text color="var(--white)" id="credits">
                &copy; {new Date().getFullYear()} Your PA
              </Text>
            </FooterCredits>
          </Container>
        </Stack>
      </FooterElement>
    </FooterSection>
  )
}
export default Footer

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

  @media (max-width: 47.9375rem) {
    padding-block-start: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 48rem) {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
`
