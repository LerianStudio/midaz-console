import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { AppConfig } from '@/utils/app-config'

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales: AppConfig.locales,
    localePrefix: AppConfig.localePrefix
  }
)
