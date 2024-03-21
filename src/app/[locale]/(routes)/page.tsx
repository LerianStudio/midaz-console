import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('auth')

  return <h1>{t('titleLogin')}</h1>
}

export default Page
