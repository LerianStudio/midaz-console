import { Card } from '@/components/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { PortfolioSheet } from './portfolios-sheet'

export const PortfoliosContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <Card.Root>
      {/* {ledgers.data && ledgers.data.length > 0 ? (
        <DataTable columns={ledgersColumns} data={enhancedLedgers.data} />
      ) : ( */}
      <div className="flex items-center justify-between">
        <div>
          <Card.Header title="Portfólios" className="text-lg capitalize" />
          <p className="mt-2 text-sm text-gray-500">
            Nenhum portfólio encontrado.
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center rounded-md px-4 py-2 shadow transition"
        >
          <span>Criar o primeiro portfólio</span>

          <PlusIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>
      {/* )} */}

      <PortfolioSheet
        sheetProps={{ open: isDialogOpen, setOpen: setIsDialogOpen }}
      />
    </Card.Root>
  )
}
