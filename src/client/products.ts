import { PaginationDto } from '@/core/application/dto/pagination-dto'
import { ProductResponseDto } from '@/core/application/dto/product-dto'
import {
  deleteFetcher,
  getFetcher,
  getPaginatedFetcher,
  patchFetcher,
  postFetcher
} from '@/lib/fetcher'
import { PaginationRequest } from '@/types/pagination-request-type'
import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'

/**
 * TODO: Find a way to avoid the <any, any, any>
 */

type UseCreateProductProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

export const useCreateProduct = ({
  organizationId,
  ledgerId,
  ...options
}: UseCreateProductProps) => {
  return useMutation<any, any, any>({
    mutationFn: postFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products`
    ),
    ...options
  })
}

type UseListProductsProps = UseCreateProductProps & PaginationRequest

export const useListProducts = ({
  organizationId,
  ledgerId,
  limit,
  page,
  ...options
}: UseListProductsProps) => {
  return useQuery<PaginationDto<ProductResponseDto>>({
    queryKey: [organizationId, ledgerId, limit, page],
    queryFn: getPaginatedFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products`,
      { limit, page }
    ),
    placeholderData: keepPreviousData,
    ...options
  })
}

type UseUpdateProductProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
  productId: string
}

export const useUpdateProduct = ({
  organizationId,
  ledgerId,
  productId,
  ...options
}: UseUpdateProductProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId, productId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`
    ),
    ...options
  })
}

type UseDeleteProductProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

export const useDeleteProduct = ({
  organizationId,
  ledgerId,
  ...options
}: UseDeleteProductProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products`
    ),
    ...options
  })
}
