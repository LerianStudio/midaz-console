'use client'

import { ledgerDetail } from '@/client/ledgersClient'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    name: string
  }
}

type Ledger = {
  id: string
  name: string
  description: string
}

const Page = ({ params }: Props) => {
  const [ledger, setLedger] = useState<Ledger | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ledgerDetail(params.name)
        setLedger(response)
      } catch (error) {
        console.error('Failed to fetch ledger:', error)
      }
    }

    fetchData()
  }, [params.name])

  if (!ledger) {
    return <div>Loading ledger details...</div>
  }

  return (
    <div className="flex flex-col">
      <span>{ledger.name}</span>
      <span>{ledger.description}</span>
    </div>
  )
}

export default Page
