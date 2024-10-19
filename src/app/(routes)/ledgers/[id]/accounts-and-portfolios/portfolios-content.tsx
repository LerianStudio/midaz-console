import { Button } from '@/components/ui/button'
import { MoreVertical, Plus } from 'lucide-react'
import { PortfolioSheet } from './portfolios-sheet'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { useDeletePortfolio, useListPortfolios } from '@/client/portfolios'
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
import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/helpers'
import ConfirmationDialog from '@/components/confirmation-dialog'

export const PortfoliosContent = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const { data, refetch } = useListPortfolios({
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
    data: data?.items!,
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

      <EntityBox.Root>
        <EntityBox.Header
          title="Portfolios"
          subtitle={`${data?.items.length} portfolios encontrados`}
        />
        <EntityBox.Actions>
          <Button variant="secondary" onClick={handleCreate}>
            {data?.items?.length && data.items.length > 0 ? (
              <Plus />
            ) : (
              <>
                {intl.formatMessage({
                  id: `portfolio.create`,
                  defaultMessage: 'Create first portfolio'
                })}
                <Plus />
              </>
            )}
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      {!isNil(data?.items) && data?.items.length > 0 && (
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
                    id: 'common.status',
                    defaultMessage: 'Status'
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
              {table.getRowModel().rows.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell>{portfolio.original.id}</TableCell>
                  <TableCell>{portfolio.original.name}</TableCell>
                  <TableCell>
                    {intl.formatMessage(
                      {
                        id: 'common.table.metadata',
                        defaultMessage:
                          '{number, plural, =0 {-} one {# record} other {# records}}'
                      },
                      {
                        number: Object.entries(
                          portfolio.original.metadata || []
                        ).length
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        portfolio?.original?.status?.code === 'ACTIVE'
                          ? 'active'
                          : 'inactive'
                      }
                    >
                      {capitalizeFirstLetter(portfolio.original.status.code)}
                    </Badge>
                  </TableCell>

                  <TableCell className="w-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary">
                          <MoreVertical size={16} onClick={() => {}} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleEdit({
                              ...portfolio.original,
                              status: {
                                ...portfolio.original.status,
                                description:
                                  portfolio.original.status.description || ''
                              }
                            })
                          }
                        >
                          {intl.formatMessage({
                            id: `common.edit`,
                            defaultMessage: 'Edit'
                          })}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {intl.formatMessage({
                            id: `common.inactivate`,
                            defaultMessage: 'Inactivate'
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
