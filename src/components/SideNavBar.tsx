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

export const SideNavbar: FC = () => {
  const categories: Category[] = [
    {
      links: [
        {
          title: 'Home',
          href: '/',
          icon: Home,
          variant: 'default'
        }
      ]
    },
    {
      name: 'Organização',
      links: [
        {
          title: 'Divisões',
          href: '/divisions',
          icon: Building2,
          variant: 'default'
        },
        {
          title: 'Ledgers',
          href: '/ledgers',
          icon: DatabaseZap,
          variant: 'default'
        },
        {
          title: 'Time',
          href: '/team',
          icon: CircleUserRound,
          variant: 'default'
        },
        {
          title: 'Faturamento',
          href: '/billing',
          icon: Receipt,
          variant: 'default'
        }
      ]
    },
    {
      name: 'Portfólio',
      links: [
        {
          title: 'Tipos de conta',
          href: '/accounts-type',
          icon: UserRound,
          variant: 'default'
        },
        {
          title: 'Instrumentos',
          href: '/instruments',
          icon: Coins,
          variant: 'default'
        },
        {
          title: 'Portfólios',
          href: '/portfolios',
          icon: WalletCards,
          variant: 'default'
        },
        {
          title: 'Contas',
          href: '/accounts',
          icon: UsersRound,
          variant: 'default'
        }
      ]
    },
    {
      name: 'Transactions',
      links: [
        {
          title: 'Transações',
          href: '/transactions',
          icon: ArrowRightLeftIcon,
          variant: 'default'
        },
        {
          title: 'Limites',
          href: '/limits',
          icon: Gauge,
          variant: 'default'
        },
        {
          title: 'Governança',
          href: '/governance',
          icon: BadgeCheck,
          variant: 'default'
        }
      ]
    },
    {
      name: 'Relatórios',
      links: [
        {
          title: 'Extrair',
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
