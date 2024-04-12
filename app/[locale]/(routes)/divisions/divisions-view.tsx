'use client'

import { DivisionEntity } from '@/entities/DivisionEntity'
import { DataTable } from '@/components/DataTable'
import { DivisionsColumns } from '@/[locale]/(routes)/divisions/divisions-columns'
import { NoResource } from '@/components/NoResource'
import { useState } from 'react'
import { DialogDemo } from '@/components/Dialog'
import { useTranslations } from 'next-intl'
import { useDivisions } from '@/utils/queries'
import { Skeleton } from '@/components/ui/skeleton'
import {
  createDivision,
  deleteDivision,
  updateDivision
} from '@/client/divisionsClient'
import { SheetDemo } from '@/components/Sheet'
import { formSchema } from '@/[locale]/(routes)/divisions/divisions-form-schema'
import { getDivisionsFormFields } from '@/[locale]/(routes)/divisions/divisions-form-fields'
import { z } from 'zod'
import countriesJson from '@/contries.json'
import { toast } from '@/components/ui/use-toast'

export type DivisionsViewProps = {
  divisionsData?: DivisionEntity[]
}

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  divisionData: DivisionEntity | null
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

export default function DivisionsView({ divisionsData }: DivisionsViewProps) {
  const t = useTranslations('divisions')
  const [countries, setCountries] = useState<Country[]>(countriesJson)
  const [statesOptions, setStatesOptions] = useState<State[]>([])
  const formFields: any = getDivisionsFormFields(t)
  const divisions = useDivisions()

  const handleCountryChange = (selectedCountry: string) => {
    const currentCountry = countries.find(
      (country) => country.code2 === selectedCountry
    )
    const newStatesOptions = currentCountry?.states || []
    setStatesOptions(newStatesOptions)
  }

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    divisionData: null
  })

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', divisionData: null })
  }

  const handleOpenEditSheet = (divisionData: DivisionEntity) => {
    setSheetMode({ isOpen: true, mode: 'edit', divisionData: divisionData })
  }

  const handleOpenViewSheet = (divisionData: DivisionEntity) => {
    setSheetMode({ isOpen: true, mode: 'view', divisionData: divisionData })
  }

  const getSheetTitle = (
    mode: string,
    divisionData: DivisionEntity | null,
    t: any
  ) => {
    if (mode === 'create') {
      return t('sheetCreate.title')
    }

    if (mode === 'edit') {
      return `${t('sheetEdit.title')} ${divisionData?.doingBusinessAs || divisionData?.legalName}`
    }

    return `${t('sheetView.title')} ${divisionData?.doingBusinessAs || divisionData?.legalName}`
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

  const divisionsColumns = DivisionsColumns(
    {
      handleOpenEditSheet,
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDivisionForDeletion, setCurrentDivisionForDeletion] = useState<
    DivisionEntity | undefined
  >(undefined)

  function handleOpenDeleteSheet(divisionData: DivisionEntity) {
    setCurrentDivisionForDeletion(divisionData)
    setIsDialogOpen(true)
  }

  async function handleConfirmDeleteDivision() {
    if (currentDivisionForDeletion) {
      setIsDialogOpen(false)
      await deleteDivision(currentDivisionForDeletion.id)
      await divisions.refetch()
    }
  }

  function getLoadingSkeleton() {
    return <Skeleton className="h-[80px] w-full" />
  }

  const createDivisionData = async (values: z.infer<typeof formSchema>) => {
    try {
      await createDivision(values)
      await divisions.refetch()
    } catch (error: any) {
      console.error(error)
      showToastError(error.message)
    }
  }

  const updateDivisionData = async (
    id: string,
    values: z.infer<typeof formSchema>
  ) => {
    if (!sheetMode.divisionData || !sheetMode.divisionData.id) {
      showToastError('Division ID not found')
      return
    }
    try {
      await updateDivision(sheetMode.divisionData.id, values)
      await divisions.refetch()
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (sheetMode.mode === 'create') {
      await createDivisionData(values)
    }

    if (sheetMode.mode === 'edit') {
      await updateDivisionData(sheetMode.divisionData?.id as string, values)
    }
  }

  function getDivisionsComponents() {
    return (
      <div>
        {divisions.data && divisions.data.length > 0 && (
          <DataTable columns={divisionsColumns} data={divisions.data} />
        )}

        {!divisions.data ||
          (divisions.data.length === 0 && (
            <>
              <div className="h-[1px] w-full bg-black"></div>
              <NoResource
                resourceName="Division"
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
          doingBusinessAs={
            currentDivisionForDeletion?.doingBusinessAs ||
            currentDivisionForDeletion?.legalName
          }
          onDelete={handleConfirmDeleteDivision}
        />

        <SheetDemo
          open={sheetMode.isOpen}
          setOpen={(isOpen) => setSheetMode({ ...sheetMode, isOpen })}
          mode={sheetMode.mode}
          fields={formFields}
          formSchema={formSchema}
          title={getSheetTitle(sheetMode.mode, sheetMode.divisionData, t)}
          description={getSheetDescription(sheetMode.mode, t)}
          buttonText={getSheetButtonText(sheetMode.mode, t)}
          data={sheetMode.divisionData}
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
      {divisions.isLoading ? getLoadingSkeleton() : getDivisionsComponents()}
    </div>
  )
}
