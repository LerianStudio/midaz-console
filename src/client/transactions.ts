import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { getFetcher, getPaginatedFetcher, postFetcher } from '@/lib/fetcher'
import { PaginationRequest } from '@/types/pagination-request-type'
import { useMutation, useQuery } from '@tanstack/react-query'

export type UseCreateTransactionProps = {
  organizationId: string
  ledgerId: string
  onSuccess: () => void
}

export type UseListTransactionsProps = {
  organizationId: string
  ledgerId: string | null
  enabled?: boolean
} & PaginationRequest

export const useCreateTransaction = ({
  organizationId,
  ledgerId,
  ...options
}: UseCreateTransactionProps) => {
  return useMutation({
    mutationKey: ['transactions', 'create'],
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions/json`
    ),
    ...options
  })
}

export const useListTransactions = ({
  organizationId,
  ledgerId,
  page,
  limit,
  ...options
}: UseListTransactionsProps) => {
  return useQuery<PaginationDto<any>>({
    queryKey: ['transactions-list', organizationId, ledgerId, page, limit],
    queryFn: getPaginatedFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions`,
      { page, limit }
    ),
    ...options
  })
}
