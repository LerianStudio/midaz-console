import { PaginationDto } from '@/core/application/dto/pagination-dto'
import {
  PortfolioResponseDto,
  UpdatePortfolioDto
} from '@/core/application/dto/portfolios-dto'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import {
  getFetcher,
  postFetcher,
  patchFetcher,
  deleteFetcher
} from '@/lib/fetcher'
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
  return useQuery<PaginationDto<PortfolioEntity>>({
    queryKey: [organizationId, ledgerId, 'portfolios'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`
    ),
    ...options
  })
}

type UseUpdatePortfolioProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  portfolioId: string
}

export const useUpdatePortfolio = ({
  organizationId,
  ledgerId,
  portfolioId,
  ...options
}: UseUpdatePortfolioProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, portfolioId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`
    ),
    ...options
  })
}

type UseDeletePortfolioProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

export const useDeletePortfolio = ({
  organizationId,
  ledgerId,
  ...options
}: UseDeletePortfolioProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`
    ),
    ...options
  })
}

type UseGetPortfolioProps = {
  organizationId: string
  ledgerId: string
  portfolioId: string
} & UseMutationOptions

export const useGetPortfolio = ({
  organizationId,
  ledgerId,
  portfolioId,
  ...options
}: UseGetPortfolioProps) => {
  return useQuery<PortfolioResponseDto>({
    queryKey: [organizationId, ledgerId, 'portfolio', portfolioId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`
    ),
    ...options
  })
}
