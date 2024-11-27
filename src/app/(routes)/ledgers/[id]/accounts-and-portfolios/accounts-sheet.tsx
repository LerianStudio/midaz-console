import React, { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Form } from '@/components/ui/form'
import { useParams } from 'next/navigation'
import { useIntl } from 'react-intl'
import { DialogProps } from '@radix-ui/react-dialog'
import { LoadingButton } from '@/components/ui/loading-button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Label } from '@/components/ui/label'
import { MetadataField } from '@/components/form/metadata-field'
import { Switch } from '@/components/ui/switch'
import { metadata } from '@/schema/metadata'
import { useListProducts } from '@/client/products'
import { useCreateAccount, useUpdateAccount } from '@/client/accounts'
import { useListPortfolios } from '@/client/portfolios'
import { isNil } from 'lodash'
import { useListAssets } from '@/client/assets'
import useCustomToast from '@/hooks/use-custom-toast'
import { accountSchema } from '@/schema/account'
import { AccountType } from '@/types/accounts-type'
import { SelectItem } from '@/components/ui/select'
import { InputField, SelectField } from '@/components/form'

export type AccountSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: AccountType | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  entityId: '',
  productId: '',
  assetCode: '',
  alias: '',
  type: '',
  metadata: {}
}

type FormData = z.infer<typeof accountSchema>

export const AccountSheet = ({
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: AccountSheetProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [metadataEnabled, setMetadataEnabled] = React.useState(
    Object.entries(metadata || {}).length > 0
  )
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('')

  const { data: rawProductListData } = useListProducts({
    organizationId: currentOrganization.id!,
    ledgerId
  })

  const { data: rawPortfolioData } = useListPortfolios({
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

  const { data: rawAssetListData } = useListAssets({
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

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
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
    onSuccess: (data) => {
      onSucess?.()
      onOpenChange?.(false)
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.accountCreated',
            defaultMessage: '{accountName} account successfully created'
          },
          { accountName: (data as AccountType)?.name! }
        )
      )
    },
    onError: () => {
      showError(
        intl.formatMessage({
          id: 'accounts.toast.create.error',
          defaultMessage: 'Error creating account'
        })
      )
    }
  })

  const { mutate: updateAccount, isPending: updatePending } = useUpdateAccount({
    organizationId: currentOrganization.id!,
    ledgerId,
    accountId: data?.id!,
    portfolioId: data?.portfolioId!,
    onSuccess: (data) => {
      onSucess?.()
      onOpenChange?.(false)
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.accountUpdated',
            defaultMessage: '{accountName} account successfully updated'
          },
          { accountName: (data as AccountType)?.name! }
        )
      )
    },
    onError: () => {
      showError(
        intl.formatMessage({
          id: 'accounts.toast.update.error',
          defaultMessage: 'Error updating account'
        })
      )
    }
  })

  const { showSuccess, showError } = useCustomToast()

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      createAccount({
        ...data,
        portfolioId: data.portfolioId
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
                  id: 'ledgers.account.sheet.create.title',
                  defaultMessage: 'New Account'
                })}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.account.sheet.create.description',
                  defaultMessage:
                    'Fill in the details of the Account you want to create.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          {mode === 'edit' && (
            <SheetHeader>
              <SheetTitle>
                {intl.formatMessage(
                  {
                    id: 'ledgers.account.sheet.edit.title',
                    defaultMessage: 'Edit {accountName}'
                  },
                  {
                    accountName: data?.name
                  }
                )}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.account.sheet.edit.description',
                  defaultMessage: 'View and edit account fields.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-grow flex-col gap-4"
            >
              <InputField
                control={form.control}
                name="name"
                label={intl.formatMessage({
                  id: 'ledgers.account.field.name',
                  defaultMessage: 'Account Name'
                })}
                tooltip={intl.formatMessage({
                  id: 'ledgers.account.field.name.tooltip',
                  defaultMessage: 'Enter the name of the account'
                })}
              />

              <InputField
                control={form.control}
                name="alias"
                label={intl.formatMessage({
                  id: 'ledgers.account.field.alias',
                  defaultMessage: 'Account Alias'
                })}
                tooltip={intl.formatMessage({
                  id: 'ledgers.account.field.alias.tooltip',
                  defaultMessage:
                    'Nickname (@) for identifying the Account holder'
                })}
              />

              <SelectField
                control={form.control}
                name="type"
                label={intl.formatMessage({
                  id: 'common.type',
                  defaultMessage: 'Type'
                })}
                tooltip={intl.formatMessage({
                  id: 'ledgers.account.field.type.tooltip',
                  defaultMessage: 'The type of account'
                })}
              >
                <SelectItem value="deposit">
                  {intl.formatMessage({
                    id: 'account.sheet.type.deposit',
                    defaultMessage: 'Deposit'
                  })}
                </SelectItem>

                <SelectItem value="savings">
                  {intl.formatMessage({
                    id: 'account.sheet.type.savings',
                    defaultMessage: 'Savings'
                  })}
                </SelectItem>

                <SelectItem value="loans">
                  {intl.formatMessage({
                    id: 'account.sheet.type.loans',
                    defaultMessage: 'Loans'
                  })}
                </SelectItem>

                <SelectItem value="marketplace">
                  {intl.formatMessage({
                    id: 'account.sheet.type.marketplace',
                    defaultMessage: 'Marketplace'
                  })}
                </SelectItem>

                <SelectItem value="creditCard">
                  {intl.formatMessage({
                    id: 'account.sheet.type.creditCard',
                    defaultMessage: 'CreditCard'
                  })}
                </SelectItem>

                <SelectItem value="external">
                  {intl.formatMessage({
                    id: 'account.sheet.type.external',
                    defaultMessage: 'External'
                  })}
                </SelectItem>
              </SelectField>

              {mode === 'create' && (
                <InputField
                  control={form.control}
                  name="entityId"
                  label={intl.formatMessage({
                    id: 'ledgers.account.field.entityId',
                    defaultMessage: 'Entity ID'
                  })}
                  tooltip={intl.formatMessage({
                    id: 'ledgers.account.field.entityId.tooltip',
                    defaultMessage:
                      'Identification number (EntityId) of the Account holder'
                  })}
                />
              )}
              {mode === 'create' && (
                <>
                  <SelectField
                    control={form.control}
                    name="assetCode"
                    label={intl.formatMessage({
                      id: 'ledgers.account.field.asset',
                      defaultMessage: 'Asset'
                    })}
                    tooltip={intl.formatMessage({
                      id: 'ledgers.account.field.asset.tooltip',
                      defaultMessage:
                        'Asset or currency that will be operated in this Account using balance'
                    })}
                  >
                    {assetListData?.map((asset) => (
                      <SelectItem key={asset.value} value={asset.value}>
                        {asset.label}
                      </SelectItem>
                    ))}
                  </SelectField>

                  <SelectField
                    control={form.control}
                    name="portfolioId"
                    label={intl.formatMessage({
                      id: 'ledgers.account.field.portfolio',
                      defaultMessage: 'Portfolio'
                    })}
                    tooltip={intl.formatMessage({
                      id: 'ledgers.account.field.portfolio.tooltip',
                      defaultMessage: 'Portfolio that will receive this account'
                    })}
                  >
                    {portfolioListData?.map((portfolio) => (
                      <SelectItem key={portfolio.value} value={portfolio.value}>
                        {portfolio.label}
                      </SelectItem>
                    ))}
                  </SelectField>
                </>
              )}

              <SelectField
                control={form.control}
                name="productId"
                label={intl.formatMessage({
                  id: 'ledgers.account.field.product',
                  defaultMessage: 'Product'
                })}
                tooltip={intl.formatMessage({
                  id: 'ledgers.account.field.product.tooltip',
                  defaultMessage:
                    'Category (cluster) of clients with specific characteristics'
                })}
              >
                {productListData?.map((product) => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectField>

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
    </>
  )
}
