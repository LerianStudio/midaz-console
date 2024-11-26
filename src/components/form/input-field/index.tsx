import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HTMLInputTypeAttribute, ReactNode } from 'react'
import { Control } from 'react-hook-form'

export type InputFieldProps = {
  name: string
  type?: HTMLInputTypeAttribute
  label?: ReactNode
  placeholder?: string
  control: Control<any>
  disabled?: boolean
  required?: boolean
}

export const InputField = ({
  type,
  label,
  placeholder,
  required,
  ...others
}: InputFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem required={required}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
