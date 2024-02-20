import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Ledger } from '@/types/LedgersType'

const Page = async () => {
  const ledgersReq = await fetch('https://jsonplaceholder.typicode.com/posts')
  const ledgers = await ledgersReq.json()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All ledgers', href: '/', active: false },
    { name: 'Ledgers', href: '/ledgers', active: true }
  ]

  const columns: ColumnDef<Ledger>[] = [
    {
      accessorKey: 'id',
      header: 'Name'
    }
  ]

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title="Ledgers" />
      <div className="mt-5">
        <DataTable columns={columns} data={ledgers} />
      </div>
    </div>
  )
}

export default Page
