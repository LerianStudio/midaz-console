'use client'

import { PageHeader } from '@/components/PageHeader'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('auth')

  return (
    <div>
      <PageHeader title={t('titleLogin')} />
    </div>
  )
}

export default Page
