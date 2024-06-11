export const getInstrumentsSheetInfo = (
  mode: string,
  instrumentsData: any | null,
  t: any
) => {
  const info = {
    create: {
      title: t('sheetCreate.title'),
      description: t('sheetCreate.description'),
      buttonText: t('sheetCreate.button')
    },
    edit: {
      title: `${t('sheetEdit.title')} ${instrumentsData?.name}`,
      description: t('sheetEdit.description'),
      buttonText: t('sheetEdit.button')
    },
    view: {
      title: `${t('sheetView.title')} ${instrumentsData?.name}`,
      description: t('sheetView.description'),
      buttonText: t('sheetView.button')
    }
  }

  return info[mode as keyof typeof info]
}
