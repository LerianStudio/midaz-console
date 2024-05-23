import { cn } from '@/lib/utils'
import { Button } from './ui/button/button'

interface BottomSheetProps {
  isOpen: boolean
  handleSubmit: () => void
  handleCancel: () => void
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  handleSubmit,
  handleCancel
}) => {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 transform bg-white shadow-sheetBottom transition-transform',
        isOpen ? 'translate-y-0' : 'translate-y-full',
        'duration-300 ease-in-out'
      )}
      aria-hidden={!isOpen}
    >
      <div className="flex justify-end gap-6 px-16 py-8">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit}>Salvar alterações</Button>
      </div>
    </div>
  )
}
