import { getLedgers } from '@/client/ledgerClient'
import { useQuery } from '@tanstack/react-query'
import { getDivisions } from '@/client/divisionsClient'
import {
  getOrganization,
  getOrganizationById
} from '@/client/organizationClient'

export const useDivisions = () => {
  return useQuery({
    queryKey: ['divisions'],
    queryFn: getDivisions
  })
}

export const useLedgers = () => {
  return useQuery({
    queryKey: ['ledgers'],
    queryFn: getLedgers
  })
}

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganization
  })
}

export const useOrganizationById = (id: string) => {
  return useQuery({
    queryKey: ['organizations', id],
    queryFn: () => getOrganizationById(id)
  })
}
