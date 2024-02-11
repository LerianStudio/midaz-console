'use client'

import { Nav } from './ui/nav'

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  UsersRound
} from 'lucide-react'
import { Button } from './ui/button'
import { FC, useState } from 'react'
import { Category } from '@/types/SidebarType'
import { useWindowWidth } from '@react-hook/window-size'

const categories: Category[] = [
  {
    name: 'Dashboard',
    links: [
      {
        title: 'Overview',
        href: '/',
        icon: LayoutDashboard,
        variant: 'default'
      }
    ]
  },
  {
    name: 'Payments',
    links: [
      {
        title: 'Ledgers',
        href: '/ledgers',
        icon: LayoutDashboard,
        variant: 'default'
      },
      {
        title: 'Transactions',
        href: '/transactions',
        icon: ShoppingCart,
        variant: 'default'
      },
      {
        title: 'Accounts',
        href: '/accounts',
        icon: UsersRound,
        variant: 'default'
      }
    ]
  }
]

export const SideNavbar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 768

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="relative border-r bg-gray-100 px-5 pb-10 pt-20">
      {!mobileWidth && (
        <div className="absolute right-[-15px] top-4">
          <Button
            variant="secondary"
            className="h-[32px] w-[32px] rounded-full border p-2"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        categories={categories}
      />
    </div>
  )
}
