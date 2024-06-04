'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextProps {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }: any) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
