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
import { MoreVertical, Plus, Search } from 'lucide-react'
import { useIntl } from 'react-intl'
import { ProductsSheet } from './products-sheet'
import React from 'react'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useDeleteProduct, useListProducts } from '@/client/products'
import { ProductResponseDto } from '@/core/application/dto/product-dto'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import { EmptyResource } from '@/components/empty-resource'
import { isNil } from 'lodash'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'

export const ProductsTabContent = () => {
  const intl = useIntl()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const { data, refetch } = useListProducts({
    organizationId: '1c494870-8c14-41ba-b63f-8fe40c5173c3',
    ledgerId: '74e15716-f5c6-4c86-9641-a7ffa729895c'
  })
  const { mutate: deleteMutate } = useDeleteProduct({
    organizationId: '1c494870-8c14-41ba-b63f-8fe40c5173c3',
    ledgerId: '74e15716-f5c6-4c86-9641-a7ffa729895c',
    onSuccess: () => refetch()
  })

  const { handleDialogOpen, dialogProps } = useConfirmDialog({
    onConfirm: (id: string) => deleteMutate({ id })
  })
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
          id: 'ledgers.products.deleteDialog.title',
          defaultMessage: 'Are you sure?'
        })}
        description={intl.formatMessage({
          id: 'ledgers.products.deleteDialog.description',
          defaultMessage: 'You will delete a product'
        })}
        {...dialogProps}
      />

      <ProductsSheet onSave={refetch} {...sheetProps} />

      <EntityBox.Root>
        <EntityBox.Header
          title={intl.formatMessage({
            id: 'ledgers.products.title',
            defaultMessage: 'Products'
          })}
          subtitle={intl.formatMessage({
            id: 'ledgers.products.subtitle',
            defaultMessage:
              'Clustering or allocation of customers at different levels.'
          })}
        />
        <EntityBox.Actions className="gap-4">
          <InputWithIcon
            placeholder={intl.formatMessage({
              id: 'common.filter',
              defaultMessage: 'Filter'
            })}
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="w-full min-w-[300px]"
            icon={<Search />}
          />
          <Button variant="secondary" onClick={handleCreate}>
            <Plus />
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      {isNil(data?.items) ||
        (data?.items.length === 0 && (
          <EmptyResource
            message={intl.formatMessage({
              id: 'ledgers.products.emptyResource',
              defaultMessage: "You haven't created any Products yet"
            })}
          >
            <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
              {intl.formatMessage({
                id: 'common.create',
                defaultMessage: 'Create'
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
                        number: Object.entries(product.original.metadata || [])
                          .length
                      }
                    )}
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
                          onClick={() => handleEdit(product.original)}
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
                          onClick={() => handleDialogOpen(product.original.id)}
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
