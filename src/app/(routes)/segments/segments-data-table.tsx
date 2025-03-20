import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
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
import { MoreVertical, Minus } from 'lucide-react'
import { capitalizeFirstLetter } from '@/helpers'
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
import { EntityBox } from '@/components/entity-box'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { EntityDataTable } from '@/components/entity-data-table'
import { Pagination, PaginationProps } from '@/components/pagination'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { IdTableCell } from '@/components/table/id-table-cell'
import { MetadataTableCell } from '@/components/table/metadata-table-cell'
import { SegmentResponseDto } from '@/core/application/dto/segment-dto'
import { SegmentsSheet } from './segments-sheet'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'

type SegmentsTableProps = {
  segments: PaginationDto<SegmentResponseDto> | undefined
  table: {
    getRowModel: () => {
      rows: { id: string; original: SegmentResponseDto }[]
    }
  }
  handleDialogOpen: (id: string, name: string) => void
  handleEdit: (asset: SegmentResponseDto) => void
  refetch: () => void
  form: UseFormReturn<any>
  total: number
  pagination: PaginationProps
}

type SegmentRowProps = {
  segment: { id: string; original: SegmentResponseDto }
  handleCopyToClipboard: (value: string, message: string) => void
  handleDialogOpen: (id: string, name: string) => void
  handleEdit: (segment: SegmentResponseDto) => void
}

const SegmentRow: React.FC<SegmentRowProps> = ({
  segment,
  handleDialogOpen,
  handleEdit
}) => {
  const intl = useIntl()

  return (
    <TableRow key={segment.id}>
      <IdTableCell id={segment.original.id} />
      <TableCell>{segment.original.name}</TableCell>
      <MetadataTableCell metadata={segment.original.metadata} />
      <TableCell className="w-0" align="center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-[34px] w-[34px] p-2" variant="secondary">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(segment.original)}>
              {intl.formatMessage({
                id: `common.edit`,
                defaultMessage: 'Edit'
              })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                handleDialogOpen(
                  segment.original.id || '',
                  segment.original.name || ''
                )
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
  )
}

export const SegmentsDataTable: React.FC<SegmentsTableProps> = (props) => {
  const intl = useIntl()
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()
  const { showInfo } = useCustomToast()
  const { currentLedger } = useOrganization()

  const {
    segments,
    table,
    handleDialogOpen,
    handleEdit,
    refetch,
    form,
    pagination,
    total
  } = props

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <FormProvider {...form}>
      <div className="mb-4 flex justify-end">
        <PaginationLimitField control={form.control} />
      </div>

      <EntityDataTable.Root>
        {isNil(segments?.items) || segments.items.length === 0 ? (
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
        ) : (
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
                  <SegmentRow
                    key={segment.id}
                    segment={segment}
                    handleCopyToClipboard={handleCopyToClipboard}
                    handleDialogOpen={handleDialogOpen}
                    handleEdit={handleEdit}
                  />
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
                number: segments?.items?.length || 0,
                count: (
                  <span className="font-bold">{segments?.items?.length}</span>
                )
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>

        <SegmentsSheet
          ledgerId={currentLedger.id}
          onSuccess={refetch}
          {...sheetProps}
        />
      </EntityDataTable.Root>
    </FormProvider>
  )
}
