'use client'

import { z } from 'zod'
import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { getDivisionsFormSchema } from '@/[locale]/(routes)/divisions/divisions-form-schema'
import { useTranslations } from 'next-intl'
import { SheetDemo } from '@/components/Sheet'
import { DivisionFieldsType, getDivisionsFormFields } from '@/[locale]/(routes)/divisions/divisions-form-fields'

export type DivisionsFormProps = {
  divisionData?: DivisionEntity
  setOpen: (open: boolean) => void
  isOpen: boolean
  submit?: (divisionData: DivisionEntity) => void
  isEditable: boolean
}

type PageConfig = {
  mode: string
  title: string
  description: string
  buttonText: string
}

export default function DivisionsForm(props: DivisionsFormProps) {
  const t = useTranslations('divisions')
  
  const divisionFormSchema = getDivisionsFormSchema()
  const divisionsFormFields: DivisionFieldsType[] = getDivisionsFormFields(useTranslations('divisions'))
  
  function onSubmit(values: z.infer<typeof divisionFormSchema>) {
    console.log(values)
  }
  
  function getEditConfig(): PageConfig {
    return {
      mode: 'edit',
      title: t('sheetEdit.title'),
      description: t('sheetEdit.description'),
      buttonText: t('sheetEdit.button')
    }
  }
  
  function getCreateConfig(): PageConfig {
    return {
      mode: 'create',
      title: t('sheetCreate.title'),
      description: t('sheetCreate.description'),
      buttonText: t('sheetCreate.button')
    }
  }
  
  function getViewConfig(): PageConfig {
    return {
      mode: 'view',
      title: t('sheetView.title'),
      description: t('sheetView.description'),
      buttonText: t('sheetView.button')
    }
  }
  
  function getPageConfig(): PageConfig {
    if (!props.divisionData) {
      return getCreateConfig()
    } else if (props.isEditable) {
      return getEditConfig()
    } else {
      return getViewConfig()
    }
  }
  
  const pageConfig = getPageConfig()
  
  return (
      <SheetDemo
        open={props.isOpen}
        setOpen={
          (openStatus) => props.setOpen(openStatus)
        }
        fields={divisionsFormFields}
        formSchema={divisionFormSchema}
        mode={pageConfig.mode}
        title={pageConfig.title}
        description={pageConfig.description}
        buttonText={pageConfig.buttonText}
        data={props.divisionData}
        onSubmit={onSubmit}>
      
      </SheetDemo>
  )
}