import { useEffect, useMemo, useState } from 'react'
import { useLedgers } from '@/utils/queries'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

export const useEnhancedLedgers = () => {
  const [enhancedLedgers, setEnhancedLedgers] = useState<LedgerEntity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshIndex, setRefreshIndex] = useState(0)
  const ledgers = useLedgers()

  const fetchInstrumentsForLedger = async (
    ledgerId: string
  ): Promise<LedgerEntity[]> => {
    try {
      const response = await fetch(`/api/ledgers/${ledgerId}/instruments`)
      if (!response.ok) throw new Error('Failed to fetch instruments')
      return response.json()
    } catch (error) {
      return []
    }
  }

  const enhanceLedgers = useMemo(() => {
    const enhance = async () => {
      if (!ledgers.data) {
        console.log('No ledger data available')
        return []
      }

      try {
        const enhancedData = await Promise.all(
          ledgers.data.map(async (ledger: LedgerEntity) => {
            const instruments = await fetchInstrumentsForLedger(ledger.id)
            return { ...ledger, instruments }
          })
        )
        setIsLoading(false)
        return enhancedData
      } catch (error) {
        console.error('Error enhancing ledgers:', error)
        setIsLoading(false)
        return []
      }
    }

    return enhance()
  }, [ledgers.data, refreshIndex])

  useEffect(() => {
    enhanceLedgers.then(setEnhancedLedgers)
  }, [enhanceLedgers])

  const refreshLedgers = () => {
    setIsLoading(true)
    setRefreshIndex((prev) => prev + 1)
  }

  return { ...ledgers, data: enhancedLedgers, isLoading, refreshLedgers }
}
