import styled from 'styled-components'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <ContainerItem className={`${className} container`}>{children}</ContainerItem>
}

export default Container

const ContainerItem = styled.div`
  margin-inline: auto;
  max-width: 1600px;
  padding: 0 1.5rem;

  @media (min-width: 48rem) {
    padding: 0 4rem;
  }

  @media (min-width: 64rem) {
    padding: 0 6rem;
  }
`
