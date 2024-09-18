import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['pt', 'en']

/**
 * TODO: Should be deprecated and removed soon
 */
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
