import { useState } from 'react'
import useCustomToast from '../use-custom-toast'
import { createPortfolio } from '@/client/ledger-client'
import { useTranslations } from 'next-intl'

export const useCreatePortfolio = () => {
  // const t = useTranslations('ledgers')
  const { showSuccess, showError } = useCustomToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirmCreatePortfolio = async () => {
    setIsDialogOpen(false)
  }

  const handleCreatePortfolio = async (ledgerId: string, portfolio: any) => {
    try {
      await createPortfolio(ledgerId, portfolio)
      showSuccess('Portfolio created successfully')
      // t('toast.portfolioCreated', { portfolioName: portfolio.name })
      // )
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
