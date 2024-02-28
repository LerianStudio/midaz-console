'use client'

import { PageTitle } from '@/components/PageTitle'
import { useTranslation } from 'next-export-i18n'

const Page = () => {
  const { t } = useTranslation()

  return (
    <div>
      <PageTitle title={t('headline')} />
    </div>
  )
}

export default Page
