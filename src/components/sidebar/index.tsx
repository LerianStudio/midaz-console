'use client'

import { SidebarItem } from './sidebar-item'
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
import { AnimatePresence, motion } from 'framer-motion'
import { OrganizationSwitcher } from '../organization-switcher'
import { useSidebarContext } from '@/context/sidebar-context'
import { useIntl } from 'react-intl'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupTitle,
  SidebarHeader
} from './sidebar'
import { SidebarExpandButton } from './sidebar-expand-button'
import React from 'react'

const sidebarVariants = {
  opened: {
    width: 'auto',
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  },
  closed: {
    width: '72px'
  }
}

export const Sidebar = () => {
  const intl = useIntl()
  const { isCollapsed, toggleSidebar } = useSidebarContext()
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
    <AnimatePresence>
      <motion.div
        data-collapsed={isCollapsed}
        className="group/sidebar relative flex flex-col justify-between shadow-sidebar dark:bg-codGray-950"
        variants={sidebarVariants}
        initial="closed"
        animate={isCollapsed ? 'closed' : 'opened'}
      >
        <div>
          <SidebarHeader>
            <OrganizationSwitcher collapsed={isCollapsed} />
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
                collapsed={isCollapsed}
              />
              <SidebarItem
                title={intl.formatMessage({
                  id: 'sideBar.ledgers',
                  defaultMessage: 'Ledgers'
                })}
                icon={<DatabaseZap />}
                href="/ledgers"
                collapsed={isCollapsed}
              />
              <SidebarItem
                title={intl.formatMessage({
                  id: 'sideBar.team',
                  defaultMessage: 'Team'
                })}
                icon={<UsersRound />}
                href="/team"
                collapsed={isCollapsed}
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
                  id: 'sideBar.accountHolders.products',
                  defaultMessage: 'Products'
                })}
                icon={<Box />}
                href="/products"
                collapsed={isCollapsed}
              />
              <SidebarItem
                title={intl.formatMessage({
                  id: 'sideBar.accountHolders.accounts',
                  defaultMessage: 'Accounts'
                })}
                icon={<Coins />}
                href="/accounts"
                collapsed={isCollapsed}
              />
              <SidebarItem
                title={intl.formatMessage({
                  id: 'sideBar.accountHolders.portfolios',
                  defaultMessage: 'Portfolios'
                })}
                icon={<Briefcase />}
                href="/portfolios"
                collapsed={isCollapsed}
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
                collapsed={isCollapsed}
              />
              <SidebarItem
                title={intl.formatMessage({
                  id: 'sideBar.transactions.resume',
                  defaultMessage: 'Resume'
                })}
                icon={<ArrowLeftRight />}
                href="/resume"
                collapsed={isCollapsed}
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
                collapsed={isCollapsed}
              />
            </SidebarGroup>
          </SidebarContent>
        </div>

        {!isMobileWidth && (
          <SidebarExpandButton
            collapsed={isCollapsed}
            onClick={toggleSidebar}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
