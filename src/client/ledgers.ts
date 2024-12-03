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
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

type UseCreateLedgerProps = UseMutationOptions & {
  organizationId: string
}

type UseListLedgersProps = {
  organizationId: string
  enabled?: boolean
}

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
  onSuccess,
  ...options
}: UseUpdateLedgerProps) => {
  const queryClient = useQueryClient()

  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}`
    ),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['ledger', organizationId, ledgerId]
      })
      onSuccess?.(...args)
    },
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
