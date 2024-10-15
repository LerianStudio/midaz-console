import React from 'react'
import { FormFieldConfig } from '@/types/sheet-type'
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from '@/components/ui/form'
import { InputField } from './input-field'

type RenderFieldProps = {
  field: FormFieldConfig
  form: UseFormReturn<any>
  isCreateMode?: boolean
  isDisabled?: boolean
}

export const RenderField = ({
  field,
  form,
  isDisabled = false
}: RenderFieldProps) => {
  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem id={field.name}>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold text-[#52525b]">
              {field.label} {field.isRequired && <span>*</span>}
            </FormLabel>
            <FormControl>
              <InputField field={field} form={form} disabled={isDisabled} />
            </FormControl>
            {field.description && (
              <FormDescription className="text-xs font-medium text-shadcn-400">
                {field.description}
              </FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}
