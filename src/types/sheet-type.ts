import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { MetadataItem } from './metadata-type'

export type FormFieldConfig = {
  name: string
  label: string
  placeholder?: string
  description?: string
  isRequired?: boolean
  options?: any[]
}

type SheetInfo = {
  title: string
  description: string
  buttonText: string
}

export type SheetHeaderSectionProps = {
  sheetInfo: {
    title: string
    description: string
  }
}

export type FormContentProps = {
  fields: FormFieldConfig[]
  form: UseFormReturn<any>
  isCreateMode: boolean
  isSwitchOn: boolean
  setSwitchOn: React.Dispatch<React.SetStateAction<boolean>>
  currentMetadata: MetadataItem
  setCurrentMetadata: React.Dispatch<React.SetStateAction<MetadataItem>>
  metaFields: any
  append: (value: Partial<MetadataItem>) => void
  remove: (index: number) => void
}

export type SheetContainerProps = {
  open: boolean
  setOpen: (open: boolean) => void
  sheetInfo: SheetInfo
  fields: FormFieldConfig[]
  formSchema: z.ZodSchema<any>
  onSubmit: (values: any) => void
  mode: string
  data: any
}

export type SheetProps = {
  sheetProps: {
    open?: boolean
    setOpen: (open: boolean) => void
    sheetInfo?: SheetInfo
  }
  formProps?: {
    form: UseFormReturn<any>
    fields: FormFieldConfig[]
    isDirty: boolean
    isValid: boolean
    handleSubmit: (values: any) => void
    metaFields: any
    append: (value: Partial<MetadataItem>) => void
    remove: (index: number) => void
  }
  stateProps?: {
    isCreateMode: boolean
    isSwitchOn: boolean
    setSwitchOn: React.Dispatch<React.SetStateAction<boolean>>
    currentMetadata: MetadataItem
    setCurrentMetadata: React.Dispatch<React.SetStateAction<MetadataItem>>
  }
}
