import { useLedgers } from '@/utils/queries'
import { updateLedger } from '@/client/ledger-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { useTranslations } from 'next-intl'

export const useUpdateLedger = () => {
  const t = useTranslations('ledgers')
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
      showSuccess(t('toast.ledgerUpdated', { ledgerName: values.name }))
    } catch (error) {
      const err = error as Error
      showError(err.message)
    }
  }

  return updateLedgerData
}
