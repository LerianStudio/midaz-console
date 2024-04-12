import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { useEffect, useRef } from 'react'
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
import { Country, State } from '@/[locale]/(routes)/divisions/divisions-view'

type Option = {
  value: string
  label?: string
}

export type FormFieldConfig = {
  name: string
  label: string
  placeholder?: string
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
  countries: Country[]
  statesOptions: State[]
  onCountryChange: (countryCode: string) => void
}

export function SheetDemo({
  open,
  setOpen,
  fields,
  formSchema,
  title,
  description,
  onSubmit,
  mode,
  data,
  buttonText,
  countries,
  statesOptions,
  onCountryChange
}: SheetDemoProps) {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(isEditMode, isViewMode, data, fields)
  })

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

  const renderCountryField = (
    field: FormFieldConfig,
    form: any,
    onCountryChange: any,
    countries: Country[]
  ) => {
    if (field.name === 'address.country') {
      return (
        <div className="grid grid-cols-6 items-center gap-4" key={field.name}>
          <FormLabel className="col-span-2 text-right text-sm font-semibold">
            {field.label}
          </FormLabel>
          <FormControl className="col-span-4">
            <Select
              onValueChange={(value) => {
                onCountryChange(value)
                form.setValue('address.country', value, {
                  shouldValidate: true
                })
              }}
              value={form.watch('address.country')}
            >
              <SelectTrigger className="w-[233px]">
                <SelectValue>
                  {form.getValues('address.country') || 'Choose a country'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.code2}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      )
    }
  }

  const renderStateField = (
    field: FormFieldConfig,
    form: any,
    statesOptions: State[]
  ) => {
    if (field.name === 'address.state') {
      return (
        <div className="grid grid-cols-6 items-center gap-4" key={field.name}>
          <FormLabel className="col-span-2 text-right text-sm font-semibold">
            {field.label}
          </FormLabel>
          <FormControl className="col-span-4">
            <Select
              onValueChange={(value) => {
                form.setValue('address.state', value, {
                  shouldValidate: true
                })
              }}
              value={form.watch('address.state')}
            >
              <SelectTrigger className="w-[233px]">
                <SelectValue>
                  {form.getValues('address.state') || 'Choose a state'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statesOptions.map((state) => (
                  <SelectItem key={state.name} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      )
    }
  }

  const renderSelectField = (field: FormFieldConfig, form: any) => {
    return (
      <Select onValueChange={(value) => form.setValue(field.name, value)}>
        <SelectTrigger className="w-[233px]">
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
              <div className="grid grid-cols-6 items-center gap-4">
                <FormLabel className="col-span-2 text-right text-sm font-semibold">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.options ? (
                    renderSelectField(field, form)
                  ) : (
                    <Input
                      placeholder={field.placeholder || ''}
                      readOnly={isViewMode || field.name === 'id'}
                      className="col-span-4"
                      autoFocus={false}
                      value={renderField.value ?? ''}
                      onChange={renderField.onChange}
                      onBlur={renderField.onBlur}
                    />
                  )}
                </FormControl>
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
    isViewMode: boolean,
    onCountryChange: any,
    countries: Country[],
    statesOptions: State[]
  ) => {
    if (field.name === 'address.country') {
      return renderCountryField(field, form, onCountryChange, countries)
    } else if (field.name === 'address.state') {
      return renderStateField(field, form, statesOptions)
    }

    if (!(isCreateMode && field.name === 'id')) {
      return renderInputField(field, form, isViewMode)
    }

    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="max-h-screen w-full min-w-[406px] overflow-x-auto px-6 py-5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">
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
          <SheetDescription className="text-xs font-medium text-[#71717A]">
            {description}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-5 grid gap-4 py-4">
              {fields.map((field) =>
                renderField(
                  field,
                  form,
                  isCreateMode,
                  isViewMode,
                  onCountryChange,
                  countries,
                  statesOptions
                )
              )}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type={isViewMode ? 'button' : 'submit'}
                  className="bg-lemon-400 hover:bg-lemon-400/70 mt-5 text-black"
                >
                  {buttonText}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
