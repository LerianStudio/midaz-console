import { getFetcher } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'

export const useListOrganizations = ({ ...options }) => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getFetcher(`/api/organizations`),
    ...options
  })
}
