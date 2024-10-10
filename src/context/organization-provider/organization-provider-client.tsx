'use client'

import React from 'react'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'

type OrganizationContextProps = {
  currentOrganization: OrganizationEntity
  setOrganization: (organization: OrganizationEntity) => void
}

const OrganizationContext = React.createContext<OrganizationContextProps>(
  {} as OrganizationContextProps
)

export const useOrganization = () => React.useContext(OrganizationContext)

export type OrganizationProviderClientProps = React.PropsWithChildren & {
  organization: OrganizationEntity
}

export const OrganizationProviderClient = ({
  organization: organizationProp,
  children
}: OrganizationProviderClientProps) => {
  const [organization, setOrganization] =
    React.useState<OrganizationEntity>(organizationProp)

  return (
    <OrganizationContext.Provider
      value={{ currentOrganization: organization, setOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}
