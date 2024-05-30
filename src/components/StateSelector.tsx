import {
  CountryType,
  getCountries,
  getStateByCodeOrName,
  getStateCountry,
  StateType
} from '@/utils/CountryUtils'
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

type StateSelectorProps = {
  country: string
  isDisabled?: boolean
  state?: string
  onSelectState: (stateCode: string) => void
  className?: string
}

const StateSelector = ({
  country,
  state,
  onSelectState,
  className
}: StateSelectorProps) => {
  const t = useTranslations('Select')
  const stateList = useMemo(() => getStateCountry(country), [country])
  const [value, setValue] = useState<string>(
    getStateByCodeOrName(stateList, state || '').name
  )

  useEffect(() => {
    onSelectState(value)
  }, [value])

  useEffect(() => {
    setValue(
      (stateList.length > 0 &&
        stateList.find(
          (stateItem) => stateItem.name === state || stateItem.code === state
        )?.name) ||
        ''
    )
  }, [country])

  return (
    <div>
      <Select name="StateSelector" onValueChange={setValue} value={value}>
        <SelectTrigger
          disabled={stateList && stateList.length === 0}
          className={cn(className)}
        >
          <SelectValue placeholder={t('placeholder')}>{value}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {stateList.map((state, index) => (
            <SelectItem key={state.code} value={state.name} asChild={false}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default StateSelector
