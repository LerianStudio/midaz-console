import { getLedgers } from '@/client/ledgerClient'
import { useQuery } from '@tanstack/react-query'
import { getDivisions } from '@/client/divisionsClient'

export const useDivisions = () => {
  return useQuery({
    queryKey: ['divisions'],
    queryFn: getDivisions,
    
  })
}

export const useLedgers = () => {
  return useQuery({
    queryKey: ['ledgers'],
    queryFn: getLedgers,
  })
}
