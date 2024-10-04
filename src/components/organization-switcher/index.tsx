import React from 'react'
import { Popover } from '@/components/ui/popover'
import { SwitcherTrigger } from './organization-switcher-trigger'
import { OrganizationSwitcherContent } from './organization-switcher-content'
import { getOrganizationData } from '../sidebar/organization-data'
import { useTheme } from '@/lib/theme'
import { useIntl } from 'react-intl'
import MidazLogo from '/public/svg/brand-midaz.svg'
import { useSidebar } from '../sidebar/primitive'

export const OrganizationSwitcher = () => {
  const intl = useIntl()
  const { logoUrl } = useTheme()
  const { isCollapsed } = useSidebar()
  const organizations = getOrganizationData()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <SwitcherTrigger
        open={open}
        orgName="Midaz"
        image={logoUrl || MidazLogo}
        alt={intl.formatMessage({
          id: 'common.logoAlt',
          defaultMessage: 'Your organization logo'
        })}
        disabled={organizations.length === 0}
        collapsed={isCollapsed}
      />

      <OrganizationSwitcherContent
        orgName="Midaz"
        status="active"
        alt={intl.formatMessage({
          id: 'common.logoAlt',
          defaultMessage: 'Your organization logo'
        })}
        image={logoUrl || MidazLogo}
        data={organizations}
        onClose={() => setOpen(false)}
      />
    </Popover>
  )
}
