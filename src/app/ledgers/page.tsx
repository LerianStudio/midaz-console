'use client'

import { DataTable } from '@/components/DataTable'
import { PageTitle } from '@/components/PageTitle'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { useLedgerColumns } from './columns'
import { Ledger } from '@/types/LedgersType'
import { fetchAllLedgers } from '@/client/ledgerClient'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-export-i18n'

const Page = () => {
  const [ledgers, setLedgers] = useState<Ledger[]>([])
  const columns = useLedgerColumns()
  const { t } = useTranslation()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: t('breadcrumb.allLedgers'), active: false },
    { name: t('breadcrumb.ledgers'), href: '/ledgers', active: true }
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
      <PageTitle title={t('pageTitle.ledgers')} />
      <div className="mt-5">
        <DataTable columns={columns} data={ledgers} />
      </div>
    </div>
  )
}

export default Page
