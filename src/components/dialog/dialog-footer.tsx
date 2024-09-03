import { Button } from '@/components/ui/button/button'
import { useTranslations } from 'next-intl'

type DialogFooterProps = {
  onDismiss: () => void
  onDelete: () => void
}

const DialogFooter = ({ onDismiss, onDelete }: DialogFooterProps) => {
  const t = useTranslations('ledgers')

  return (
    <div className="mt-5 flex justify-end gap-2">
      <Button onClick={onDismiss} variant="outline" autoFocus={false}>
        Cancelar
      </Button>

      <Button
        onClick={onDelete}
        className="bg-sunglow-400 text-black hover:bg-sunglow-400/70"
      >
        {t('dialog.deleteBtnText')}
      </Button>
    </div>
  )
}

export default DialogFooter
