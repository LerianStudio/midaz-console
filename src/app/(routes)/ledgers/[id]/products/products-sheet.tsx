import { MetadataField } from '@/components/form/metadata-field'
import { MetadataInput, MetadataPreview } from '@/components/metadata-field'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { product } from '@/schema/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'

export type ProductsSheetProps = DialogProps & {}

const defaultValues = {
  name: '',
  metadata: {}
}

const FormSchema = z.object({
  name: product.name,
  metadata: product.metadata
})
type FormData = z.infer<typeof FormSchema>

export const ProductsSheet = ({ ...others }) => {
  const intl = useIntl()
  const [metadataEnabled, setMetadataEnabled] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues
  })

  const handleSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Sheet {...others}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {intl.formatMessage({
              id: 'ledgers.products.sheet.title',
              defaultMessage: 'New Product'
            })}
          </SheetTitle>
          <SheetDescription>
            {intl.formatMessage({
              id: 'ledgers.products.sheet.description',
              defaultMessage:
                'Fill in the details of the Product you want to create.'
            })}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            className="flex flex-grow flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem required>
                  <FormLabel>
                    {intl.formatMessage({
                      id: 'entity.product.name',
                      defaultMessage: 'Product Name'
                    })}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <div className="gap- flex flex-col gap-4">
                <Label htmlFor="metadata">
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </Label>
                <Switch
                  id="metadata"
                  checked={metadataEnabled}
                  onCheckedChange={() => setMetadataEnabled(!metadataEnabled)}
                />
              </div>

              {metadataEnabled && (
                <MetadataField name="metadata" control={form.control} />
              )}

              <p className="text-xs font-normal italic text-shadcn-400">
                {intl.formatMessage({
                  id: 'common.requiredFields',
                  defaultMessage: '(*) required fields.'
                })}
              </p>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  size="lg"
                  type="submit"
                  disabled={!(form.formState.isDirty && form.formState.isValid)}
                  fullWidth
                >
                  {intl.formatMessage({
                    id: 'common.save',
                    defaultMessage: 'Save'
                  })}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
