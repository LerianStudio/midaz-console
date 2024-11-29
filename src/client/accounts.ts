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
}

export const useListAccounts = ({
  organizationId,
  ledgerId,
  ...options
}: UseListAccountsProps) => {
  return useQuery<PaginationDto<AccountEntity>>({
    queryKey: [organizationId, ledgerId, 'accounts'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/accounts`
    ),
    ...options
  })
}

type UseAllPortfoliosAccountsProps = {
  organizationId: string
  ledgerId: string
}

export const useAllAccountsWithPortfolios = ({
  organizationId,
  ledgerId,
  ...options
}: UseAllPortfoliosAccountsProps) => {
  return useQuery<PaginationDto<PortfolioViewResponseDTO>>({
    queryKey: [organizationId, ledgerId, 'accounts-with-portfolios'],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/accounts-portfolios`
    ),
    ...options
  })
}

type UseDeleteAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  accountId: string
}

export const useDeleteAccount = ({
  organizationId,
  ledgerId,
  accountId,
  ...options
}: UseDeleteAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, accountId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/accounts`
    ),
    ...options
  })
}

type UseCreateAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

export const useCreateAccount = ({
  organizationId,
  ledgerId,
  ...options
}: UseCreateAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/accounts`
    ),
    ...options
  })
}

type UseUpdateAccountProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  accountId: string
}

export const useUpdateAccount = ({
  organizationId,
  ledgerId,
  accountId,
  ...options
}: UseUpdateAccountProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, accountId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/accounts/${accountId}`
    ),
    ...options
  })
}
