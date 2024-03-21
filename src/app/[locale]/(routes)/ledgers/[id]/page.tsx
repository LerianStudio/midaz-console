'use client'

import { Ledger } from '@/types/LedgersType'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'
import Head from 'next/head'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  params: {
    id: string
  }
}

const LedgerItem = ({ params }: Props) => {
  const { data, isLoading } = useSWR<Ledger>(
    `/api/ledgers/${params.id}`,
    fetcher
  )

  const breadcrumbPaths: BreadcrumbPath[] = data
    ? [
        { name: 'All Ledgers', active: false },
        { name: 'Ledgers', active: false, href: '/ledgers' },
        { name: data.name, href: `/ledgers/${data.id}`, active: true }
      ]
    : []

  return (
    <React.Fragment>
      <Head>
        <title>Midaz</title>
        <meta name="description" content="" />
      </Head>
      <div>
        <div className="flex w-full flex-col">
          <Breadcrumb paths={breadcrumbPaths} />
          {isLoading ? (
            <Skeleton className="h-[100px] w-full rounded-md" />
          ) : (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{data?.name}</CardTitle>
                <CardDescription>...</CardDescription>
              </CardHeader>
              <CardContent>
                <p>...</p>
              </CardContent>
              <CardFooter>
                <p>...</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default LedgerItem
