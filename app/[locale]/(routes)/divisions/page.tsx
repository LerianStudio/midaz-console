'use client'

import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { PageTitle } from '@/components/PageTitle'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { getDivisionColumns } from './columns'
import { DialogDemo } from '@/components/Dialog'
import { useTranslations } from 'next-intl'
import { DivisionType } from '@/types/DivisionsType'
import { useDivisions } from '@/utils/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from './formSchema'
import { createFormFields } from './formFields'
import { SheetDemo } from '@/components/Sheet'

export type Country = {
  code2: string
  name: string
  states: State[]
}

export type State = {
  code: string
  name: string
}

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  divisionData: DivisionType | null
}

const Page = () => {
  const divisions = useDivisions()

  const t = useTranslations('divisions')
  const [countries, setCountries] = useState<Country[]>([])
  const [statesOptions, setStatesOptions] = useState<State[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDivisionForDeletion, setCurrentDivisionForDeletion] =
    useState<DivisionType | null>(null)

  useEffect(() => {
    fetch('../../countries.json')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error loading countries data:', error))
  }, [])

  const handleCountryChange = (selectedCountry: string) => {
    const currentCountry = countries.find(
      (country) => country.code2 === selectedCountry
    )
    const newStatesOptions = currentCountry?.states || []
    setStatesOptions(newStatesOptions)
  }

  const formFields = createFormFields(t)

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    divisionData: null
  })

  const { toast } = useToast()

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', divisionData: null })
  }

  const handleOpenEditSheet = (divisionData: DivisionType) => {
    setSheetMode({ isOpen: true, mode: 'edit', divisionData: divisionData })
  }

  const handleOpenViewSheet = (divisionData: DivisionType) => {
    setSheetMode({ isOpen: true, mode: 'view', divisionData: divisionData })
  }

  const handleDeleteDivision = (divisionData: DivisionType) => {
    setCurrentDivisionForDeletion(divisionData)
    setIsDialogOpen(true)
  }

  const handleConfirmDeleteDivision = async () => {
    try {
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete division', error)
    }

    return toast({
      description: t('toast.divisionDeleted'),
      variant: 'success'
    })
  }

  const handleClickId = (id: string) => {
    navigator.clipboard.writeText(id)

    return toast({
      description: t('toast.copyId')
    })
  }

  const handleClickLegalDocument = (legalDocument: string) => {
    navigator.clipboard.writeText(legalDocument)

    return toast({
      description: t('toast.copyLegalDocument')
    })
  }

  const columns = getDivisionColumns({
    handleOpenEditSheet,
    handleOpenViewSheet,
    handleClickId,
    handleClickLegalDocument,
    handleDeleteDivision
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const getSheetTitle = (
    mode: string,
    divisionData: DivisionType | null,
    t: any
  ) => {
    if (mode === 'create') return t('sheetCreate.title')
    if (mode === 'edit')
      return `${t('sheetEdit.title')} ${divisionData?.doingBusinessAs || divisionData?.legalName}`
    return `${t('sheetView.title')} ${divisionData?.doingBusinessAs || divisionData?.legalName}`
  }

  const getSheetDescription = (mode: string, t: any) => {
    if (mode === 'create') return t('sheetCreate.description')
    if (mode === 'edit') return t('sheetEdit.description')
    return t('sheetView.description')
  }

  const getSheetButtonText = (mode: string, t: any) => {
    if (mode === 'create') return t('sheetCreate.button')
    if (mode === 'edit') return t('sheetEdit.button')
    return t('sheetView.button')
  }

  return (
    <div>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-10">
        {divisions.isLoading && <Skeleton className="h-[80px] w-full" />}

        {divisions.data && divisions.data.length > 0 && (
          <DataTable columns={columns} data={divisions.data} />
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
        />
      </div>
    </div>
  )
}

export default Page
