import { PaginationDto } from '@/core/application/dto/pagination-dto'
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto
} from '@/core/application/dto/product-dto'
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

type UseListProductsProps = UseCreateProductProps

export const useListProducts = ({
  organizationId,
  ledgerId,
  ...options
}: UseListProductsProps) => {
  return useQuery<PaginationDto<ProductResponseDto>>({
    queryKey: [organizationId, ledgerId],
    queryFn: getFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}/products`
    ),
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
