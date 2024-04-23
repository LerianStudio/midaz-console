import React from 'react'

type NextAuthSessionProviderProps = {
  children: React.ReactNode
}

const NextAuthSessionProvider = ({ children }: NextAuthSessionProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}