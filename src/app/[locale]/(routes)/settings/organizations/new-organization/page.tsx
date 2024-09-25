'use client'

import { usePathname, useRouter } from 'next/navigation'
import useCustomToast from '@/hooks/use-custom-toast'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import { OrganizationsType } from '@/types/organizations-type'
import { createOrganization } from '@/client/organization-client'
import { cn } from '@/lib/utils'
import OrganizationsView from '@/app/[locale]/(routes)/settings/organizations/organizations-view'
import { FormDetailsProvider } from '@/context/form-details-context'
import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const pathname = usePathname()
  const intlBasePath = pathname.split('/').filter(Boolean)[0]
  const { showSuccess, showError } = useCustomToast()
  const router = useRouter()

  const breadCrumbPaths: BreadcrumbPath[] = [
    {
      name: intl.formatMessage({
        id: 'organizations.organizationView.breadcrumbs.settings',
        defaultMessage: 'Settings'
      }),
      href: `/settings`,
      active: true
    },
    {
      name: intl.formatMessage({
        id: 'organizations.organizationView.breadcrumbs.organizations',
        defaultMessage: 'Organizations'
      }),
      href: `/settings?tab=organizations`,
      active: true
    },
    {
      name: intl.formatMessage({
        id: 'organizations.organizationView.breadcrumbs.newOrganization',
        defaultMessage: 'New Organization'
      }),
      active: false
    }
  ]

  const handleOnSubmit = async (values: OrganizationsType) => {
    try {
      await createOrganization(values)
      showSuccess(
        intl.formatMessage(
          {
            id: 'organizations.toast.organizationCreateSuccess',
            defaultMessage: 'Organization {organizationName} created'
          },
          {
            organizationName: values.legalName
          }
        )
      )
      router.replace(`/${intlBasePath}/settings?tab=organizations`)
    } catch (error) {
      const errorMessage =
        error instanceof ClientToastException
          ? intl.formatMessage(error.messageDescriptor)
          : intl.formatMessage({
              id: 'organizations.toast.genericError',
              defaultMessage: 'An error occurred'
            })

      return showError(errorMessage)
    }
  }

  return (
    <div>
      <BreadcrumbComponent paths={breadCrumbPaths} />
      <div className="mt-0">
        <div className="mb-12 mt-12">
          <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
            {intl.formatMessage({
              id: 'organizations.organizationView.newOrganization.title',
              defaultMessage: 'New Organization'
            })}
          </h1>
        </div>
        <FormDetailsProvider>
          <OrganizationsView onSubmit={handleOnSubmit} />
        </FormDetailsProvider>
      </div>
    </div>
  )
}

export default Page
