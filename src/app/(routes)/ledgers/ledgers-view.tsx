'use client'

import React from 'react'
import { getLedgersColumns } from '@/app/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/app/(routes)/ledgers/ledgers-form-schema'
import { DataTable } from '@/components/data-table'
import { NoResource } from '@/components/no-resource'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { useDeleteLedger } from '@/hooks/ledgers/use-delete-ledger'
import { useCreateLedger } from '@/hooks/ledgers/use-create-ledger'
import { v4 as uuidv4 } from 'uuid'
import { useEnhancedLedgers } from '@/hooks/ledgers/use-enhanced-ledgers'
import { PageHeader } from '@/components/page-header'
import { Dialog } from '@/components/dialog'
import { getSheetInfo } from '@/helpers/ledgers/ledgers-helpers'
import { useLedgers } from '@/utils/queries'
import { SheetContainer } from '@/components/sheet/sheet-container'
import { useIntl } from 'react-intl'

const LedgersView = () => {
  const intl = useIntl()
  const ledgers = useLedgers()
  const enhancedLedgers = useEnhancedLedgers()
  const createLedgerData = useCreateLedger()

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

  const {
    sheetMode,
    handleOpenCreateSheet,
    handleOpenViewSheet,
    setSheetMode
  } = useSheetMode()

  const {
    isDialogOpen,
    setIsDialogOpen,
    currentLedgerForDeletion,
    handleOpenDeleteSheet,
    handleConfirmDeleteLedger
  } = useDeleteLedger(ledgers.refetch)

  const ledgersColumns = getLedgersColumns({
    handleOpenViewSheet,
    handleOpenDeleteSheet
  })

  const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, intl)

  const getLoadingSkeleton = () => {
    return (
      <React.Fragment>
        <Skeleton className="h-[84px] w-full bg-zinc-200" />
        <Skeleton className="mt-6 h-[390px] w-full bg-zinc-200" />
      </React.Fragment>
    )
  }

  const defaultLedgerSchema: any = {
    id: uuidv4(),
    organizationId: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
    status: {
      code: 'ACTIVE',
      description: null
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }

  const handleSubmit = async (values: LedgerEntity) => {
    console.log(values)

    const mergedValues = { ...defaultLedgerSchema, ...values }

    if (sheetMode.mode === 'create') {
      await createLedgerData(mergedValues)
    }

    console.log(mergedValues)
  }

  const sheetProps = React.useMemo(
    () => ({
      open: sheetMode.isOpen,
      setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
      fields: formFields,
      formSchema: formSchema,
      sheetInfo: sheetInfo,
      onSubmit: handleSubmit,
      mode: sheetMode.mode,
      data: sheetMode.ledgersData
    }),
    [sheetMode, formFields, formSchema, sheetInfo, handleSubmit]
  )

  const getLedgersComponents = () => {
    if (enhancedLedgers.isLoading) {
      return getLoadingSkeleton()
    }

    return (
      <div>
        {ledgers.data && ledgers.data.length > 0 ? (
          <DataTable columns={ledgersColumns} data={enhancedLedgers.data} />
        ) : (
          <NoResource
            resourceName="Ledger"
            onClick={handleOpenCreateSheet}
            pronoun="he"
          />
        )}

        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Content>
            <Dialog.Header ledgerName={currentLedgerForDeletion?.name || ''} />
            <Dialog.Footer
              onDismiss={() => setIsDialogOpen(false)}
              onDelete={handleConfirmDeleteLedger}
            />
          </Dialog.Content>
        </Dialog.Root>

        <SheetContainer {...sheetProps} />
      </div>
    )
  }

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
          <PageHeader.ActionButtons
            type="listing"
            listingTemplateTranslate={{
              addButton: intl.formatMessage({
                id: 'ledgers.listingTemplate.addButton',
                defaultMessage: 'New Ledger'
              })
            }}
            helperTriggerTranslate={{
              question: intl.formatMessage({
                id: 'ledgers.helperTrigger.question',
                defaultMessage: 'What is a Ledger?'
              })
            }}
            onCreate={handleOpenCreateSheet}
          />
        </PageHeader.Wrapper>
        <PageHeader.CollapsibleInfo
          helperTriggerTranslate={{
            question: intl.formatMessage({
              id: 'ledgers.helperTrigger.question',
              defaultMessage: 'What is a Ledger?'
            }),
            answer: intl.formatMessage({
              id: 'ledgers.helperTrigger.answer',
              defaultMessage:
                'Book with the record of all transactions and operations of the Organization.'
            }),
            seeMore: intl.formatMessage({
              id: 'ledgers.helperTrigger.seeMore',
              defaultMessage: 'Read the docs'
            })
          }}
        />
      </PageHeader.Root>

      <div className="mt-10">{getLedgersComponents()}</div>
    </React.Fragment>
  )
}

export default LedgersView
