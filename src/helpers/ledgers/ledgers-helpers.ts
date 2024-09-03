import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

export const getSheetInfo = (
  mode: string,
  ledgerData: LedgerEntity | null,
  t: any
) => {
  const info = {
    create: {
      title: t('sheetCreate.title'),
      description: t('sheetCreate.description'),
      buttonText: t('sheetCreate.button')
    },
    edit: {
      title: `${t('sheetEdit.title')} ${ledgerData?.name}`,
      description: t('sheetEdit.description'),
      buttonText: t('sheetEdit.button')
    },
    view: {
      title: `${t('sheetView.title')} ${ledgerData?.name}`,
      description: t('sheetView.description'),
      buttonText: t('sheetView.button')
    }
  }

  return info[mode as keyof typeof info]
}

export const getHelperTriggerTranslate = (t: any) => ({
  question: t('helperTrigger.question'),
  answer: t('helperTrigger.answer'),
  seeMore: t('helperTrigger.seeMore')
})

export const getListingTemplateTranslate = (t: any) => ({
  configureButton: t('listingTemplate.configureButton'),
  addButton: t('listingTemplate.addButton')
})
