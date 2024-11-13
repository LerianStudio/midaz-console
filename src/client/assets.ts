import { AssetResponseDto } from '@/core/application/dto/asset-response-dto'
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

type UseCreateAssetProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

type UseListAssetsProps = UseCreateAssetProps

type UseUpdateAssetProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  assetId: string
}

type UseDeleteAssetProps = UseCreateAssetProps

const useCreateAsset = ({
  organizationId,
  ledgerId,
  ...options
}: UseCreateAssetProps) => {
  return useMutation<any, any, any>({
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/assets`
    ),
    ...options
  })
}

const useListAssets = ({
  organizationId,
  ledgerId,
  ...options
}: UseListAssetsProps) => {
  return useQuery<PaginationDto<AssetResponseDto>>({
    queryKey: ['assets', organizationId, ledgerId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/assets`
    ),
    ...options
  })
}

const useUpdateAsset = ({
  organizationId,
  ledgerId,
  assetId,
  ...options
}: UseUpdateAssetProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, assetId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`
    ),
    ...options
  })
}

const useDeleteAsset = ({
  organizationId,
  ledgerId,
  ...options
}: UseDeleteAssetProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/assets`
    ),
    ...options
  })
}

export { useCreateAsset, useListAssets, useUpdateAsset, useDeleteAsset }
