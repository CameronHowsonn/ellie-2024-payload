import type { HomepageHeroBlock } from '@/types/homepage-hero'
import Container from '../container'
import Section from '../section'
import styled from 'styled-components'
import type { Media } from '@/payload-types'
import React from 'react'
import CustomImage from '@/components/image'
import Heading from '@/components/heading'
import Stack from '@/components/stack'
import SubTitle from '@/components/subtitle'
import Text from '@/components/text'
import Image from 'next/image'

interface HomepageHeroProps {
  block: HomepageHeroBlock
}

const HomepageHero: React.FC<HomepageHeroProps> = ({ block }) => {
  const heroImage = block?.hero as Media

  if (!heroImage.url || !heroImage?.alt) return null

  return (
    <HomepageHeroSection ariaLabelledBy={block?.id ?? 'homepage-hero-title'}>
      <HomepageInner>
        <Container className="hero-container">
          <TextContainer>
            <CustomImage
              src={heroImage?.url}
              alt={heroImage?.alt}
              fill
              quality={100}
              loading="eager"
              blurDataURL={heroImage?.base64 ?? undefined}
              placeholder={heroImage?.base64 ? 'blur' : 'empty'}
              style={{
                objectFit: 'cover',
              }}
            />
            <Stack gap={1} width="100%">
              <Image
                src="/logo.png"
                width={210}
                height={141}
                alt="logo"
                className="logo"
                quality={100}
              />
              <Heading as="h3" color="var(--white)" fontSize="1rem">
                {block?.heroTitle}
              </Heading>
            </Stack>
          </TextContainer>
        </Container>
      </HomepageInner>
    </HomepageHeroSection>
  )
}

export default HomepageHero

const HomepageHeroSection = styled(Section)`
  .logo {
    position: relative;
    z-index: 2;
  }

  .hero-container {
    height: 100%;
  }

  & {
    padding-block-start: 0;
    padding-block-end: 0;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  padding-block-end: 2rem;
  @media (min-width: 48rem) {
    padding-block-end: 4rem;
  }
`

const HomepageInner = styled.div`
  position: relative;
  height: 60vh;

  img {
    object-position: 60% center;
    @media (min-width: 48rem) {
      object-position: center;
    }
  }

  &::before {
    width: 80vw;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.75;
    background: linear-gradient(to right, var(--black), transparent);
  }

  h3,
  p {
    position: relative;
    z-index: 2;
  }

  h1 {
    @media (min-width: 48rem) {
      text-align: left;
      max-width: 80%;
      margin-inline-start: 0;
      margin-inline-end: auto;
    }
  }
`
