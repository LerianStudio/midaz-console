'use client'

import { Nav } from '@/components/ui/nav'
import { useEffect, useState } from 'react'
import LerianLogo from '/public/svg/brand-lerian-symbol.svg'
import { cn } from '@/lib/utils'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { OrganizationSwitcher } from '../OrganizationSwitcher'
import { Button } from '../ui/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { getSidebarItems } from './sidebarItems'
import { getOrganizationData } from './organizationData'

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
  const t = useTranslations('sideNavBar')
  const sidebarItems = getSidebarItems(t)
  const organizations = getOrganizationData()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
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
    <AnimatePresence>
      <motion.div
        className="relative flex flex-col justify-between shadow-sidebar dark:bg-codGray-950"
        variants={sidebarVariants}
        initial="closed"
        animate={isCollapsed ? 'closed' : 'opened'}
      >
        <div>
          <div
            data-collapsed={isCollapsed}
            className={cn(
              'flex h-[60px] items-center border-b bg-white px-4 dark:bg-codGray-950',
              isCollapsed && 'justify-center p-0'
            )}
          >
            {organizations.length > 0 ? (
              <OrganizationSwitcher
                image={LerianLogo}
                orgName="Lerian"
                status="active"
                alt="Lerian Logo"
                data={organizations}
                isCollapsed={isCollapsed}
              />
            ) : (
              <div className="flex items-center gap-3">
                <Image src={LerianLogo} alt={LerianLogo} height={36} />

                {!isCollapsed && (
                  <h1 className="text-sm font-medium capitalize text-shadcn-600">
                    Lerian
                  </h1>
                )}
              </div>
            )}
          </div>

          <div className={cn('px-4', isCollapsed && 'px-2')}>
            <Nav
              isCollapsed={isMobileWidth ? true : isCollapsed}
              categories={sidebarItems}
            />
          </div>
        </div>

        {!isMobileWidth && !isCollapsed && (
          <div className="flex w-full border-shadcn-200">
            <div className="absolute bottom-4 right-[-20px]">
              <Button
                variant="white"
                className="rounded-full border border-shadcn-200 p-2"
                onClick={toggleSidebar}
              >
                <PanelLeftClose className="text-shadcn-400" />
              </Button>
            </div>
          </div>
        )}

        {!isMobileWidth && isCollapsed && (
          <div className="flex w-full justify-center border-t border-shadcn-200 p-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="group rounded-sm bg-transparent p-2 text-shadcn-400 hover:bg-sunglow-400"
                  onClick={toggleSidebar}
                >
                  <PanelRightClose className="group-hover:text-white dark:text-white" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t('expand')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
