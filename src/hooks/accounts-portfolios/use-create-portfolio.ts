import { useState } from "react"

export const useCreatePortfolio = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  const handleConfirmCreatePortfolio = async () => {
    setIsDialogOpen(false)
  }


  return {
    isDialogOpen,
    setIsDialogOpen,
    handleConfirmCreatePortfolio
  }
}