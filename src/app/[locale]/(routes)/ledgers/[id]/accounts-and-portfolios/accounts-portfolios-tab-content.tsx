import { Card } from '@/components/card'
import { Button } from '@/components/ui/button/button'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { LedgerPortfoliosEntity } from '@/core/domain/entities/ledger-entity'
import { getSheetInfo } from '@/helpers/ledgers/ledgers-helpers'
import { SheetContainer } from '@/components/sheet/sheet-container'
import { Dialog } from '@/components/dialog'
import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'
import { getPortfoliosFormField } from './accounts-and-portfolios-form-fields'
import { useCreatePortfolio } from '@/hooks/accounts-portfolios/use-create-portfolio'
import { useLedgers, usePorfolios } from '@/utils/queries'
import { DataTable } from '@/components/data-table'
import { getLedgersColumns } from '../../ledgers-columns'
import { useEnhancedLedgers } from '@/hooks/ledgers/use-enhanced-ledgers'
import { useDeleteLedger } from '@/hooks/ledgers/use-delete-ledger'
import { NoResource } from '@/components/no-resource'
import { createPortfolio } from '@/client/ledger-client'
import { useParams } from 'next/navigation'

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
  const t = useTranslations('ledgers')
  const formFields: any = getPortfoliosFormField(t)
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

  const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, t)

  const sheetProps = React.useMemo(
    () => ({
      open: sheetMode.isOpen,
      setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
      fields: formFields,
      formSchema: formSchemaPortfolio,
      sheetInfo: sheetInfo,
      onSubmit: handleSubmit,
      mode: sheetMode.mode,
      data: sheetMode.ledgersData
    }),
    [sheetMode, formFields, sheetInfo, handleSubmit]
  )

  const ledgersColumns = getLedgersColumns(
    {
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const enhancedLedgers = useEnhancedLedgers()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card.Root>
        <div className="flex items-center justify-between">
          <div>
            <Card.Header title="Portfólios" className="text-lg capitalize" />
            <p className="mt-2 text-sm text-gray-500">
              Nenhum portfólio encontrado.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleOpenCreateSheet()}
            className="flex items-center rounded-md px-4 py-2 shadow transition"
          >
            <span>Criar o primeiro portfólio</span>

            <PlusIcon className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Content>
            <Dialog.Header ledgerName={'blablabla'} />
            <Dialog.Footer
              onDismiss={() => setIsDialogOpen(false)}
              onDelete={() => console.log('deletar')}
            />
          </Dialog.Content>
        </Dialog.Root>

        <SheetContainer {...sheetProps} />
      </Card.Root>

      <Card.Root>
        <div className="flex items-center justify-between">
          <div>
            <Card.Header title="Contas" className="text-lg capitalize" />
            <p className="mt-2 text-sm text-gray-500">
              Nenhum portfólio encontrado.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log('Criar')}
            className="gray flex items-center rounded-md px-4 py-2 shadow transition"
            disabled={true}
          >
            <span>Você precisa de um portfólio para criar contas</span>
          </Button>
        </div>
      </Card.Root>
    </div>
  )
}
