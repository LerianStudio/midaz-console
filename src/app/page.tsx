'use client'

import { PageTitle } from '@/components/PageTitle'
import { useTranslation } from 'next-export-i18n'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'

const Page = () => {
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.dashboard'), active: false },
    { name: t('breadcrumb.overview'), href: '/', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title={t('pageTitle.overview')} />
    </div>
  )
}

export default Page
