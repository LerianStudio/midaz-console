'use client'

import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { PageTitle } from '@/components/PageTitle'
import { useTranslation } from 'next-export-i18n'

const Page = () => {
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allTransactions'), active: false },
    { name: t('breadcrumb.transactions'), href: '/transactions', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title={t('pageTitle.transactions')} />
    </div>
  )
}

export default Page
