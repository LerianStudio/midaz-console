'use client'

import { Nav } from '@/components/ui/nav'
import { useEffect, useState } from 'react'
import LeriandLogo from '../../public/svg/brand-leriand-symbol.svg'
import FullLeriandLogo from '../../public/svg/full-brand-leriand.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Category } from '@/types/SidebarType'
import {
  ArrowLeftRight,
  BarChartHorizontal,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Coins,
  DatabaseZap,
  DollarSign,
  Gauge,
  Group,
  Home,
  Menu,
  PanelLeftClose,
  PanelRightClose,
  ShieldCheck,
  UserCircle,
  UsersRound
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

export const Sidebar = () => {
  const t = useTranslations('sideNavBar')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
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
          icon: UsersRound,
          variant: 'default'
        },
        {
          title: t('organization.billing'),
          href: '/billing',
          icon: DollarSign,
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
          icon: UserCircle,
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
          icon: Briefcase,
          variant: 'default'
        },
        {
          title: t('portfolio.accounts'),
          href: '/accounts',
          icon: Group,
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
          icon: ArrowLeftRight,
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
          icon: ShieldCheck,
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
          icon: BarChartHorizontal,
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
    <div className="shadow-sidebar relative flex flex-col justify-between bg-white dark:bg-codGray-950">
      <div>
        <div
          data-collapsed={isCollapsed}
          className={cn(
            'bg-energyYellow-300 flex items-center justify-between p-3 data-[collapsed=false]:pl-4 dark:bg-codGray-950',
            {
              'justify-center': isCollapsed
            }
          )}
        >
          {!isCollapsed && (
            <Image src={FullLeriandLogo} alt="Leriand Logo" height={36} />
          )}

          {isCollapsed && (
            <Image src={LeriandLogo} alt="Leriand Logo" height={36} />
          )}
        </div>

        <div className="px-3">
          <Nav
            isCollapsed={isMobileWidth ? true : isCollapsed}
            categories={categories}
          />
        </div>
      </div>

      {!isMobileWidth && !isCollapsed && (
        <div className="border-shadcn-200 flex w-full">
          <div className="absolute bottom-4 right-[-20px] ">
            <Button
              variant="white"
              className="border-shadcn-200 rounded-full border p-2"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
            </Button>
          </div>
        </div>
      )}

      {!isMobileWidth && isCollapsed && (
        <div className="border-shadcn-200 flex w-full justify-center border-t p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="hover:bg-shadcn-300 group bg-transparent p-2 text-black"
                  onClick={toggleSidebar}
                >
                  {isCollapsed ? (
                    <PanelRightClose className="group-hover:text-white" />
                  ) : (
                    <PanelLeftClose />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Ampliar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  )
}
