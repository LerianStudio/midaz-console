import { fetchAllLedgers, fetchLedgerById } from '@/client/ledgerClient'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Ledger } from '@/types/LedgersType'

const Page = async ({ params }: { params: { id: string } }) => {
  const ledger: Ledger = await fetchLedgerById(params.id)

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All ledgers', active: false },
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
  const ledgersReq = await fetchAllLedgers()

  return ledgersReq.map((ledger: any) => ({
    id: ledger.id.toString()
  }))
}
