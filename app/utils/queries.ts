import { getDivisions } from '@/client/divisionsClient'
import { getLedgers } from '@/client/ledgerClient'
import { useQuery } from '@tanstack/react-query'

export const useDivisions = () => {
  const query = useQuery({ queryKey: ['divisions'], queryFn: getDivisions })
  return query
}

export const useLedgers = () => {
  const query = useQuery({ queryKey: ['ledgers'], queryFn: getLedgers })
  return query
}
