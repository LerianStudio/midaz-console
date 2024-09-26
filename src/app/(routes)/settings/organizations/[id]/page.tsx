'use client'

import { useRouter } from 'next/navigation'
import useCustomToast from '@/hooks/use-custom-toast'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import { OrganizationsType } from '@/types/organizations-type'
import OrganizationsView from '@/app/(routes)/settings/organizations/organizations-view'
import { FormDetailsProvider } from '@/context/form-details-context'
import { useOrganizationById } from '@/utils/queries'
import { updateOrganization } from '@/client/organization-client'
import { PageHeader } from '@/components/page-header'
import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { Skeleton } from '@/components/ui/skeleton'
import { useIntl } from 'react-intl'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const intl = useIntl()
  const organizationId: string = params.id
  const organization = useOrganizationById(organizationId)

  const { showSuccess, showError } = useCustomToast()

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
      name: params.id,
      active: false
    }
  ]

  const handleOnSubmit = async (values: OrganizationsType) => {
    try {
      await updateOrganization(organizationId, values)
      showSuccess(
        intl.formatMessage(
          {
            id: 'organizations.toast.organizationUpdateSuccess',
            defaultMessage: 'Organization {organizationName} updated'
          },
          {
            organizationName: values.legalName
          }
        )
      )
      router.replace(`/settings?tab=organizations`)
    } catch (error) {
      const errorMessage =
        error instanceof ClientToastException
          ? intl.formatMessage(error.messageDescriptor, {
              organizationId: organizationId
            })
          : intl.formatMessage({
              id: 'organizations.toast.genericError',
              defaultMessage: 'An error occurred'
            })

      return showError(errorMessage)
    }
  }

  return (
    <div>
      {organization.isLoading ? (
        <Skeleton className="h-screen bg-zinc-200" />
      ) : (
        <div>
          <BreadcrumbComponent paths={breadCrumbPaths} />
          <div>
            <div className="mb-6 mt-12">
              <PageHeader.Root>
                <div className="flex justify-between">
                  <PageHeader.InfoTitle
                    title={organization.data?.legalName}
                    subtitle={organizationId}
                  >
                    <PageHeader.InfoTooltip subtitle={organization.data?.id} />
                  </PageHeader.InfoTitle>
                  <PageHeader.ActionButtons>
                    <PageHeader.StatusButton />
                  </PageHeader.ActionButtons>
                </div>
              </PageHeader.Root>
            </div>
            <FormDetailsProvider>
              <OrganizationsView
                organizations={organization.data}
                onSubmit={handleOnSubmit}
              />
            </FormDetailsProvider>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
