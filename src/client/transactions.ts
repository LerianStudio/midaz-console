import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { getFetcher, postFetcher } from '@/lib/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'

export type UseCreateTransactionProps = {
  organizationId: string
  ledgerId: string
  onSuccess: () => void
}

export type UseListTransactionsProps = {
  organizationId: string
  ledgerId: string
  enabled?: boolean
}

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
  enabled = true,
  ...options
}: UseListTransactionsProps) => {
  return useQuery<PaginationDto<any>>({
    queryKey: ['transactions-list', organizationId, ledgerId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions`
    ),
    enabled,
    ...options
  })
}
