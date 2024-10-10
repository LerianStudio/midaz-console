import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { PortfolioSheet } from './portfolios-sheet'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { useListPortfolios } from '@/client/portfolios'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'

export const PortfoliosContent = () => {
  const { id: ledgerId } = useParams()
  const { currentOrganization } = useOrganization()

  const { data, refetch } = useListPortfolios({
    organizationId: currentOrganization.id!,
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
