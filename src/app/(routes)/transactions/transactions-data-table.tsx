import { EmptyResource } from '@/components/empty-resource'
import { EntityBox } from '@/components/entity-box'
import { EntityDataTable } from '@/components/entity-data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { capitalizeFirstLetter } from '@/helpers'
import useCustomToast from '@/hooks/use-custom-toast'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { isNil } from 'lodash'
import { HelpCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { defineMessages, IntlShape, useIntl } from 'react-intl'
import dayjs from 'dayjs'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { Pagination, PaginationProps } from '@/components/pagination'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { ILedgerType } from '@/types/ledgers-type'
import { ITransactiontType } from '@/types/transactions-type'
import { IdTableCell } from '@/components/id-table-cell'
import { SelectField } from '@/components/form'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'

type TransactionsDataTableProps = {
  transactionsState: {
    ledgers: PaginationDto<ILedgerType> | undefined
    transactions: PaginationDto<ITransactiontType> | undefined
    form: UseFormReturn<any>
    total: number
    pagination: PaginationProps
    selectedLedgerId: string
    setSelectedLedgerId: (id: string) => void
  }
}

const multipleItemsMessages = defineMessages({
  source: {
    id: 'transactions.multiple.source',
    defaultMessage: '{count} sources'
  },
  destination: {
    id: 'transactions.multiple.destination',
    defaultMessage: '{count} destinations'
  }
})

const getBadgeVariant = (status: string) =>
  status === Status.APPROVED ? 'active' : 'inactive'

enum Status {
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED'
}

const statusMessages = defineMessages({
  [Status.APPROVED]: {
    id: 'status.approved',
    defaultMessage: 'Approved'
  },
  [Status.CANCELED]: {
    id: 'status.canceled',
    defaultMessage: 'Canceled'
  }
})

const TransactionRow: React.FC<any> = ({ transaction, selectedLedgerId }) => {
  const intl = useIntl()
  const {
    status: { code },
    createdAt,
    assetCode,
    source = [],
    destination = []
  } = transaction.original

  const badgeVariant = getBadgeVariant(code)
  const numericValue = transaction.original.amount

  const displayValue = intl.formatNumber(numericValue, {
    minimumFractionDigits: transaction.original.amountScale,
    maximumFractionDigits: transaction.original.amountScale
  })

  const renderItemsList = (
    items: string[],
    type: 'source' | 'destination',
    intl: IntlShape
  ) => {
    if (items.length === 1) {
      return <p>{String(items[0])}</p>
    }

    if (items.length === 0) {
      return null
    }

    const messageDescriptor = multipleItemsMessages[type]

    const labelWithCount = intl.formatMessage(messageDescriptor, {
      count: items.length
    })

    return (
      <div className="flex items-center gap-1">
        <p>{labelWithCount}</p>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild className="flex self-end">
              <HelpCircle size={16} className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="max-w-80">
              <p className="text-shadcn-400">
                {items.map((item) => String(item)).join(', ')}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  const renderSource = renderItemsList(source, 'source', intl)
  const renderDestination = renderItemsList(destination, 'destination', intl)

  return (
    <React.Fragment>
      <TableRow key={transaction.id}>
        <TableCell>{dayjs(createdAt).format('L HH:mm')}</TableCell>
        <IdTableCell id={transaction.original.id} />
        <TableCell>{renderSource}</TableCell>
        <TableCell>{renderDestination}</TableCell>
        <TableCell align="center">
          <Badge variant={badgeVariant}>
            {capitalizeFirstLetter(
              intl.formatMessage(
                statusMessages[code as keyof typeof statusMessages]
              )
            )}
          </Badge>
        </TableCell>
        <TableCell className="text-base font-medium text-zinc-600">
          <span className="mr-2 text-xs font-normal">{assetCode}</span>
          {capitalizeFirstLetter(displayValue)}
        </TableCell>
        <TableCell align="center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="h-auto w-max p-2"
                data-testid="actions"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                href={`/ledgers/${selectedLedgerId}/transactions/${transaction.original.id}`}
              >
                <DropdownMenuItem>
                  {intl.formatMessage({
                    id: 'common.seeDetails',
                    defaultMessage: 'See details'
                  })}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export const TransactionsDataTable = ({
  transactionsState
}: TransactionsDataTableProps) => {
  const intl = useIntl()
  const { showInfo } = useCustomToast()
  const router = useRouter()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const {
    ledgers,
    transactions,
    form,
    total,
    pagination,
    selectedLedgerId,
    setSelectedLedgerId
  } = transactionsState

  const table = useReactTable({
    data: transactions?.items || [],
    columns: [
      { accessorKey: 'data' },
      { accessorKey: 'id' },
      { accessorKey: 'source' },
      { accessorKey: 'destination' },
      { accessorKey: 'status' },
      { accessorKey: 'value' },
      { accessorKey: 'actions' }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters }
  })

  const handleCreateTransaction = React.useCallback(() => {
    router.push(`/ledgers/${selectedLedgerId}/transactions/create`)
  }, [selectedLedgerId, router])

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  const watchLedger = form.watch('ledgerId')
  React.useEffect(() => {
    if (watchLedger) {
      setSelectedLedgerId(watchLedger)
      localStorage.setItem('defaultTransactionLedgerId', watchLedger)
    }
  }, [watchLedger])

  React.useEffect(() => {
    if (selectedLedgerId) {
      form.setValue('ledgerId', selectedLedgerId)
    }
  }, [selectedLedgerId])

  return (
    <FormProvider {...form}>
      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-600">
              {intl.formatMessage({
                id: 'ledger.title',
                defaultMessage: 'Ledger'
              })}
            </p>

            <SelectField name="ledgerId" control={form.control}>
              {ledgers?.items?.map((ledger: any) => (
                <SelectItem key={ledger.id} value={ledger.id}>
                  {ledger.name}
                </SelectItem>
              ))}
            </SelectField>
          </div>

          <EntityBox.Actions className="gap-4">
            <Button onClick={handleCreateTransaction}>
              {intl.formatMessage({
                id: 'transactions.create.title',
                defaultMessage: 'New Transaction'
              })}
            </Button>
            <EntityBox.CollapsibleTrigger />
          </EntityBox.Actions>
        </EntityBox.Banner>

        <EntityBox.CollapsibleContent>
          <div className="col-start-3 flex justify-end">
            <PaginationLimitField control={form.control} />
          </div>
        </EntityBox.CollapsibleContent>
      </EntityBox.Collapsible>

      <EntityDataTable.Root>
        {isNil(transactions?.items) || transactions.items.length === 0 ? (
          <EmptyResource
            message={intl.formatMessage({
              id: 'transactions.emptyResource',
              defaultMessage: "You haven't created any transactions yet."
            })}
          >
            <Button variant="default" onClick={handleCreateTransaction}>
              {intl.formatMessage({
                id: 'transactions.create.title',
                defaultMessage: 'New Transaction'
              })}
            </Button>
          </EmptyResource>
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.transactions.data',
                      defaultMessage: 'Data'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'common.id',
                      defaultMessage: 'ID'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.transactions.source',
                      defaultMessage: 'Source'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.transactions.destination',
                      defaultMessage: 'Destination'
                    })}
                  </TableHead>
                  <TableHead className="text-center">
                    {intl.formatMessage({
                      id: 'common.status',
                      defaultMessage: 'Status'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.transactions.value',
                      defaultMessage: 'Value'
                    })}
                  </TableHead>
                  <TableHead className="w-0">
                    {intl.formatMessage({
                      id: 'common.actions',
                      defaultMessage: 'Actions'
                    })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((transaction: any) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    selectedLedgerId={selectedLedgerId}
                    handleCopyToClipboard={handleCopyToClipboard}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <EntityDataTable.Footer className="flex items-center justify-between py-4">
          <EntityDataTable.FooterText>
            {intl.formatMessage(
              {
                id: 'transactions.showing',
                defaultMessage:
                  '{number, plural, =0 {No transaction found} one {Showing {count} transaction} other {Showing {count} transactions}}.'
              },
              {
                number: transactions?.items?.length,
                count: (
                  <span className="font-bold">
                    {transactions?.items?.length}
                  </span>
                )
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </FormProvider>
  )
}
