import { Card } from '@/components/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const AccountsContent = () => {
  return (
    <Card.Root>
      <div className="flex items-center justify-between">
        <div>
          <Card.Header title="Contas" className="text-lg capitalize" />
          <p className="mt-2 text-sm text-gray-500">
            Nenhuma conta encontrada.
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          disabled={true}
          // onClick={() => handleOpenCreateSheet()}
          className="flex items-center rounded-md px-4 py-2 shadow transition"
        >
          <span>Criar a primeira conta</span>

          <PlusIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Card.Root>
  )
}
