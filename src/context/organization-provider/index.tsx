'use server'

import React from 'react'
import { FetchAllOrganizations } from '@/core/application/use-cases/organizations/fetch-all-organizations-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { OrganizationProviderClient } from './organization-provider-client'

const fetchAllOrganizationsUseCase = container.get<FetchAllOrganizations>(
  Registry.FetchAllOrganizationsUseCase
)

export const OrganizationProvider = async ({
  children
}: React.PropsWithChildren) => {
  /**
   * TODO: Call the proper get organizations for user
   * For now we setting the first organization as the current one
   */
  const result = await fetchAllOrganizationsUseCase.execute(10, 1)

  return (
    <OrganizationProviderClient organization={result.items[0]}>
      {children}
    </OrganizationProviderClient>
  )
}
