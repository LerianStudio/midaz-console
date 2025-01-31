import { getFetcher, patchFetcher, postFetcher } from '@/lib/fetcher'
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query'

export type UseCreateTransactionProps = {
  organizationId: string
  ledgerId: string
  onSuccess: () => void
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

type UseGetTransactionByIdProps = {
  organizationId: string
  ledgerId: string
  transactionId: string
}

export const useGetTransactionById = ({
  organizationId,
  ledgerId,
  transactionId,
  ...options
}: UseGetTransactionByIdProps) => {
  return useQuery({
    queryKey: ['transactions-by-id', transactionId, organizationId, ledgerId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions/${transactionId}`
    ),
    ...options
  })
}

type UseUpdateTransactionProps = UseMutationOptions<
  any,
  Error,
  { metadata?: Record<string, any> | null; description?: string | null }
> & {
  organizationId: string
  ledgerId: string
  transactionId: string
}

export const useUpdateTransaction = ({
  organizationId,
  ledgerId,
  transactionId,
  onSuccess,
  ...options
}: UseUpdateTransactionProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['transactions', 'update'],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions/${transactionId}`
    ),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['transactions-by-id', transactionId, organizationId, ledgerId]
      })
      onSuccess?.(...args)
    },
    ...options
  })
}
