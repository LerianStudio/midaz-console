import { useCreateProduct, useUpdateProduct } from '@/client/products'
import { InputField } from '@/components/form'
import { MetadataField } from '@/components/form/metadata-field'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { ProductResponseDto } from '@/core/application/dto/product-dto'
import { product } from '@/schema/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'
import { isNil } from 'lodash'
import { LoadingButton } from '@/components/ui/loading-button'

export type ProductsSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: ProductResponseDto | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  metadata: {}
}

const FormSchema = z.object({
  name: product.name,
  metadata: product.metadata
})
type FormData = z.infer<typeof FormSchema>

export const ProductsSheet = ({
  ledgerId,
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: ProductsSheetProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()

  const { mutate: createProduct, isPending: createPending } = useCreateProduct({
    organizationId: currentOrganization.id!,
    ledgerId,
    onSuccess: () => {
      onSucess?.()
      onOpenChange?.(false)
    }
  })
  const { mutate: updateProduct, isPending: updatePending } = useUpdateProduct({
    organizationId: currentOrganization!.id!,
    ledgerId,
    productId: data?.id!,
    onSuccess: () => {
      onSucess?.()
      onOpenChange?.(false)
    }
  })

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: Object.assign({}, defaultValues, product)
  })

  const [metadataEnabled, setMetadataEnabled] = React.useState(
    Object.entries(product?.metadata || {}).length > 0
  )

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      createProduct(data)
    } else if (mode === 'edit') {
      updateProduct(data)
    }

    form.reset(defaultValues)
  }

  // Resets information if using creation mode
  React.useEffect(() => {
    if (mode === 'create') {
      form.reset(defaultValues)
    }
  }, [mode])

  // Resets information if props change values
  React.useEffect(() => {
    if (!isNil(data)) {
      setMetadataEnabled(Object.entries(data.metadata).length > 0)
      form.reset(data, { keepDefaultValues: true })
    } else {
      setMetadataEnabled(false)
    }
  }, [data])

  return (
    <Sheet onOpenChange={onOpenChange} {...others}>
      <SheetContent>
        {mode === 'create' && (
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
        )}

        {mode === 'edit' && (
          <SheetHeader>
            <SheetTitle>
              {intl.formatMessage(
                {
                  id: 'ledgers.products.sheet.edit.title',
                  defaultMessage: 'Edit {productName}'
                },
                {
                  productName: data?.name
                }
              )}
            </SheetTitle>
            <SheetDescription>
              {intl.formatMessage({
                id: 'ledgers.products.sheet.edit.description',
                defaultMessage: 'View and edit product fields.'
              })}
            </SheetDescription>
          </SheetHeader>
        )}

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
              <LoadingButton
                size="lg"
                type="submit"
                disabled={!(form.formState.isDirty && form.formState.isValid)}
                fullWidth
                loading={createPending || updatePending}
              >
                {intl.formatMessage({
                  id: 'common.save',
                  defaultMessage: 'Save'
                })}
              </LoadingButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
