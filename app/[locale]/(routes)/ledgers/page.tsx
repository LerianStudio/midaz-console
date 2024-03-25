'use client'

import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { PageTitle } from '@/components/PageTitle'
import { SheetDemo } from '@/components/Sheet'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { getLedgerColumns } from './columns'
import { DialogDemo } from '@/components/Dialog'
import { Ledger } from '@/types/LedgersType'
import { useTranslations } from 'next-intl'
import { useDivisions, useLedgers } from '@/utils/queries'
import { Skeleton } from '@/components/ui/skeleton'

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  ledgerData: Ledger | null
}

const profileFormFields = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'divisionName', label: 'Division' },
  { name: 'defaultTimezone', label: 'Fuso horário' },
  { name: 'defaultCurrency', label: 'Moeda padrão' }
]

const profileFormSchema = z.object({
  name: z.string(),
  divisionName: z.string(),
  defaultTimezone: z.string(),
  defaultCurrency: z.string()
})

const Page = () => {
  const t = useTranslations('ledgers')
  const ledgers = useLedgers()
  const divisions = useDivisions()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLedgerForDeletion, setCurrentLedgerForDeletion] =
    useState<Ledger | null>(null)

  const fieldsWithDivisionDropdown = useMemo(() => {
    const divisionOptions =
      divisions?.data?.map((division) => ({
        label: division.legalName,
        value: division.id.toString()
      })) || []
    return profileFormFields.map((field) => {
      if (field.name === 'divisionName') {
        return { ...field, options: divisionOptions }
      }
      return field
    })
  }, [divisions])

  const enhancedLedgerData = useMemo(() => {
    if (!ledgers || !divisions) return []
    const divisionMap = new Map(
      divisions?.data?.map((division) => [division.id, division])
    )
    return ledgers?.data?.map((ledger: Ledger) => ({
      ...ledger,
      divisionName: divisionMap.get(ledger.divisionId)?.legalName || '-'
    }))
  }, [ledgers, divisions])

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    ledgerData: null
  })

  const isCreateMode = sheetMode.mode === 'create'
  const isEditMode = sheetMode.mode === 'edit'

  const { toast } = useToast()

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', ledgerData: null })
  }

  const handleOpenEditSheet = (ledgerData: Ledger) => {
    setSheetMode({ isOpen: true, mode: 'edit', ledgerData: ledgerData })
  }

  const handleOpenViewSheet = (ledgerData: Ledger) => {
    setSheetMode({ isOpen: true, mode: 'view', ledgerData: ledgerData })
  }

  const handleDeleteLedger = (ledgerData: Ledger) => {
    setCurrentLedgerForDeletion(ledgerData)
    setIsDialogOpen(true)
  }

  const handleConfirmDeleteLedger = async () => {
    try {
      console.log('Ledger deleted')
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete ledger', error)
    }

    return toast({
      description: 'Ledger deleted',
      variant: 'success'
    })
  }

  const handleClickId = (id: string) => {
    navigator.clipboard.writeText(id)

    return toast({
      description: 'O id foi copiado para sua área de transferência.'
    })
  }

  const handleClickLegalDocument = (legalDocument: string) => {
    navigator.clipboard.writeText(legalDocument)

    return toast({
      description:
        'O número do documento foi copiado para sua área de transferência.'
    })
  }

  const columns = getLedgerColumns({
    handleOpenEditSheet,
    handleOpenViewSheet,
    handleClickId,
    handleClickLegalDocument,
    handleDeleteLedger
  })

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-10">
        {ledgers.isLoading && <Skeleton className="h-[80px] w-full" />}

        {ledgers.data && ledgers.data.length > 0 && (
          <DataTable columns={columns} data={enhancedLedgerData} />
        )}

        {!ledgers.data ||
          (ledgers.data.length === 0 && (
            <>
              <div className="h-[1px] w-full bg-black"></div>
              <NoResource
                resourceName="Ledger"
                onClick={handleOpenCreateSheet}
                pronoun="he"
              />
            </>
          ))}

        <DialogDemo
          open={isDialogOpen}
          setOpen={() => setIsDialogOpen(false)}
          title="Você tem certeza?"
          subtitle="Essa ação é irreversível. Isso vai inativar para sempre a sua
              Ledger"
          deleteButtonText="Apagar Ledger"
          ledgerName={currentLedgerForDeletion?.name}
          onDelete={handleConfirmDeleteLedger}
        />

        <SheetDemo
          open={sheetMode.isOpen}
          setOpen={(isOpen) => setSheetMode({ ...sheetMode, isOpen })}
          mode={sheetMode.mode}
          fields={fieldsWithDivisionDropdown}
          formSchema={profileFormSchema}
          title={
            isCreateMode
              ? 'Criar ledger'
              : isEditMode
                ? `Editar Ledger ${sheetMode.ledgerData?.name}`
                : `Ledger ${sheetMode.ledgerData?.name}`
          }
          description={
            isCreateMode
              ? 'Preencha os dados da Ledger que você deseja criar.'
              : isEditMode
                ? 'Edite o que desejar e depois clique em “Salvar”. '
                : 'Abaixo estão listados os dados do seu Ledger.'
          }
          data={sheetMode.ledgerData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Page
