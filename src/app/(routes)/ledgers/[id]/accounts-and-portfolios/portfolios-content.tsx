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
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { useListPortfolios } from '@/client/portfolios'

export const PortfoliosContent = () => {
  const { id: ledgerId } = useParams()

  const { data, refetch } = useListPortfolios({
    organizationId: 'b36c9055-01cd-4232-8bed-d4dd2b826b1e',
    ledgerId: ledgerId as string
  })

  console.log('portfolios', data)

  const { handleCreate, handleEdit, sheetProps } =
    useCreateUpdateSheet<PortfolioResponseDto>()
  return (
    <>
      <EntityBox.Root>
        <EntityBox.Header
          title="Portfolios"
          // subtitle={
          //   // portfolios.data
          //   //   ? undefined
          //   //   : 'Moedas ou ativos de quaisquer naturezas transacionados neste Ledger.'
          // }
        />
        <EntityBox.Actions>
          <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
            {/* {!portfolios.data ?? 'Criar o primeiro porfolio'} */}
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      {/* {portfolios.data && portfolios.data.length > 0 && (
        <DataTable columns={portfoliosColumns} data={portfolios.data} />
      )} */}

      <PortfolioSheet
        ledgerId={ledgerId as string}
        onSucess={refetch}
        {...sheetProps}
      />
    </>
  )
}
