import Box from '@/components/box'
import Container from '@/components/container'
import Heading from '@/components/heading'
import CustomImage from '@/components/image'
import RichText from '@/components/richtext'
import Section from '@/components/section'
import Stack from '@/components/stack'
import Text from '@/components/text'
import useId from '@/hooks/use-id'
import { Media } from '@/payload-types'
import { BiographyBlock } from '@/types/biography'
import Image from 'next/image'
import styled from 'styled-components'
import parse, { domToReact } from 'html-react-parser'
import UseIsMobile from '@/hooks/use-is-mobile'
import { useRef, useState } from 'react'
import Button from '@/components/button'
import Link from 'next/link'
import useParallax from '@/hooks/use-parallax'

interface BiographyProps {
  block: BiographyBlock
}

const Biography: React.FC<BiographyProps> = ({ block }) => {
  const ref = useRef<any>()
  const { transform } = useParallax(ref, {
    direction: 'down',
    intensity: 0.05,
  })

  const { transform: secondTransform } = useParallax(ref, {
    direction: 'up',
    intensity: 0.075,
  })
  const id = useId('biography')
  const isMobile = UseIsMobile()
  const image = block?.image as Media
  const imageTwo = block?.imageSmall as Media
  const text = block?.subtext_html

  return (
    <OffsetSection ariaLabelledBy={id} id="about">
      <Container>
        <BiographyGrid>
          <ContentStack gap={[2, 2, 4]} ref={ref}>
            <Stack gap={4} className="biography-content">
              <Heading as={'h2'} id={id}>
                {block?.title}
              </Heading>
              {text && <RichText text={text} />}
              <Link href="#contact">
                <Button>Get in touch</Button>
              </Link>
            </Stack>
          </ContentStack>
          {image?.url && image?.alt && (
            <ImageContainer
              className="first-image"
              style={{
                transform,
              }}
            >
              <CustomImage
                src={image?.url}
                alt={image?.alt}
                width={472 * 3}
                height={690 * 3}
                blurDataURL={image?.base64 ?? undefined}
                placeholder={image?.base64 ? 'blur' : 'empty'}
                quality={100}
              />
            </ImageContainer>
          )}
          {imageTwo?.url && imageTwo?.alt && (
            <ImageContainer
              className="second-image"
              style={{
                transform: secondTransform,
              }}
            >
              <CustomImage
                src={imageTwo?.url}
                alt={imageTwo?.alt}
                width={214 * 4}
                height={313 * 4}
                blurDataURL={imageTwo?.base64 ?? undefined}
                placeholder={imageTwo?.base64 ? 'blur' : 'empty'}
                quality={100}
                className="second-img"
              />
            </ImageContainer>
          )}
        </BiographyGrid>
      </Container>
    </OffsetSection>
  )
}

export default Biography

const ContentStack = styled(Stack)`
  a {
    display: inline-block;
    text-decoration: none;
  }

  @media (min-width: 64rem) {
    display: grid;
    grid-template-rows: 0rem 9rem auto;
    justify-content: space-between;

    .biography-subtitle {
      grid-area: 1 / 1 / 2 / 6;
    }

    h2 {
      grid-area: 2 / 1 / 3 / 6;
      max-width: 31rem;
    }

    .biography-content {
      max-width: 34.9375rem;
      grid-area: 3 / 4 / 5 / 6;
      margin-left: auto;
    }

    #biography-quote {
      grid-area: 6 / 5 / 7 / 6;
    }
  }
`

const BiographyGrid = styled.div`
  @media (min-width: 64rem) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 4rem;
    align-items: center;
  }
`

const ImageContainer = styled.div`
  justify-content: flex-end;
  grid-column: 2;
  grid-row: 1;
  will-change: transform;

  @media (min-width: 64rem) {
    aspect-ratio: 0.684057971;
  }

  &.first-image {
    margin-top: 2rem;
    img {
      @media (max-width: 47.9375rem) {
        max-height: 290px;
      }
    }
    @media (max-width: 47.9375rem) {
      margin-left: auto;
      width: 80%;
    }
  }

  &.second-image {
    aspect-ratio: 0.6837060703;
    max-width: 214px;
    position: relative;
    height: auto;
    width: 30%;
    top: 20%;
    @media (max-width: 63.9375rem) {
      right: 0;
      left: auto;
      display: block;
      margin-right: auto;
    }
  }

  @media (min-width: 64rem) {
    display: flex;
  }

  @media (min-width: 90rem) {
    margin-inline-end: 4rem;
  }

  img {
    max-height: 690px;
    object-fit: cover;
    height: auto;
    border-radius: 10px;
    width: 100%;

    @media (max-width: 63.9375rem) {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    @media (min-width: 48rem) {
      width: 100%;
      max-width: 29.5rem;
    }
  }
`

const OffsetSection = styled(Section)`
  background-color: var(--tallisGrey);

  @media (max-width: 47.9375rem) {
    padding-block-end: 0;
  }
`
