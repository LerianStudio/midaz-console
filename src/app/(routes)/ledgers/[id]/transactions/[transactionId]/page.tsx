'use client'

import { useParams } from 'next/navigation'
import { useIntl } from 'react-intl'
import { useGetTransactionById } from '@/client/transactions' // Você precisará criar este hook
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { PageHeader } from '@/components/page-header'
import { Breadcrumb } from '@/components/breadcrumb'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTabs } from '@/hooks/use-tabs'
import {
  TransactionReceipt,
  TransactionReceiptDescription,
  TransactionReceiptItem,
  TransactionReceiptOperation,
  TransactionReceiptSubjects,
  TransactionReceiptTicket,
  TransactionReceiptValue
} from '@/components/transactions/primitives/transaction-receipt'
import ArrowRightLeftCircle from '/public/svg/arrow-right-left-circle.svg'
import Image from 'next/image'
import { isNil, values } from 'lodash'
import { Separator } from '@/components/ui/separator'
import { BasicInformationPaper } from '../create/basic-information-paper'
import { Paper } from '@/components/ui/paper'
import DolarSign from '/public/svg/dolar-sign.svg'
import { InputField, SelectField } from '@/components/form'
import { Form } from '@/components/ui/form'
import { useTransactionForm } from '../create/transaction-form-provider'
import { Control, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'node_modules/zod/lib'
import { StatusDisplay } from '@/components/organization-switcher/status'
import ArrowRightCircle from '/public/svg/arrow-right-circle.svg'
import { OperationSourceField } from '../create/operation-source-field'

const TAB_VALUES = {
  SUMMARY: 'summary',
  TRANSACTION_DATA: 'transaction-data',
  OPERATIONS: 'operations'
}

const DEFAULT_TAB_VALUE = TAB_VALUES.SUMMARY

const TransactionDetailsPage = () => {
  const intl = useIntl()
  const { id: ledgerId, transactionId } = useParams<{
    id: string
    transactionId: string
  }>()
  const { currentOrganization } = useOrganization()
  const { activeTab, handleTabChange } = useTabs({
    initialValue: DEFAULT_TAB_VALUE
  })

  const { data: transaction, isLoading } = useGetTransactionById({
    organizationId: currentOrganization.id!,
    ledgerId,
    transactionId
  })

  console.log('transaction', transaction)
  const initialValues = {
    description: transaction?.description || '',
    chartOfAccountsGroupName: transaction?.chartOfAccountsGroupName || '',
    value: transaction?.amount || '',
    asset: transaction?.assetCode || '',
    metadata: transaction?.metadata || {},
    source: transaction?.source?.map((src: string) => ({ account: src })) || [],
    destination:
      transaction?.destination?.map((dest: string) => ({ account: dest })) || []
  }

  const formSchema = z.object({
    description: z.string().optional(),
    chartOfAccountsGroupName: z.string().optional(),
    value: z.string().optional(),
    asset: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    source: z.array(z.object({ account: z.string() })).optional(),
    destination: z.array(z.object({ account: z.string() })).optional()
  })

  type FormSchema = z.infer<typeof formSchema>
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    values: initialValues
  })

  console.log('transaction teste', transaction)

  console.log('form teste', form)

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: intl.formatMessage({
        id: 'entity.ledgers',
        defaultMessage: 'Ledgers'
      }),
      href: '/ledgers'
    },
    {
      name: transaction?.description || transactionId,
      href: `/ledgers/${ledgerId}/transactions/${transactionId}`
    }
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log('transaction', transaction)
  return (
    <div>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          {/* <Breadcrumb paths={breadcrumbPaths} /> */}
          <PageHeader.InfoTitle
            title={intl.formatMessage(
              {
                id: 'transactions.details.title',
                defaultMessage: 'Transaction - {id}'
              },
              { id: `${transactionId.slice(0, 13)}...` }
            )}
            subtitle={intl.formatMessage(
              {
                id: 'transactions.details.status.processed.withDate',
                defaultMessage: 'Processada em {date}'
              },
              {
                date: new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(transaction?.createdAt))
              }
            )}
          />
        </PageHeader.Wrapper>
      </PageHeader.Root>

      <Tabs
        value={activeTab}
        defaultValue={DEFAULT_TAB_VALUE}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value={TAB_VALUES.SUMMARY}>
            {intl.formatMessage({
              id: 'transactions.tab.summary',
              defaultMessage: 'Summary'
            })}
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES.TRANSACTION_DATA}>
            {intl.formatMessage({
              id: 'transactions.tab.data',
              defaultMessage: 'Transaction Data'
            })}
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES.OPERATIONS}>
            {intl.formatMessage({
              id: 'transactions.tab.operations',
              defaultMessage: 'Operations & Metadata'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TAB_VALUES.SUMMARY}>
          <div className="mt-6">
            <pre>{JSON.stringify(transaction, null, 2)}</pre>
          </div>
        </TabsContent>

        <TabsContent value={TAB_VALUES.TRANSACTION_DATA}>
          <div className="col-span-2 col-end-2">
            <TransactionReceipt className="mb-2">
              <Image alt="" src={ArrowRightLeftCircle} />
              <TransactionReceiptValue
                asset={transaction?.asset}
                value={transaction?.value}
              />
              <p className="font-semibold uppercase text-[#282A31]">Manual</p>
              {/* <TransactionReceiptSubjects
                sources={transaction?.source?.map((source) => source.account)}
                destinations={transaction?.destination?.map(
                  (destination) => destination.account
                )}
              /> */}
              {transaction?.description && (
                <TransactionReceiptDescription>
                  {transaction.description}
                </TransactionReceiptDescription>
              )}
            </TransactionReceipt>

            <TransactionReceipt type="ticket">
              {/* <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'transactions.source',
                  defaultMessage: 'Source'
                })}
                value={
                  <div className="flex flex-col">
                    {transaction?.source?.map((source, index) => (
                      <p key={index} className="underline">
                        {source.account}
                      </p>
                    ))}
                  </div>
                }
              /> */}
              {/* <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'transactions.destination',
                  defaultMessage: 'Destination'
                })}
                value={
                  <div className="flex flex-col">
                    {transaction?.destination?.map((destination, index) => (
                      <p key={index} className="underline">
                        {destination.account}
                      </p>
                    ))}
                  </div>
                }
              /> */}
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'common.value',
                  defaultMessage: 'Value'
                })}
                value={`${transaction?.asset} ${transaction?.value}`}
              />
              <Separator orientation="horizontal" />
              {/* {transaction?.source?.map((source, index) => (
                <TransactionReceiptOperation
                  key={index}
                  type="debit"
                  account={source.account}
                  asset={transaction.asset}
                  value={source.value}
                />
              ))}
              {transaction?.destination?.map((destination, index) => (
                <TransactionReceiptOperation
                  key={index}
                  type="credit"
                  account={destination.account}
                  asset={transaction.asset}
                  value={destination.value}
                />
              ))} */}
              <Separator orientation="horizontal" />
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'transactions.create.field.chartOfAccountsGroupName',
                  defaultMessage: 'Accounting route group'
                })}
                value={
                  !isNil(transaction?.chartOfAccountsGroupName) &&
                  transaction.chartOfAccountsGroupName !== ''
                    ? transaction.chartOfAccountsGroupName
                    : intl.formatMessage({
                        id: 'common.none',
                        defaultMessage: 'None'
                      })
                }
              />
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'common.metadata',
                  defaultMessage: 'Metadata'
                })}
                value={intl.formatMessage(
                  {
                    id: 'common.table.metadata',
                    defaultMessage:
                      '{number, plural, =0 {-} one {# record} other {# records}}'
                  },
                  {
                    number: Object.keys(transaction?.metadata ?? {}).length
                  }
                )}
              />
            </TransactionReceipt>

            <TransactionReceiptTicket />
          </div>
        </TabsContent>

        <TabsContent value={TAB_VALUES.OPERATIONS}>
          <Form {...form}>
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <BasicInformationPaper control={form.control} readOnly />
                <div className="mb-10 flex flex-row items-center gap-3">
                  <OperationSourceField
                    name="source"
                    label={intl.formatMessage({
                      id: 'transactions.source',
                      defaultMessage: 'Source'
                    })}
                    values={form.getValues('source') as any}
                    control={form.control as Control<any>}
                    readonly={true}
                  />
                  <Image alt="" src={ArrowRightCircle} />
                  <OperationSourceField
                    name="destination"
                    label={intl.formatMessage({
                      id: 'transactions.destination',
                      defaultMessage: 'Destination'
                    })}
                    values={form.getValues('destination') as any}
                    control={form.control as Control<any>}
                    readonly={true}
                  />
                </div>
              </div>
            </div>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TransactionDetailsPage
