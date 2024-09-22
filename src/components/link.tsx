import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface LinkProps {
  href: string
  children: React.ReactNode
  disabled?: boolean
}

const CustomLink: React.FC<LinkProps> = ({ href, children, disabled }) => {
  return (
    <LinkElement href={href} disabled={disabled}>
      {children}
    </LinkElement>
  )
}

export default CustomLink

const LinkElement = styled(Link)<{
  disabled?: boolean
}>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.75;
  }
`
