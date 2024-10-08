import { useCreateProduct } from '@/client/products'
import { InputField } from '@/components/form'
import { MetadataField } from '@/components/form/metadata-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
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
import { useOrganization } from '@/context/organization-provider'
import { product } from '@/schema/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'

export type ProductsSheetProps = DialogProps & {}

const defaultValues = {
  name: 'Product Test',
  metadata: {
    data: 'meta'
  }
}

const FormSchema = z.object({
  name: product.name,
  metadata: product.metadata
})
type FormData = z.infer<typeof FormSchema>

export const ProductsSheet = ({ ...others }) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const { id: ledgerId } = useParams<{ id: string }>()
  const [metadataEnabled, setMetadataEnabled] = React.useState(false)

  const { mutate } = useCreateProduct({
    organizationId: currentOrganization.id,
    ledgerId
  })

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues
  })

  const handleSubmit = (data: FormData) => {
    mutate(data)
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
            className="flex flex-grow flex-col gap-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <InputField
              name="name"
              label={intl.formatMessage({
                id: 'entity.product.name',
                defaultMessage: 'Product Name'
              })}
              control={form.control}
              required
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
            </div>

            {metadataEnabled && (
              <div>
                <MetadataField name="metadata" control={form.control} />
              </div>
            )}

            <p className="text-xs font-normal italic text-shadcn-400">
              {intl.formatMessage({
                id: 'common.requiredFields',
                defaultMessage: '(*) required fields.'
              })}
            </p>

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
