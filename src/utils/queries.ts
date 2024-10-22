import { useQuery } from '@tanstack/react-query'
import {
  getOrganization,
  getOrganizationById
} from '@/client/organization-client'

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganization
  })
}

export const useOrganizationById = (id: string) => {
  return useQuery({
    queryKey: ['organizationById', id],
    queryFn: () => getOrganizationById(id)
  })
}
