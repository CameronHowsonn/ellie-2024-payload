import Container from '@/components/container'
import Heading from '@/components/heading'
import RichText from '@/components/richtext'
import Section from '@/components/section'
import Stack from '@/components/stack'
import { ServciesBlock } from '@/types/services-block'
import styled from 'styled-components'
import ServiceIconMapper from '@/components/service-icon-mapper'
import UseIsMobile from '@/hooks/use-is-mobile'

interface ServicesProps {
  block: ServciesBlock
}

const Services: React.FC<ServicesProps> = ({ block }) => {
  const isMobile = UseIsMobile()

  return (
    <ServicesSection ariaLabelledBy={block?.id || 'services-title'} id="services">
      <Container>
        <Stack gap={[4, 4, 2]}>
          {block?.title && (
            <Heading as="h2" id={block?.id || 'services-title'} className="animate">
              {block?.title}
            </Heading>
          )}
          <ServicesGrid>
            {block?.services.map((service, index) => (
              <Stack
                key={service.id}
                gap={2}
                className="animate"
                style={{
                  transitionDelay: isMobile ? '0.2s' : `${index * 0.2}s`,
                }}
              >
                <ServiceIconMapper icon={service?.icon} />
                <Heading as="h3" fontWeight={600} fontSize={'32px'}>
                  {service.title}
                </Heading>
                <RichText text={service?.description_html} />
              </Stack>
            ))}
          </ServicesGrid>
        </Stack>
      </Container>
    </ServicesSection>
  )
}

export default Services

const ServicesSection = styled(Section)`
  @media (max-width: 47.9375rem) {
    padding-block-start: 0;
  }

  h2&:not(#services-title) {
    font-size: 32px;
  }

  svg {
    width: auto;
    height: 3.5rem;
    @media (min-width: 48rem) {
      height: 5rem;
    }
    path {
      fill: var(--primary);
    }
  }
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 4rem;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-block: 4rem 6rem;
  }
`
