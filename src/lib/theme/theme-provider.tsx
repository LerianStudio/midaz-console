'use client'

import React from 'react'
import { script } from './script'
import { isNil } from 'lodash'

const isServer = typeof window === 'undefined'

type ThemeContextProps = {
  accentColor: string
  setAccentColor: (color: string) => void
}

const accentColorKey = 'accentColor'

const defaultContext: ThemeContextProps = {
  accentColor: '',
  setAccentColor: (_) => {}
}

const ThemeContext = React.createContext<ThemeContextProps>(defaultContext)

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [accentColor, _setAccentColor] = React.useState(
    getStorage(accentColorKey, defaultContext.accentColor)
  )

  // Handles storage change events
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === accentColorKey) {
        _setAccentColor(e.newValue || defaultContext.accentColor)
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [_setAccentColor])

  // External color setter
  const setAccentColor = (color: string) => {
    _setAccentColor(color)

    try {
      localStorage.setItem(accentColorKey, color)
    } catch {}
  }

  // Apply new color when changed
  React.useEffect(() => {
    if (!isNil(accentColor)) {
      document.documentElement.style.setProperty('--accent', accentColor)
    }
  }, [accentColor])

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${accentColor})`
        }}
      />
      <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

const getStorage = (key: string, defaultValue: string) => {
  if (isServer) {
    return defaultValue
  }

  let value
  try {
    value = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return value || defaultValue
}
