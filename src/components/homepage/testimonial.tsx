import Container from '@/components/container'
import RichText from '@/components/richtext'
import Section from '@/components/section'
import Stack from '@/components/stack'
import Text from '@/components/text'
import { TestimonialBlock } from '@/types/testimonial'
import styled from 'styled-components'

interface TestimonialBlockProps {
  block: TestimonialBlock
}

const Testimonial: React.FC<TestimonialBlockProps> = ({ block }) => {
  return (
    <TestimonialSection ariaLabelledBy={block?.id || 'testimonial-block'} id="testimonial">
      <Container>
        <TestimonialStack gap={2}>
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
          <RichText text={block?.quote_html} color="var(--white)" />
          <Text fontWeight={600} id={block?.id || 'testimonial-block'}>
            {block?.author}
          </Text>
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
        </TestimonialStack>
      </Container>
    </TestimonialSection>
  )
}

export default Testimonial

const TestimonialSection = styled(Section)`
  background-color: var(--primary);
  min-height: 369px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    &:first-of-type {
      position: absolute;
      top: -3rem;
      @media (min-width: 48rem) {
        top: -2rem;
        left: -3rem;
      }
    }
    &:last-of-type {
      position: absolute;
      transform: rotate(180deg);
      @media (min-width: 48rem) {
        bottom: 1rem;
        right: -4rem;
      }
    }
  }
`

const TestimonialStack = styled(Stack)`
  text-align: center;
  position: relative;
  max-width: 45.5625rem;
  margin-inline: auto;
  p {
    font-family: var(--font-raleway);
    &:first-of-type {
      font-size: 18px;
    }
    color: var(--white);
  }
`
