'use client'

import { ledgerDetail } from '@/client/ledgersClient'
import { useEffect, useState } from 'react'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'

type Props = {
  params: {
    id: string
  }
}

type Ledger = {
  id: string
  organizationId: string
  name: string
  divisionId: string
  defaultTimezone: string
  defaultCurrency: string
  defaultHolidayList: string
  assets: []
  metadata: {
    value: string
  }
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

const Page = ({ params }: Props) => {
  const [ledger, setLedger] = useState<Ledger | null>(null)
  const [breadcrumbPaths, setBreadcrumbPaths] = useState<BreadcrumbPath[]>([
    { name: 'All ledgers', href: '', active: false },
    { name: 'Ledgers', href: '/ledgers', active: false }
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ledgerDetail(params.id)
        setBreadcrumbPaths([
          ...breadcrumbPaths,
          {
            name: response.name,
            href: `/ledgers/${response.id}`,
            active: true
          }
        ])
        setLedger(response)
      } catch (error) {
        console.error('Failed to fetch ledger:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!ledger) {
    return <div>Loading ledger details...</div>
  }

  return (
    <div className="flex flex-col">
      <Breadcrumb paths={breadcrumbPaths} />
      <span>Name: {ledger.name}</span>
      <span>Status: {ledger.status}</span>
      <span>Default Currency: {ledger.defaultCurrency}</span>
      <span>Assets:</span>
      <div className="flex flex-col gap-2">
        {ledger.assets.map((asset, index) => (
          <span key={index}>{asset}</span>
        ))}
      </div>
    </div>
  )
}

export default Page
