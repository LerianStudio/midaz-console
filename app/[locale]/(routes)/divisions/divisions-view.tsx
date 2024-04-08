'use client'

import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { DataTable } from '@/components/DataTable'
import { getDivisionsColumns } from '@/[locale]/(routes)/divisions/divisions-columns'
import { NoResource } from '@/components/NoResource'
import DivisionsForm, { DivisionsFormProps } from '@/[locale]/(routes)/divisions/divisions-form'
import { useState } from 'react'
import { DialogDemo } from '@/components/Dialog'
import { useTranslations } from 'next-intl'


export type DivisionsViewProps = {
  divisionsData?: DivisionEntity[],
}

export default function DivisionsView({ divisionsData }: DivisionsViewProps) {
  const t = useTranslations('divisions')
  
  /*
    Form, state props and events
   */
  
  const divisionsColumns = getDivisionsColumns({
    handlerOpenSheet,
    handleOpenDeleteSheet
  })
  
  const setFormOpen = (open: boolean) => {
    setDivisionsFormProps({ ...divisionsFormProps, isOpen: open, isEditable: false })
  }
  
  const [divisionsFormProps, setDivisionsFormProps] = useState<DivisionsFormProps>({
    isOpen: false,
    divisionData: undefined,
    setOpen: setFormOpen,
    isEditable: true
  })
  
  function handlerOpenSheet(divisionData: DivisionEntity, isEditable: boolean = true) {
    setDivisionsFormProps(
      {
        ...divisionsFormProps,
        isOpen: true,
        isEditable: isEditable,
        divisionData
      })
  }
  
  function handleOpenDeleteSheet(divisionData: DivisionEntity) {
    setCurrentDivisionForDeletion(divisionData)
    setIsDialogOpen(true)
  }
  
  
  /*
    Dialog state, props and events
  */
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDivisionForDeletion, setCurrentDivisionForDeletion] = useState<DivisionEntity | undefined>(undefined)
  
  
  function handleConfirmDeleteDivision() {
    console.log('delete')
  }
  
  
  const handleSubmit = (values: any) => {
    console.log('teste')
  }
  
  return (
    <div className="mt-10">
      {divisionsData && divisionsData.length > 0 && (
        <DataTable columns={divisionsColumns} data={divisionsData} />
      )}
      
      {!divisionsData ||
        (divisionsData.length === 0 && (
          <>
            <div className="h-[1px] w-full bg-black"></div>
            <NoResource
              resourceName="Division"
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
      
      <DivisionsForm {...divisionsFormProps} />
    
    </div>
  )
}
