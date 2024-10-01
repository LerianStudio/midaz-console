import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

export const getSheetInfo = (
  mode: string,
  ledgerData: LedgerEntity | null,
  intl: any
) => {
  const info = {
    create: {
      title: intl.formatMessage({
        id: 'ledgers.sheetCreate.title',
        defaultMessage: 'New Ledger'
      }),
      description: intl.formatMessage({
        id: 'ledgers.sheetCreate.description',
        defaultMessage: 'Fill in the data of the Ledger you wish to create.'
      }),
      buttonText: intl.formatMessage({
        id: 'common.create',
        defaultMessage: 'Create'
      })
    },
    edit: {
      title: intl.formatMessage(
        {
          id: 'ledgers.sheetEdit.title',
          defaultMessage: 'Edit Ledger {ledger}'
        },
        { ledger: ledgerData?.name }
      ),
      description: intl.formatMessage({
        id: 'ledgers.sheetEdit.description',
        defaultMessage: 'Edit as desired and then click “Save”.'
      }),
      buttonText: intl.formatMessage({
        id: 'common.save',
        defaultMessage: 'Save'
      })
    },
    view: {
      title: intl.formatMessage(
        {
          id: 'ledgers.sheetView.title',
          defaultMessage: 'Ledger {ledger}'
        },
        { ledger: ledgerData?.name }
      ),
      description: intl.formatMessage({
        id: 'ledgers.sheetView.description',
        defaultMessage: 'Below are listed the data of your Ledger.'
      }),
      buttonText: intl.formatMessage({
        id: 'common.close',
        defaultMessage: 'Close'
      })
    }
  }

  return info[mode as keyof typeof info]
}
