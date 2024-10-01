'use client'

import { useState } from 'react'
import useCustomToast from '@/hooks/use-custom-toast'
import { deleteLedger } from '@/client/ledger-client'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useIntl } from 'react-intl'

export const useDeleteLedger = (refetch: () => void) => {
  const intl = useIntl()
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
      showError(
        intl.formatMessage({
          id: 'ledgers.toast.ledgerNotFound',
          defaultMessage: 'No ledger selected for deletion'
        })
      )
      return
    }

    try {
      setIsDialogOpen(false)
      await deleteLedgerAndRefetch(currentLedgerForDeletion.id)
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.ledgerDeleted',
            defaultMessage: 'Ledger {ledgerName} deleted'
          },
          { ledgerName: currentLedgerForDeletion.name }
        )
      )
    } catch (error) {
      const err = error as Error
      showError(
        intl.formatMessage(
          {
            id: 'ledgers.toast.ledgerDeleteFailed',
            defaultMessage: 'Failed to delete ledger'
          },
          { message: err.message }
        )
      )
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
