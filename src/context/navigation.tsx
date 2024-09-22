import React, { createContext, useEffect, useState } from 'react'

interface NavigationContextProps {
  isOpen: boolean
  toggle: () => void
}

interface NavigationProviderProps {
  children: React.ReactNode
}

const NavigationContext = createContext<NavigationContextProps>({
  isOpen: false,
  toggle: () => null,
})

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
    new Event('navOpen')
    isOpen ? (document.body.style.overflow = 'auto') : (document.body.style.overflow = 'hidden')
    isOpen ? document.body.classList.remove('nav-open') : document.body.classList.add('nav-open')
  }

  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = 'auto'
      document.body.classList.remove('nav-open')
      setIsOpen(false)
      if (window.innerWidth > 48 * 16) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <NavigationContext.Provider value={{ isOpen, toggle }}>{children}</NavigationContext.Provider>
  )
}

export default NavigationContext
