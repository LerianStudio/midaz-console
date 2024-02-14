import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'

type Payment = {
  id: string
  name: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  }
]

const data: Payment[] = [
  {
    id: '728ed52f',
    name: 'wallet1'
  },
  {
    id: '489e1d42',
    name: 'wallet2'
  }
]

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Ledgers" />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Page
