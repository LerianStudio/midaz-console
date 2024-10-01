import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarItemButton } from './sidebar-item-button'
import { SidebarItemIconButton } from './sidebar-item-icon-button'

type SidebarItemProps = {
  title: string
  icon: React.ReactNode
  href: string
  collapsed?: boolean
}

export const SidebarItem = ({
  href,
  collapsed,
  ...others
}: SidebarItemProps) => {
  const pathName = usePathname()

  const isActive = (href: string) => pathName === href

  if (collapsed) {
    return (
      <SidebarItemIconButton href={href} active={isActive(href)} {...others} />
    )
  }

  return <SidebarItemButton href={href} active={isActive(href)} {...others} />
}
