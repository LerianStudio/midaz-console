'use client'

import React, { useEffect, useState } from 'react'
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
import { IdTableCell } from '@/components/id-table-cell'
import { SegmentsSheet } from './segments-sheet'
import { MetadataTableCell } from '../ledgers/[id]/MetadataTableCell'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import { SegmentsDataTable } from './segments-data-table'
import { SegmentsSkeleton } from './segments-skeleton'

const Page = () => {
  const intl = useIntl()
  const { currentOrganization, currentLedger } = useOrganization()
  const [columnFilters, setColumnFilters] = useState<any>([])

  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({
    total
  })

  const {
    data: segments,
    refetch,
    isLoading: isSegmentsLoading
  } = useListSegments({
    organizationId: currentOrganization.id!,
    ledgerId: currentLedger.id,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(segments?.items.length || 0)
  }, [segments?.items.length])

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteSegment({
    organizationId: currentOrganization.id!,
    ledgerId: currentLedger.id,
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
    data: segments?.items!,
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

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: currentOrganization.legalName
    },
    {
      name: currentLedger.name
    },
    {
      name: intl.formatMessage({
        id: `common.segments`,
        defaultMessage: 'Segments'
      })
    }
  ])

  const segmentsProps = {
    segments,
    table,
    handleDialogOpen,
    handleEdit,
    refetch,
    form,
    pagination,
    total
  }

  return (
    <React.Fragment>
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'common.segments',
              defaultMessage: 'Segments'
            })}
            subtitle={intl.formatMessage({
              id: 'segments.subtitle',
              defaultMessage: 'Manage the segments of this ledger.'
            })}
          />

          <PageHeader.ActionButtons>
            <PageHeader.CollapsibleInfoTrigger
              question={intl.formatMessage({
                id: 'segments.helperTrigger.question',
                defaultMessage: 'What is a Segment?'
              })}
            />

            <Button onClick={handleCreate} data-testid="new-segment">
              {intl.formatMessage({
                id: 'segments.listingTemplate.addButton',
                defaultMessage: 'New Segment'
              })}
            </Button>
          </PageHeader.ActionButtons>
        </PageHeader.Wrapper>

        <PageHeader.CollapsibleInfo
          question={intl.formatMessage({
            id: 'segments.helperTrigger.question',
            defaultMessage: 'What is a Segment?'
          })}
          answer={intl.formatMessage({
            id: 'segments.helperTrigger.answer',
            defaultMessage:
              'Book with the record of all transactions and operations of the Organization.'
          })}
          seeMore={intl.formatMessage({
            id: 'common.read.docs',
            defaultMessage: 'Read the docs'
          })}
        />
      </PageHeader.Root>

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

      <SegmentsSheet
        ledgerId={currentLedger.id}
        onSuccess={refetch}
        {...sheetProps}
      />

      <div className="mt-10">
        {isSegmentsLoading && <SegmentsSkeleton />}

        {!isSegmentsLoading && segments && (
          <SegmentsDataTable {...segmentsProps} />
        )}
      </div>
    </React.Fragment>
  )
}

export default Page
