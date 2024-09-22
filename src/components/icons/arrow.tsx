interface IconProps {
  color: 'white' | 'slate'
}

const ArrowIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.75923 11.2102L5.73651 10.1988L9.28764 6.64768H0.367188V5.17041H9.28764L5.73651 1.62496L6.75923 0.60791L12.0604 5.90905L6.75923 11.2102Z"
      fill={color === 'white' ? 'white' : 'var(--slate)'}
    />
  </svg>
)

export default ArrowIcon
