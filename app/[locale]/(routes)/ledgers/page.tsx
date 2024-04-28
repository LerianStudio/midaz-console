import { PageHeader } from '@/components/PageHeader'
import { getTranslations } from 'next-intl/server'
import LedgersView from '@/[locale]/(routes)/ledgers/ledgers-view'
import { BreadcrumbComponent } from '@/components/Breadcrumb'

const Page = async () => {
  const t = await getTranslations('ledgers')

  const breadcrumbPaths: any = [
    { name: 'Ledgers', href: '#' },
    { name: 'Detalhe da Ledger' }
  ]

  return (
    <div>
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <div className="mt-12">
        <PageHeader
          title={t('title')}
          subtitle={t('subtitle')}
          hasInfo={true}
          type="listing"
        />
      </div>

      <div className="mt-10">
        <LedgersView />
      </div>
    </div>
  )
}

export default Page
