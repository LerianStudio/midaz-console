import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { getFetcher } from '@/lib/fetcher'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useListGroups = ({ ...options }: any) => {
  return useQuery<any>({
    queryKey: ['groups'],
    queryFn: getFetcher(`/api/identity/groups`),
    placeholderData: keepPreviousData,
    ...options
  })
}
