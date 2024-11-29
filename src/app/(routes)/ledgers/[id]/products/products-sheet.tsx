import { useCreateProduct, useUpdateProduct } from '@/client/products'
import { InputField } from '@/components/form'
import { MetadataField } from '@/components/form/metadata-field'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
      form.reset(data, { keepDefaultValues: true })
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
            className="flex flex-grow flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Tabs defaultValue="details" className="mt-0">
              <TabsList className="mb-8 px-0">
                <TabsTrigger value="details">
                  {intl.formatMessage({
                    id: 'ledgers.products.sheet.tabs.details',
                    defaultMessage: 'Product Details'
                  })}
                </TabsTrigger>
                <TabsTrigger value="metadata">
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="flex flex-grow flex-col gap-4">
                  <InputField
                    name="name"
                    label={intl.formatMessage({
                      id: 'entity.product.name',
                      defaultMessage: 'Product Name'
                    })}
                    control={form.control}
                    required
                  />

                  <p className="text-xs font-normal italic text-shadcn-400">
                    {intl.formatMessage({
                      id: 'common.requiredFields',
                      defaultMessage: '(*) required fields.'
                    })}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="metadata">
                <MetadataField name="metadata" control={form.control} />
              </TabsContent>
            </Tabs>

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
