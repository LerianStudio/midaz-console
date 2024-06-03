import { z } from 'zod'

export type FormFieldConfig = {
  name: string
  label: string
  placeholder?: string
  description?: string
  isRequired?: boolean
  options: []
}

type SheetInfo = {
  title: string
  description: string
  buttonText: string
}

export type SheetProps = {
  open: boolean
  setOpen: (open: boolean) => void
  sheetInfo: SheetInfo
  fields: FormFieldConfig[]
  formSchema: z.ZodSchema<any>
  onSubmit: (values: any) => void
  mode: string
  data: any
}
