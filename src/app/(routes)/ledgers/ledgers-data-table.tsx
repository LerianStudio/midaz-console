import React from 'react'
import { useIntl } from 'react-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { EmptyResource } from '@/components/empty-resource'
import { Button } from '@/components/ui/button'
import {
  Plus,
  MoreVertical,
  Minus,
  HelpCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Arrow } from '@radix-ui/react-tooltip'
import { truncateString } from '@/helpers'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { isNil } from 'lodash'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import useCustomToast from '@/hooks/use-custom-toast'
import Link from 'next/link'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { LedgersSheet } from './ledgers-sheet'
import { AssetsSheet } from './[id]/assets/assets-sheet'
import { EntityDataTable } from '@/components/entity-data-table'
import { EntityBox } from '@/components/entity-box'
import { FormProvider, useForm } from 'react-hook-form'
import { Table as ReactTableType } from '@tanstack/react-table'
import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

type LedgersExtended = {
  items: LedgerEntity[]
} & { limit: number }

type LedgersTableProps = {
  ledgers: LedgersExtended
  isLoading: boolean
  table: ReactTableType<LedgerResponseDto>
  handleDialogOpen: (id: string, name: string) => void
  refetch: () => void
  pageSizeOptions: number[]
}

type LedgerRowProps = {
  ledger: { id: string | undefined; original: LedgerEntity }
  handleCopyToClipboard: (value: string, message: string) => void
  handleDialogOpen: (id: string, name: string) => void
  refetch: () => void
}

const LedgerRow: React.FC<LedgerRowProps> = ({
  ledger,
  handleCopyToClipboard,
  handleDialogOpen,
  refetch
}) => {
  const intl = useIntl()
  const router = useRouter()
  const id = ledger.original.id || ''
  const displayId = id && id.length > 8 ? `${truncateString(id, 8)}` : id
  const metadataCount = Object.entries(ledger.original.metadata || []).length
  const assetsItems = ledger.original.assets || []
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()

  const handleClick = () => router.push(`/ledgers/${ledger.original.id}`)

  const renderAssets = () => {
    if (assetsItems.length === 1) {
      return <p>{assetsItems[0].code}</p>
    }

    if (assetsItems.length > 1) {
      return (
        <div className="flex items-center gap-1">
          <p>
            {intl.formatMessage(
              {
                id: 'ledgers.assets.count',
                defaultMessage: '{count} assets'
              },
              { count: assetsItems.length }
            )}
          </p>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild className="flex self-end">
                <span className="cursor-pointer">
                  <HelpCircle size={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-80">
                <p className="text-shadcn-400">
                  {assetsItems.map((asset) => asset.code).join(', ')}
                </p>
                <Arrow height={8} width={15} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }

    return (
      <Button
        variant="link"
        className="h-fit px-0 py-0"
        onClick={(e) => {
          e.stopPropagation()
          handleCreate()
        }}
      >
        <p className="text-shadcn-600 underline">
          {intl.formatMessage({
            id: 'common.add',
            defaultMessage: 'Add'
          })}
        </p>
      </Button>
    )
  }

  return (
    <React.Fragment>
      <TableRow key={ledger.id} button onClick={handleClick}>
        <TableCell>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopyToClipboard(
                    id,
                    intl.formatMessage({
                      id: 'ledgers.toast.copyId',
                      defaultMessage:
                        'The id has been copied to your clipboard.'
                    })
                  )
                }}
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
        <TableCell>{ledger.original.name}</TableCell>
        <TableCell>{renderAssets()}</TableCell>
        <TableCell>
          {metadataCount === 0 ? (
            <Minus size={20} />
          ) : (
            intl.formatMessage(
              {
                id: 'common.table.metadata',
                defaultMessage:
                  '{number, plural, =0 {-} one {# record} other {# records}}'
              },
              {
                number: metadataCount
              }
            )
          )}
        </TableCell>
        <TableCell className="w-0">
          <div className="flex justify-end">
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
                <Link href={`/ledgers/${ledger.original.id}`}>
                  <DropdownMenuItem>
                    {intl.formatMessage({
                      id: `common.edit`,
                      defaultMessage: 'Edit'
                    })}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-testid="delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDialogOpen(
                      ledger.original.id || '',
                      ledger.original.name || ''
                    )
                  }}
                >
                  {intl.formatMessage({
                    id: `common.delete`,
                    defaultMessage: 'Delete'
                  })}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TableCell>
      </TableRow>

      <AssetsSheet
        onSuccess={refetch}
        ledgerId={ledger.original.id!}
        {...sheetProps}
      />
    </React.Fragment>
  )
}

export const LedgersDataTable: React.FC<
  LedgersTableProps & {
    currentPageSize: number
    currentPage: number
  }
> = ({
  ledgers,
  table,
  handleDialogOpen,
  pageSizeOptions,
  refetch,
  currentPageSize,
  currentPage
}) => {
  const intl = useIntl()
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()
  const { showInfo } = useCustomToast()
  const methods = useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const items = ledgers?.items ?? []
  const limit = ledgers?.limit ?? 10

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  const setQueryParam = (limit: number, page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', String(limit))
    params.set('page', String(page))
    router.push(`?${params.toString()}`)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setQueryParam(newPageSize, currentPage)
  }

  const handleNextPage = () => {
    setQueryParam(currentPageSize, currentPage + 1)
  }

  const handlePreviousPage = () => {
    setQueryParam(currentPageSize, Math.max(currentPage - 1, 1))
  }

  return (
    <FormProvider {...methods}>
      <EntityBox.Root>
        <EntityBox.Actions className="flex w-full justify-end gap-4">
          <React.Fragment>
            <div className="flex items-center gap-4">
              <p className="whitespace-nowrap text-sm font-medium text-gray-600">
                {intl.formatMessage({
                  id: 'common.itemsPerPage',
                  defaultMessage: 'Items per page'
                })}
              </p>
              <Select
                value={String(currentPageSize)}
                onValueChange={(value) => {
                  handlePageSizeChange(Number(value))
                }}
              >
                <SelectTrigger className="w-fit border border-zinc-300 px-3 py-2 shadow-sm">
                  <SelectValue placeholder={String(currentPageSize)} />
                </SelectTrigger>
                <SelectContent side="bottom">
                  {pageSizeOptions.map((pageSize: number) => (
                    <SelectItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </React.Fragment>
        </EntityBox.Actions>
      </EntityBox.Root>

      <EntityDataTable.Root>
        {isNil(ledgers?.items) || ledgers.items.length === 0 ? (
          <EmptyResource
            message={intl.formatMessage({
              id: 'ledgers.emptyResource',
              defaultMessage: "You haven't created any Ledger yet"
            })}
            extra={intl.formatMessage({
              id: 'ledgers.emptyResourceExtra',
              defaultMessage: 'No Ledger found.'
            })}
          >
            <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
              {intl.formatMessage({
                id: 'ledgers.emptyResource.createButton',
                defaultMessage: 'New Ledger'
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
                        id: 'common.id',
                        defaultMessage: 'ID'
                      })}
                    </TableHead>
                    <TableHead>
                      {intl.formatMessage({
                        id: 'entity.ledger.name',
                        defaultMessage: 'Ledger Name'
                      })}
                    </TableHead>
                    <TableHead>
                      {intl.formatMessage({
                        id: 'common.assets',
                        defaultMessage: 'Assets'
                      })}
                    </TableHead>
                    <TableHead>
                      {intl.formatMessage({
                        id: 'common.metadata',
                        defaultMessage: 'Metadata'
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
                  {table.getRowModel().rows.map((ledger) => (
                    <LedgerRow
                      key={ledger.id}
                      ledger={ledger}
                      handleCopyToClipboard={handleCopyToClipboard}
                      handleDialogOpen={handleDialogOpen}
                      refetch={refetch}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <EntityDataTable.Footer className="flex items-center justify-between py-0">
              <EntityDataTable.FooterText>
                {intl.formatMessage(
                  {
                    id: 'ledgers.showing',
                    defaultMessage:
                      'Showing {count} {number, plural, =0 {ledgers} one {ledger} other {ledgers}}.'
                  },
                  {
                    number: ledgers?.items?.length,
                    count: (
                      <span className="font-bold">
                        {ledgers?.items?.length}
                      </span>
                    )
                  }
                )}
              </EntityDataTable.FooterText>

              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  icon={<ChevronLeft size={16} />}
                  iconPlacement="start"
                >
                  {intl.formatMessage({
                    id: 'table.pagination.previous',
                    defaultMessage: 'Previous'
                  })}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={items.length < limit}
                  icon={<ChevronRight size={16} />}
                  iconPlacement="end"
                >
                  {intl.formatMessage({
                    id: 'table.pagination.next',
                    defaultMessage: 'Next'
                  })}
                </Button>
              </div>
            </EntityDataTable.Footer>
          </React.Fragment>
        )}

        <LedgersSheet onSuccess={refetch} {...sheetProps} />
      </EntityDataTable.Root>
    </FormProvider>
  )
}
