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

  const getHelperTriggerTranslate = (t: any) => ({
    question: t('helperTrigger.question'),
    answer: t('helperTrigger.answer'),
    seeMore: t('helperTrigger.seeMore')
  })

  const getListingTemplateTranslate = (t: any) => ({
    configureButton: t('listingTemplate.configureButton'),
    addButton: t('listingTemplate.addButton')
  })

  return (
    <div>
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <div className="mt-12">
        <PageHeader
          title={t('title')}
          subtitle={t('subtitle')}
          hasInfo={true}
          type="listing"
          helperTriggerTranslate={getHelperTriggerTranslate(t)}
          listingTemplateTranslate={getListingTemplateTranslate(t)}
        />
      </div>

      <div className="mt-10">
        <LedgersView />
      </div>
    </div>
  )
}

export default Page
