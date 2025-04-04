import { deleteFetcher, getFetcher, postFetcher } from '@/lib/fetcher'
import { UsersType } from '@/types/users-type'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export const useCreateUser = ({ ...options }: any) => {
  return useMutation<unknown, Error, UsersType>({
    mutationKey: ['users'],
    mutationFn: postFetcher(`/api/identity/users`),
    ...options
  })
}

export const useListUsers = ({ ...options }: any) => {
  return useQuery<any>({
    queryKey: ['users'],
    queryFn: getFetcher(`/api/identity/users`),
    placeholderData: keepPreviousData,
    ...options
  })
}

export const useDeleteUser = ({ onSuccess, ...options }: any) => {
  const queryClient = useQueryClient()

  return useMutation<any, any, any>({
    mutationKey: ['users'],
    mutationFn: deleteFetcher(`/api/identity/users`),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
      onSuccess?.(...args)
    },
    ...options
  })
}
