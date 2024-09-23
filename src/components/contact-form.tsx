import Stack from './stack'
import Text from './text'
import TextInput from './input'
import Button from './button'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import SubTitle from '@/components/subtitle'
import Heading from '@/components/heading'
import styled from 'styled-components'
import Section from '@/components/section'
import { FormRow } from '@/components/contact-form-block'
import { ContactFormBlockSchema, ContactFormBlockSchemaType } from '@/types/contact-form'

interface ContactFormPropsOne {
  title: string
  subtitle: string
}

const ContactFormElement: React.FC<ContactFormPropsOne> = ({ title, subtitle }) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const reCaptcha = useRef<ReCAPTCHA>(null)

  const methods = useForm<ContactFormBlockSchemaType>({
    resolver: zodResolver(ContactFormBlockSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const formErrors = methods.formState.errors

  async function formSubmit(data: any) {
    const captchaValue = reCaptcha?.current?.getValue()

    if (!captchaValue) {
      setFeedbackMsg('Please complete the reCAPTCHA to submit the form.')
      return
    }

    setFeedbackMsg('')
    setIsSending(true)
    setIsSuccess(false)
    setIsError(false)
    await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'Error') {
          throw new Error('Error sending email')
        }
        setIsSending(false)
        setIsSuccess(true)
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsError(true)
        setIsSending(false)
      })
  }

  return (
    <FormSection ariaLabelledBy="" id="#contact">
      <FormProvider {...methods}>
        <Form // @ts-ignore
          onSubmit={methods.handleSubmit((formData) => formSubmit(formData as any))}
        >
          <Stack gap={10}>
            <Stack gap={4}>
              <Stack gap={0}>
                <Heading as="h2" color="#1A1A1A">
                  {title}
                </Heading>
              </Stack>
              {subtitle && (
                <Text color="#1A1A1A" opacity="0.8">
                  {subtitle}
                </Text>
              )}
            </Stack>
            <Stack gap={6} className="left">
              {!isSuccess && (
                <>
                  <FormRow>
                    <Stack gap={1}>
                      <TextInput
                        label="Your name*"
                        placeholder="Enter your name"
                        required
                        id="name"
                        {...methods.register('name', {})}
                      />
                      <Text color="var(--red)">{formErrors?.name?.message}</Text>
                    </Stack>
                  </FormRow>
                  <FormRow>
                    <Stack gap={1}>
                      <TextInput
                        label="Your email*"
                        placeholder="Enter your email"
                        required
                        id="email"
                        {...methods.register('email', {})}
                      />
                      <Text color="var(--red)">{formErrors?.email?.message}</Text>
                    </Stack>
                  </FormRow>
                  <FormRow>
                    <Stack gap={1}>
                      <TextInput
                        label="Your message*"
                        placeholder="Enter your message"
                        required
                        id="message"
                        isTextArea
                        rows={5}
                        {...methods?.register('message', {})}
                      />
                      <Text color="var(--red)">{formErrors?.message?.message}</Text>
                    </Stack>
                  </FormRow>
                  <ButtonStack gap={1}>
                    <ReCAPTCHA
                      size="normal"
                      sitekey={process.env.RECAPTCHA_SITE_KEY ?? ''}
                      ref={reCaptcha}
                      onChange={(val) => {
                        methods.setValue('g-recaptcha-response', val, { shouldValidate: true })
                      }}
                    />
                    <br />
                    <Text color="var(--red)">{feedbackMsg}</Text>
                    <Button type="submit" color="white">
                      {isSending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </ButtonStack>
                </>
              )}
              {isError && (
                <Text color="var(--red)">An error occurred. Please try again later.</Text>
              )}
              {isSuccess && (
                <>
                  <Text color="var(--successGreen)">Message sent successfully!</Text>
                  <Button
                    color="white"
                    onClick={() => {
                      setIsSuccess(false)
                      methods.reset()
                    }}
                  >
                    Send another message
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Form>
      </FormProvider>
    </FormSection>
  )
}

export default ContactFormElement

const FormSection = styled(Section)`
  padding-block: 0rem 6rem;

  @media (min-width: 48rem) {
    padding-block: 4rem;
  }
`

const ButtonStack = styled(Stack)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem 0;

  button {
    margin-right: auto;
  }

  div {
    &:first-child {
      width: 100%;
    }
  }
`
