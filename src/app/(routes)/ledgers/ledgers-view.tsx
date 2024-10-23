'use client'

import React from 'react'
import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { Plus } from 'lucide-react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { LedgersDataTable } from './ledgers-data-table'
import { LedgersSheet } from './ledgers-sheet'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { useDeleteLedger } from '@/client/ledger-client'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { LedgersSkeleton } from './ledgers-skeleton'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'

type LedgersViewProps = {
  ledgers: PaginationDto<LedgerResponseDto> | undefined
  refetch: () => void
  isLoading: boolean
}

const LedgersView = ({ ledgers, refetch, isLoading }: LedgersViewProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const {
    handleDialogOpen,
    dialogProps,
    handleDialogClose,
    data: ledgerName
  } = useConfirmDialog({
    onConfirm: (id: string) => deleteMutate({ id })
  })

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteLedger({
    organizationId: currentOrganization.id!,
    onSuccess: () => {
      handleDialogClose()
      refetch()
    }
  })

  const table = useReactTable({
    data: ledgers?.items!,
    columns: [
      { accessorKey: 'id' },
      { accessorKey: 'name' },
      { accessorKey: 'assets' },
      { accessorKey: 'metadata' },
      { accessorKey: 'status' },
      { accessorKey: 'actions' }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()

  return (
    <React.Fragment>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'ledgers.title',
              defaultMessage: 'Ledgers'
            })}
            subtitle={intl.formatMessage({
              id: 'ledgers.subtitle',
              defaultMessage:
                'Visualize and edit the Ledgers of your Organization.'
            })}
          />
          <PageHeader.ActionButtons>
            <PageHeader.CollapsibleInfoTrigger
              question={intl.formatMessage({
                id: 'ledgers.helperTrigger.question',
                defaultMessage: 'What is a Ledger?'
              })}
            />
            <Button icon={<Plus />} onClick={handleCreate}>
              {!ledgers || ledgers.items.length === 0
                ? intl.formatMessage({
                    id: 'ledgers.listingTemplate.newAddButton',
                    defaultMessage: 'Create your first Ledger'
                  })
                : intl.formatMessage({
                    id: 'ledgers.listingTemplate.addButton',
                    defaultMessage: 'New Ledger'
                  })}
            </Button>
          </PageHeader.ActionButtons>
        </PageHeader.Wrapper>
        <PageHeader.CollapsibleInfo
          question={intl.formatMessage({
            id: 'ledgers.helperTrigger.question',
            defaultMessage: 'What is a Ledger?'
          })}
          answer={intl.formatMessage({
            id: 'ledgers.helperTrigger.answer',
            defaultMessage:
              'Book with the record of all transactions and operations of the Organization.'
          })}
          seeMore={intl.formatMessage({
            id: 'ledgers.helperTrigger.seeMore',
            defaultMessage: 'Read the docs'
          })}
        />
      </PageHeader.Root>

      <LedgersSheet onSuccess={refetch} {...sheetProps} />

      <div className="mt-10">
        {isLoading && <LedgersSkeleton />}

        {ledgers && (
          <LedgersDataTable
            ledgers={ledgers}
            isLoading={isLoading}
            table={table}
            handleDialogOpen={handleDialogOpen}
            refetch={refetch}
          />
        )}
      </div>

      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'ledgers.deleteDialog.title',
          defaultMessage: 'Are you sure?'
        })}
        description={intl.formatMessage(
          {
            id: 'ledgers.deleteDialog.subtitle',
            defaultMessage:
              'This action is irreversible. This will deactivate your Ledger {ledgerName} forever'
          },
          { ledgerName: ledgerName as string }
        )}
        loading={deletePending}
        {...dialogProps}
      />
    </React.Fragment>
  )
}

export default LedgersView
