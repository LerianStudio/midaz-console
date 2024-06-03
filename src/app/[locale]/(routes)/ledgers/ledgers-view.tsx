'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { getLedgersFormFields } from '@/app/[locale]/(routes)/ledgers/ledgers-form-fields'
import { getLedgersColumns } from '@/app/[locale]/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/app/[locale]/(routes)/ledgers/ledgers-form-schema'
import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { LedgerEntity } from '@/core/domain/entities/LedgerEntity'
import { useSheetMode } from '@/hooks/ledgers/useSheetMode'
import { useDeleteLedger } from '@/hooks/ledgers/useDeleteLedger'
import { useCreateLedger } from '@/hooks/ledgers/useCreateLedger'
import { v4 as uuidv4 } from 'uuid'
import { useEnhancedLedgers } from '@/hooks/ledgers/useEnhancedLedgers'
import { PageHeader } from '@/components/PageHeader'
import { Dialog } from '@/components/Dialog'
import { Sheet } from '@/components/Sheet'
import {
  getHelperTriggerTranslate,
  getListingTemplateTranslate,
  getSheetInfo
} from '@/helpers/ledgers/ledgersHelpers'
import { useLedgers } from '@/utils/queries'
import useCustomToast from '@/hooks/useCustomToast'

const LedgersView = () => {
  const t = useTranslations('ledgers')
  const formFields: any = getLedgersFormFields(t)
  const ledgers = useLedgers()
  const enhancedLedgers = useEnhancedLedgers()
  const createLedgerData = useCreateLedger()

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

  const ledgersColumns = getLedgersColumns(
    {
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, t)

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

        <Sheet {...sheetProps} />
      </div>
    )
  }

  return (
    <React.Fragment>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle title={t('title')} subtitle={t('subtitle')} />
          <PageHeader.ActionButtons
            type="listing"
            listingTemplateTranslate={getListingTemplateTranslate(t)}
            helperTriggerTranslate={getHelperTriggerTranslate(t)}
            onCreate={handleOpenCreateSheet}
          />
        </PageHeader.Wrapper>
        <PageHeader.CollapsibleInfo
          helperTriggerTranslate={getHelperTriggerTranslate(t)}
        />
      </PageHeader.Root>

      <div className="mt-10">{getLedgersComponents()}</div>
    </React.Fragment>
  )
}

export default LedgersView
