'use client'

import { fetchLedgers } from '@/client/ledgersClient'
import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Ledgers = {
  id: string
  name: string
  description: string
}

const Page = () => {
  const [ledgers, setLedgers] = useState<Ledgers[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLedgers()
        setLedgers(response.data)
      } catch (error) {
        console.error('Failed to fetch ledgers:', error)
      }
    }

    fetchData()
  }, [])

  const router = useRouter()

  const columns: ColumnDef<Ledgers>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const modifiedText = row.original.name
          .toLowerCase()
          .replace(/\s+/g, '-')

        return (
          <div className="flex justify-end">
            <Button
              size="icon"
              onClick={() => router.push(`/ledgers/${modifiedText}`)}
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
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Ledgers" />
      <DataTable columns={columns} data={ledgers} />
    </div>
  )
}

export default Page
