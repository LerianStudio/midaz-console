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
import { ProductsSheet } from './products-sheet'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useDeleteProduct, useListProducts } from '@/client/products'
import { ProductResponseDto } from '@/core/application/dto/product-dto'
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
import { SelectItem } from '@/components/ui/select'
import { useQueryParams } from '@/hooks/use-query-params'
import { Pagination } from '@/components/pagination'
import { InputField, SelectField } from '@/components/form'

export const ProductsTabContent = () => {
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
  } = useListProducts({
    organizationId: currentOrganization.id!,
    ledgerId,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(data?.items.length || 0)
  }, [data?.items.length])

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteProduct({
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
    useCreateUpdateSheet<ProductResponseDto>()

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
          id: 'products.delete.description',
          defaultMessage:
            'You are about to permanently delete this product. This action cannot be undone. Do you wish to continue?'
        })}
        loading={deletePending}
        {...dialogProps}
      />

      <ProductsSheet ledgerId={ledgerId} onSucess={refetch} {...sheetProps} />

      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <EntityBox.Header
            title={intl.formatMessage({
              id: 'ledgers.products.title',
              defaultMessage: 'Products'
            })}
            subtitle={intl.formatMessage({
              id: 'ledgers.products.subtitle',
              defaultMessage: 'Manage the products of this ledger.'
            })}
            tooltip={intl.formatMessage({
              id: 'ledgers.products.tooltip',
              defaultMessage:
                'Clustering or allocation of customers at different levels.'
            })}
          />
          <EntityBox.Actions className="">
            <Button onClick={handleCreate}>
              {intl.formatMessage({
                id: 'common.new.product',
                defaultMessage: 'New Product'
              })}
            </Button>
            <EntityBox.CollapsibleTrigger />
          </EntityBox.Actions>
        </EntityBox.Banner>
        <EntityBox.CollapsibleContent>
          <div className="col-start-3 flex flex-row items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <p className="whitespace-nowrap text-sm font-medium text-gray-600">
                {intl.formatMessage({
                  id: 'common.itemsPerPage',
                  defaultMessage: 'Items per page'
                })}
              </p>
              <SelectField name="limit" control={form.control}>
                {[10, 50, 100].map((pageSize: number) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectField>
            </div>
          </div>
        </EntityBox.CollapsibleContent>
      </EntityBox.Collapsible>

      <EntityDataTable.Root>
        {listLoading && <Skeleton className="h-64" />}

        {isNil(data?.items) ||
          (data?.items.length === 0 && (
            <EmptyResource
              message={intl.formatMessage({
                id: 'ledgers.products.emptyResource',
                defaultMessage: "You haven't created any Products yet"
              })}
            >
              <Button onClick={handleCreate}>
                {intl.formatMessage({
                  id: 'common.new.product',
                  defaultMessage: 'New Product'
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
                {table.getRowModel().rows.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.original.id}</TableCell>
                    <TableCell>{product.original.name}</TableCell>
                    <TableCell>
                      {intl.formatMessage(
                        {
                          id: 'common.table.metadata',
                          defaultMessage:
                            '{number, plural, =0 {-} one {# record} other {# records}}'
                        },
                        {
                          number: Object.entries(
                            product.original.metadata || []
                          ).length
                        }
                      )}
                    </TableCell>
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
                            onClick={() => handleEdit(product.original)}
                          >
                            {intl.formatMessage({
                              id: `common.edit`,
                              defaultMessage: 'Edit'
                            })}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleDialogOpen(product.original.id)
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
                id: 'ledgers.products.showing',
                defaultMessage:
                  '{number, plural, =0 {No products found} one {Showing {count} product} other {Showing {count} products}}.'
              },
              {
                number: data?.items?.length,
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
