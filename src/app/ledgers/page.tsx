'use client'

import { fetchLedgers } from '@/client/ledgersClient'
import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Ledger } from '@/types/LedgersType'

const Page = () => {
  const [ledgers, setLedgers] = useState<Ledger[]>([])

  const [breadcrumbPaths] = useState<BreadcrumbPath[]>([
    { name: 'All ledgers', href: '', active: false },
    { name: 'Ledgers', href: '/ledgers', active: true }
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLedgers()
        setLedgers(response)
      } catch (error) {
        console.error('Failed to fetch ledgers:', error)
      }
    }

    fetchData()
  }, [])

  const router = useRouter()

  const columns: ColumnDef<Ledger>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              size="icon"
              onClick={() => router.push(`/ledgers/${row.original.id}`)}
              variant="secondary"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )
      }
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
