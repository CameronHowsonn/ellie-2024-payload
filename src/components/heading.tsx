import styled from 'styled-components'
import { TypographyProps, typography } from 'styled-system'

interface HeadingProps extends TypographyProps {
  children: React.ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: string
  id?: string
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ children, as, color, id, className }, props) => {
  return (
    <HeadingItem as={as} color={color} id={id} className={`${className} animate`} {...props}>
      {children}
    </HeadingItem>
  )
}

export default Heading

const HeadingItem = styled.h1<HeadingProps>`
  color: ${({ color }) => (color ? color : '#1A1A1A')};
  font-size: var(--${({ as }) => as}-font-size);
  line-height: var(--${({ as }) => as}-mobile-line-height);

  @media (min-width: 48rem) {
    line-height: var(--${({ as }) => as}-desktop-line-height);
  }

  ${typography}
`
