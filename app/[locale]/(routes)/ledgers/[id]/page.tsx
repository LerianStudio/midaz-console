import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { Card } from '@/components/Card'
import { PageHeader } from '@/components/PageHeader'
import { TabsComponent } from '@/components/Tabs'
import { ArrowUpRight, BarChart, Coins, DollarSign } from 'lucide-react'

type Params = {
  params: {
    locale: string
    id: string
  }
}

const Page = async ({ params }: Params) => {
  const ledgerReq = await fetch(`http://localhost:3001/ledgers/${params.id}`)
  const res = await ledgerReq.json()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Ledgers', href: '/ledgers' },
    { name: 'Detalhe da Ledger' }
  ]

  const tabs = [{ id: 1, value: 'overview', name: 'Visão Geral' }]

  return (
    <div>
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <div className="mt-12">
        <PageHeader title={res.name} subtitle={params.id} type="entity" />
      </div>

      <TabsComponent tabs={tabs}>
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col gap-5">
            <Card.Root>
              <Card.Header
                title="Identificação"
                className="text-lg font-semibold capitalize text-[#52525B]"
              />
              <Card.Content data={res} />
            </Card.Root>

            <Card.Root>
              <Card.Header title="Metadados" className="text-lg" />
              <Card.Metadata data={res} />
            </Card.Root>

            <Card.Root>
              <Card.Header title="Recursos" />
              <Card.Content />
            </Card.Root>
          </div>

          <div className="flex flex-1 gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <Card.Root className="bg-[#3F3F46]">
                <Card.Header
                  title="# Transações / 24h"
                  icon={ArrowUpRight}
                  className="text-shadcn-200"
                  iconClassName="text-shadcn-200"
                />
                <Card.Content text="372" className="text-5xl text-white" />
              </Card.Root>

              <Card.Root>
                <Card.Header
                  title="Status das Transações"
                  icon={BarChart}
                  className="text-[#52525B]"
                />
                <Card.Content />
              </Card.Root>
            </div>

            <div className="flex flex-1 flex-col gap-5">
              <Card.Root>
                <Card.Header
                  title="Total USD"
                  icon={DollarSign}
                  className="text-[#52525B]"
                />
                <Card.Content text="372" className="text-5xl" />
              </Card.Root>

              <Card.Root>
                <Card.Header
                  title="Total BTC"
                  icon={Coins}
                  className="text-[#52525B]"
                />
                <Card.Content text="1,344,123.00" className="text-3xl" />
              </Card.Root>

              <Card.Root>
                <Card.Header
                  title="Total ETH"
                  icon={Coins}
                  className="text-[#52525B]"
                />
                <Card.Content text="1,344,123.00" className="text-3xl" />
              </Card.Root>
            </div>
          </div>
        </div>
      </TabsComponent>
    </div>
  )
}

export default Page
