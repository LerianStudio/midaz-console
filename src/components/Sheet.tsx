import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import {
  Sheet as BaseSheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import React, { useEffect, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { truncateString } from '@/helpers'
import { Switch } from './ui/switch'
import { Label } from './ui/label/label'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

type Option = {
  value: string
  label?: string
}

export type FormFieldConfig = {
  name: string
  label: string
  placeholder?: string
  description?: string
  options: []
}

type SheetDemoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  fields: FormFieldConfig[]
  formSchema: z.ZodSchema<any>
  title: string
  description: string
  onSubmit: (values: any) => void
  mode: string
  data: any
  buttonText: string
}

type MetadataItem = {
  id: string
  key: string
  value: string
}

type MetadataValues = {
  metadata: MetadataItem[]
}

export const Sheet = ({
  open,
  setOpen,
  fields,
  formSchema,
  title,
  description,
  onSubmit,
  mode,
  data,
  buttonText
}: SheetDemoProps) => {
  const [isSwitchOn, setSwitchOn] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState({ key: '', value: '' })

  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'
  const isViewMode = mode === 'view'

  const getDefaultValues = (
    isEditMode: boolean,
    isViewMode: boolean,
    data: any,
    fields: FormFieldConfig[]
  ) => {
    return (isEditMode || isViewMode) && data
      ? data
      : fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(isEditMode, isViewMode, data, fields)
  })

  const { control } = form

  const {
    fields: metaFields,
    append,
    remove
  } = useFieldArray<MetadataValues>({
    control,
    name: 'metadata'
  })

  const handleAddMetadata = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (currentMetadata.key && currentMetadata.value) {
      const newMetadataItem = {
        ...currentMetadata,
        id: Date.now().toString()
      }

      append(newMetadataItem)
      setCurrentMetadata({ key: '', value: '' })
    }
  }

  const handleMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'key' | 'value'
  ) => {
    setCurrentMetadata({
      ...currentMetadata,
      [field]: (e.target as HTMLInputElement).value
    })
  }

  const renderMetadataFields = () => {
    return (
      <div className="flex gap-5">
        <div className="flex w-full gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="key">Chave</Label>
            <Input
              id="key"
              value={currentMetadata.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMetadataChange(e, 'key')
              }
              placeholder="Key"
              className="h-9"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              value={currentMetadata.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMetadataChange(e, 'value')
              }
              placeholder="Value"
              className="h-9"
            />
          </div>
        </div>

        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleAddMetadata(e)
          }
          className="h-9 w-9 self-end rounded-full bg-shadcn-600 disabled:bg-shadcn-200"
          disabled={!currentMetadata.key || !currentMetadata.value}
        >
          <Plus
            size={16}
            className={cn(
              'shrink-0',
              !currentMetadata.key || !currentMetadata.value
                ? 'text-shadcn-400'
                : 'text-white'
            )}
          />
        </Button>
      </div>
    )
  }

  const renderPreviewMetadataFields = () => {
    return metaFields.map((item, index) => (
      <div key={item.id} className="mt-2 flex items-center justify-between">
        <div className="flex w-full gap-5">
          <div className="flex flex-1 gap-2">
            <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
              {item.key}
            </div>
            <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
              {item.value}
            </div>
          </div>
          <Button
            onClick={() => remove(index)}
            className="group h-9 w-9 rounded-full border border-shadcn-200 bg-white hover:border-none"
          >
            <Trash
              size={16}
              className="shrink-0 text-black group-hover:text-white"
            />
          </Button>
        </div>
      </div>
    ))
  }

  const shouldResetForm = (
    prevData: any,
    data: any,
    isEditMode: boolean,
    isViewMode: boolean
  ) => {
    return prevData !== data && (isEditMode || isViewMode)
  }

  const prevDataRef = useRef(data)

  useEffect(() => {
    if (shouldResetForm(prevDataRef.current, data, isEditMode, isViewMode)) {
      form.reset(getDefaultValues(isEditMode, isViewMode, data, fields))
      prevDataRef.current = data
    }
  }, [data, isEditMode, isViewMode, form])

  const renderSelectField = (field: FormFieldConfig, form: any) => {
    return (
      <Select onValueChange={(value) => form.setValue(field.name, value)}>
        <SelectTrigger>
          <SelectValue placeholder={data?.divisionName || ''} />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  const renderInputField = (
    field: FormFieldConfig,
    form: any,
    isViewMode: boolean
  ) => {
    if (!(isCreateMode && field.name === 'id')) {
      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: renderField }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel className="text-sm font-semibold text-[#52525b]">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.options ? (
                    renderSelectField(field, form)
                  ) : (
                    <Input
                      placeholder={field.placeholder || ''}
                      readOnly={isViewMode || field.name === 'id'}
                      className="placeholder:text-shadcn-400"
                      autoFocus={false}
                      value={renderField.value ?? ''}
                      onChange={renderField.onChange}
                      onBlur={renderField.onBlur}
                    />
                  )}
                </FormControl>

                {field.description ? (
                  <FormDescription className="text-xs font-medium text-shadcn-400">
                    {field.description}
                  </FormDescription>
                ) : null}
              </div>
            </FormItem>
          )}
        />
      )
    }
  }

  const renderField = (
    field: FormFieldConfig,
    form: any,
    isCreateMode: boolean,
    isViewMode: boolean
  ) => {
    if (!(isCreateMode && field.name === 'id')) {
      return renderInputField(field, form, isViewMode)
    }

    return null
  }

  return (
    <BaseSheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="max-h-screen w-2/5 overflow-x-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-[#52525b]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>{truncateString(title, 30)}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTitle>
          <SheetDescription className="text-sm font-medium text-shadcn-500">
            {description}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-5 grid gap-8 py-4">
              {fields.map((field) =>
                renderField(field, form, isCreateMode, isViewMode)
              )}

              <div className="gap- flex flex-col gap-4">
                <Label htmlFor="metadata">Metadados</Label>
                <Switch
                  id="metadata"
                  checked={isSwitchOn}
                  onCheckedChange={() => setSwitchOn(!isSwitchOn)}
                  className="data-[state=checked]:bg-[#52525B] data-[state=unchecked]:bg-[#E5E7EB]"
                />
              </div>

              <div className="flex flex-col gap-2">
                {isSwitchOn && (
                  <React.Fragment>
                    {renderMetadataFields()}
                    {renderPreviewMetadataFields()}
                  </React.Fragment>
                )}
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type={isViewMode ? 'button' : 'submit'}
                  className="mt-5 bg-shadcn-600 text-white hover:bg-shadcn-600/70"
                >
                  {buttonText}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </BaseSheet>
  )
}
