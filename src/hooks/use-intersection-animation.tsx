import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

type UseIntersectionAnimationProps = {
  targetClass: string
  ignoreClasses?: string[]
}

const useIntersectionAnimation = ({
  targetClass,
  ignoreClasses = [],
}: UseIntersectionAnimationProps): void => {
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const mutationObserverRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const handleRouteChange = () => {
      const elements = document.querySelectorAll(`.${targetClass}`) as NodeListOf<HTMLElement>

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const shouldIgnore = ignoreClasses.some((ignoreClass) =>
              entry.target.classList.contains(ignoreClass),
            )
            if (entry.isIntersecting && !shouldIgnore) {
              requestAnimationFrame(() => {
                entry.target.classList.add('animated')
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
      )

      elements.forEach((el) => {
        observer.observe(el)
      })

      observerRef.current = observer
    }

    handleRouteChange()

    router.events.on('routeChangeComplete', handleRouteChange)

    const handleResize = () => {
      handleRouteChange()
    }

    window.addEventListener('resize', handleResize)

    const targetNode = document.body
    const config = { childList: true, subtree: true }

    const mutationCallback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          handleRouteChange()
        }
      }
    }

    const mutationObserver = new MutationObserver(mutationCallback)
    mutationObserver.observe(targetNode, config)
    mutationObserverRef.current = mutationObserver

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect()
      }
      router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [targetClass, ignoreClasses, router.events])
}

export default useIntersectionAnimation
