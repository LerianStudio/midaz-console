'use client'

import { DataTable } from '@/components/DataTable'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { useLedgerColumns } from './columns'
import { Ledger } from '@/types/LedgersType'
import { useTranslation } from 'next-export-i18n'
import useSWR from 'swr'
import { fetcher } from '../../libs/fetcher'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
  const columns = useLedgerColumns()

  const { data, error, isLoading } = useSWR<Ledger[]>('/api/ledgers', fetcher)
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allLedgers'), active: false },
    { name: t('breadcrumb.ledgers'), href: '/ledgers', active: true }
  ]

  if (error) return <div>Falhou em carregar!</div>

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      {!isLoading ? (
        <DataTable columns={columns} data={data || []} />
      ) : (
        <Skeleton className="h-[100px] w-full rounded-md" />
      )}
    </div>
  )
}

export default Page
