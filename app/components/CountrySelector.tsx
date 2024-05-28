import { getCountries, getCountryByNameOrCode } from '@/utils/CountryUtils'
import { useEffect, useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { SelectItemText } from '@radix-ui/react-select'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

type CountrySelectorProps = {
  country?: string
  onSelectCountry: (countryCode: string) => void
  className?: string
}

const CountrySelector = ({
  country,
  onSelectCountry,
  className
}: CountrySelectorProps) => {
  const t = useTranslations('Select')
  const countryList = useMemo(() => getCountries(), [])
  const [value, setValue] = useState<string>(
    getCountryByNameOrCode(country || '').name || ''
  )

  useEffect(() => {
    onSelectCountry(value)
  }, [value])

  return (
    <div>
      <Select name="CountrySelector" onValueChange={setValue} value={value}>
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={t('placeholder')}>{value}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {countryList.map((country, index) => (
            <SelectItem
              key={country.code + index}
              value={country.name}
              asChild={false}
            >
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountrySelector
