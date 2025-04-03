import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { getFetcher } from '@/lib/fetcher'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useListUsers = ({ ...options }: any) => {
  return useQuery<any>({
    queryKey: ['users'],
    queryFn: getFetcher(`/api/identity/users`),
    placeholderData: keepPreviousData,
    ...options
  })
}
