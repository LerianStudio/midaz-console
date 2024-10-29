/**
 * TODO: This never had translations into the json file
 * @param mode
 * @param instrumentsData
 * @param intl
 */

export const getInstrumentsSheetInfo = (
  mode: string,
  instrumentsData: any | null,
  intl: any
) => {
  const info = {
    create: {
      title: intl.formatMessage({
        id: 'sheetCreate.title',
        defaultMessage: ''
      }),
      description: intl.formatMessage({
        id: 'sheetCreate.description',
        defaultMessage: ''
      }),
      buttonText: intl.formatMessage({
        id: 'sheetCreate.button',
        defaultMessage: ''
      })
    },
    edit: {
      title: intl.formatMessage(
        { id: 'sheetEdit.title', defaultMessage: '' },
        { assetName: instrumentsData?.name }
      ),
      description: intl.formatMessage({
        id: 'sheetEdit.description',
        defaultMessage: ''
      }),
      buttonText: intl.formatMessage({
        id: 'sheetEdit.button',
        defaultMessage: ''
      })
    },
    view: {
      title: intl.formatMessage(
        { id: 'sheetView.title', defaultMessage: '' },
        { assetName: instrumentsData?.name }
      ),
      description: intl.formatMessage({
        id: 'sheetView.description',
        defaultMessage: ''
      }),
      buttonText: intl.formatMessage({
        id: 'sheetView.button',
        defaultMessage: ''
      })
    }
  }

  return info[mode as keyof typeof info]
}
