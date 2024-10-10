import { useState } from 'react'
import useCustomToast from '../use-custom-toast'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
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
    portfolio: PortfoliosEntity
  ) => {
    console.log('values', ledgerId, portfolio)
    try {
      await createPortfolio(
        'b36c9055-01cd-4232-8bed-d4dd2b826b1e',
        ledgerId,
        portfolio
      )
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
