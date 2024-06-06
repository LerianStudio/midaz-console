import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  getCountryByNameOrCode,
  getStateByCodeOrName,
  getStateCountry,
  StateType
} from '@/utils/CountryUtils'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SelectFieldProps } from '@/components/Sheet/SelectField'
import { useFormField } from '@/components/ui/form'

type StateSelectorProps = {
  country: string
  className?: string
} & SelectFieldProps

const StateSelector = ({
  field,
  form,
  country,
  className
}: StateSelectorProps) => {
  const { formItemId } = useFormField()
  const [states, setStates] = useState<StateType[]>(getStateCountry(country))

  useEffect(() => {
    setStates(getStateCountry(country))

    const stateByCountry = getStateCountry(country).find(
      (state) => state.code === form.getValues(field.name)
    )

    if (!stateByCountry) {
      form.setValue(field.name, '')
    }
  }, [country])

  return (
    <Select
      disabled={states.length === 0}
      onValueChange={(value) => form.setValue(field.name, value)}
    >
      <SelectTrigger id={formItemId} className={cn(className)}>
        <SelectValue
          placeholder={
            getStateByCodeOrName(states, form.getValues(field.name)).name ||
            field.placeholder
          }
        />
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => {
          return (
            <SelectItem
              key={state.code}
              value={state.code}
              className="select-item"
            >
              {state.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default StateSelector
