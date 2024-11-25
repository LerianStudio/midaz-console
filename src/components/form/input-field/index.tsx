import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'

export type InputFieldProps = {
  name: string
  type?: HTMLInputTypeAttribute
  label?: string
  placeholder?: string
  control: Control<any>
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

export const InputField = ({
  type,
  label,
  placeholder,
  required,
  readOnly,
  ...others
}: InputFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem required={required}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              readOnly={readOnly}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
