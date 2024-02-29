'use client'

import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { useLedgerColumns } from './columns'
import { Ledger } from '@/types/LedgersType'
import { useTranslation } from 'next-export-i18n'
import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'

const Page = () => {
  const columns = useLedgerColumns()

  const { data, error, isLoading } = useSWR<Ledger[]>('/api/ledgers', fetcher)
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allLedgers'), active: false },
    { name: t('breadcrumb.ledgers'), href: '/ledgers', active: true }
  ]

  if (error) return <div>Falhou em carregar!</div>

  if (isLoading || !data) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title={t('pageTitle.ledgers')} />
      <div className="mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Page
