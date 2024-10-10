import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import { getFetcher, postFetcher } from '@/lib/fetcher'
import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'

type UseCreatePortfolioProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

export const useCreatePortfolio = ({
  organizationId,
  ledgerId,
  ...options
}: UseCreatePortfolioProps) => {
  console.log(organizationId, ledgerId, options)
  return useMutation<any, any, any>({
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`
    ),
    ...options
  })
}

type UseListPortfoliosProps = UseCreatePortfolioProps

export const useListPortfolios = ({
  organizationId,
  ledgerId,
  ...options
}: UseListPortfoliosProps) => {
  return useQuery<PaginationDto<PortfoliosEntity>>({
    queryKey: [organizationId, ledgerId, 'portfolios'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios?page=1&limit=100`
    ),
    ...options
  })
}

// Existing createPortfolio and getPortfolios functions can be removed or kept as needed
