'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useCustomToast from '@/hooks/use-custom-toast'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import { OrganizationsType } from '@/types/organizations-type'
import OrganizationsView from '@/app/[locale]/(routes)/settings/organizations/organizations-view'
import { FormDetailsProvider } from '@/context/form-details-context'
import { useOrganizationById } from '@/utils/queries'
import { updateOrganization } from '@/client/organization-client'
import { PageHeader } from '@/components/page-header'
import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { Skeleton } from '@/components/ui/skeleton'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const t = useTranslations('organizations.organizationView')
  const toastTranslator = useTranslations('organizations.toast')
  const organizationId: string = params.id
  const pathname = usePathname()
  const intlBasePath = pathname.split('/').filter(Boolean)[0]
  const organization = useOrganizationById(organizationId)

  const { showSuccess, showError } = useCustomToast()

  const breadCrumbPaths: BreadcrumbPath[] = [
    {
      name: t('breadcrumbs.settings'),
      href: `/settings`,
      active: true
    },
    {
      name: t('breadcrumbs.organizations'),
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
        toastTranslator('organizationUpdateSuccess', {
          organizationName: values.legalName
        })
      )
      router.replace(`/${intlBasePath}/settings?tab=organizations`)
    } catch (error) {
      const errorMessage =
        error instanceof ClientToastException
          ? toastTranslator(error.messageAttributeName, {
              organizationId: organizationId
            })
          : toastTranslator('genericError')

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
                  <PageHeader.ActionButtons type="entity" />
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
