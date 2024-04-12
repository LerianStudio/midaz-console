'use client'

import { DivisionEntity } from '@/entities/DivisionEntity'
import { LedgerEntity } from '@/entities/LedgerEntity'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import countriesJson from '@/contries.json'
import { useDivisions, useLedgers } from '@/utils/queries'
import { getLedgersFormFields } from '@/[locale]/(routes)/ledgers/ledgers-form-fields'
import { LedgersColumns } from '@/[locale]/(routes)/ledgers/ledgers-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { z } from 'zod'
import { formSchema } from '@/[locale]/(routes)/ledgers/ledgers-form-schema'
import { createLedger, deleteLedger, updateLedger } from '@/client/ledgerClient'
import { toast } from '@/components/ui/use-toast'
import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { DialogDemo } from '@/components/Dialog'
import { SheetDemo } from '@/components/Sheet'

export type LedgersViewProps = {
  ledgersData?: LedgerEntity[]
}

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  ledgersData: LedgerEntity | null
}

export type Country = {
  code2: string
  name: string
  states: State[]
}

export type State = {
  code: string
  name: string
}

export default function LedgersView() {
  const t = useTranslations('ledgers')
  const [countries, setCountries] = useState<Country[]>(countriesJson)
  const [statesOptions, setStatesOptions] = useState<State[]>([])
  const formFields: any = getLedgersFormFields(t)
  const divisions = useDivisions()
  const ledgers = useLedgers()

  const handleCountryChange = (selectedCountry: string) => {
    const currentCountry = countries.find(
      (country) => country.code2 === selectedCountry
    )
    const newStatesOptions = currentCountry?.states || []
    setStatesOptions(newStatesOptions)
  }

  const fieldsWithDivisionDropdown = useMemo(() => {
    const divisionOptions =
      divisions?.data?.map((division: DivisionEntity) => ({
        label: division.legalName,
        value: division.id.toString()
      })) || []
    return formFields.map((field: any) => {
      if (field.name === 'divisionName') {
        return { ...field, options: divisionOptions }
      }
      return field
    })
  }, [divisions])

  const enhancedLedgerData = useMemo(() => {
    if (!ledgers || !divisions) return []
    const divisionMap: Map<string, DivisionEntity> = new Map(
      divisions?.data?.map((division: DivisionEntity) => [
        division.id,
        division
      ])
    )
    return ledgers?.data?.map((ledger: LedgerEntity) => ({
      ...ledger,
      divisionName: divisionMap.get(ledger.divisionId)?.legalName || '-'
    }))
  }, [ledgers, divisions])

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    ledgersData: null
  })

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', ledgersData: null })
  }

  const handleOpenEditSheet = (ledgerData: LedgerEntity) => {
    setSheetMode({ isOpen: true, mode: 'edit', ledgersData: ledgerData })
  }

  const handleOpenViewSheet = (ledgerData: LedgerEntity) => {
    setSheetMode({ isOpen: true, mode: 'view', ledgersData: ledgerData })
  }

  const getSheetTitle = (
    mode: string,
    ledgerData: LedgerEntity | null,
    t: any
  ) => {
    if (mode === 'create') {
      return t('sheetCreate.title')
    }

    if (mode === 'edit') {
      return `${t('sheetEdit.title')} ${ledgerData?.name}`
    }

    return `${t('sheetView.title')} ${ledgerData?.name}`
  }

  const getSheetDescription = (mode: string, t: any) => {
    if (mode === 'create') {
      return t('sheetCreate.description')
    }

    if (mode === 'edit') {
      return t('sheetEdit.description')
    }

    return t('sheetView.description')
  }

  const getSheetButtonText = (mode: string, t: any) => {
    if (mode === 'create') {
      return t('sheetCreate.button')
    }

    if (mode === 'edit') {
      return t('sheetEdit.button')
    }

    return t('sheetView.button')
  }

  const ledgersColumns = LedgersColumns(
    {
      handleOpenEditSheet,
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLedgerForDeletion, setCurrentLedgerForDeletion] = useState<
    LedgerEntity | undefined
  >(undefined)

  function handleOpenDeleteSheet(ledgerData: LedgerEntity) {
    console.log('handleOpenDeleteSheet', ledgerData)
    setCurrentLedgerForDeletion(ledgerData)
    setIsDialogOpen(true)
  }

  async function handleConfirmDeleteLedger() {
    try {
      if (!currentLedgerForDeletion) {
        showToastError('No ledger selected for deletion')
        return
      }

      setIsDialogOpen(false)
      await deleteLedger(currentLedgerForDeletion.id)
      await ledgers.refetch()
    } catch (error: any) {
      console.error(error)
      showToastError(error.message)
    }
  }

  const createLedgerData = async (values: z.infer<typeof formSchema>) => {
    try {
      await createLedger(values as any)
      await ledgers.refetch()
    } catch (error: any) {
      console.error(error)
      showToastError(error.message)
    }
  }

  const updateLedgerData = async (
    id: string,
    values: z.infer<typeof formSchema>
  ) => {
    if (!sheetMode.ledgersData || !sheetMode.ledgersData.id) {
      showToastError('Division ID not found')
      return
    }
    try {
      await updateLedger(sheetMode.ledgersData.id, values as any)
      await ledgers.refetch()
    } catch (error: any) {
      console.error(error)
      showToastError(error.message)
    }
  }

  const showToastError = (errorMessage: any) => {
    toast({
      description: errorMessage,
      itemType: 'error',
      title: 'Error'
    })
  }

  function getLoadingSkeleton() {
    return <Skeleton className="h-[80px] w-full" />
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('handleSubmit', values)
    if (sheetMode.mode === 'create') {
      await createLedgerData(values)
    }

    if (sheetMode.mode === 'edit') {
      await updateLedgerData(sheetMode.ledgersData?.id as string, values)
    }
  }

  function getLedgersComponents() {
    return (
      <div>
        {ledgers.data && ledgers.data.length > 0 && (
          <DataTable columns={ledgersColumns} data={enhancedLedgerData} />
        )}

        {!ledgers.data ||
          (ledgers.data.length === 0 && (
            <>
              <div className="h-[1px] w-full bg-black"></div>
              <NoResource
                resourceName="Ledger"
                onClick={handleOpenCreateSheet}
                pronoun="she"
              />
            </>
          ))}

        <DialogDemo
          open={isDialogOpen}
          setOpen={() => setIsDialogOpen(false)}
          title={t('dialog.title')}
          subtitle={t('dialog.subtitle')}
          deleteButtonText={t('dialog.deleteBtnText')}
          doingBusinessAs={currentLedgerForDeletion?.name}
          onDelete={handleConfirmDeleteLedger}
        />

        <SheetDemo
          open={sheetMode.isOpen}
          setOpen={(isOpen) => setSheetMode({ ...sheetMode, isOpen })}
          mode={sheetMode.mode}
          fields={fieldsWithDivisionDropdown}
          formSchema={formSchema}
          title={getSheetTitle(sheetMode.mode, sheetMode.ledgersData, t)}
          description={getSheetDescription(sheetMode.mode, t)}
          buttonText={getSheetButtonText(sheetMode.mode, t)}
          data={sheetMode.ledgersData}
          onSubmit={handleSubmit}
          countries={countries}
          statesOptions={statesOptions}
          onCountryChange={handleCountryChange}
        ></SheetDemo>
      </div>
    )
  }

  return (
    <div className="mt-10">
      {divisions.isLoading ? getLoadingSkeleton() : getLedgersComponents()}
    </div>
  )
}
