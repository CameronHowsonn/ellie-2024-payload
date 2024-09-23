import type { ContactFormBlock } from '@/types/contact-form'
import styled from 'styled-components'
import type { Media } from '@/payload-types'
import CustomImage from '@/components/image'
import ContactFormElement from '@/components/contact-form'
import Section from '@/components/section'
import Stack from '@/components/stack'
import Heading from '@/components/heading'
import Text from '@/components/text'
import Link from 'next/link'
import SocialLinks from '@/components/social-links'

interface ContactFormProps {
  block: ContactFormBlock
}

const ContactForm: React.FC<ContactFormProps> = ({ block }) => {
  return (
    <ContactFormSection ariaLabelledBy={block?.id ?? 'contact-form-title'} id="contact">
      <ContactFormContainer>
        <ContactFormGrid>
          <ContactFormLeft>
            <ContactFormElement
              title={block?.title ?? `Let's start a conversation!`}
              subtitle={
                block?.subtitle ?? `Share your ideas & propositions. I'd love to hear them!`
              }
            />
          </ContactFormLeft>
          <ContactFormRight>
            <Stack gap={4}>
              <Heading as="h2" color="var(--white)">
                Contact Me
              </Heading>
              <Stack gap={4}>
                <Stack gap={1}>
                  <Heading as={'h3'} color="var(--primary)">
                    Email
                  </Heading>
                  <Link href="mailto:ellie@your-pa.co.uk">
                    <Text fontSize={'18px'} color="var(--white)">
                      ellie@your-pa.co.uk
                    </Text>
                  </Link>
                </Stack>
                <Stack gap={1}>
                  <Heading as={'h3'} color="var(--primary)">
                    Phone
                  </Heading>
                  <Link href="tel:07415884746">
                    <Text fontSize={'18px'} color="var(--white)">
                      07415884746
                    </Text>
                  </Link>
                </Stack>
                <Stack gap={1}>
                  <Heading as={'h3'} color="var(--primary)">
                    Address
                  </Heading>
                  <address>
                    <Text fontSize={'18px'} color="var(--white)">
                      123 Fake Street
                    </Text>
                    <Text fontSize={'18px'} color="var(--white)">
                      London
                    </Text>
                    <Text fontSize={'18px'} color="var(--white)">
                      W1A 1AA
                    </Text>
                  </address>
                </Stack>
                <Stack gap={1}>
                  <Stack gap={2}>
                    <Heading as={'h3'} color="var(--primary)">
                      Socials
                    </Heading>
                    <SocialLinks showTitle={false} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ContactFormRight>
        </ContactFormGrid>
      </ContactFormContainer>
    </ContactFormSection>
  )
}

export default ContactForm

export const ContactFormSection = styled(Section)`
  background-color: var(--white);

  form {
    @media (max-width: 47.9375rem) {
      padding-block-start: 2rem;
    }
  }
`

export const ContactFormContainer = styled.div``

export const ContactFormGrid = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
  margin-inline: auto;
  max-width: 1600px;

  @media (min-width: 48rem) {
    min-height: 50rem;
  }
  img {
    display: none;
    @media (min-width: 48rem) {
      display: block;
    }
  }

  a {
    display: block;
    text-decoration: none;
    opacity: 1;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.68;
    }
  }

  @media (min-width: 48rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${Stack} {
    width: 100%;
  }
`

export const ContactFormLeft = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;

  @media (min-width: 48rem) {
    padding: 3rem 2rem;
  }
`

export const ContactFormRight = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  padding: 3rem 1.5rem 0 1.5rem;
  background-color: #1a1a1a;

  address {
    font-style: normal;
  }

  svg {
    path {
      fill: var(--white);
    }
  }

  display: flex;
  align-items: start;
  @media (min-width: 48rem) {
    padding: 7rem 5rem;
  }
`

export const FormRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 40.1875rem;

  @media (min-width: 48rem) {
    flex-wrap: nowrap;
  }
`
