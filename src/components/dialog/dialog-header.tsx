import { DialogHeader as BaseDialogHeader } from '@/components/ui/dialog'
import DialogTitle from './dialog-title'
import DialogDescription from './dialog-description'
import { useTranslations } from 'next-intl'

type DialogHeaderProps = {
  ledgerName: string
}

const DialogHeader = ({ ledgerName }: DialogHeaderProps) => {
  const t = useTranslations('ledgers')

  return (
    <BaseDialogHeader className="flex gap-4">
      <DialogTitle title={t('dialog.title')} />
      <DialogDescription
        subtitle={t('dialog.subtitle')}
        ledgerName={ledgerName}
      />
    </BaseDialogHeader>
  )
}

export default DialogHeader
