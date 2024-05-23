'use client'
import { cn } from '@/lib/utils'
import OrganizationsView from '@/[locale]/(routes)/settings/organizations/organizations-view'
import { useTranslations } from 'next-intl'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { createOrganization } from '@/client/organizationClient'
import useCustomToast from '@/hooks/useCustomToast'
import { usePathname } from 'next/navigation'

const Page = () => {
  const t = useTranslations('organizations.organizationView')
  const pathname = usePathname()
  const intlBasePath = pathname.split('/').filter(Boolean)[0]
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
      name: t('breadcrumbs.newOrganization'),
      active: false
    }
  ]

  const handleOnSubmit = async (values: OrganizationEntity) => {
    await createOrganization(values)
    showSuccess('Organization created successfully')
  }

  return (
    <div>
      <BreadcrumbComponent paths={breadCrumbPaths} />
      <div>
        <div className="mb-12 mt-12">
          <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
            {t('newOrganization.title')}
          </h1>
        </div>
        <OrganizationsView
          organizations={undefined}
          onSubmit={handleOnSubmit}
        />
      </div>
    </div>
  )
}

export default Page
