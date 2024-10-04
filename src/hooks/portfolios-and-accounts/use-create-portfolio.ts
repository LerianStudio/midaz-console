import { useState } from 'react'
import useCustomToast from '../use-custom-toast'
import { LedgerPortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import { createPortfolio } from '@/client/portfolios-client'

export const useCreatePortfolio = () => {
  // const t = useTranslations('ledgers')
  const { showSuccess, showError } = useCustomToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirmCreatePortfolio = async () => {
    setIsDialogOpen(false)
  }

  const handleCreatePortfolio = async (
    ledgerId: string,
    portfolio: LedgerPortfoliosEntity
  ) => {
    console.log('values', ledgerId, portfolio)
    try {
      await createPortfolio(ledgerId, portfolio)
      showSuccess('Portfolio created successfully')
    } catch (error) {
      const err = error as Error
      console.error(err)
      showError(err.message)
    }
  }

  return {
    isDialogOpen,
    setIsDialogOpen,
    handleConfirmCreatePortfolio,
    handleCreatePortfolio
  }
}
