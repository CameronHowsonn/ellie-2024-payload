import Button from '@/components/button'
import Container from '@/components/container'
import Heading from '@/components/heading'
import Section from '@/components/section'
import Stack from '@/components/stack'
import Text from '@/components/text'
import { useFetchPerformances } from '@/hooks/use-get-performances'
import useId from '@/hooks/use-id'
import { SinglePerformance } from '@/payload-types'
import { PerformanceBlock } from '@/types/performances'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

interface PerformanceProps {
  block: PerformanceBlock
}

interface PerformanceCardProps {
  performance: SinglePerformance
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performance }) => {
  const performanceDate = new Date(performance.date)
  const performanceDateWithTime = performanceDate.toLocaleString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    year: 'numeric',
    month: 'long',
  })

  return (
    <PerformanceCardElement className="animate">
      <Stack
        gap={1}
        as={performance?.link ? Link : 'div'}
        href={performance?.link ? performance.link : ''}
        target={performance?.link ? '_blank' : ''}
        rel={performance?.link ? 'noopener noreferrer' : ''}
      >
        <Text
          variant="medium"
          style={{
            textTransform: 'uppercase',
          }}
          size="small"
        >
          {performanceDateWithTime} {performance?.time}
        </Text>
        <Text fontSize={'22px'} className="title">
          {performance.title}
        </Text>
        <Text opacity="0.8" className="subtitle">
          {performance?.subtitle}
        </Text>
        <Text opacity="0.6" fontSize="14px" className="description">
          {performance?.description}
        </Text>
      </Stack>
    </PerformanceCardElement>
  )
}

const PerformanceCardElement = styled.div`
  text-align: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
  max-width: 48rem;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.space[2]};

  a {
    text-decoration: none;
    transition: text-decoration 0.2s ease-in-out, opacity 0.2s ease-in-out;
    &:hover {
      text-decoration: underline;
      opacity: 0.6;
    }
    .title {
      text-decoration: underline;
    }
  }

  .subtitle {
    text-transform: capitalize;
    max-width: 85%;
    margin-inline: auto;
  }

  .description {
    max-width: 95%;
    margin-inline: auto;
  }
`
const INITIAL_LIMIT = 10

const Performances: React.FC<PerformanceProps> = ({ block }) => {
  const [type, setType] = useState<'past' | 'future'>('future')
  const [limit, setLimit] = useState(INITIAL_LIMIT)
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const { data, isLoading, isError, refetch } = useFetchPerformances(type, limit, sort)
  const id = useId('performances')

  return (
    <PerformancesSection ariaLabelledBy={id} id="performances">
      <Container>
        <Stack gap={4}>
          <Heading as="h2" color="var(--slate)">
            {block?.title}
          </Heading>
          <ButtonContainer>
            <Stack gap={0}>
              <label>
                <Text color="var(--slate)" variant="medium" size="small">
                  Sort By:
                </Text>
              </label>
              <OrderSelect onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </OrderSelect>
            </Stack>
            <div>
              <TypeButton onClick={() => setType('future')} $isActive={type === 'future'}>
                <Text color="var(--slate)" variant="medium" opacity={type === 'future' ? 1 : 0.5}>
                  Upcoming
                </Text>
              </TypeButton>
              <TypeButton onClick={() => setType('past')} $isActive={type === 'past'}>
                <Text color="var(--slate)" variant="medium" opacity={type === 'past' ? 1 : 0.5}>
                  Past
                </Text>
              </TypeButton>
            </div>
          </ButtonContainer>
          <PerformanceCardContainer>
            <Stack gap={4}>
              {isLoading && <Text textAlign="center">Loading Performances...</Text>}
              {isError && (
                <ErrorStack gap={2}>
                  <Text textAlign="center" color="var(--red)">
                    Error loading performances
                  </Text>
                  <Button color="slate" onClick={() => refetch()}>
                    Try again
                  </Button>
                </ErrorStack>
              )}
              {data?.docs?.map((performance: SinglePerformance) => (
                <PerformanceCard key={performance.id} performance={performance} />
              ))}
              {data?.docs?.length === 0 && (
                <Text textAlign="center" color="var(--slate)">
                  No performances found
                </Text>
              )}
              <ErrorStack>
                {data?.hasNextPage && (
                  <Button onClick={() => setLimit(999)} color="slate">
                    Load More
                  </Button>
                )}
                {limit === 999 && (
                  <Button onClick={() => setLimit(INITIAL_LIMIT)} color="slate">
                    Show Less
                  </Button>
                )}
              </ErrorStack>
            </Stack>
          </PerformanceCardContainer>
        </Stack>
      </Container>
    </PerformancesSection>
  )
}

export default Performances

const ErrorStack = styled(Stack)`
  text-align: center;

  button {
    margin-inline: auto;
  }
`

const PerformanceCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: nowrap;
`

const PerformancesSection = styled(Section)`
  h2 {
    max-width: 39.0625rem;
    margin: 0 auto;
    text-align: center;
  }
`

const TypeButton = styled.button<{
  $isActive: boolean
}>`
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;

  ${({ $isActive }) =>
    $isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      bottom: -0.2rem;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--slate);
    }
  `}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  max-width: 46rem;
  margin-inline: auto;
  margin-bottom: 4rem;

  > div {
    position: relative;
    &:last-of-type {
      display: flex;
      gap: 1rem;
    }
    &:not(:last-of-type) {
      &:before {
        content: '';
        position: absolute;
        bottom: -0.2rem;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--slate);
      }
    }
  }
`

const OrderSelect = styled.select`
  background: var(--white);
  border: none;
  padding: 0.5rem 0;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  font-family: var(--font-inter);
  border: none;
  color: var(--slate);

  &:focus {
    color: var(--slate);
    outline: none;
  }
`
