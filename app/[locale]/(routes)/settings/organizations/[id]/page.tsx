'use client'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { cn } from '@/lib/utils'
import { updateOrganization } from '@/client/organizationClient'
import useCustomToast from '@/hooks/useCustomToast'
import OrganizationsView from '@/[locale]/(routes)/settings/organizations/organizations-view'
import { useOrganizationById } from '@/utils/queries'
import { Skeleton } from '@/components/ui/skeleton'

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
      href: `/${intlBasePath}/settings`,
      active: true
    },
    {
      name: t('breadcrumbs.organizations'),
      href: `/${intlBasePath}/settings?tab=organizations`,
      active: true
    },
    {
      name: organizationId,
      active: false
    }
  ]

  const handleOnSubmit = async (values: OrganizationEntity) => {
    try {
      await updateOrganization(organizationId, values)
      showSuccess('Organization updated successfully')
      router.push(`/${intlBasePath}/settings?tab=organizations`)
    } catch (error) {
      console.log('Error updating organization', error)
      showError('Error updating organization')
      return
    }
  }

  return (
    <div>
      {organization.isLoading && <Skeleton />}
      {!organization.isLoading && organization.data && (
        <div>
          <BreadcrumbComponent paths={breadCrumbPaths} />
          <div>
            <div className="mb-12 mt-12">
              <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
                {organization.data.legalName}
              </h1>
            </div>
            <OrganizationsView
              organizations={organization.data}
              onSubmit={handleOnSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
