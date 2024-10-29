import React from 'react'
import { SelectFieldProps } from '../select-field'
import { getStateCountry, StateType } from '@/utils/country-utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { SelectProps } from '@radix-ui/react-select'

type StateSelectProps = SelectProps &
  Omit<ControllerRenderProps, 'ref'> & {
    countryName: string
    placeholder?: string
  }

const StateSelect = React.forwardRef<unknown, StateSelectProps>(
  (
    {
      name,
      value,
      placeholder,
      onChange,
      countryName,
      ...others
    }: StateSelectProps,
    ref
  ) => {
    const form = useFormContext()
    const country = form.watch<string>(countryName)

    const [states, setStates] = React.useState<StateType[]>(
      getStateCountry(country)
    )

    React.useEffect(() => {
      setStates(getStateCountry(country))

      const stateByCountry = getStateCountry(country).find(
        (state) => state.code === value
      )

      if (!stateByCountry) {
        onChange({ target: { name, value: '' } })
      }
    }, [country])

    return (
      <Select name={name} value={value} onValueChange={onChange} {...others}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state.code} value={state.code}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
)
StateSelect.displayName = 'Select'

export type StateFieldProps = Omit<SelectFieldProps, 'children'> & {
  countryName?: string
}

export const StateField = ({
  countryName = 'address.country',
  label,
  placeholder,
  required,
  ...others
}: StateFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem required={required}>
          {label && <FormLabel>{label}</FormLabel>}
          <StateSelect
            countryName={countryName}
            placeholder={placeholder}
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
