import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useSidebar } from './sidebar/primitive'

interface BottomDrawerProps {
  isOpen: boolean
  handleSubmit: () => void
  handleCancel: () => void
}

export const BottomDrawer = ({
  isOpen,
  handleSubmit,
  handleCancel
}: BottomDrawerProps) => {
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
          <Button onClick={handleSubmit}>Salvar alterações</Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
