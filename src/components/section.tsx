import styled from 'styled-components'

interface SectionProps {
  children: React.ReactNode
  ariaLabelledBy: string
  id?: string
  className?: string
}

const Section: React.FC<SectionProps> = ({ children, ariaLabelledBy, id, className }) => {
  return (
    <SectionContainer aria-labelledby={ariaLabelledBy} id={id} className={className}>
      {children}
    </SectionContainer>
  )
}

export default Section

const SectionContainer = styled.section`
  margin: 0 auto;
  position: relative;
  padding-block: 4rem;
`
