'server-only'

import { createIntl, createIntlCache } from 'react-intl'
import { getIntlConfig } from './getIntlConfig'

export async function getIntl() {
  // TODO: Hardcoded for now
  const locale = 'en'
  const config = getIntlConfig()

  return createIntl(
    {
      defaultLocale: config.defaultLocale,
      locale: locale,
      messages: (await import(`@/../locales/compiled/${locale}.json`)).default
    },
    createIntlCache()
  )
}
