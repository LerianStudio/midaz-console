'use client'

import React from 'react'
import { getLedgersColumns } from '@/app/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/app/(routes)/ledgers/ledgers-form-schema'
import { DataTable } from '@/components/data-table'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { useDeleteLedger } from '@/hooks/ledgers/use-delete-ledger'
import { useCreateLedger } from '@/hooks/ledgers/use-create-ledger'
import { v4 as uuidv4 } from 'uuid'
import { useEnhancedLedgers } from '@/hooks/ledgers/use-enhanced-ledgers'
import { PageHeader } from '@/components/page-header'
import { getSheetInfo } from '@/helpers/ledgers/ledgers-helpers'
import { useLedgers } from '@/utils/queries'
import { SheetContainer } from '@/components/sheet/sheet-container'
import { useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/confirmation-dialog/confirmation-dialog'
import { Plus } from 'lucide-react'
import { EmptyResource } from '@/components/empty-resource'

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
      organizationId: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
      metadata: metadataObject,
      status: {
        code: 'ACTIVE',
        description: null
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    }

    if (sheetMode.mode === 'create') {
      await createLedgerData(dataToSubmit)
    }
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
          <EmptyResource
            message={intl.formatMessage({
              id: 'ledgers.emptyResource',
              defaultMessage: "You haven't created any Ledger yet"
            })}
            extra={intl.formatMessage({
              id: 'ledgers.emptyResourceExtra',
              defaultMessage: 'No Ledger found.'
            })}
          >
            <Button
              variant="outline"
              onClick={handleOpenCreateSheet}
              icon={<Plus />}
            >
              {intl.formatMessage({
                id: 'common.create',
                defaultMessage: 'Create'
              })}
            </Button>
          </EmptyResource>
        )}

        <ConfirmationDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={intl.formatMessage({
            id: 'ledgers.dialog.title',
            defaultMessage: 'Are you sure?'
          })}
          description={intl.formatMessage(
            {
              id: 'ledgers.dialog.subtitle',
              defaultMessage:
                'This action is irreversible. This will deactivate your Ledger forever {ledgerName}.'
            },
            {
              ledgerName: currentLedgerForDeletion?.name || ''
            }
          )}
          onConfirm={handleConfirmDeleteLedger}
          onCancel={() => setIsDialogOpen(false)}
        />

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
          <PageHeader.ActionButtons>
            <PageHeader.CollapsibleInfoTrigger
              question={intl.formatMessage({
                id: 'ledgers.helperTrigger.question',
                defaultMessage: 'What is a Ledger?'
              })}
            />
            <Button icon={<Plus />} onClick={handleOpenCreateSheet}>
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

      <div className="mt-10">{getLedgersComponents()}</div>
    </React.Fragment>
  )
}

export default LedgersView
