import { Nav } from './ui/nav'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  DatabaseZap,
  Receipt,
  CircleUserRound,
  Coins,
  WalletCards,
  UsersRound,
  Gauge,
  BadgeCheck,
  BarChartHorizontalBig,
  UserRound,
  ArrowRightLeftIcon
} from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { Category } from '@/types/SidebarType'
import LeriandLogoWhite from '../../public/images/leriand-logo-white.png'
import HamburguerLeft from '../../public/images/hamburguer-left.svg'
import HamburguerRight from '../../public/images/hamburguer-right.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTranslation } from 'next-export-i18n'

export const SideNavbar: FC = () => {
  const { t } = useTranslation()

  const categories: Category[] = [
    {
      links: [
        {
          title: t('sideNavBar.home'),
          href: '/',
          icon: Home,
          variant: 'default'
        }
      ]
    },
    {
      name: t('sideNavBar.organization.title'),
      links: [
        {
          title: t('sideNavBar.organization.divisions'),
          href: '/divisions',
          icon: Building2,
          variant: 'default'
        },
        {
          title: t('sideNavBar.organization.ledgers'),
          href: '/ledgers',
          icon: DatabaseZap,
          variant: 'default'
        },
        {
          title: t('sideNavBar.organization.team'),
          href: '/team',
          icon: CircleUserRound,
          variant: 'default'
        },
        {
          title: t('sideNavBar.organization.billing'),
          href: '/billing',
          icon: Receipt,
          variant: 'default'
        }
      ]
    },
    {
      name: t('sideNavBar.portfolio.title'),
      links: [
        {
          title: t('sideNavBar.portfolio.accountTypes'),
          href: '/accounts-type',
          icon: UserRound,
          variant: 'default'
        },
        {
          title: t('sideNavBar.portfolio.assets'),
          href: '/assets',
          icon: Coins,
          variant: 'default'
        },
        {
          title: t('sideNavBar.portfolio.portfolios'),
          href: '/portfolios',
          icon: WalletCards,
          variant: 'default'
        },
        {
          title: t('sideNavBar.portfolio.accounts'),
          href: '/accounts',
          icon: UsersRound,
          variant: 'default'
        }
      ]
    },
    {
      name: t('sideNavBar.transactions.title'),
      links: [
        {
          title: t('sideNavBar.transactions.transactions'),
          href: '/transactions',
          icon: ArrowRightLeftIcon,
          variant: 'default'
        },
        {
          title: t('sideNavBar.transactions.limits'),
          href: '/limits',
          icon: Gauge,
          variant: 'default'
        },
        {
          title: t('sideNavBar.transactions.governance'),
          href: '/governance',
          icon: BadgeCheck,
          variant: 'default'
        }
      ]
    },
    {
      name: t('sideNavBar.reports.title'),
      links: [
        {
          title: t('sideNavBar.reports.runReport'),
          href: '/reports',
          icon: BarChartHorizontalBig,
          variant: 'default'
        }
      ]
    }
  ]

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
    <div className="relative bg-[#F5F5F5] pb-10">
      <div
        className={cn(
          'flex h-14 items-center justify-between bg-[#F9DF4B] px-4',
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

        {isCollapsed ? (
          <Image
            src={HamburguerRight}
            alt="Hamburguer icon"
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={HamburguerLeft}
            alt="Hamburguer icon"
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        )}
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
