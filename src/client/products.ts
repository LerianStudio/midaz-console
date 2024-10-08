import { postFetcher } from '@/lib/fetcher'
import { useMutation } from '@tanstack/react-query'

type UseCreateProductProps = {
  organizationId: string
  ledgerId: string
}

export const useCreateProduct = ({
  organizationId,
  ledgerId
}: UseCreateProductProps) => {
  return useMutation({
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products`
    )
  })
}
