import { useFormField } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import React from 'react'
import { SelectFieldProps } from '@/components/sheet/fields/select-field'
import { ParentOrganizationsType } from '@/types/parent-organizations-type'

type CountrySelectProps = {
  className?: string
  isDisabled?: boolean
} & SelectFieldProps

export const ParentOrganizationSelect = ({
  field,
  form,
  className,
  isDisabled = false
}: CountrySelectProps) => {
  const { formItemId } = useFormField()
  const parentOrganizations = field.options as ParentOrganizationsType[]

  return (
    <Select
      disabled={isDisabled}
      onValueChange={(value) => form.setValue(field.name, value)}
    >
      <SelectTrigger id={formItemId} className={cn(className)}>
        <SelectValue
          placeholder={form.watch('parentOrganizationId') || field.placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        {parentOrganizations.length > 0 &&
          parentOrganizations.map((parent: ParentOrganizationsType) => (
            <SelectItem
              key={parent.id}
              value={parent.id}
              className="select-item"
            >
              {parent.legalName}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
