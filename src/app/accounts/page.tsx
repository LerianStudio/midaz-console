'use client'

import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { PageTitle } from '@/components/PageTitle'
import { useTranslation } from 'next-export-i18n'

const Page = () => {
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allAccounts'), active: false },
    { name: t('breadcrumb.accounts'), href: '/accounts', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title={t('pageTitle.accounts')} />
    </div>
  )
}

export default Page
