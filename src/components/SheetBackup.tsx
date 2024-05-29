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
import { SheetProps } from '@/types/SheetType'

const MetadataFields = ({
  currentMetadata,
  setCurrentMetadata,
  append
}: any) => {
  const handleAddMetadata = (e) => {
    e.preventDefault()
    if (currentMetadata.key && currentMetadata.value) {
      append({ ...currentMetadata })
      setCurrentMetadata({ key: '', value: '' })
    }
  }

  const handleMetadataChange = (e, field) => {
    setCurrentMetadata({
      ...currentMetadata,
      [field]: e.target.value
    })
  }

  return (
    <div className="flex gap-5">
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="key">Chave</Label>
          <Input
            id="key"
            value={currentMetadata.key}
            onChange={(e) => handleMetadataChange(e, 'key')}
            placeholder="Key"
            className="h-9"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            value={currentMetadata.value}
            onChange={(e) => handleMetadataChange(e, 'value')}
            placeholder="Value"
            className="h-9"
          />
        </div>
      </div>
      <Button
        onClick={handleAddMetadata}
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

const PreviewMetadataFields = ({ metaFields, remove }) => {
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

const SelectField = ({ field, form }) => {
  return (
    <Select onValueChange={(value) => form.setValue(field.name, value)}>
      <SelectTrigger>
        <SelectValue placeholder={form.getValues(field.name) || ''} />
      </SelectTrigger>
      <SelectContent>
        {field.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const InputField = ({ field, form, isViewMode }) => {
  if (field.options) {
    return <SelectField field={field} form={form} />
  }
  return (
    <Input
      placeholder={field.placeholder || ''}
      readOnly={isViewMode || field.name === 'id'}
      className="placeholder:text-shadcn-400"
      autoFocus={false}
      value={form.getValues(field.name) ?? ''}
      onChange={(e) => form.setValue(field.name, e.target.value)}
    />
  )
}

const RenderField = ({ field, form, isCreateMode, isViewMode }) => {
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

export const Sheet = ({
  open,
  setOpen,
  fields,
  formSchema,
  sheetInfo,
  onSubmit,
  mode,
  data
}: SheetProps) => {
  const [isSwitchOn, setSwitchOn] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState({ key: '', value: '' })

  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'
  const isViewMode = mode === 'view'

  const getDefaultValues = (isEditMode, isViewMode, data, fields) => {
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
  } = useFieldArray({
    control,
    name: 'metadata'
  })

  const shouldResetForm = (prevData, data, isEditMode, isViewMode) => {
    return prevData !== data && (isEditMode || isViewMode)
  }

  const prevDataRef = useRef(data)

  useEffect(() => {
    if (shouldResetForm(prevDataRef.current, data, isEditMode, isViewMode)) {
      form.reset(getDefaultValues(isEditMode, isViewMode, data, fields))
      prevDataRef.current = data
    }
  }, [data, isEditMode, isViewMode, form])

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
                  <div>{truncateString(sheetInfo.title, 30)}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sheetInfo.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTitle>
          <SheetDescription className="text-sm font-medium text-shadcn-500">
            {sheetInfo.description}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-5 grid gap-8 py-4">
              {fields.map((field) => (
                <RenderField
                  key={field.name}
                  field={field}
                  form={form}
                  isCreateMode={isCreateMode}
                  isViewMode={isViewMode}
                />
              ))}
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
                    <MetadataFields
                      currentMetadata={currentMetadata}
                      setCurrentMetadata={setCurrentMetadata}
                      append={append}
                    />

                    <PreviewMetadataFields
                      metaFields={metaFields}
                      remove={remove}
                    />
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
                  {sheetInfo.buttonText}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </BaseSheet>
  )
}
