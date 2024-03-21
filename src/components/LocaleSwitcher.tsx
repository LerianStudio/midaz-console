'use client'

import { usePathname, useRouter } from '@/navigation'
import { AppConfig } from '@/utils/AppConfig'
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
    <Select onValueChange={(value) => router.push(pathname, { locale: value })}>
      <SelectTrigger className="w-[70px]">
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
