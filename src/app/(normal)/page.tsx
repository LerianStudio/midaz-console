'use client'

import { PageTitle } from '@/components/PageTitle'
import { LinkWithLocale, useTranslation } from 'next-export-i18n'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'

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
      <div className="mt-2">
        <LinkWithLocale href="/signin">
          <Button variant="default">Login Page</Button>
        </LinkWithLocale>
      </div>
    </div>
  )
}

export default Page
