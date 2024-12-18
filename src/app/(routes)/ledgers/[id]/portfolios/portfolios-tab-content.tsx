import { Button } from '@/components/ui/button'
import { MoreVertical, Plus, ChevronDown, ChevronUp, Minus } from 'lucide-react'
import { PortfolioSheet } from './portfolios-sheet'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import {
  useDeletePortfolio,
  usePortfoliosWithAccounts
} from '@/client/portfolios'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useIntl } from 'react-intl'
import { isNil } from 'lodash'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import React from 'react'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { truncateString } from '@/helpers'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import useCustomToast from '@/hooks/use-custom-toast'
import { Arrow } from '@radix-ui/react-tooltip'
import { EntityDataTable } from '@/components/entity-data-table'

export const PortfoliosTabContent = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = React.useState<any>([])
  const { showInfo } = useCustomToast()

  const {
    data: portfoliosData,
    refetch,
    isLoading
  } = usePortfoliosWithAccounts({
    organizationId: currentOrganization.id!,
    ledgerId: ledgerId
  })

  const { mutate: deletePortfolio, isPending: deletePending } =
    useDeletePortfolio({
      organizationId: currentOrganization.id!,
      ledgerId,
      onSuccess: () => {
        handleDialogClose()
        refetch()
      }
    })

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {
      onConfirm: (id: string) => deletePortfolio({ id })
    }
  )

  const { handleCreate, handleEdit, sheetProps } =
    useCreateUpdateSheet<PortfolioResponseDto>()

  const table = useReactTable({
    data: portfoliosData?.items!,
    columns: [
      {
        accessorKey: 'name'
      }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  if (isLoading) {
    return <Skeleton className="h-[84px] w-full bg-zinc-200" />
  }
  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <>
      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'ledgers.portfolio.deleteDialog.title',
          defaultMessage: 'Are you sure?'
        })}
        description={intl.formatMessage({
          id: 'ledgers.portfolio.deleteDialog.description',
          defaultMessage: 'You will delete a portfolio'
        })}
        loading={deletePending}
        {...dialogProps}
      />

      <PortfolioSheet ledgerId={ledgerId} onSucess={refetch} {...sheetProps} />

      <EntityBox.Root>
        <EntityBox.Header
          title={intl.formatMessage({
            id: `ledgers.portfolio.title`,
            defaultMessage: 'Portfolios'
          })}
          subtitle={
            portfoliosData?.items?.length !== undefined
              ? intl.formatMessage(
                  {
                    id: `ledgers.portfolio.subtitle`,
                    defaultMessage:
                      '{count} {count, plural, =0 {portfolios found} one {portfolio found} other {portfolios found}}'
                  },
                  {
                    count: portfoliosData.items.length
                  }
                )
              : undefined
          }
        />
        <EntityBox.Actions>
          <Button
            variant="secondary"
            onClick={handleCreate}
            className="h-9 p-2"
          >
            {portfoliosData?.items?.length ? (
              <Plus />
            ) : (
              <React.Fragment>
                {intl.formatMessage({
                  id: `portfolio.create`,
                  defaultMessage: 'Create first portfolio'
                })}
                <Plus />
              </React.Fragment>
            )}
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      <EntityDataTable.Root>
        {!isNil(portfoliosData?.items) && portfoliosData?.items.length > 0 && (
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
                      id: 'common.name',
                      defaultMessage: 'Name'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'common.metadata',
                      defaultMessage: 'Metadata'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'common.accounts',
                      defaultMessage: 'Accounts'
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
                {table.getRowModel().rows.map((portfolio) => {
                  const metadataCount = Object.entries(
                    portfolio.original.metadata || []
                  ).length
                  const displayId =
                    portfolio.original.id && portfolio.original.id.length > 8
                      ? `${truncateString(portfolio.original.id, 8)}`
                      : portfolio.original.id

                  return (
                    <TableRow key={portfolio.id}>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger
                              onClick={() =>
                                handleCopyToClipboard(
                                  portfolio.original.id,
                                  intl.formatMessage({
                                    id: 'ledgers.toast.copyId',
                                    defaultMessage:
                                      'The id has been copied to your clipboard.'
                                  })
                                )
                              }
                            >
                              <p className="text-shadcn-600 underline">
                                {displayId}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent
                              className="border-none bg-shadcn-600"
                              arrowPadding={0}
                            >
                              <p className="text-shadcn-400">
                                {portfolio.original.id}
                              </p>
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
                      <TableCell>{portfolio.original.name}</TableCell>
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
                      <TableCell>
                        {intl.formatMessage(
                          {
                            id: 'common.table.accounts',
                            defaultMessage:
                              '{number, plural, =0 {No accounts} one {# account} other {# accounts}}'
                          },
                          {
                            number: portfolio.original.accounts?.length || 0
                          }
                        )}
                      </TableCell>

                      <TableCell className="w-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="secondary"
                              className="h-auto w-max p-2"
                            >
                              <MoreVertical size={16} onClick={() => {}} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleEdit({
                                  ...portfolio.original,
                                  entityId: portfolio.original.id,
                                  status: {
                                    ...portfolio.original.status,
                                    description:
                                      portfolio.original.status.description ??
                                      ''
                                  }
                                } as PortfolioResponseDto)
                              }
                            >
                              {intl.formatMessage({
                                id: `common.edit`,
                                defaultMessage: 'Edit'
                              })}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                handleDialogOpen(portfolio?.original?.id!)
                              }}
                            >
                              {intl.formatMessage({
                                id: `common.delete`,
                                defaultMessage: 'Delete'
                              })}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <EntityDataTable.Footer>
          <EntityDataTable.FooterText>
            {intl.formatMessage(
              {
                id: 'ledgers.portfolios.showing',
                defaultMessage:
                  'Showing {count} {number, plural, =0 {portfolios} one {portifolio} other {portfolios}}.'
              },
              {
                number: portfoliosData?.items?.length,
                count: (
                  <span className="font-bold">
                    {portfoliosData?.items?.length}
                  </span>
                )
              }
            )}
          </EntityDataTable.FooterText>
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </>
  )
}
