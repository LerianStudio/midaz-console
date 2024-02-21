import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { getLedgerDetails, getLedgers } from '@/client/ledgersClient'
import { Ledger } from '@/types/LedgersType'

const Page = async ({ params }: { params: { id: string } }) => {
  const ledger: Ledger = await getLedgerDetails(params.id)

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All ledgers', href: '/ledgers', active: false },
    { name: 'Ledgers', href: '/ledgers', active: false },
    { name: ledger.name, href: `/ledgers/${params.id}`, active: true }
  ]

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      <span>{ledger.name}</span>
    </div>
  )
}

export default Page

export const generateStaticParams = async () => {
  const ledgersReq = await getLedgers()

  return ledgersReq.map((ledger: any) => ({
    id: ledger.id.toString()
  }))
}
