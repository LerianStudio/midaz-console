import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'
import { useRouter } from 'next/router'
import ory from '../pkg/sdk'

interface AuthContextType {
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    ory
      .toSession()
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch(() => {
        router.push('/login')
      })
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
