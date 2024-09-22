import styled from 'styled-components'
import type {
  SpaceProps,
  LayoutProps,
  PositionProps,
  TypographyProps,
  BorderProps,
  FlexboxProps,
  ColorProps,
} from 'styled-system'
import { space, layout, color, position, typography, border, flexbox } from 'styled-system'

export interface CustomLayoutProps
  extends SpaceProps,
    LayoutProps,
    ColorProps,
    PositionProps,
    TypographyProps,
    BorderProps,
    FlexboxProps {}

const Box = styled.div<CustomLayoutProps>`
  ${layout}
  ${space}
  ${color}
  ${position}
  ${typography}
  ${border}
  ${flexbox}
`

export default Box
