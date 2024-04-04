'use client'

import { DataTable } from '@/components/DataTable'
import { NoResource } from '@/components/NoResource'
import { PageTitle } from '@/components/PageTitle'
import { SheetDemo } from '@/components/Sheet'
import { useState } from 'react'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { getDivisionColumns } from './columns'
import { DialogDemo } from '@/components/Dialog'
import { useTranslations } from 'next-intl'
import { DivisionType } from '@/types/DivisionsType'
import { useDivisions } from '@/utils/queries'
import { Skeleton } from '@/components/ui/skeleton'

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  divisionData: DivisionType | null
}

const profileFormSchema = z.object({
  legalName: z.string(),
  doingBusinessAs: z.string(),
  legalDocument: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    zipCode: z.string()
  }),
  defaultTimezone: z.string(),
  defaultCurrency: z.string()
})

const Page = () => {
  const divisions = useDivisions()

  const t = useTranslations('divisions')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDivisionForDeletion, setCurrentDivisionForDeletion] =
    useState<DivisionType | null>(null)

  const profileFormFields = [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'legalName',
      label: t('formFields.legalName.name'),
      placeholder: t('formFields.legalName.placeholder')
    },
    {
      name: 'doingBusinessAs',
      label: t('formFields.doingBusinessAs.name'),
      placeholder: t('formFields.doingBusinessAs.placeholder')
    },
    {
      name: 'legalDocument',
      label: t('formFields.legalDocument.name'),
      placeholder: t('formFields.legalDocument.placeholder')
    },
    {
      name: 'address.line1',
      label: t('formFields.address.name'),
      placeholder: t('formFields.address.placeholder')
    },
    {
      name: 'address.line2',
      label: t('formFields.address2.name'),
      placeholder: t('formFields.address2.placeholder')
    },
    {
      name: 'address.country',
      label: t('formFields.country.name'),
      placeholder: t('formFields.country.placeholder')
    },
    {
      name: 'address.state',
      label: t('formFields.state.name'),
      placeholder: t('formFields.state.placeholder')
    },
    {
      name: 'address.city',
      label: t('formFields.city.name'),
      placeholder: t('formFields.city.placeholder')
    },
    {
      name: 'address.zipCode',
      label: t('formFields.zipCode.name'),
      placeholder: t('formFields.zipCode.placeholder')
    },
    {
      name: 'defaultTimezone',
      label: t('formFields.defaultTimezone.name'),
      placeholder: t('formFields.defaultTimezone.placeholder')
    },
    {
      name: 'defaultCurrency',
      label: t('formFields.defaultCurrency.name'),
      placeholder: t('formFields.defaultCurrency.placeholder')
    }
  ]

  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    divisionData: null
  })

  const isCreateMode = sheetMode.mode === 'create'
  const isEditMode = sheetMode.mode === 'edit'

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

  const handleSubmit = (values: any) => {
    console.log(values)
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
          fields={profileFormFields}
          formSchema={profileFormSchema}
          title={
            isCreateMode
              ? t('sheetCreate.title')
              : isEditMode
                ? `${t('sheetEdit.title')} ${sheetMode.divisionData?.doingBusinessAs || sheetMode.divisionData?.legalName}`
                : `${t('sheetView.title')} ${sheetMode.divisionData?.doingBusinessAs || sheetMode.divisionData?.legalName}`
          }
          description={
            isCreateMode
              ? t('sheetCreate.description')
              : isEditMode
                ? t('sheetEdit.description')
                : t('sheetView.description')
          }
          buttonText={
            isCreateMode
              ? t('sheetCreate.button')
              : isEditMode
                ? t('sheetEdit.button')
                : t('sheetView.button')
          }
          data={sheetMode.divisionData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Page
