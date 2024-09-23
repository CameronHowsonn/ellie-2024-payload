import styled from 'styled-components'
import type { Props } from './text'
import { layout, space, position, typography, border } from 'styled-system'
import Stack from '@/components/stack'
export interface RichTextProps extends Props {
  text: any
  className?: string
}

const RichText: React.FC<RichTextProps> = ({ text, className }) => {
  return (
    <RichTextSpan
      dangerouslySetInnerHTML={{ __html: text }}
      className={`animate-opaque ${className}`}
      gap={4}
    />
  )
}

export default RichText

export const RichTextSpan = styled(Stack)<Props>`
  ${layout}
  ${space}
  ${position}
  ${typography}
  ${border}
  font-size: var(--p-font-size);
  opacity: 0.5;
  line-height: 1.5;
  display: block;

  > * + * {
    margin-top: 1.5rem;
  }
`
