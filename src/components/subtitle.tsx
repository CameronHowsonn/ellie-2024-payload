import React from 'react'
import styled from 'styled-components'
import Text from './text'
import type { Props } from './text'

interface SubTitleProps extends Props {
  children: React.ReactNode
  className?: string
  opacity?: number
}

const SubTitle: React.FC<SubTitleProps> = ({ children, className, opacity }) => {
  return (
    <SubTitleElement className={`${className} animate`} opacity={opacity}>
      {children}
    </SubTitleElement>
  )
}

const SubTitleElement = styled(Text)`
  font-size: var(--subtitle-font-size);
  position: relative;
  padding-inline-start: 2rem;
  opacity: 1;
  display: flex;
  align-items: center;
  color: var(--purple);

  &::before {
    content: '';
    display: block;
    width: 1.25rem;
    height: 1px;
    background-color: var(--purple);
    margin-right: 1rem;
    position: absolute;
    top: 50%;
    left: 0;
  }
`

export default SubTitle
