import React from 'react'
import { FormFieldConfig } from '@/types/SheetType'
import { UseFormReturn } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export type SelectFieldProps = {
  field: FormFieldConfig
  form: UseFormReturn<any>
}

export const SelectField = ({ field, form }: SelectFieldProps) => {
  return (
    <Select onValueChange={(value) => form.setValue(field.name, value)}>
      <SelectTrigger>
        <SelectValue placeholder={form.getValues(field.name) || ''} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map((option: { value: string; label: string }) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
