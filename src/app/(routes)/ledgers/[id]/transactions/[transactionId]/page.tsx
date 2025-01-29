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
import { OperationAccordion } from '../create/operation-accordion'
import { BasicInformationPaperReadOnly } from './basic-information-paper-readOnly'
import { OperationSourceFieldReadOnly } from './operation-source-field-readOnly'
import CheckApproveCircle from '/public/svg/approved-circle.svg'
import { TransactionStatusBadge } from './transaction-status-badge'
import { Badge } from '@/components/ui/badge'
import { OperationAccordionReadOnly } from './operation-accordion-readOnly'

const TAB_VALUES = {
  SUMMARY: 'summary',
  TRANSACTION_DATA: 'transaction-data',
  OPERATIONS: 'operations'
}

const DEFAULT_TAB_VALUE = TAB_VALUES.SUMMARY

interface Operation {
  type: 'DEBIT' | 'CREDIT'
  accountAlias: string
  amount: {
    amount: string
  }
  metadata?: Record<string, any>
}

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

  const initialValues = {
    description: transaction?.description || '',
    chartOfAccountsGroupName: transaction?.chartOfAccountsGroupName || '',
    value: transaction?.amount || '',
    asset: transaction?.assetCode || '',
    metadata: transaction?.metadata || {},
    source:
      transaction?.source?.map((src: any) => ({
        account: src.account,
        value: src.value
      })) || [],
    destination:
      transaction?.destination?.map((dest: any) => ({
        account: dest.account,
        value: dest.value
      })) || []
  }

  const formSchema = z.object({
    description: z.string().optional(),
    chartOfAccountsGroupName: z.string().optional(),
    value: z.string().optional(),
    asset: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    source: z
      .array(
        z.object({
          account: z.string(),
          value: z.string().optional()
        })
      )
      .optional(),
    destination: z
      .array(
        z.object({
          account: z.string(),
          value: z.string().optional()
        })
      )
      .optional()
  })

  type FormSchema = z.infer<typeof formSchema>
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    values: initialValues
  })

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

  return (
    <div>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          {/* <Breadcrumb paths={breadcrumbPaths} /> */}
          <div className="flex w-full items-center justify-between">
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
            <TransactionStatusBadge
              status={
                transaction?.status?.code === 'APPROVED'
                  ? 'APPROVED'
                  : 'PENDING'
              }
            />
          </div>
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
          <div className="mx-auto max-w-[700px]">
            <TransactionReceipt className="mb-2 w-full">
              <Image
                alt=""
                src={
                  transaction?.status?.code === 'APPROVED'
                    ? CheckApproveCircle
                    : ArrowRightCircle
                }
              />
              <TransactionReceiptValue
                asset={transaction?.assetCode}
                value={new Intl.NumberFormat('pt-BR', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(Number(transaction?.amount))}
              />
              <StatusDisplay status={transaction?.status?.code || ''} />
              <TransactionReceiptSubjects
                sources={transaction?.source}
                destinations={transaction?.destination}
              />
              {transaction?.description && (
                <TransactionReceiptDescription>
                  {transaction.description}
                </TransactionReceiptDescription>
              )}
            </TransactionReceipt>

            <TransactionReceipt type="ticket">
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'transactions.source',
                  defaultMessage: 'Source'
                })}
                value={
                  <div className="flex flex-col">
                    {transaction?.source?.map(
                      (source: string, index: number) => (
                        <p key={index} className="underline">
                          {source}
                        </p>
                      )
                    )}
                  </div>
                }
              />
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'transactions.destination',
                  defaultMessage: 'Destination'
                })}
                value={
                  <div className="flex flex-col">
                    {transaction?.destination?.map(
                      (destination: string, index: number) => (
                        <p key={index} className="underline">
                          {destination}
                        </p>
                      )
                    )}
                  </div>
                }
              />
              <TransactionReceiptItem
                label={intl.formatMessage({
                  id: 'common.value',
                  defaultMessage: 'Value'
                })}
                value={`${transaction?.assetCode} ${new Intl.NumberFormat(
                  'pt-BR',
                  {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                ).format(Number(transaction?.amount))}`}
              />
              <Separator orientation="horizontal" />
              {transaction?.operations
                ?.filter((op) => op.type === 'DEBIT')
                .map((operation, index) => (
                  <TransactionReceiptOperation
                    key={index}
                    type="debit"
                    account={operation.accountAlias}
                    asset={operation.assetCode}
                    value={(
                      operation.amount.amount /
                      Math.pow(10, operation.amount.scale)
                    ).toString()}
                  />
                ))}
              {transaction?.operations
                ?.filter((op) => op.type === 'CREDIT')
                .map((operation, index) => (
                  <TransactionReceiptOperation
                    key={index}
                    type="credit"
                    account={operation.accountAlias}
                    asset={operation.assetCode}
                    value={(
                      operation.amount.amount /
                      Math.pow(10, operation.amount.scale)
                    ).toString()}
                  />
                ))}
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

        <TabsContent value={TAB_VALUES.TRANSACTION_DATA}>
          <Form {...form}>
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <BasicInformationPaperReadOnly
                  values={{
                    chartOfAccountsGroupName:
                      initialValues.chartOfAccountsGroupName,
                    value: initialValues.value,
                    asset: initialValues.asset
                  }}
                  control={form.control}
                />
                <div className="mb-10 flex flex-row items-center gap-3">
                  <OperationSourceFieldReadOnly
                    label={intl.formatMessage({
                      id: 'transactions.source',
                      defaultMessage: 'Source'
                    })}
                    values={transaction?.source}
                  />
                  <Image alt="" src={ArrowRightCircle} />
                  <OperationSourceFieldReadOnly
                    label={intl.formatMessage({
                      id: 'transactions.destination',
                      defaultMessage: 'Destination'
                    })}
                    values={transaction?.destination}
                  />
                </div>
              </div>
            </div>
          </Form>
        </TabsContent>

        <TabsContent value={TAB_VALUES.OPERATIONS}>
          <Form {...form}>
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                {transaction?.operations?.map(
                  (operation: Operation, index: number) => (
                    <OperationAccordionReadOnly
                      key={index}
                      type={operation.type === 'DEBIT' ? 'debit' : 'credit'}
                      name={
                        operation.type === 'DEBIT'
                          ? `source.${index}`
                          : `destination.${index}`
                      }
                      asset={transaction?.asset}
                      valueEditable={false}
                      control={form.control}
                      values={{
                        account: operation.accountAlias,
                        value: Number(operation.amount.amount),
                        metadata: operation.metadata || null
                      }}
                    />
                  )
                )}
                <pre>{JSON.stringify(transaction, null, 2)}</pre>
              </div>
            </div>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TransactionDetailsPage
