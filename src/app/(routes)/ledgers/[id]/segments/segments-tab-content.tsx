import { useEffect, useState } from 'react'
import { EntityBox } from '@/components/entity-box'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
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
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { useIntl } from 'react-intl'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useDeleteSegment, useListSegments } from '@/client/segments'
import { SegmentResponseDto } from '@/core/application/dto/segment-dto'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import { EmptyResource } from '@/components/empty-resource'
import { isNil } from 'lodash'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useParams } from 'next/navigation'
import { EntityDataTable } from '@/components/entity-data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryParams } from '@/hooks/use-query-params'
import { Pagination } from '@/components/pagination'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { MetadataTableCell } from '../MetadataTableCell'
import { IdTableCell } from '@/components/id-table-cell'
import { SegmentsSheet } from './segments-sheet'

export const SegmentsTabContent = () => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const { id: ledgerId } = useParams<{ id: string }>()
  const [columnFilters, setColumnFilters] = useState<any>([])

  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({
    total
  })

  const {
    data,
    refetch,
    isPending: listLoading
  } = useListSegments({
    organizationId: currentOrganization.id!,
    ledgerId,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(data?.items.length || 0)
  }, [data?.items.length])

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteSegment({
    organizationId: currentOrganization.id!,
    ledgerId,
    onSuccess: () => {
      handleDialogClose()
      refetch()
    }
  })

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {
      onConfirm: (id: string) => deleteMutate({ id })
    }
  )

  const { handleCreate, handleEdit, sheetProps } =
    useCreateUpdateSheet<SegmentResponseDto>()

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
          id: 'common.confirmDeletion',
          defaultMessage: 'Confirm Deletion'
        })}
        description={intl.formatMessage({
          id: 'segments.delete.description',
          defaultMessage:
            'You are about to permanently delete this segment. This action cannot be undone. Do you wish to continue?'
        })}
        loading={deletePending}
        {...dialogProps}
      />

      <SegmentsSheet ledgerId={ledgerId} onSucess={refetch} {...sheetProps} />

      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <EntityBox.Header
            title={intl.formatMessage({
              id: 'common.segments',
              defaultMessage: 'Segments'
            })}
            subtitle={intl.formatMessage({
              id: 'ledgers.segments.subtitle',
              defaultMessage: 'Manage the segments of this ledger.'
            })}
            tooltip={intl.formatMessage({
              id: 'ledgers.segments.tooltip',
              defaultMessage:
                'Clustering or allocation of customers at different levels.'
            })}
          />
          <EntityBox.Actions>
            <Button onClick={handleCreate}>
              {intl.formatMessage({
                id: 'common.new.segment',
                defaultMessage: 'New Segment'
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
        {listLoading && <Skeleton className="h-64" />}

        {isNil(data?.items) ||
          (data?.items.length === 0 && (
            <EmptyResource
              message={intl.formatMessage({
                id: 'ledgers.segments.emptyResource',
                defaultMessage: "You haven't created any Segments yet"
              })}
            >
              <Button onClick={handleCreate}>
                {intl.formatMessage({
                  id: 'common.new.segment',
                  defaultMessage: 'New Segment'
                })}
              </Button>
            </EmptyResource>
          ))}

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
                  <TableHead className="w-0">
                    {intl.formatMessage({
                      id: 'common.actions',
                      defaultMessage: 'Actions'
                    })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((segment) => (
                  <TableRow key={segment.id}>
                    <IdTableCell id={segment.original.id} />
                    <TableCell>{segment.original.name}</TableCell>
                    <MetadataTableCell metadata={segment.original.metadata} />
                    <TableCell className="w-0" align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="h-[34px] w-[34px] p-2"
                            variant="secondary"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleEdit(segment.original)}
                          >
                            {intl.formatMessage({
                              id: `common.edit`,
                              defaultMessage: 'Edit'
                            })}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleDialogOpen(segment.original.id)
                            }
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

        <EntityDataTable.Footer>
          <EntityDataTable.FooterText>
            {intl.formatMessage(
              {
                id: 'ledgers.segments.showing',
                defaultMessage:
                  '{number, plural, =0 {No segments found} one {Showing {count} segment} other {Showing {count} segments}}.'
              },
              {
                number: data?.items?.length || 0,
                count: <span className="font-bold">{data?.items?.length}</span>
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={data?.items?.length || 0} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </>
  )
}
