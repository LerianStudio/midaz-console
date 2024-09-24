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

export const getSidebarItems = (intl: any): Category[] => {
  return [
    {
      links: [
        {
          title: intl.formatMessage({
            id: 'sideBar.home',
            defaultMessage: 'Home'
          }),
          href: '/',
          icon: Home,
          variant: 'default'
        },
        {
          title: intl.formatMessage({
            id: 'sideBar.ledgers',
            defaultMessage: 'Ledgers'
          }),
          href: '/ledgers',
          icon: DatabaseZap,
          variant: 'default'
        },
        {
          title: intl.formatMessage({
            id: 'sideBar.team',
            defaultMessage: 'Team'
          }),
          href: '/team',
          icon: UsersRound,
          variant: 'default'
        }
      ]
    },
    {
      name: intl.formatMessage({
        id: 'sideBar.accountHolders.title',
        defaultMessage: 'AccountHolders'
      }),
      links: [
        {
          title: intl.formatMessage({
            id: 'sideBar.accountHolders.products',
            defaultMessage: 'Products'
          }),
          href: '/products',
          icon: Box,
          variant: 'default'
        },
        {
          title: intl.formatMessage({
            id: 'sideBar.accountHolders.accounts',
            defaultMessage: 'Accounts'
          }),
          href: '/accounts',
          icon: Coins,
          variant: 'default'
        },
        {
          title: intl.formatMessage({
            id: 'sideBar.accountHolders.portfolios',
            defaultMessage: 'Portfolios'
          }),
          href: '/portfolios',
          icon: Briefcase,
          variant: 'default'
        }
      ]
    },
    {
      name: intl.formatMessage({
        id: 'sideBar.transactions.title',
        defaultMessage: 'Transactions'
      }),
      links: [
        {
          title: intl.formatMessage({
            id: 'sideBar.transactions.types',
            defaultMessage: 'Types'
          }),
          href: '/types',
          icon: DollarSign,
          variant: 'default'
        },
        {
          title: intl.formatMessage({
            id: 'sideBar.transactions.resume',
            defaultMessage: 'Resume'
          }),
          href: '/resume',
          icon: ArrowLeftRight,
          variant: 'default'
        }
      ]
    },
    {
      name: intl.formatMessage({
        id: 'sideBar.reports.title',
        defaultMessage: 'Reports'
      }),
      links: [
        {
          title: intl.formatMessage({
            id: 'sideBar.reports.runReport',
            defaultMessage: 'Run Report'
          }),
          href: '/reports',
          icon: BarChartHorizontal,
          variant: 'default'
        }
      ]
    }
  ]
}
