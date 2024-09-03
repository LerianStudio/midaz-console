import { Category } from '@/types/sidebar-type'
import {
  ArrowLeftRight,
  BarChartHorizontal,
  Box,
  Briefcase,
  Coins,
  DatabaseZap,
  DollarSign,
  Home,
  UsersRound
} from 'lucide-react'

export const getSidebarItems = (t: any): Category[] => {
  return [
    {
      links: [
        {
          title: t('home'),
          href: '/',
          icon: Home,
          variant: 'default'
        },
        {
          title: t('ledgers'),
          href: '/ledgers',
          icon: DatabaseZap,
          variant: 'default'
        },
        {
          title: t('team'),
          href: '/team',
          icon: UsersRound,
          variant: 'default'
        }
      ]
    },
    {
      name: t('accountHolders.title'),
      links: [
        {
          title: t('accountHolders.products'),
          href: '/products',
          icon: Box,
          variant: 'default'
        },
        {
          title: t('accountHolders.accounts'),
          href: '/accounts',
          icon: Coins,
          variant: 'default'
        },
        {
          title: t('accountHolders.portfolios'),
          href: '/portfolios',
          icon: Briefcase,
          variant: 'default'
        }
      ]
    },
    {
      name: t('transactions.title'),
      links: [
        {
          title: t('transactions.types'),
          href: '/types',
          icon: DollarSign,
          variant: 'default'
        },
        {
          title: t('transactions.resume'),
          href: '/resume',
          icon: ArrowLeftRight,
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
}
