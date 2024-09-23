import styled from 'styled-components'
import type { Props } from './text'
import { layout, space, position, typography, border, color } from 'styled-system'
export interface RichTextProps extends Props {
  text: any
  className?: string
}

const RichText: React.FC<RichTextProps> = ({ text, color, className }, rest) => {
  return (
    <RichTextSpan
      dangerouslySetInnerHTML={{ __html: text }}
      className={`animate ${className}`}
      color={color}
      {...rest}
    />
  )
}

export default RichText

export const RichTextSpan = styled.span<Props>`
  ${layout}
  ${space}
  ${position}
  ${typography}
  ${border}
  ${color}
  font-size: var(--p-font-size);
  line-height: 1.5;
  display: block;
`
