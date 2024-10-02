import { Card } from '@/components/card'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { LedgerPortfoliosEntity } from '@/core/domain/entities/ledger-entity'
import { getSheetInfo } from '@/helpers/ledgers/ledgers-helpers'
import { SheetContainer } from '@/components/sheet/sheet-container'
import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'
import { getPortfoliosFormField } from './accounts-and-portfolios-form-fields'
import { useCreatePortfolio } from '@/hooks/portfolios-and-accounts/use-create-portfolio'
import { useLedgers, usePorfolios } from '@/utils/queries'
import { DataTable } from '@/components/data-table'
import { getLedgersColumns } from '../../ledgers-columns'
import { useEnhancedLedgers } from '@/hooks/ledgers/use-enhanced-ledgers'
import { useDeleteLedger } from '@/hooks/ledgers/use-delete-ledger'
import { NoResource } from '@/components/no-resource'
import { createPortfolio } from '@/client/ledger-client'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PortfolioSheet } from './portfolios-sheet'
import { AccountsContent } from './accounts-content'
import { PortfoliosContent } from './portfolios-content'

interface PortfolioCardProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  isButtonDisabled?: boolean
  showPlusIcon?: boolean
}

const PortfolioCard = ({
  title,
  description,
  buttonText,
  onClick,
  isButtonDisabled,
  showPlusIcon = false
}: PortfolioCardProps) => (
  <Card.Root>
    <div className="flex items-center justify-between">
      <div>
        <Card.Header title={title} className="text-lg capitalize" />
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        className="flex items-center rounded-md px-4 py-2 shadow transition"
        disabled={isButtonDisabled}
      >
        <span>{buttonText}</span>
        {showPlusIcon && <PlusIcon className="ml-2 h-5 w-5" />}
      </Button>
    </div>
  </Card.Root>
)

export const AccountsPortfoliosTabContent = () => {
  const ledgers = useLedgers()
  const {
    sheetMode,
    handleOpenCreateSheet,
    handleOpenViewSheet,
    setSheetMode
  } = useSheetMode()

  const { isDialogOpen, setIsDialogOpen } = useCreatePortfolio()

  const { id } = useParams()
  const ledgerId = Array.isArray(id) ? id[0] : id

  const { data } = usePorfolios(ledgerId)

  console.log(data)

  const {
    currentLedgerForDeletion,
    handleOpenDeleteSheet,
    handleConfirmDeleteLedger
  } = useDeleteLedger(ledgers.refetch)

  const handleSubmit = async (values: LedgerPortfoliosEntity) => {
    console.log(values)
    setIsDialogOpen(true)

    console.log(sheetMode.mode)

    if (sheetMode.mode === 'create') {
      await createPortfolio(ledgerId, values)
    }
  }

  // const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, t)

  // const sheetProps = React.useMemo(
  //   () => ({
  //     open: sheetMode.isOpen,
  //     setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
  //     fields: formFields,
  //     formSchema: formSchemaPortfolio,
  //     sheetInfo: sheetInfo,
  //     onSubmit: handleSubmit,
  //     mode: sheetMode.mode,
  //     data: sheetMode.ledgersData
  //   }),
  //   [sheetMode, formFields, sheetInfo, handleSubmit]
  // )

  // const ledgersColumns = getLedgersColumns(
  //   {
  //     handleOpenViewSheet,
  //     handleOpenDeleteSheet
  //   },
  //   t
  // )

  const enhancedLedgers = useEnhancedLedgers()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PortfoliosContent />
      <AccountsContent />
    </div>
  )
}
