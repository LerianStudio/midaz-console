import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import {
  deleteFetcher,
  getFetcher,
  patchFetcher,
  postFetcher
} from '@/lib/fetcher'
import { PaginationRequest } from '@/types/pagination-request-type'
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

type DeleteLedgerVariables = { id: string }
type DeleteLedgerMutationOptions = UseMutationOptions<
  unknown,
  unknown,
  DeleteLedgerVariables,
  unknown
>

type UseDeleteLedgerProps = Omit<DeleteLedgerMutationOptions, 'mutationFn'> & {
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
  enabled = true,
  limit = 10,
  page = 1
}: UseListLedgersProps & PaginationRequest) => {
  return useQuery<PaginationDto<LedgerResponseDto>>({
    queryKey: ['ledgers', organizationId, { limit, page }],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/ledgers-assets?limit=${limit}&page=${page}`
    ),
    enabled
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
  const deleteLedgerFn = (data: DeleteLedgerVariables) => {
    const fetcher = deleteFetcher(
      `/api/organizations/${organizationId}/ledgers`
    )
    return fetcher(data)
  }

  type MutationFn = (variables: DeleteLedgerVariables) => Promise<unknown>
  const typedMutationFn = deleteLedgerFn as MutationFn

  return useMutation<unknown, unknown, DeleteLedgerVariables>({
    mutationKey: [organizationId],
    mutationFn: typedMutationFn,
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
