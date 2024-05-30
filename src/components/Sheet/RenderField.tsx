import React from 'react'
import { FormFieldConfig } from '@/types/SheetType'
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from '@/components/ui/form'
import { InputField } from './InputField'

type RenderFieldProps = {
  field: FormFieldConfig
  form: UseFormReturn<any>
  isCreateMode: boolean
  isViewMode: boolean
}

export const RenderField = ({
  field,
  form,
  isCreateMode,
  isViewMode
}: RenderFieldProps) => {
  if (isCreateMode && field.name === 'id') return null

  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold text-[#52525b]">
              {field.label}
            </FormLabel>
            <FormControl>
              <InputField field={field} form={form} isViewMode={isViewMode} />
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
