import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { PortfolioViewResponseDTO } from '@/core/application/dto/portfolio-view-dto'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import {
  deleteFetcher,
  getFetcher,
  patchFetcher,
  postFetcher
} from '@/lib/fetcher'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'

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

type UseDeleteAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  portfolioId: string
  accountId: string
}

export const useDeleteAccount = ({
  organizationId,
  ledgerId,
  portfolioId,
  accountId,
  ...options
}: UseDeleteAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, portfolioId, accountId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts`
    ),
    ...options
  })
}

type UseCreateAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  portfolioId: string
}

export const useCreateAccount = ({
  organizationId,
  ledgerId,
  portfolioId,
  ...options
}: UseCreateAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, portfolioId],
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts`
    ),
    ...options
  })
}

type UseUpdateAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  portfolioId: string
  accountId: string
}

export const useUpdateAccount = ({
  organizationId,
  ledgerId,
  portfolioId,
  accountId,
  ...options
}: UseUpdateAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, portfolioId, accountId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts/${accountId}`
    ),
    ...options
  })
}
