import type { CustomLayoutProps } from './box'
import styled from 'styled-components'
import Text from './text'
import ArrowIcon from '@/components/icons/arrow'
import { layout, space, color, position, typography, border, flexbox } from 'styled-system'

interface ButtonProps extends CustomLayoutProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  children: React.ReactNode
  showIcon?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
  color?: 'white' | 'slate'
}

const Button: React.FC<ButtonProps> = (
  { children, showIcon = true, onClick, color = 'white' },
  rest,
) => {
  return (
    <ButtonElement
      color={color}
      onClick={(e: any) => {
        e.currentTarget.blur()
        onClick && onClick()
      }}
      {...rest}
    >
      <Text color={`var(--${color})`} variant="medium">
        {children}
      </Text>
      <svg
        width="12"
        height="5"
        viewBox="0 0 12 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="first"
      >
        <path
          d="M8.27901 4.488C8.39234 4.19333 8.517 3.92133 8.653 3.672C8.789 3.41133 8.942 3.16767 9.112 2.941H0V1.547H9.112C8.95333 1.32033 8.80601 1.08233 8.67001 0.833001C8.53401 0.572334 8.40934 0.294667 8.29601 0H9.58801C10.2907 0.827334 11.0613 1.45633 11.9 1.887V2.618C11.0613 3.026 10.2907 3.64933 9.58801 4.488H8.27901Z"
          fill="white"
        />
      </svg>
    </ButtonElement>
  )
}

const ButtonElement = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-family: var(--font-dm-sans);
  text-decoration: none;
  justify-content: space-between;
  outline: none;
  transition: all 0.3s ease-in-out;
  border: none;
  background-color: var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  gap: 2rem;
  position: relative;

  span {
    transition: transform 0.3s;
  }

  &:hover {
    filter: brightness(1.1);
  }

  @media (min-width: 48rem) {
    font-size: 1.0625rem;
  }

  ${layout}
  ${space}
  ${color}
  ${position}
  ${typography}
  ${border}
  ${flexbox}
`

export default Button
