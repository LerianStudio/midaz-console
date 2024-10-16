import { SelectItem } from '@/components/ui/select'
import { SelectField, SelectFieldProps } from '../select-field'
import { getCountries } from '@/utils/country-utils'

export type CountryFieldProps = Omit<SelectFieldProps, 'children'> & {}

export const CountryField = ({ ...others }: CountryFieldProps) => {
  return (
    <SelectField {...others}>
      {getCountries().map((country) => (
        <SelectItem key={country.code} value={country.code}>
          {country.name}
        </SelectItem>
      ))}
    </SelectField>
  )
}
