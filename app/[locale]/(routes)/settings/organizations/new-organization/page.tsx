import { cn } from '@/lib/utils'
import OrganizationsView from '@/[locale]/(routes)/settings/organizations/organizations-view'
import { useTranslations } from 'next-intl'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'

const Page = () => {
  const t = useTranslations('organizations.newOrganization')
  const breadCrumbPaths: BreadcrumbPath[] = [
    {
      name: t('breadcrumbs.settings'),
      href: '/settings',
      active: false
    },
    {
      name: t('breadcrumbs.organizations'),
      href: '/settings?tab=organizations',
      active: false
    },
    {
      name: t('breadcrumbs.newOrganization'),
      active: false
    }
  ]

  return (
    <div>
      <BreadcrumbComponent paths={breadCrumbPaths} />
      <div>
        <div className="mb-12 mt-12">
          <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
            {t('title')}
          </h1>
        </div>
        <OrganizationsView
          organizations={undefined}
          description={t('description')}
        />
      </div>
    </div>
  )
}

export default Page
