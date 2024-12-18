import { postFetcher } from '@/lib/fetcher'
import { useMutation } from '@tanstack/react-query'

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
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/transactions`
    ),
    ...options
  })
}
