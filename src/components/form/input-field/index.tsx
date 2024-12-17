import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTooltip
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { HTMLInputTypeAttribute, ReactNode } from 'react'
import { Control } from 'react-hook-form'

export type InputFieldProps = {
  name: string
  type?: HTMLInputTypeAttribute
  label?: ReactNode
  tooltip?: string
  labelExtra?: ReactNode
  placeholder?: string
  description?: ReactNode
  control: Control<any>
  disabled?: boolean
  readOnly?: boolean
  rows?: number
  textArea?: boolean
  required?: boolean
}

export const InputField = ({
  type,
  label,
  tooltip,
  labelExtra,
  placeholder,
  description,
  required,
  readOnly,
  rows,
  textArea,
  ...others
}: InputFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem required={required}>
          {label && (
            <FormLabel
              extra={
                tooltip ? <FormTooltip>{tooltip}</FormTooltip> : labelExtra
              }
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            {textArea ? (
              <Textarea
                placeholder={placeholder}
                readOnly={readOnly}
                rows={rows}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
