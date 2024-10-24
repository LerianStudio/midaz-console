import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import {
  deleteFetcher,
  getFetcher,
  patchFetcher,
  postFetcher
} from '@/lib/fetcher'
import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'

type UseCreateLedgerProps = UseMutationOptions & {
  organizationId: string
}

type UseListLedgersProps = UseCreateLedgerProps

type UseLedgerByIdProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

type UseUpdateLedgerProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

type UseDeleteLedgerProps = UseMutationOptions & {
  organizationId: string
}

const useCreateLedger = ({
  organizationId,
  ...options
}: UseCreateLedgerProps) => {
  return useMutation<any, any, any>({
    mutationFn: postFetcher(`/api/organizations/${organizationId}/ledgers`),
    ...options
  })
}

const useListLedgers = ({
  organizationId,
  ...options
}: UseListLedgersProps) => {
  return useQuery<PaginationDto<LedgerResponseDto>>({
    queryKey: ['ledgers', organizationId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/ledgers-assets`
    ),
    ...options
  })
}

const useLedgerById = ({
  organizationId,
  ledgerId,
  ...options
}: UseLedgerByIdProps) => {
  return useQuery<LedgerResponseDto>({
    queryKey: ['ledger', organizationId, ledgerId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}`
    ),
    ...options
  })
}

const useUpdateLedger = ({
  organizationId,
  ledgerId,
  ...options
}: UseUpdateLedgerProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}`
    ),
    ...options
  })
}

const useDeleteLedger = ({
  organizationId,
  ...options
}: UseDeleteLedgerProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId],
    mutationFn: deleteFetcher(`/api/organizations/${organizationId}/ledgers`),
    ...options
  })
}

export {
  useCreateLedger,
  useUpdateLedger,
  useDeleteLedger,
  useListLedgers,
  useLedgerById
}
