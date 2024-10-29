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
import { cn } from '@/lib/utils'
import { Control } from 'react-hook-form'

export type SelectFieldProps = React.PropsWithChildren & {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  control: Control<any>
  required?: boolean
}

export const SelectField = ({
  label,
  required,
  placeholder,
  disabled,
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
              <SelectTrigger
                disabled={disabled}
                className={cn(disabled && 'bg-shadcn-100')}
              >
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
