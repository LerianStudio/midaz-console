'use client'

import { createLedger } from '@/client/ledgerClient'
import useCustomToast from '@/hooks/useCustomToast'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
import { useTranslations } from 'next-intl'
import { useEnhancedLedgers } from './useEnhancedLedgers'

export const useCreateLedger = () => {
  const t = useTranslations('ledgers')
  const { showSuccess, showError } = useCustomToast()
  const ledgers = useEnhancedLedgers()

  const createLedgerData = async (values: LedgerEntity) => {
    try {
      await createLedger(values)
      await ledgers.refetch()
      showSuccess(t('toast.ledgerCreated', { ledgerName: values.name }))
    } catch (error) {
      const err = error as Error
      console.error(err)
      showError(err.message)
    }
  }

  return createLedgerData
}
