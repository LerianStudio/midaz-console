import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { PortfolioViewResponseDTO } from '@/core/application/dto/portfolio-view-dto'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { getFetcher } from '@/lib/fetcher'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseListAccountsProps = {
  organizationId: string
  ledgerId: string
  portfolioId: string
}

export const useListAccounts = ({
  organizationId,
  ledgerId,
  portfolioId,
  ...options
}: UseListAccountsProps) => {
  return useQuery<PaginationDto<AccountEntity>>({
    queryKey: [organizationId, ledgerId, portfolioId, 'accounts'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts`
    ),
    ...options
  })
}

type UseAllPortfoliosAccountsProps = {
  organizationId: string
  ledgerId: string
}

export const useAllPortfoliosAccounts = ({
  organizationId,
  ledgerId,
  ...options
}: UseAllPortfoliosAccountsProps) => {
  return useQuery<PaginationDto<PortfolioViewResponseDTO>>({
    queryKey: [organizationId, ledgerId, 'portfolios-accounts'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/portfolios-accounts`
    ),
    ...options
  })
}
