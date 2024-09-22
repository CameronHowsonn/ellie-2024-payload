import styled from 'styled-components'
import Section from '@/components/section'
import Container from '@/components/container'
import Heading from '@/components/heading'
import Stack from '@/components/stack'
import Text from '@/components/text'
import useId from '@/hooks/use-id'
import Box from '@/components/box'
import Button from '@/components/button'
import Link from 'next/link'
import useGetElementHeight from '@/hooks/use-get-element-height'

const FourOhFour = () => {
  const id = useId('404')
  const headerHeight = useGetElementHeight('header')

  return (
    <FourOhFourSection ariaLabelledBy={id}>
      <Container>
        <Box textAlign="center" paddingTop={`${headerHeight}px`}>
          <Stack gap={2}>
            <Heading as="h2" color="var(--white)" id={id}>
              Oops, this page doesn&apos;t exist.
            </Heading>
            <Text className="animate">Click the button below to go back home.</Text>
            <Button as={Link} href="/" className="animate">
              Go back home
            </Button>
          </Stack>
        </Box>
      </Container>
    </FourOhFourSection>
  )
}

export default FourOhFour

const FourOhFourSection = styled(Section)`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
