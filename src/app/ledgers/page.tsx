'use client'

import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { useLedgerColumns } from './columns'
import { Ledger } from '@/types/LedgersType'
import { fetchAllLedgers } from '@/client/ledgerClient'
import { useEffect, useState } from 'react'

const Page = () => {
  const [ledgers, setLedgers] = useState<Ledger[]>([])
  const columns = useLedgerColumns()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All ledgers', active: false },
    { name: 'Ledgers', href: '/ledgers', active: true }
  ]

  useEffect(() => {
    const fetchLedgers = async () => {
      const fetchedLedgers = await fetchAllLedgers()
      setLedgers(fetchedLedgers)
    }

    fetchLedgers()
  }, [])

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
