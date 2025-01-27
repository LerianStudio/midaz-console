import { EmptyResource } from '@/components/empty-resource'
import { EntityBox } from '@/components/entity-box'
import { EntityDataTable } from '@/components/entity-data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { capitalizeFirstLetter, truncateString } from '@/helpers'
import useCustomToast from '@/hooks/use-custom-toast'
import { Arrow } from '@radix-ui/react-tooltip'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { isNil } from 'lodash'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl'
import dayjs from 'dayjs'
import { TransactionMapper } from '@/core/application/mappers/transaction-mapper'

const getBadgeVariant = (status: string) =>
  status === 'APPROVED' ? 'active' : 'inactive'

const TransactionRow: React.FC<any> = ({
  transaction,
  handleCopyToClipboard,
  handleDialogOpen
}) => {
  const intl = useIntl()
  const {
    id = '',
    status: { code },
    assetCode
  } = transaction.original
  const displayId = id.length > 12 ? truncateString(id, 12) : id
  const badgeVariant = getBadgeVariant(code)

  const displayValue = TransactionMapper.formatTransactionValue(
    transaction.original,
    intl.locale
  )

  return (
    <React.Fragment>
      <TableRow key={transaction.id}>
        <TableCell>
          {dayjs(transaction.original.createdAt).format('L HH:mm')}
        </TableCell>
        <TableCell>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger
                onClick={() =>
                  handleCopyToClipboard(
                    id,
                    intl.formatMessage({
                      id: 'ledgers.toast.copyId',
                      defaultMessage:
                        'The id has been copied to your clipboard.'
                    })
                  )
                }
              >
                <p className="text-shadcn-600 underline">{displayId}</p>
              </TooltipTrigger>
              <TooltipContent
                className="border-none bg-shadcn-600"
                arrowPadding={0}
              >
                <p className="text-shadcn-400">{id}</p>
                <p className="text-center text-white">
                  {intl.formatMessage({
                    id: 'ledgers.columnsTable.tooltipCopyText',
                    defaultMessage: 'Click to copy'
                  })}
                </p>
                <Arrow height={8} width={15} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>{String(transaction.original.source)}</TableCell>
        <TableCell>{String(transaction.original.destination)}</TableCell>
        <TableCell>
          <div>
            <Badge variant={badgeVariant}>
              {capitalizeFirstLetter(transaction.original.status.code)}
            </Badge>
          </div>
        </TableCell>
        <TableCell className="text-base font-medium text-zinc-600">
          <span className="mr-2 text-xs font-normal">{assetCode}</span>
          {displayValue}
        </TableCell>
        <TableCell className="w-0">
          <div className="flex justify-center">
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
                <Link href={`/ledgers/${transaction.original.id}`}>
                  <DropdownMenuItem>
                    {intl.formatMessage({
                      id: 'common.edit',
                      defaultMessage: 'Edit'
                    })}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-testid="delete"
                  onClick={() =>
                    handleDialogOpen(
                      transaction.original.id || '',
                      transaction.original.name || ''
                    )
                  }
                >
                  {intl.formatMessage({
                    id: 'common.delete',
                    defaultMessage: 'Delete'
                  })}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export const TransactionsDataTable = ({
  ledgers,
  transactions,
  refetch,
  selectedLedgerId,
  setSelectedLedgerId
}: any) => {
  const intl = useIntl()
  const { showInfo } = useCustomToast()
  const searchParams = useSearchParams()
  const items = ledgers?.items ?? []
  const limit = ledgers?.limit ?? 10
  const router = useRouter()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const table = useReactTable({
    data: transactions?.items || [],
    columns: [
      { accessorKey: 'id' },
      { accessorKey: 'name' },
      { accessorKey: 'assets' },
      { accessorKey: 'metadata' },
      { accessorKey: 'status' },
      { accessorKey: 'actions' }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters }
  })

  const setQueryParam = (limit: number, page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', String(limit))
    params.set('page', String(page))
    router.push(`?${params.toString()}`)
  }

  const onCreateTransaction = React.useCallback(() => {
    if (!selectedLedgerId) {
      console.warn('No ledger selected, cannot create a new transaction.')
      return
    }
    router.push(`/ledgers/${selectedLedgerId}/transactions/create`)
  }, [selectedLedgerId, router])

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <React.Fragment>
      <EntityBox.Root>
        <EntityBox.Actions className="flex w-full justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-600">
              {intl.formatMessage({
                id: 'ledger.title',
                defaultMessage: 'Ledger'
              })}
            </p>

            <Select
              value={selectedLedgerId}
              onValueChange={(val) => {
                setSelectedLedgerId(val)
                localStorage.setItem('defaultTransactionLedgerId', val)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Ledger" />
              </SelectTrigger>

              <SelectContent>
                {ledgers?.items?.map((ledger: any) => (
                  <SelectItem key={ledger.id} value={ledger.id}>
                    {ledger.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="default" onClick={onCreateTransaction}>
            {intl.formatMessage({
              id: 'transactions.create.title',
              defaultMessage: 'New Transaction'
            })}
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      <EntityDataTable.Root>
        {isNil(transactions?.items) || transactions.items.length === 0 ? (
          <EmptyResource
            message={intl.formatMessage({
              id: 'transactions.emptyResource',
              defaultMessage: "You haven't created any transactions yet."
            })}
            extra={intl.formatMessage({
              id: 'transactions.emptyResourceExtra',
              defaultMessage: 'No transaction found.'
            })}
          >
            <Button variant="default" onClick={() => {}}>
              {intl.formatMessage({
                id: 'transactions.create.title',
                defaultMessage: 'New Transaction'
              })}
            </Button>
          </EmptyResource>
        ) : (
          <React.Fragment>
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
                    <TableHead>
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
                      handleCopyToClipboard={handleCopyToClipboard}
                      handleDialogOpen={() => {}}
                      refetch={refetch}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <EntityDataTable.Footer className="flex items-center justify-between py-4">
              <EntityDataTable.FooterText>
                {intl.formatMessage(
                  {
                    id: 'transactions.showing',
                    defaultMessage:
                      'Showing {count} {number, plural, =0 {transactions} one {transaction} other {transactions}}.'
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
            </EntityDataTable.Footer>
          </React.Fragment>
        )}
      </EntityDataTable.Root>
    </React.Fragment>
  )
}
