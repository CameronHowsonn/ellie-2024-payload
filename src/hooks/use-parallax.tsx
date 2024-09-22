import { useEffect, useState } from 'react'
import UseIsMobile from './use-is-mobile'

interface ParallaxOptions {
  intensity?: number
  direction?: 'up' | 'down'
  allowMobile?: boolean
}

interface ParallaxResult {
  transform: string
}

const useParallax = (
  ref: React.RefObject<HTMLElement | undefined>,
  options: ParallaxOptions = {},
): ParallaxResult => {
  const { intensity = 0.075, direction = 'up' } = options
  const [transform, setTransform] = useState('translateY(0)')
  const isMobile = UseIsMobile()

  useEffect(() => {
    let animationFrameId: number

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const translateY = direction === 'down' ? scrollY * intensity : -scrollY * intensity
        setTransform(`translateY(${translateY}px)`)
      })
    }

    const element = ref.current
    if (element) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [ref, intensity, direction])

  if (isMobile && options.allowMobile) {
    return { transform: 'none' }
  }

  return { transform }
}

export default useParallax
