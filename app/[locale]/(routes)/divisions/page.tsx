import { DivisionAPIAdapter } from '@/adapters/divisions/DivisionAPIAdapter'
import ListDivisionsUseCases from '@/useCases/divisions/ListDivisionsUseCases'
import { PageTitle } from '@/components/PageTitle'
import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { getTranslations } from 'next-intl/server'
import DivisionsView from '@/[locale]/(routes)/divisions/divisions-view'


export default async function Divisions(){
  const listDivisionUseCase = new ListDivisionsUseCases(new DivisionAPIAdapter())
  const divisions: DivisionEntity[] = await listDivisionUseCase.execute()
  const t = await getTranslations('divisions')
  
  
  return (
    <div>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      
      <div className="mt-10">
        <DivisionsView divisionsData={divisions} />
      </div>
    
    </div>
  )
}


