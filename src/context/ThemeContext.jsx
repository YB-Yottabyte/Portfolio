import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') !== 'dark')

  useEffect(() => {
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }, [isLight])

  return (
    <ThemeContext.Provider value={{ isLight, toggle: () => setIsLight(v => !v) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
