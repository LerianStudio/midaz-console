'use client'

import { PageHeader } from '@/components/page-header'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('auth')

  return (
    <PageHeader.Root>
      <PageHeader.InfoTitle title={t('titleLogin')} />
    </PageHeader.Root>
  )
}

export default Page
