import { PageTitle } from '@/components/PageTitle'
import { getTranslations } from 'next-intl/server'
import DivisionsView from '@/[locale]/(routes)/divisions/divisions-view'


export default async function Page(){
  const t = await getTranslations('divisions')
  
  return (
    <div>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      
      <div className="mt-10">
        <DivisionsView />
      </div>
    
    </div>
  )
}

