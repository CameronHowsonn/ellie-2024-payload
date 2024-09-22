import { useEffect, useState } from 'react'

const UseHasWindow = () => {
  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    setHasWindow(true)
  }, [])

  return hasWindow
}

export default UseHasWindow
