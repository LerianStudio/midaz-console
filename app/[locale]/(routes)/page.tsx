'use client'

import { PageHeader } from '@/components/PageHeader'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('auth')

  return (
    <PageHeader
      title={t('titleLogin')}
      hasInfo={false}
      type="entity"
      subtitle="Sem descrição"
    />
  )
}

export default Page
