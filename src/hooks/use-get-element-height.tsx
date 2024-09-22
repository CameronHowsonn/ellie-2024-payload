import { useCallback, useEffect, useState } from 'react'

const useGetElementHeight = (className: string) => {
  const [height, setHeight] = useState<number>(0)

  const getHeight = useCallback(() => {
    const element = document.getElementsByClassName(className)[0] as HTMLElement
    if (element) {
      setHeight(element.offsetHeight)
    }
  }, [className])

  useEffect(() => {
    const element = document.getElementsByClassName(className)[0] as HTMLElement
    if (!element) {
      return
    }

    getHeight() // Get initial height

    const resizeObserver = new ResizeObserver(() => {
      getHeight()
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [className, getHeight])

  return height
}

export default useGetElementHeight
