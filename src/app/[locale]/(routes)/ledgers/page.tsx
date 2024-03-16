'use client'

import { DataTable } from '@/components/DataTable'
import { Ledger } from '@/types/LedgersType'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Skeleton } from '@/components/ui/skeleton'
import Head from 'next/head'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Row } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import { PageTitle } from '@/components/PageTitle'

type DynamicButtonProps = {
  row: Row<Ledger>
}

const Page = () => {
  const router = useRouter()

  const { data, isLoading: loadingFetch } = useSWR<Ledger[]>(
    '/api/ledgers',
    fetcher
  )

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      id: 'actions',
      cell: ({ row }: DynamicButtonProps) => (
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => router.push(`/ledgers/${row.original.id}`)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      <Head>
        <title>Midaz</title>
        <meta name="description" content="" />
      </Head>
      <div>
        <div className="flex w-full flex-col">
          <PageTitle
            title="Ledgers"
            subtitle="Visualize e edite os ledgers da sua Organização."
          />
          <div className="mt-6">
            {!loadingFetch ? (
              <DataTable columns={columns} data={data || []} />
            ) : (
              <Skeleton className="h-[100px] w-full rounded-md" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
