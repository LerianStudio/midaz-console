'use client'

import { usePathname, useRouter } from '../../navigation'
import { AppConfig } from '@/utils/app-config'
import { useLocale } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <Select
      onValueChange={(value) =>
        router.push(pathname, { locale: value, scroll: false })
      }
    >
      <SelectTrigger
        className="w-[60px] p-2"
        data-testid="locale-switcher-trigger"
      >
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        {AppConfig.locales.map((elt) => (
          <SelectItem key={elt} value={elt}>
            {elt.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
