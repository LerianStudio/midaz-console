import { match } from '@formatjs/intl-localematcher'
import { getAcceptLanguage } from './getAcceptLanguage'
import { getIntlConfig } from './getIntlConfig'

/**
 * Matchs the locales available on i18n configuration,
 * against what is available on Accept Language header,
 * If fails, returns the i18n default locale value
 * @returns locale
 */
export function getLocale() {
  const config = getIntlConfig()
  const systemLocales = getAcceptLanguage()

  if (!systemLocales) {
    return config.defaultLocale
  }

  return match(systemLocales, config.locales, config.defaultLocale)
}
