'use client'

import React from 'react'
import { script } from './script'
import { isNil } from 'lodash'

const isServer = typeof window === 'undefined'

export type ThemeState = {
  logoUrl: string
  accentColor: string
}

type ThemeContextProps = ThemeState & {
  setTheme: (theme: Partial<ThemeState>) => void
}

const logoUrlKey = 'logoUrl'
const accentColorKey = 'accentColor'

const defaultContext: ThemeContextProps = {
  logoUrl: '',
  accentColor: '',
  setTheme: (_) => {}
}

const ThemeContext = React.createContext<ThemeContextProps>(defaultContext)

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, _setTheme] = React.useReducer(
    (prev: ThemeState, state: Partial<ThemeState>) => ({ ...prev, ...state }),
    {
      logoUrl: getStorage(logoUrlKey, defaultContext.logoUrl),
      accentColor: getStorage(accentColorKey, defaultContext.accentColor)
    }
  )

  // Handles storage change events
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === accentColorKey) {
        _setTheme({
          [accentColorKey]: e.newValue || defaultContext.accentColor
        })
      }
      if (e.key === logoUrlKey) {
        _setTheme({ [logoUrlKey]: e.newValue || defaultContext.logoUrl })
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [_setTheme])

  const _save = (theme: Partial<ThemeState>) => {
    try {
      if (!isNil(theme.accentColor)) {
        localStorage.setItem(accentColorKey, theme.accentColor)

        document.documentElement.style.setProperty(
          '--accent',
          theme.accentColor
        )
      }

      if (!isNil(theme.logoUrl)) {
        localStorage.setItem(logoUrlKey, theme.logoUrl)
      }
    } catch {}
  }

  const setTheme = (theme: Partial<ThemeState>) => {
    _setTheme(theme)
  }

  React.useEffect(() => {
    _save(theme)
  }, [theme])

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${theme.accentColor})`
        }}
      />
      <ThemeContext.Provider value={{ ...theme, setTheme }}>
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
