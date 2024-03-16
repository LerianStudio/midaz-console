import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { useEffect } from 'react'

type FormFieldConfig = {
  name: string
  label: string
  placeholder?: string
  validation?: z.ZodType<any, any>
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
  divisionData: any
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
  divisionData
}: SheetDemoProps) {
  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'
  const isViewMode = mode === 'view'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      (isEditMode || isViewMode) && divisionData
        ? divisionData
        : fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  })

  useEffect(() => {
    if ((isEditMode || isViewMode) && divisionData) {
      form.reset(divisionData)
    } else if (isCreateMode) {
      form.reset(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
      )
    }
  }, [isEditMode, isViewMode, isCreateMode, divisionData, form, fields])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full min-w-[406px] px-6 py-5">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">{title}</SheetTitle>
          <SheetDescription className="text-xs font-medium text-[#71717A]">
            {description}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-5 grid gap-4 py-4">
              {fields.map((field) => (
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
                          <Input
                            placeholder={field.placeholder}
                            readOnly={isViewMode || field.name == 'id'}
                            className="col-span-4"
                            autoFocus={false}
                            {...renderField}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type={isViewMode ? 'button' : 'submit'}
                  className="mt-5 bg-[#F9DF4B] text-black hover:bg-[#F9DF4B]/70"
                >
                  {isCreateMode ? 'Criar' : isEditMode ? 'Salvar' : 'Fechar'}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
