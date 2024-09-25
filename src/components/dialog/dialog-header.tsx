import { DialogHeader as BaseDialogHeader } from '@/components/ui/dialog'
import DialogTitle from './dialog-title'
import DialogDescription from './dialog-description'
import { useIntl } from 'react-intl'

type DialogHeaderProps = {
  ledgerName: string
}

const DialogHeader = ({ ledgerName }: DialogHeaderProps) => {
  const intl = useIntl()

  return (
    <BaseDialogHeader className="flex gap-4">
      <DialogTitle
        title={intl.formatMessage({
          id: 'ledgers.dialog.title',
          defaultMessage: 'Are you sure?'
        })}
      />
      <DialogDescription
        subtitle={intl.formatMessage({
          id: 'ledgers.dialog.subtitle',
          defaultMessage:
            'This action is irreversible. This will deactivate your Ledger forever'
        })}
        ledgerName={ledgerName}
      />
    </BaseDialogHeader>
  )
}

export default DialogHeader
