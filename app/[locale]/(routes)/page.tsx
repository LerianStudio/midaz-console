import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('auth')

  return (
    <div>
      <h1>{t('titleLogin')}</h1>
    </div>
  )
}

export default Page
