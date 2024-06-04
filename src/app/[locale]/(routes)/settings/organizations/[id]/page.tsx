'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useCustomToast from '@/hooks/useCustomToast'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { OrganizationsType } from '@/types/OrganizationsType'
import OrganizationsView from '@/app/[locale]/(routes)/settings/organizations/organizations-view'
import { FormDetailsProvider } from '@/context/FormDetailsContext'
import { useOrganizationById } from '@/utils/queries'
import { updateOrganization } from '@/client/organizationClient'
import { PageHeader } from '@/components/PageHeader'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const t = useTranslations('organizations.organizationView')
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
      showSuccess('Organization updated successfully')
      router.replace(`/${intlBasePath}/settings?tab=organizations`)
    } catch (error) {
      console.log('Error updating organization', error)
      showError('Error updating organization')
      return
    }
  }
  
  return (
    <div>
      
      <div>
        <BreadcrumbComponent paths={breadCrumbPaths} />
        <div>
          <div className="mb-6 mt-12">
            <PageHeader.Root>
              <div className="flex justify-between">
                <PageHeader.InfoTitle title={organization.data?.legalName} subtitle={organizationId}>
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
    
    </div>
  )
}

export default Page
