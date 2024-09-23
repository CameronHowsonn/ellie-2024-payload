import Container from '@/components/container'
import RichText from '@/components/richtext'
import Section from '@/components/section'
import Stack from '@/components/stack'
import Text from '@/components/text'
import { TestimonialBlock } from '@/types/testimonial'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import { useRef } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import Heading from '@/components/heading'

interface TestimonialBlockProps {
  block: TestimonialBlock
}

const Testimonial: React.FC<TestimonialBlockProps> = ({ block }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <TestimonialSection ariaLabelledBy={block?.id || 'testimonial-block'} id="testimonial">
      <Container>
        <TestimonialStack>
          <SwiperContainer>
            <svg
              width="41"
              height="33"
              viewBox="0 0 41 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate"
            >
              <path
                opacity="0.5"
                d="M15.0254 0.749998L12.2754 16H17.2754V32.875H0.400391V15.75L4.90039 0.749998H15.0254ZM38.5254 0.749998L35.7754 16H40.7754V32.875H23.9004V15.75L28.4004 0.749998H38.5254Z"
                fill="white"
              />
            </svg>
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              pagination={{
                el: '.swiper-pagination-container',
                clickable: true,
              }}
            >
              {block?.testimonials?.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <Stack gap={1}>
                    {testimonial?.title && (
                      <Heading as="h5" fontStyle="italic" color="var(--white)">
                        {'" '}
                        {testimonial?.title}
                        {' "'}
                      </Heading>
                    )}
                    <RichText
                      text={testimonial?.quote_html}
                      color="var(--white)"
                      className="testimonial-text"
                    />
                    <Text fontWeight={600} id={block?.id || 'testimonial-block'} className="author">
                      {testimonial?.author}
                    </Text>
                  </Stack>
                </SwiperSlide>
              ))}
            </Swiper>
            <svg
              width="41"
              height="33"
              viewBox="0 0 41 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate"
            >
              <path
                opacity="0.5"
                d="M15.0254 0.749998L12.2754 16H17.2754V32.875H0.400391V15.75L4.90039 0.749998H15.0254ZM38.5254 0.749998L35.7754 16H40.7754V32.875H23.9004V15.75L28.4004 0.749998H38.5254Z"
                fill="white"
              />
            </svg>
          </SwiperContainer>
          <DotContainer className="swiper-pagination-container"></DotContainer>
        </TestimonialStack>
      </Container>
    </TestimonialSection>
  )
}

export default Testimonial

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);

  span {
    cursor: pointer;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--white);
  }
`

const SwiperContainer = styled.div`
  position: relative;
  width: 100%;

  .testimonial-text {
    max-width: 85%;
    margin-inline: auto;
    @media (min-width: 48rem) {
      max-width: 45.5625rem;
    }
  }

  .author {
    font-style: italic;
  }

  h5 {
    font-weight: 600;
    margin-left: auto;
    text-align: center;
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
`

const TestimonialSection = styled(Section)`
  background-color: var(--primary);
  min-height: 369px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-block: 6rem;

  .swiper-container {
    width: 100%;
    overflow: hidden;
  }

  .swiper-slide {
    width: 100% !important;
  }

  .swiper {
    position: relative;
    &-wrapper {
    }
  }

  svg {
    &:first-of-type {
      position: absolute;
      top: -3rem;
      left: 50%;
      transform: translateX(-50%);
      @media (min-width: 48rem) {
        top: -2rem;
        left: -3rem;
        transform: none;
      }
    }
    &:last-of-type {
      position: absolute;
      transform: rotate(180deg);
      display: none;
      @media (min-width: 48rem) {
        bottom: 1rem;
        right: -4rem;
        display: block;
      }
    }
  }
`

const TestimonialStack = styled.div`
  text-align: center;
  margin-inline: auto;

  .swiper {
    width: 100%;
    @media (min-width: 48rem) {
      max-width: 45.5625rem;
    }
    &-wrapper {
      align-items: center;
    }
  }

  p {
    font-family: var(--font-raleway);
    &:first-of-type {
      font-size: 18px;
    }
    color: var(--white);
  }
`
