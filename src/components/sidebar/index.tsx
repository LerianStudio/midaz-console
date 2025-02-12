'use client'

import React from 'react'
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
import { OrganizationSwitcher } from '../organization-switcher'
import { useIntl } from 'react-intl'
import {
  SidebarItem,
  SidebarContent,
  SidebarGroup,
  SidebarGroupTitle,
  SidebarHeader,
  useSidebar,
  SidebarExpandButton,
  SidebarRoot
} from './primitive'

export const Sidebar = () => {
  const intl = useIntl()
  const { isCollapsed, toggleSidebar } = useSidebar()
  const [isMobileWidth, setIsMobileWidth] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarRoot>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.home',
              defaultMessage: 'Home'
            })}
            icon={<Home />}
            href="/"
          />
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.ledgers',
              defaultMessage: 'Ledgers'
            })}
            icon={<DatabaseZap />}
            href="/ledgers"
          />
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.team',
              defaultMessage: 'Team'
            })}
            icon={<UsersRound />}
            href="/team"
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupTitle collapsed={isCollapsed}>
            {intl.formatMessage({
              id: 'sideBar.accountHolders.title',
              defaultMessage: 'AccountHolders'
            })}
          </SidebarGroupTitle>
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.accountHolders.segments',
              defaultMessage: 'Segments'
            })}
            icon={<Box />}
            href="/segments"
          />
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.accountHolders.accounts',
              defaultMessage: 'Accounts'
            })}
            icon={<Coins />}
            href="/accounts"
          />
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.accountHolders.portfolios',
              defaultMessage: 'Portfolios'
            })}
            icon={<Briefcase />}
            href="/portfolios"
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupTitle collapsed={isCollapsed}>
            {intl.formatMessage({
              id: 'sideBar.transactions.title',
              defaultMessage: 'Transactions'
            })}
          </SidebarGroupTitle>
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.transactions.types',
              defaultMessage: 'Types'
            })}
            icon={<DollarSign />}
            href="/types"
          />
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.transactions.resume',
              defaultMessage: 'Resume'
            })}
            icon={<ArrowLeftRight />}
            href="/transactions"
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupTitle collapsed={isCollapsed}>
            {intl.formatMessage({
              id: 'sideBar.reports.title',
              defaultMessage: 'Reports'
            })}
          </SidebarGroupTitle>
          <SidebarItem
            title={intl.formatMessage({
              id: 'sideBar.reports.runReport',
              defaultMessage: 'Run Report'
            })}
            icon={<BarChartHorizontal />}
            href="/reports"
          />
        </SidebarGroup>
      </SidebarContent>

      {!isMobileWidth && <SidebarExpandButton />}
    </SidebarRoot>
  )
}
