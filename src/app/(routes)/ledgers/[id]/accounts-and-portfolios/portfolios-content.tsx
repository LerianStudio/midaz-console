import { Card } from '@/components/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Plus, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { PortfolioSheet } from './portfolios-sheet'
import { usePortfolios } from '@/utils/queries'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { portfoliosColumns } from './portfolios-columns'

export const PortfoliosContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { id: ledgerId } = useParams()

  const portfolios = usePortfolios(ledgerId as string)
  console.log(portfolios.data)
  return (
    <>
      <EntityBox.Root>
        <EntityBox.Header
          title="Assets"
          subtitle="Moedas ou ativos de quaisquer naturezas transacionados neste Ledger."
        />
        <EntityBox.Actions>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            icon={<Plus />}
          >
            Criar o primeiro Asset
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      {portfolios.data && portfolios.data.length > 0 && (
        <DataTable columns={portfoliosColumns} data={portfolios.data} />
      )}

      <PortfolioSheet
        sheetProps={{ open: isDialogOpen, setOpen: setIsDialogOpen }}
      />
    </>
  )
}
