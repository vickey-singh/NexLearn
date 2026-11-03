
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'nexlearn-theme'

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY)

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
  } catch {
    // Use the default theme if storage is unavailable.
  }

  return 'light'
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Theme still works for the current page session.
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return { theme, setTheme, toggleTheme }
}
