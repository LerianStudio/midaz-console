import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
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
import React, { useEffect, useState } from 'react'
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
import ConfirmationDialog from '@/components/confirmation-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { EntityDataTable } from '@/components/entity-data-table'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { useQueryParams } from '@/hooks/use-query-params'
import { Pagination } from '@/components/pagination'
import { EmptyResource } from '@/components/empty-resource'
import { MetadataTableCell } from '../MetadataTableCell'
import { IdTableCell } from '@/components/id-table-cell'

export const PortfoliosTabContent = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = useState<any>([])

  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({
    total
  })

  const {
    data: portfoliosData,
    refetch,
    isLoading
  } = usePortfoliosWithAccounts({
    organizationId: currentOrganization.id!,
    ledgerId: ledgerId,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(portfoliosData?.items?.length || 0)
  }, [portfoliosData?.items?.length])

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

      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <EntityBox.Header
            title={intl.formatMessage({
              id: `common.portfolios`,
              defaultMessage: 'Portfolios'
            })}
            subtitle={intl.formatMessage({
              id: `ledgers.portfolio.subtitle`,
              defaultMessage: 'Manage portfolios on this ledger.'
            })}
            tooltip={intl.formatMessage({
              id: 'ledgers.portfolio.tooltip',
              defaultMessage:
                'Create portfolios and link accounts to manage more efficiently.'
            })}
          />
          <EntityBox.Actions>
            <Button onClick={handleCreate}>
              {intl.formatMessage({
                id: `common.new.portfolio`,
                defaultMessage: 'New Portfolio'
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
        {isLoading && <Skeleton className="h-64" />}

        {isNil(portfoliosData?.items) ||
          (portfoliosData?.items.length === 0 && (
            <EmptyResource
              message={intl.formatMessage({
                id: 'ledgers.portfolios.emptyResource',
                defaultMessage: "You haven't created any Portfolios yet"
              })}
            >
              <Button onClick={handleCreate}>
                {intl.formatMessage({
                  id: 'common.new.portfolio',
                  defaultMessage: 'New Portfolio'
                })}
              </Button>
            </EmptyResource>
          ))}

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
                      id: 'common.accounts',
                      defaultMessage: 'Accounts'
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
                {table.getRowModel().rows.map((portfolio) => {
                  const metadataCount = Object.entries(
                    portfolio.original.metadata || []
                  ).length

                  return (
                    <TableRow key={portfolio.id}>
                      <IdTableCell id={portfolio.original.id} />
                      <TableCell>{portfolio.original.name}</TableCell>
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
                      <MetadataTableCell
                        metadata={portfolio.original.metadata}
                      />

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
                  '{number, plural, =0 {No portfolios found} one {Showing {count} portfolio} other {Showing {count} portfolios}}.'
              },
              {
                number: portfoliosData?.items?.length || 0,
                count: (
                  <span className="font-bold">
                    {portfoliosData?.items?.length}
                  </span>
                )
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </>
  )
}
