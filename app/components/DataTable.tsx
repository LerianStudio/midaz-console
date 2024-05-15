'use client'

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
import { Button } from '@/components/ui/button/button'

import React from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { InputWithIcon } from './ui/input-with-icon'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  pageSizeOptions?: number[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  pageSizeOptions = [10, 50, 100],
  data
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const t = useTranslations('dataTable')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER
    },
    state: {
      columnFilters
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
        <InputWithIcon
          placeholder="Filtrar"
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

      <div className="mt-6 rounded-lg bg-white shadow-dataTable">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? 'auto'
                            : header.getSize()
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? 'auto'
                            : cell.column.getSize()
                      }}
                    >
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
                  colSpan={columns.length}
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
              Mostrando {table.getFilteredRowModel().rows.length} de{' '}
              {table.getFilteredRowModel().rows.length} de um total de{' '}
              {data.length} Ledgers.
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
              <span>{t('previousBtn')}</span>
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
              <span>{t('nextBtn')}</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
