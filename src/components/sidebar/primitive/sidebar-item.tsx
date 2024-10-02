'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarItemButton } from './sidebar-item-button'
import { SidebarItemIconButton } from './sidebar-item-icon-button'
import { useSidebar } from './sidebar-provider'

type SidebarItemProps = {
  title: string
  icon: React.ReactNode
  href: string
}

export const SidebarItem = ({ href, ...others }: SidebarItemProps) => {
  const pathName = usePathname()
  const { isCollapsed } = useSidebar()

  const isActive = (href: string) => pathName === href

  if (isCollapsed) {
    return (
      <SidebarItemIconButton href={href} active={isActive(href)} {...others} />
    )
  }

  return <SidebarItemButton href={href} active={isActive(href)} {...others} />
}
