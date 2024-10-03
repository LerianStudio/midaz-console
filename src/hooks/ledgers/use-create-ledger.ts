'use client'

import { createLedger } from '@/client/ledger-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useEnhancedLedgers } from './use-enhanced-ledgers'
import { useIntl } from 'react-intl'

export const useCreateLedger = () => {
  const intl = useIntl()
  const { showSuccess, showError } = useCustomToast()
  const ledgers = useEnhancedLedgers()

  const createLedgerData = async (values: LedgerEntity) => {
    console.log('values', values)
    try {
      await createLedger(values)
      await ledgers.refetch()
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.ledgerCreated',
            defaultMessage: 'Ledger {ledgerName} created successfully'
          },
          { ledgerName: values.name }
        )
      )
    } catch (error) {
      const err = error as Error
      console.error(err)
      showError(err.message)
    }
  }

  return createLedgerData
}
