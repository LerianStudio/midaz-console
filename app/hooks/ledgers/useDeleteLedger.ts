'use client'

import { useState } from 'react'
import useCustomToast from '@/hooks/useCustomToast'
import { deleteLedger } from '@/client/ledgerClient'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
import { useTranslations } from 'next-intl'

export const useDeleteLedger = (refetch: () => void) => {
  const t = useTranslations('ledgers')
  const { showError, showSuccess } = useCustomToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLedgerForDeletion, setCurrentLedgerForDeletion] = useState<
    LedgerEntity | undefined
  >(undefined)

  const handleOpenDeleteSheet = (ledgerData: LedgerEntity) => {
    setCurrentLedgerForDeletion(ledgerData)
    setIsDialogOpen(true)
  }

  const deleteLedgerAndRefetch = async (ledgerId: string) => {
    await deleteLedger(ledgerId)
    await refetch()
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

  return {
    isDialogOpen,
    setIsDialogOpen,
    currentLedgerForDeletion,
    handleOpenDeleteSheet,
    handleConfirmDeleteLedger
  }
}
