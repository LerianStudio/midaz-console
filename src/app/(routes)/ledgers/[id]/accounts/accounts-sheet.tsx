import React, { useMemo } from 'react'
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
import { MetadataField } from '@/components/form/metadata-field'
import { useListProducts } from '@/client/products'
import { useCreateAccount, useUpdateAccount } from '@/client/accounts'
import { useListPortfolios } from '@/client/portfolios'
import { isNil, omitBy } from 'lodash'
import { useListAssets } from '@/client/assets'
import useCustomToast from '@/hooks/use-custom-toast'
import { accountSchema } from '@/schema/account'
import { AccountType } from '@/types/accounts-type'
import { SelectItem } from '@/components/ui/select'
import { InputField, SelectField } from '@/components/form'
import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type AccountSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: AccountType | null
  onSuccess?: () => void
}

const initialValues = {
  name: '',
  entityId: '',
  portfolioId: '',
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
  onSuccess,
  onOpenChange,
  ...others
}: AccountSheetProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()

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
    defaultValues: initialValues
  })

  const { mutate: createAccount, isPending: createPending } = useCreateAccount({
    organizationId: currentOrganization.id!,
    ledgerId,
    onSuccess: (data) => {
      onSuccess?.()
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
    onSuccess: (data) => {
      onSuccess?.()
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
    const cleanedData = omitBy(data, (value) => value === '' || isNil(value))

    if (mode === 'create') {
      createAccount({
        ...cleanedData,
        portfolioId: cleanedData.portfolioId
      })
    } else if (mode === 'edit') {
      const { type, portfolioId, assetCode, ...updateData } = cleanedData
      updateAccount({
        ...updateData
      })
    }

    form.reset(initialValues)
  }

  React.useEffect(() => {
    if (!isNil(data)) {
      if (mode === 'edit') {
        const { entityId, ...dataWithoutEntityId } = data
        form.reset(dataWithoutEntityId, { keepDefaultValues: true })
      } else {
        form.reset(data, { keepDefaultValues: true })
      }
    }
  }, [data])

  return (
    <React.Fragment>
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
              className="flex flex-grow flex-col"
            >
              <Tabs defaultValue="details" className="mt-0">
                <TabsList className="mb-8 px-0">
                  <TabsTrigger value="details">
                    {intl.formatMessage({
                      id: 'ledgers.account.sheet.tabs.details',
                      defaultMessage: 'Account Details'
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

                    {mode === 'create' && (
                      <React.Fragment>
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
                            defaultMessage:
                              'Portfolio that will receive this account'
                          })}
                        >
                          {portfolioListData?.map((portfolio) => (
                            <SelectItem
                              key={portfolio.value}
                              value={portfolio.value}
                            >
                              {portfolio.label}
                            </SelectItem>
                          ))}
                        </SelectField>
                      </React.Fragment>
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

              <SheetFooter className="sticky bottom-0 mt-auto bg-white py-4">
                <LoadingButton
                  size="lg"
                  type="submit"
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
    </React.Fragment>
  )
}
