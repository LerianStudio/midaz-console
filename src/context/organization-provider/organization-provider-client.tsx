'use client'

import React from 'react'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'

type OrganizationContextProps = {
  currentOrganization: OrganizationEntity
  setOrganization: (organization: OrganizationEntity) => void
  currentLedgerId: string | null
  setLedgerId: (ledgerId: string | null) => void
}

const OrganizationContext = React.createContext<OrganizationContextProps>(
  {} as OrganizationContextProps
)

export const useOrganization = () => React.useContext(OrganizationContext)

export type OrganizationProviderClientProps = React.PropsWithChildren & {
  organization: OrganizationEntity
  defaultLedgerId?: string | null
}

export const OrganizationProviderClient = ({
  organization: organizationProp,
  defaultLedgerId,
  children
}: OrganizationProviderClientProps) => {
  const [organization, setOrganization] =
    React.useState<OrganizationEntity>(organizationProp)

  const [currentLedgerId, setLedgerId] = React.useState<string | null>(
    defaultLedgerId ?? null
  )

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization: organization,
        setOrganization,
        currentLedgerId,
        setLedgerId
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}
