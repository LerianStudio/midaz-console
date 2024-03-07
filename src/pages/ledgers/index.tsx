import MainLayout from '@/components/MainLayout'

import { DataTable } from '@/components/DataTable'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { Ledger } from '@/types/LedgersType'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Skeleton } from '@/components/ui/skeleton'
import Head from 'next/head'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { Row } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import { AuthProvider } from '@/contexts/authContext'

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
      header: 'x'
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

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All Ledgers', active: false },
    { name: 'Ledgers', href: '/ledgers', active: true }
  ]

  return (
    <AuthProvider>
      <Head>
        <title>Midaz</title>
        <meta name="description" content="" />
      </Head>
      <MainLayout>
        <div className="flex w-full flex-col">
          <Breadcrumb paths={breadcrumbPaths} />
          {!loadingFetch ? (
            <DataTable columns={columns} data={data || []} />
          ) : (
            <Skeleton className="h-[100px] w-full rounded-md" />
          )}
        </div>
      </MainLayout>
    </AuthProvider>
  )
}

export default Page
