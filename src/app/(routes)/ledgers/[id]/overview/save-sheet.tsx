import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'
import { cn } from '@/lib/utils'
import { useIntl } from 'react-intl'

export type SaveSheetProps = {
  open?: boolean
  loading?: boolean
  onSubmit?: () => void
  onCancel?: () => void
}

export const SaveSheet = ({
  open = true,
  loading,
  onSubmit,
  onCancel
}: SaveSheetProps) => {
  const intl = useIntl()

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 ml-[136px] mr-16 transform rounded-t-2xl bg-white shadow-drawer transition-transform',
        open ? 'translate-y-0' : 'translate-y-full',
        !true && 'ml-[315px]',
        'duration-300 ease-in-out'
      )}
      aria-hidden={!open}
    >
      <div className="flex w-full justify-center px-16 py-12">
        <div className="flex w-[292px] flex-col gap-2">
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            onClick={onSubmit}
          >
            {intl.formatMessage({
              id: 'common.saveChanges',
              defaultMessage: 'Save changes'
            })}
          </LoadingButton>
          <Button variant="outline" onClick={onCancel}>
            {intl.formatMessage({
              id: 'common.cancel',
              defaultMessage: 'Cancel'
            })}
          </Button>
        </div>
      </div>
    </div>
  )
}
