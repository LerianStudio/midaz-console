'use client'

import { LedgerEntity } from '@/entities/LedgerEntity'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useLedgers } from '@/utils/queries'
import { getLedgersFormFields } from '@/[locale]/(routes)/ledgers/ledgers-form-fields'
import { getLedgersColumns } from '@/[locale]/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/[locale]/(routes)/ledgers/ledgers-form-schema'
import { createLedger, deleteLedger, updateLedger } from '@/client/ledgerClient'
import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { DialogDemo } from '@/components/Dialog'
import { SheetDemo } from '@/components/Sheet'
import useCustomToast from '@/hooks/useCustomToast'

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  ledgersData: LedgerEntity | null
}

const LedgersView = () => {
  const t = useTranslations('ledgers')
  const { showSuccess, showError } = useCustomToast()
  const formFields: any = getLedgersFormFields(t)
  const ledgers = useLedgers()

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    ledgersData: null
  })

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', ledgersData: null })
  }

  const handleOpenEditSheet = (ledgerData: LedgerEntity) => {
    setSheetMode({ isOpen: true, mode: 'edit', ledgersData: ledgerData })
  }

  const handleOpenViewSheet = (ledgerData: LedgerEntity) => {
    setSheetMode({ isOpen: true, mode: 'view', ledgersData: ledgerData })
  }

  const getSheetTitle = (
    mode: string,
    ledgerData: LedgerEntity | null,
    t: any
  ) => {
    if (mode === 'create') {
      return t('sheetCreate.title')
    }

    if (mode === 'edit') {
      return `${t('sheetEdit.title')} ${ledgerData?.name}`
    }

    return `${t('sheetView.title')} ${ledgerData?.name}`
  }

  const getSheetDescription = (mode: string, t: any) => {
    if (mode === 'create') {
      return t('sheetCreate.description')
    }

    if (mode === 'edit') {
      return t('sheetEdit.description')
    }

    return t('sheetView.description')
  }

  const getSheetButtonText = (mode: string, t: any) => {
    if (mode === 'create') {
      return t('sheetCreate.button')
    }

    if (mode === 'edit') {
      return t('sheetEdit.button')
    }

    return t('sheetView.button')
  }

  const handleOpenDeleteSheet = (ledgerData: LedgerEntity) => {
    setCurrentLedgerForDeletion(ledgerData)
    setIsDialogOpen(true)
  }

  const ledgersColumns = getLedgersColumns(
    {
      handleOpenEditSheet,
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLedgerForDeletion, setCurrentLedgerForDeletion] = useState<
    LedgerEntity | undefined
  >(undefined)

  const deleteLedgerAndRefetch = async (ledgerId: string) => {
    await deleteLedger(ledgerId)
    await ledgers.refetch()
  }

  const createLedgerAndRefetch = async (values: LedgerEntity) => {
    await createLedger(values)
    await ledgers.refetch()
  }

  const updateLedgerDataAndRefetch = async (
    sheetId: string,
    values: LedgerEntity
  ) => {
    await updateLedger(sheetId, values)
    await ledgers.refetch()
  }

  const handleConfirmDeleteLedger = async () => {
    if (!currentLedgerForDeletion) {
      showError(t('toast.ledgerNotFound'))
      return
    }

    try {
      setIsDialogOpen(false)
      await deleteLedgerAndRefetch(currentLedgerForDeletion.id)
      showSuccess(
        t('toast.ledgerDeleted', { ledgerName: currentLedgerForDeletion.name })
      )
    } catch (error) {
      const err = error as Error
      showError(t('toast.ledgerDeleteFailed', { message: err.message }))
    }
  }

  const createLedgerData = async (values: LedgerEntity) => {
    try {
      await createLedgerAndRefetch(values)
      showSuccess(t('toast.ledgerCreated', { ledgerName: values.name }))
    } catch (error) {
      const err = error as Error
      console.error(err)
      showError(err.message)
    }
  }

  const updateLedgerData = async (id: string, values: LedgerEntity) => {
    if (!sheetMode.ledgersData || !sheetMode.ledgersData.id) {
      showError('Division ID not found')
      return
    }

    try {
      await updateLedgerDataAndRefetch(sheetMode.ledgersData.id, values as any)
      showSuccess(t('toast.ledgerUpdated', { ledgerName: values.name }))
    } catch (error) {
      const err = error as Error
      showError(err.message)
    }
  }

  const getLoadingSkeleton = () => {
    return <Skeleton className="h-[80px] w-full" />
  }

  const handleSubmit = async (values: LedgerEntity) => {
    if (sheetMode.mode === 'create') {
      await createLedgerData(values)
    }

    if (sheetMode.mode === 'edit') {
      await updateLedgerData(sheetMode.ledgersData?.id as string, values)
    }
  }

  const getLedgersComponents = () => {
    return (
      <div>
        {ledgers.data && ledgers.data.length > 0 && (
          <DataTable columns={ledgersColumns} data={ledgers.data} />
        )}

        {!ledgers.data ||
          (ledgers.data.length === 0 && (
            <>
              <div className="h-[1px] w-full bg-black"></div>
              <NoResource
                resourceName="Ledger"
                onClick={handleOpenCreateSheet}
                pronoun="she"
              />
            </>
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
          title={getSheetTitle(sheetMode.mode, sheetMode.ledgersData, t)}
          description={getSheetDescription(sheetMode.mode, t)}
          buttonText={getSheetButtonText(sheetMode.mode, t)}
          data={sheetMode.ledgersData}
          onSubmit={handleSubmit}
        />
      </div>
    )
  }

  return (
    <div className="mt-10">
      {ledgers.isLoading ? getLoadingSkeleton() : getLedgersComponents()}
    </div>
  )
}

export default LedgersView
