import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useSidebar } from './sidebar/primitive'
import { useIntl } from 'react-intl'
import { LoadingButton } from './ui/loading-button'

interface BottomDrawerProps {
  isOpen: boolean
  isPending: boolean
  handleSubmit: () => void
  handleCancel: () => void
}

export const BottomDrawer = ({
  isOpen,
  handleCancel,
  handleSubmit,
  isPending
}: BottomDrawerProps) => {
  const intl = useIntl()
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 ml-[136px] mr-16 transform rounded-t-2xl bg-white shadow-drawer transition-transform',
        isOpen ? 'translate-y-0' : 'translate-y-full',
        !isCollapsed && 'ml-[315px]',
        'duration-300 ease-in-out'
      )}
      aria-hidden={!isOpen}
    >
      <div className="flex w-full justify-center px-16 py-12">
        <div className="flex w-[292px] flex-col gap-2">
          <LoadingButton
            type="submit"
            fullWidth
            loading={isPending}
            onClick={handleSubmit}
          >
            {intl.formatMessage({
              id: 'common.saveChanges',
              defaultMessage: 'Save changes'
            })}
          </LoadingButton>
          <Button variant="outline" onClick={handleCancel}>
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
