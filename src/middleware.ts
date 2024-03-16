import createMiddleware from 'next-intl/middleware'

import { AppConfig } from '@/utils/AppConfig'

export default createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale
})

export const config = {
  matcher: ['/', '/(en|pt)/:path*']
}
