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
import CountrySelector from '@/components/country-selector'
import StateSelector from '@/components/state-selector'
import { ParentOrganizationSelect } from '@/components/parent-organizations-select/parent-organization-select'

type RenderFieldProps = {
  field: FormFieldConfig
  form: UseFormReturn<any>
  isCreateMode?: boolean
  isViewMode?: boolean
  isDisabled?: boolean
}

export const RenderField = ({
  field,
  form,
  isCreateMode = false,
  isViewMode = false,
  isDisabled = false
}: RenderFieldProps) => {
  if (isCreateMode && field.name === 'id') return null

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
              <InputField
                field={field}
                form={form}
                isViewMode={isViewMode}
                isDisabled={isDisabled}
              />
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

export const RenderCountryField = ({
  field,
  form,
  isCreateMode = false,
  isViewMode = false
}: RenderFieldProps) => {
  if (isCreateMode && field.name === 'id') return null

  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem id={field.name}>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold text-[#52525b]">
              {field.label}
            </FormLabel>
            <FormControl>
              <CountrySelector
                field={{
                  name: field.name,
                  label: field.label,
                  placeholder: field.placeholder
                }}
                form={form}
              />
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

export const RenderStateField = ({
  field,
  form,
  isCreateMode = false,
  isViewMode = false
}: RenderFieldProps) => {
  if (isCreateMode && field.name === 'id') return null

  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem id={field.name}>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold text-[#52525b]">
              {field.label}
            </FormLabel>
            <FormControl>
              <StateSelector
                country={form.watch('address.country')}
                field={{
                  name: 'address.state',
                  label: field.label,
                  placeholder: field.placeholder
                }}
                form={form}
                className="w-fit min-w-4 placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 enabled:min-w-6 disabled:w-[124px] disabled:bg-zinc-100"
              />
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

export const RenderParentIdField = ({
  field,
  form,
  isCreateMode = false,
  isViewMode = false,
  isDisabled = false
}: RenderFieldProps) => {
  if (isCreateMode && field.name === 'id') return null

  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem id={field.name}>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold text-[#52525b]">
              {field.label}
            </FormLabel>
            <FormControl>
              <ParentOrganizationSelect
                isDisabled={isDisabled}
                field={{
                  name: field.name,
                  label: field.label,
                  placeholder: field.placeholder,
                  options: field.options
                }}
                form={form}
              />
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
