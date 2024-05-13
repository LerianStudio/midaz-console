'use client'

import { useTranslations } from 'next-intl'
import { getLedgersFormFields } from '@/[locale]/(routes)/ledgers/ledgers-form-fields'
import { getLedgersColumns } from '@/[locale]/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/[locale]/(routes)/ledgers/ledgers-form-schema'
import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { DialogDemo } from '@/components/Dialog'
import { SheetDemo } from '@/components/Sheet'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
import { PageHeader } from '@/components/PageHeader'
import { useSheetMode } from '@/hooks/ledgers/useSheetMode'
import { useDeleteLedger } from '@/hooks/ledgers/useDeleteLedger'
import { useCreateLedger } from '@/hooks/ledgers/useCreateLedger'
import { v4 as uuidv4 } from 'uuid'
import { useEnhancedLedgers } from '@/hooks/ledgers/useEnhancedLedgers'
import React from 'react'
import { useLedgers } from '@/utils/queries'

const LedgersView = () => {
  const t = useTranslations('ledgers')
  const formFields: any = getLedgersFormFields(t)
  const ledgers = useLedgers()
  const createLedgerData = useCreateLedger()
  const enhancedLedgers = useEnhancedLedgers()

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

  const getSheetInfo = (
    mode: string,
    ledgerData: LedgerEntity | null,
    t: any
  ) => {
    const info = {
      create: {
        title: t('sheetCreate.title'),
        description: t('sheetCreate.description'),
        buttonText: t('sheetCreate.button')
      },
      edit: {
        title: `${t('sheetEdit.title')} ${ledgerData?.name}`,
        description: t('sheetEdit.description'),
        buttonText: t('sheetEdit.button')
      },
      view: {
        title: `${t('sheetView.title')} ${ledgerData?.name}`,
        description: t('sheetView.description'),
        buttonText: t('sheetView.button')
      }
    }

    return info[mode as keyof typeof info]
  }

  const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, t)

  const getLoadingSkeleton = () => {
    return (
      <React.Fragment>
        <Skeleton className="h-[84px] w-full bg-white" />
        <Skeleton className="mt-6 h-[390px] w-full bg-white" />
      </React.Fragment>
    )
  }

  const defaultLedgerSchema: any = {
    id: uuidv4(),
    organizationId: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
    instruments: null,
    status: {
      code: 'ACTIVE',
      description: null
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }

  const handleSubmit = async (values: LedgerEntity) => {
    const mergedValues = { ...defaultLedgerSchema, ...values }

    if (sheetMode.mode === 'create') {
      await createLedgerData(mergedValues)
    }
  }

  const getHelperTriggerTranslate = (t: any) => ({
    question: t('helperTrigger.question'),
    answer: t('helperTrigger.answer'),
    seeMore: t('helperTrigger.seeMore')
  })

  const getListingTemplateTranslate = (t: any) => ({
    configureButton: t('listingTemplate.configureButton'),
    addButton: t('listingTemplate.addButton')
  })

  const getLedgersComponents = () => {
    return (
      <div>
        {ledgers.data && ledgers.data.length > 0 && (
          <DataTable columns={ledgersColumns} data={enhancedLedgers.data} />
        )}

        {!ledgers.data ||
          (ledgers.data.length === 0 && (
            <NoResource
              resourceName="Ledger"
              onClick={handleOpenCreateSheet}
              pronoun="she"
            />
          ))}

        <DialogDemo
          open={isDialogOpen}
          setOpen={() => setIsDialogOpen(false)}
          title={t('dialog.title')}
          subtitle={t('dialog.subtitle')}
          deleteButtonText={t('dialog.deleteBtnText')}
          doingBusinessAs={currentLedgerForDeletion?.name}
          onDelete={handleConfirmDeleteLedger}
        />

        <SheetDemo
          open={sheetMode.isOpen}
          setOpen={(isOpen) => setSheetMode({ ...sheetMode, isOpen })}
          mode={sheetMode.mode}
          fields={formFields}
          formSchema={formSchema}
          title={sheetInfo.title}
          description={sheetInfo.description}
          buttonText={sheetInfo.buttonText}
          data={sheetMode.ledgersData}
          onSubmit={handleSubmit}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mt-12">
        <PageHeader
          title={t('title')}
          subtitle={t('subtitle')}
          hasInfo={true}
          type="listing"
          helperTriggerTranslate={getHelperTriggerTranslate(t)}
          listingTemplateTranslate={getListingTemplateTranslate(t)}
          onCreate={handleOpenCreateSheet}
        />
      </div>

      <div className="mt-10">
        {ledgers.isLoading || ledgers.data === undefined
          ? getLoadingSkeleton()
          : getLedgersComponents()}
      </div>
    </div>
  )
}

export default LedgersView
