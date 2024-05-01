import { getTranslations } from 'next-intl/server'
import DivisionsView from '@/[locale]/(routes)/divisions/divisions-view'

const Page = async () => {
  const t = await getTranslations('divisions')

  return (
    <div>
      <div className="mt-10">
        <DivisionsView />
      </div>
    </div>
  )
}

export default Page
