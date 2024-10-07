import React from 'react'
import { FormFieldConfig } from '@/types/sheet-type'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { SelectField } from './select-field'

type InputFieldProps = {
  field: FormFieldConfig
  form: UseFormReturn<any>
  isDisabled?: boolean
}

export const InputField = ({ field, form, isDisabled }: InputFieldProps) => {
  const { register } = form

  if (field.options) {
    return <SelectField field={field} form={form} />
  }
  return (
    <Input
      placeholder={field.placeholder || ''}
      disabled={isDisabled}
      className="placeholder:text-shadcn-400"
      autoFocus={false}
      value={form.getValues(field.name) ?? ''}
      {...register(field.name)}
    />
  )
}
