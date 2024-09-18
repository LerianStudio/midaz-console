import { Card } from "@/components/card"
import { Button } from "@/components/ui/button/button"
import { ChevronLeft, PlusIcon } from "lucide-react"

export const AccountsPortfoliosTabContent = () => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card.Root>
        <div className="flex justify-between items-center">
          <div>
            <Card.Header title="Portfólios" className="text-lg capitalize" />
            <p className="text-sm text-gray-500 mt-2">Nenhum portfólio encontrado.</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log('Criar')}
            className="flex items-center px-4 py-2 rounded-md shadow transition"
          >
            <span>Criar o primeiro portfólio</span>
            <PlusIcon className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Card.Root>

      <Card.Root>
        <div className="flex justify-between items-center">
          <div>
            <Card.Header title="Contas" className="text-lg capitalize" />
            <p className="text-sm text-gray-500 mt-2">Nenhum portfólio encontrado.</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log('Criar')}
            className="flex items-center px-4 py-2 rounded-md shadow transition gray"
            disabled={true}
          >
            <span>Você precisa de um portfólio para criar contas</span>
          </Button>
        </div>
      </Card.Root>
    </div>

  )
}