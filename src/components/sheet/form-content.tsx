import React from 'react'
import { RenderField } from './fields/render-field'
import { MetadataSection } from './metadata-section'
import { FormContentProps, FormFieldConfig } from '@/types/sheet-type'

export const FormContent = ({
  fields,
  form,
  isCreateMode,
  isSwitchOn,
  setSwitchOn,
  currentMetadata,
  setCurrentMetadata,
  metaFields,
  append,
  remove
}: FormContentProps) => {
  const metadataSectionProps = {
    isSwitchOn,
    setSwitchOn,
    currentMetadata,
    setCurrentMetadata,
    metaFields,
    append,
    remove
  }

  return (
    <div className="mt-5 grid gap-8">
      {fields.map((field: FormFieldConfig) => (
        <RenderField
          key={field.name}
          field={field}
          form={form}
          isCreateMode={isCreateMode}
        />
      ))}

      <MetadataSection {...metadataSectionProps} />
    </div>
  )
}
