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
}: FormContentProps) => (
  <div className="mt-5 grid gap-8">
    {fields.map((field: FormFieldConfig) => (
      <RenderField
        key={field.name}
        field={field}
        form={form}
        isCreateMode={isCreateMode}
      />
    ))}

    <MetadataSection
      isSwitchOn={isSwitchOn}
      setSwitchOn={setSwitchOn}
      currentMetadata={currentMetadata}
      setCurrentMetadata={setCurrentMetadata}
      metaFields={metaFields}
      append={append}
      remove={remove}
    />
  </div>
)
