'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/app/(routes)/ledgers/ledgers-form-schema'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { useCreateLedger } from '@/hooks/ledgers/use-create-ledger'
import { v4 as uuidv4 } from 'uuid'
import { useEnhancedLedgers } from '@/hooks/ledgers/use-enhanced-ledgers'
import { PageHeader } from '@/components/page-header'
import { getSheetInfo } from '@/helpers/ledgers/ledgers-helpers'
import { useLedgers } from '@/utils/queries'
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

const LedgersView = () => {
  const organizationId = '45d0c9e6-7fb5-4675-b300-3c3fbd554559'
  const intl = useIntl()
  const { data: ledgers, isLoading, refetch } = useLedgers(organizationId)
  // const enhancedLedgers = useEnhancedLedgers()
  const createLedgerData = useCreateLedger(organizationId)
  const [columnFilters, setColumnFilters] = React.useState<any>([])
  const [ledgerNameToDelete, setLedgerNameToDelete] = React.useState<string>('')

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {
      onConfirm: (id: string) => deleteMutate({ id })
    }
  )

  const handleDialogOpenWithLedgerName = (id: string, name: string) => {
    setLedgerNameToDelete(name)
    handleDialogOpen(id)
  }

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteLedger({
    organizationId: '45d0c9e6-7fb5-4675-b300-3c3fbd554559',
    ledgerId: '74e15716-f5c6-4c86-9641-a7ffa729895c',
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

  const formFields: any = [
    {
      name: 'name',
      label: intl.formatMessage({
        id: 'entity.ledger.name',
        defaultMessage: 'Ledger Name'
      }),
      placeholder: intl.formatMessage({
        id: 'common.typePlaceholder',
        defaultMessage: 'Type...'
      }),
      isRequired: true
    }
  ]

  console.log(ledgers?.items)

  // const {
  //   sheetMode,
  //   handleOpenCreateSheet,
  //   handleOpenViewSheet,
  //   setSheetMode
  // } = useSheetMode()

  // const {
  //   isDialogOpen,
  //   setIsDialogOpen,
  //   currentLedgerForDeletion,
  //   handleOpenDeleteSheet,
  //   handleConfirmDeleteLedger
  // } = useDeleteLedger(refetch)

  // const ledgersColumns = getLedgersColumns({
  //   handleOpenViewSheet,
  //   handleOpenDeleteSheet
  // })

  const { handleCreate, handleEdit, sheetProps } = useCreateUpdateSheet<any>()

  // const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, intl)

  const getLoadingSkeleton = () => {
    return (
      <React.Fragment>
        <Skeleton className="h-[84px] w-full bg-zinc-200" />
        <Skeleton className="mt-6 h-[390px] w-full bg-zinc-200" />
      </React.Fragment>
    )
  }

  const handleSubmit = async (values: LedgerEntity) => {
    const metadataObject = Array.isArray(values.metadata)
      ? values.metadata.reduce(
          (
            acc: Record<string, string>,
            item: { key: string; value: string }
          ) => ({
            ...acc,
            [item.key]: item.value
          }),
          {}
        )
      : null

    const dataToSubmit: LedgerEntity = {
      id: uuidv4(),
      name: values.name,
      organizationId: '45d0c9e6-7fb5-4675-b300-3c3fbd554559',
      metadata: metadataObject,
      status: {
        code: 'ACTIVE',
        description: null
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    // if (sheetMode.mode === 'create') {
    //   await createLedgerData(dataToSubmit)
    // }
  }

  // const sheetProps = React.useMemo(
  //   () => ({
  //     open: sheetMode.isOpen,
  //     setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
  //     fields: formFields,
  //     formSchema: formSchema,
  //     sheetInfo: sheetInfo,
  //     onSubmit: handleSubmit,
  //     mode: sheetMode.mode,
  //     data: sheetMode.ledgersData
  //   }),
  //   [sheetMode, formFields, formSchema, sheetInfo, handleSubmit]
  // )

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
              {intl.formatMessage({
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

      <LedgersSheet ledgerId={'123'} onSucess={refetch} {...sheetProps} />

      <div className="mt-10">
        <LedgersDataTable
          ledgers={ledgers}
          isLoading={isLoading}
          table={table}
          handleDialogOpen={handleDialogOpenWithLedgerName}
        />
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
              'This action is irreversible. This will deactivate your Ledger forever {ledgerName}.'
          },
          {
            ledgerName: ledgerNameToDelete
          }
        )}
        loading={deletePending}
        {...dialogProps}
      />
    </React.Fragment>
  )
}

export default LedgersView
