import { AssetResponseDto } from '@/core/application/dto/asset-response-dto'
import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { getFetcher } from '@/lib/fetcher'
import { UseMutationOptions, useQuery } from '@tanstack/react-query'

type UseListAssetsProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
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

export { useListAssets }
