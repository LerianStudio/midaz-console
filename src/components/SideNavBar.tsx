'use client'

import { Nav } from './ui/nav'

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ArrowRightLeft,
  Network,
  Landmark
} from 'lucide-react'
import { Button } from './ui/button'
import { FC, useEffect, useState } from 'react'
import { Category } from '@/types/SidebarType'

export const categories: Category[] = [
  {
    name: 'Dashboard',
    links: [
      {
        title: 'Overview',
        href: '/overview',
        icon: LayoutDashboard,
        variant: 'default'
      }
    ]
  },
  {
    name: 'Ledgers',
    links: [
      {
        title: 'Ledgers',
        href: '/ledgers',
        icon: Landmark,
        variant: 'default'
      },
      {
        title: 'Transactions',
        href: '/transactions',
        icon: ArrowRightLeft,
        variant: 'default'
      },
      {
        title: 'Accounts',
        href: '/accounts',
        icon: Network,
        variant: 'default'
      }
    ]
  }
]

export const SideNavbar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileWidth, setIsMobileWidth] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="relative border-r bg-gray-100 px-5 pb-10 pt-20">
      <div className="absolute right-[-15px] top-4">
        <Button
          variant="secondary"
          className="h-[32px] w-[32px] rounded-full border p-2"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={isMobileWidth ? true : isCollapsed}
        categories={categories}
      />
    </div>
  )
}
