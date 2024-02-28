import { fetchAllLedgers, fetchLedgerById } from '@/client/ledgerClient'
import { Ledger } from '@/types/LedgersType'
import Wrapper from './wrapper'

const Page = async ({ params }: { params: { id: string } }) => {
  const ledger: Ledger = await fetchLedgerById(params.id)

  return (
    <div className="flex w-full flex-col">
      <Wrapper ledger={ledger} />
    </div>
  )
}

export default Page

export const generateStaticParams = async () => {
  const ledgersReq: Ledger[] = await fetchAllLedgers()

  return ledgersReq.map((ledger: any) => ({
    id: ledger.id.toString()
  }))
}
