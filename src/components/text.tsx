import styled from 'styled-components'
import type {
  SpaceProps,
  LayoutProps,
  PositionProps,
  TypographyProps,
  BorderProps,
  ColorProps,
} from 'styled-system'
import { space, layout, position, typography, border, color } from 'styled-system'

export interface Props
  extends SpaceProps,
    LayoutProps,
    PositionProps,
    TypographyProps,
    BorderProps,
    ColorProps {
  variant?: 'medium'
  children?: React.ReactNode
  size?: 'small'
}

const Text = styled.p<Props>`
  font-size: var(--p-font-size);
  line-height: var(--p-mobile-line-height);
  @media (min-width: 48rem) {
    line-height: var(--p-desktop-line-height);
  }

  ${({ size }) =>
    size === 'small' &&
    `
    font-size: 0.875rem;
    `}

  ${({ variant }) =>
    variant === 'medium' &&
    `
    font-weight: 500;
    `}

  ${layout}
  ${space}
  ${position}
  ${typography}
  ${border}
  ${color}
`
export default Text
