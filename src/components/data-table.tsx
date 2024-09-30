'use client'

import React, { useEffect } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { InputWithIcon } from './ui/input-with-icon'
import { useIntl } from 'react-intl'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  pageSizeOptions?: number[]
  data: TData[]
  onSelectedRowsChange?: (selectedRows: TData[]) => void
  enableRowSelection?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  pageSizeOptions = [10, 50, 100],
  data,
  onSelectedRowsChange,
  enableRowSelection = false
}: DataTableProps<TData, TValue>) {
  const intl = useIntl()
  const [columnFilters, setColumnFilters] = React.useState<any>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection
    },
    enableRowSelection
  })

  useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)
      onSelectedRowsChange(selectedRows)
    }
  }, [rowSelection, onSelectedRowsChange, table])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
        <InputWithIcon
          placeholder="Filtrar pelo nome"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="w-full min-w-[300px]"
          icon={<Search size={20} className="text-shadcn-400" />}
          iconPosition={'left'}
        />

        {data.length > 10 ? (
          <div className="flex items-center gap-4">
            <p className="whitespace-nowrap text-sm font-medium">
              Itens por página
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-16 border border-[#D1D5DB] px-3 py-2 shadow-sm">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="bottom">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg bg-white shadow-dataTable">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableRowSelection && (
                  <TableHead>
                    <Checkbox
                      checked={table.getIsAllRowsSelected()}
                      onCheckedChange={(value) =>
                        table.toggleAllRowsSelected(!!value)
                      }
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(row.getIsSelected() && 'bg-blue-50')}
                >
                  {enableRowSelection && (
                    <TableCell>
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-6 py-3">
          <div>
            <p className="text-sm font-normal italic text-shadcn-400">
              Mostrando{' '}
              <span className="font-bold">
                {table.getFilteredRowModel().rows.length}
              </span>{' '}
              de um total de <span className="font-bold">{data.length}</span>{' '}
              Ledgers.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cn(
                'space-x-1.5',
                !table.getCanPreviousPage() && 'bg-shadcn-100'
              )}
            >
              <ChevronLeft size={16} />
              <span>
                {intl.formatMessage({
                  id: 'common.previousPage',
                  defaultMessage: 'Previous page'
                })}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cn(
                'space-x-1.5',
                !table.getCanNextPage() && 'bg-shadcn-100'
              )}
            >
              <span>
                {intl.formatMessage({
                  id: 'common.nextPage',
                  defaultMessage: 'Next page'
                })}
              </span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
