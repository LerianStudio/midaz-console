import React from 'react'
import { Popover } from '@/components/ui/popover'
import { SwitcherTrigger } from './organization-switcher-trigger'
import { OrganizationSwitcherContent } from './organization-switcher-content'
import { useTheme } from '@/lib/theme'
import { useIntl } from 'react-intl'
import MidazLogo from '/public/svg/brand-midaz.svg'
import { useSidebar } from '../sidebar/primitive'
import { useListOrganizations } from '@/client/organizations'
import { Skeleton } from '../ui/skeleton'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { isNil } from 'lodash'
import useCustomToast from '@/hooks/use-custom-toast'

/**
 * TODO: Fix potential bug of user changing the organization and still having old stale data in the UI
 * @returns
 */

export const OrganizationSwitcher = () => {
  const intl = useIntl()
  const { logoUrl } = useTheme()
  const { isCollapsed } = useSidebar()
  const { data, isPending } = useListOrganizations({})
  const { currentOrganization, setOrganization } = useOrganization()
  const { showError } = useCustomToast()
  const [open, setOpen] = React.useState(false)

  const handleChange = (organization: OrganizationEntity) => {
    setOrganization(organization)
    setOpen(false)
  }

  // TODO: Remove this eventually
  React.useEffect(() => {
    // If the user doesn't have any organization, we should trigger an onboarding flow
    // Since we don't have that yet, we'll just show an error message signaling what went wrong
    // Apparently react-hot-toast has a problem with SSR, so we'll use setTimeout to delay the error message
    // This is also why not using intl here.
    // Reference: https://github.com/shadcn-ui/ui/issues/1674
    if (isNil(currentOrganization)) {
      setTimeout(() => {
        showError('Organization not found')
      }, 100)
    }
  }, [])

  if ((isPending && !data) || !currentOrganization) {
    return <Skeleton className="h-10 w-10" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <SwitcherTrigger
        open={open}
        orgName={currentOrganization.legalName}
        image={logoUrl || MidazLogo}
        alt={intl.formatMessage({
          id: 'common.logoAlt',
          defaultMessage: 'Your organization logo'
        })}
        disabled={!data || data.items.length <= 1}
        collapsed={isCollapsed}
      />
      <OrganizationSwitcherContent
        orgName={currentOrganization.legalName}
        status="active"
        alt={intl.formatMessage({
          id: 'common.logoAlt',
          defaultMessage: 'Your organization logo'
        })}
        image={logoUrl || MidazLogo}
        data={data?.items || []}
        onChange={handleChange}
        onClose={() => setOpen(false)}
      />
    </Popover>
  )
}
