'use client'
import OrganizationsView from '@/[locale]/(routes)/settings/organizations/organizations-view'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { BreadcrumbPath } from '@/components/Breadcrumb'

type OrganiztionsPageProps = {
  organizations?: OrganizationEntity
  breadCrumbPaths: BreadcrumbPath[]
}

const Page = ({ organizations }: OrganiztionsPageProps) => {
  const translateNameSpace =
    organizations === null
      ? 'organizations.createOrganization'
      : 'organizations.editOrganization'
  const t = useTranslations(translateNameSpace)

  const title = organizations ? organizations.legalName : t('title')

  const handleOnSubmit = (values: OrganizationEntity) => {
    alert(JSON.stringify(values))
  }

  return (
    <div>
      <div className="mb-12 mt-12">
        <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
          {t('title')}
        </h1>
      </div>
      <OrganizationsView onSubmit={handleOnSubmit} />
    </div>
  )
}

export default Page
