import { useEffect, useState } from 'react'
import { useLedgers } from '@/utils/queries'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'

export const useEnhancedLedgers = () => {
  const [enhancedLedgers, setEnhancedLedgers] = useState<any[]>()
  const [refreshIndex, setRefreshIndex] = useState(0)
  const ledgers = useLedgers()

  const fetchInstrumentDetails = async (ledgerData: any) => {
    if (!ledgerData) {
      return []
    }

    const enhancedData = await Promise.all(
      ledgerData.map(async (ledger: LedgerEntity) => {
        if (!ledger.instruments || ledger.instruments.length === 0) {
          return { ...ledger, instruments: [] }
        }

        const instruments = await Promise.all(
          ledger.instruments.map(async (instrumentId: string) => {
            try {
              const response = await fetch(
                `/api/ledgers/${ledger.id}/instruments/${instrumentId}`
              ).then((res) => res.json())
              return { id: instrumentId, code: response.code }
            } catch (error) {
              console.error('Failed to fetch instrument details:', error)
              return { id: instrumentId, code: 'Unavailable' }
            }
          })
        )

        return { ...ledger, instruments }
      })
    )

    return enhancedData
  }

  if (!enhancedLedgers && ledgers.data) {
    fetchInstrumentDetails(ledgers.data).then(setEnhancedLedgers)
  }

  useEffect(() => {
    if (ledgers.data) {
      fetchInstrumentDetails(ledgers.data).then(setEnhancedLedgers)
    }
  }, [ledgers.data, refreshIndex])

  const refreshLedgers = () => {
    setRefreshIndex((prev) => prev + 1)
  }

  return { ...ledgers, data: enhancedLedgers, refreshLedgers }
}
