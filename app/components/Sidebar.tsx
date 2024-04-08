'use client'

import { Nav } from '@/components/ui/nav'
import { useEffect, useState } from 'react'
import LeriandLogoWhite from '../../public/images/leriand-logo-white.png'
import HamburguerLeft from '../../public/images/hamburguer-left.svg'
import HamburguerRight from '../../public/images/hamburguer-right.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Category } from '@/types/SidebarType'
import {
  ArrowRightLeftIcon,
  BadgeCheck,
  BarChartHorizontalBig,
  Building2,
  CircleUserRound,
  Coins,
  DatabaseZap,
  Gauge,
  Home,
  Menu,
  Receipt,
  UserRound,
  UsersRound,
  WalletCards
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export const Sidebar = () => {
  const t = useTranslations('sideNavBar')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileWidth, setIsMobileWidth] = useState(false)

  const categories: Category[] = [
    {
      links: [
        {
          title: t('home'),
          href: '/',
          icon: Home,
          variant: 'default'
        }
      ]
    },
    {
      name: t('organization.title'),
      links: [
        {
          title: t('organization.divisions'),
          href: '/divisions',
          icon: Building2,
          variant: 'default'
        },
        {
          title: t('organization.ledgers'),
          href: '/ledgers',
          icon: DatabaseZap,
          variant: 'default'
        },
        {
          title: t('organization.team'),
          href: '/team',
          icon: CircleUserRound,
          variant: 'default'
        },
        {
          title: t('organization.billing'),
          href: '/billing',
          icon: Receipt,
          variant: 'default'
        }
      ]
    },
    {
      name: t('portfolio.title'),
      links: [
        {
          title: t('portfolio.accountTypes'),
          href: '/accounts-type',
          icon: UserRound,
          variant: 'default'
        },
        {
          title: t('portfolio.assets'),
          href: '/assets',
          icon: Coins,
          variant: 'default'
        },
        {
          title: t('portfolio.portfolios'),
          href: '/portfolios',
          icon: WalletCards,
          variant: 'default'
        },
        {
          title: t('portfolio.accounts'),
          href: '/accounts',
          icon: UsersRound,
          variant: 'default'
        }
      ]
    },
    {
      name: t('transactions.title'),
      links: [
        {
          title: t('transactions.transactions'),
          href: '/transactions',
          icon: ArrowRightLeftIcon,
          variant: 'default'
        },
        {
          title: t('transactions.limits'),
          href: '/limits',
          icon: Gauge,
          variant: 'default'
        },
        {
          title: t('transactions.governance'),
          href: '/governance',
          icon: BadgeCheck,
          variant: 'default'
        }
      ]
    },
    {
      name: t('reports.title'),
      links: [
        {
          title: t('reports.runReport'),
          href: '/reports',
          icon: BarChartHorizontalBig,
          variant: 'default'
        }
      ]
    }
  ]

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
    <div className="relative bg-[#F5F5F5] pb-10 dark:bg-codGray-950">
      <div
        className={cn(
          'flex h-14 items-center justify-between bg-lemon-400 px-4 dark:bg-codGray-950',
          {
            'justify-center': isCollapsed
          }
        )}
      >
        {!isCollapsed && (
          <Image
            src={LeriandLogoWhite}
            alt="Leriand Logo"
            height={37}
            width={37}
          />
        )}

        <Menu className="cursor-pointer" onClick={toggleSidebar} />
      </div>

      <div className="px-5">
        <Nav
          isCollapsed={isMobileWidth ? true : isCollapsed}
          categories={categories}
        />
      </div>
    </div>
  )
}
