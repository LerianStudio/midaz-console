import type { LocalePrefix } from '../../node_modules/next-intl/dist/types/src/shared/types'

const localePrefix: LocalePrefix = 'always'

export const AppConfig = {
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      locale
    }
  }
}
