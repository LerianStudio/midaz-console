'use client'

import { useLedgers } from '@/utils/queries'
import { updateLedger } from '@/client/ledger-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useIntl } from 'react-intl'

export const useUpdateLedger = () => {
  const intl = useIntl()
  const { showSuccess, showError } = useCustomToast()
  const ledgers = useLedgers()

  const updateLedgerData = async (id: string, values: LedgerEntity) => {
    if (!id) {
      showError('Organization ID not found')
      return
    }

    try {
      await updateLedger(id, values)
      await ledgers.refetch()
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.ledgerUpdated',
            defaultMessage: 'Ledger {ledgerName} updated successfully'
          },
          { ledgerName: values.name }
        )
      )
    } catch (error) {
      const err = error as Error
      showError(err.message)
    }
  }

  return updateLedgerData
}
