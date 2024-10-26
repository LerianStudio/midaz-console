import React, { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Form } from '@/components/ui/form'
import { useParams } from 'next/navigation'
import { useIntl } from 'react-intl'
import { formSchemaAccount } from './accounts-and-portfolios-form-schema'
import { DialogProps } from '@radix-ui/react-dialog'
import { LoadingButton } from '@/components/ui/loading-button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Label } from '@/components/ui/label'
import { MetadataField } from '@/components/form/metadata-field'
import { Switch } from '@/components/ui/switch'
import { metadata } from '@/schema/metadata'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { FormSelectWithTooltip } from './form-select-with-tooltip'
import { FormInputWithTooltip } from './form-input-with-tooltip'
import { useListProducts } from '@/client/products'
import { useCreateAccount, useUpdateAccount } from '@/client/accounts'
import { useListPortfolios } from '@/client/portfolios'
import { isNil } from 'lodash'
import { useListAssets } from '@/client/assets-client'

export interface AccountResponse {
  id: string
  ledgerId: string
  assetCode: string
  organizationId: string
  name: string
  alias: string
  type: string
  entityId: string
  parentAccountId: string
  portfolioId: string
  productId: string
  status: {
    code: string
    description: string
  }
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type PortfolioSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: AccountResponse | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  entityId: '',
  productId: '',
  assetCode: '',
  alias: '',
  metadata: {}
}

type FormData = z.infer<typeof formSchemaAccount>

export const AccountSheet = ({
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: PortfolioSheetProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { currentOrganization } = useOrganization()
  const [metadataEnabled, setMetadataEnabled] = React.useState(
    Object.entries(metadata || {}).length > 0
  )
  const [newPortfolioName, setNewPortfolioName] = useState<string>('')
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('')

  console.log('rocket', data)
  const { data: rawProductListData, refetch } = useListProducts({
    organizationId: currentOrganization.id!,
    ledgerId
  })

  const { data: rawPortfolioData, refetch: refetchPortfolio } =
    useListPortfolios({
      organizationId: currentOrganization.id!,
      ledgerId
    })

  const portfolioListData = useMemo(() => {
    return (
      rawPortfolioData?.items?.map((portfolio) => ({
        value: portfolio.id ?? '',
        label: portfolio.name
      })) || []
    )
  }, [rawPortfolioData])

  const productListData = useMemo(() => {
    return (
      rawProductListData?.items?.map((product) => ({
        value: product.id,
        label: product.name
      })) || []
    )
  }, [rawProductListData])

  const { data: rawAssetListData, refetch: refetchAssets } = useListAssets({
    organizationId: currentOrganization.id!,
    ledgerId
  })

  const assetListData = useMemo(() => {
    return (
      rawAssetListData?.items?.map((asset: { code: string; name: string }) => ({
        value: asset.code,
        label: `${asset.code} - ${asset.name}`
      })) || []
    )
  }, [rawAssetListData])

  const form = useForm<z.infer<typeof formSchemaAccount>>({
    resolver: zodResolver(formSchemaAccount),
    defaultValues: Object.assign(
      {},
      defaultValues,
      mode === 'create' ? { entityId: '' } : {}
    )
  })

  const { mutate: createAccount, isPending: createPending } = useCreateAccount({
    organizationId: currentOrganization.id!,
    ledgerId,
    portfolioId: selectedPortfolioId,
    onSuccess: () => {
      onSucess?.()
      onOpenChange?.(false)
    }
  })

  const { mutate: updateAccount, isPending: updatePending } = useUpdateAccount({
    organizationId: currentOrganization.id!,
    ledgerId,
    accountId: data?.id!,
    portfolioId: data?.portfolioId!,
    onSuccess: () => {
      onSucess?.()
      onOpenChange?.(false)
    }
  })

  const handleSubmit = (data: FormData) => {
    console.log('data submitted', data)
    if (mode === 'create') {
      createAccount({
        ...data,
        portfolioId: data.portfolioId,
        assetCode: 'BRL'
      })
    } else if (mode === 'edit') {
      const { portfolioId, assetCode, ...updateData } = data
      updateAccount({
        ...updateData
      })
    }

    form.reset(defaultValues)
  }

  React.useEffect(() => {
    if (!isNil(data)) {
      setMetadataEnabled(Object.entries(data.metadata || {}).length > 0)
      if (mode === 'edit') {
        const { entityId, ...dataWithoutEntityId } = data
        form.reset(dataWithoutEntityId, { keepDefaultValues: true })
      } else {
        form.reset(data, { keepDefaultValues: true })
      }
    } else {
      setMetadataEnabled(false)
    }
  }, [data])

  return (
    <>
      <Sheet onOpenChange={onOpenChange} {...others}>
        <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {mode === 'create' && (
            <SheetHeader>
              <SheetTitle>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.title',
                  defaultMessage: 'New Portfolio'
                })}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.description',
                  defaultMessage:
                    'Fill in the details of the Portfolio you want to create.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          {mode === 'edit' && (
            <SheetHeader>
              <SheetTitle>
                {intl.formatMessage(
                  {
                    id: 'ledgers.portfolio.sheet.edit.title',
                    defaultMessage: 'Edit {portfolioName}'
                  },
                  {
                    portfolioName: data?.name
                  }
                )}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.edit.description',
                  defaultMessage: 'View and edit product fields.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-grow flex-col gap-4"
            >
              <FormInputWithTooltip
                control={form.control}
                name="name"
                label="Account Name"
                tooltipText="Enter the name of the account"
                placeholder="Enter account name"
              />

              <FormInputWithTooltip
                control={form.control}
                name="alias"
                label="Account Name"
                tooltipText="Enter the name of the account"
                placeholder="Enter account name"
              />

              {mode === 'create' && (
                <FormInputWithTooltip
                  control={form.control}
                  name="entityId"
                  label="Account Name"
                  tooltipText="Enter the name of the account"
                  placeholder="Enter account name"
                />
              )}

              <FormSelectWithTooltip
                control={form.control}
                name="assetCode"
                label="Asset"
                tooltipText="Select the asset associated with this account"
                placeholder="Select an asset"
                options={assetListData}
              />

              {mode === 'create' && (
                <FormSelectWithTooltip
                  control={form.control}
                  name="portfolioId"
                  label="Portfolio"
                  tooltipText="Select the portfolio associated with this account"
                  placeholder="Select a portfolio"
                  options={portfolioListData}
                  onChange={(value) => {
                    console.log('value', value)
                    setSelectedPortfolioId(value)
                  }}
                />
              )}

              <FormSelectWithTooltip
                control={form.control}
                name="productId"
                label="Product"
                tooltipText="Select the product associated with this account"
                placeholder="Select a product"
                options={productListData}
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
              <SheetFooter className="sticky bottom-0 mt-auto bg-white py-4">
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

      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={intl.formatMessage({
          id: 'ledgers.dialog.title',
          defaultMessage: 'Your new portfolio is ready'
        })}
        description={intl.formatMessage(
          {
            id: 'ledgers.portfolio.dialog.create.description',
            defaultMessage:
              'Do you want to add the first account to the {portfolioName} you created? '
          },
          {
            portfolioName: newPortfolioName
          }
        )}
        onConfirm={() => {}}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  )
}
