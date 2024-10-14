import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Control } from 'react-hook-form'

export type SelectFieldProps = React.PropsWithChildren & {
  name: string
  label?: string
  placeholder?: string
  control: Control<any>
  required?: boolean
}

export const SelectField = ({
  label,
  required,
  placeholder,
  children,
  ...others
}: SelectFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field: { ref, onChange, ...fieldOthers } }) => (
        <FormItem ref={ref} required={required}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={onChange} {...fieldOthers}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
