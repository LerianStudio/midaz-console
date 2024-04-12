import { PageTitle } from '@/components/PageTitle'
import { getTranslations } from 'next-intl/server'
import LedgersView from '@/[locale]/(routes)/ledgers/ledgers-view'

const Page = async () => {
  const t = await getTranslations('ledgers')

  return (
    <div>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-10">
        <LedgersView />
      </div>
    </div>
  )
}

export default Page
