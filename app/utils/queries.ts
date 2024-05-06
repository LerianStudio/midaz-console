import { getLedgerById, getLedgers } from '@/client/ledgerClient'
import { useQuery } from '@tanstack/react-query'
import { getDivisions } from '@/client/divisionsClient'
import { getInstrumentsById } from '@/client/instrumentsClient'

export const useDivisions = () => {
  return useQuery({
    queryKey: ['divisions'],
    queryFn: getDivisions
  })
}

export const useLedgers = () => {
  return useQuery({
    queryKey: ['ledgers'],
    queryFn: getLedgers
  })
}

export const useLedgerById = (id: string) => {
  return useQuery({
    queryKey: ['ledger', id],
    queryFn: () => getLedgerById(id)
  })
}

export const useInstrumentById = (ledgerId: string, instrumentId: string) => {
  return useQuery({
    queryKey: ['instrument', ledgerId, instrumentId],
    queryFn: () => getInstrumentsById(ledgerId, instrumentId)
  })
}
