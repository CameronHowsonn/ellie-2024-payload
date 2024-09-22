import Image from 'next/image'
import styled from 'styled-components'

type Ran<T extends number> = number extends T ? number : _Range<T, []>
type _Range<T extends number, R extends unknown[]> = R['length'] extends T
  ? R[number]
  : _Range<T, [R['length'], ...R]>

interface CustomImageProps {
  src: string
  alt: string
  fill?: boolean
  quality?: Ran<101>
  loading?: 'eager' | 'lazy'
  blurDataURL?: string
  placeholder?: 'blur' | 'empty'
  style?: React.CSSProperties
  width?: number
  height?: number
  className?: string
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fill,
  quality,
  loading,
  blurDataURL,
  placeholder,
  style,
  width,
  height,
  className,
}) => {
  return (
    <CustomImageElement
      src={src}
      alt={alt}
      fill={fill ?? undefined}
      quality={quality ?? 85}
      loading={loading ?? 'lazy'}
      blurDataURL={blurDataURL ?? undefined}
      placeholder={placeholder ?? undefined}
      style={style ?? undefined}
      width={width ?? undefined}
      height={height ?? undefined}
      className={className ?? undefined}
    />
  )
}

export default CustomImage

const CustomImageElement = styled(Image)``
