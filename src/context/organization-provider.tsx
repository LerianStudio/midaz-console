'use client'

import React from 'react'

/**
 * TODO: Shoundn't be hardcoded
 */
const defaultOrganization = {
  id: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
  parentOrganizationId: null,
  name: 'Sanchez Tech LTDA',
  doingBusinessAs: 'The ledger.io',
  legalDocument: '48784548000104',
  address: {
    line1: 'Avenida Paulista, 1234',
    line2: 'CJ 203',
    zipCode: '04696040',
    city: 'São Paulo',
    state: 'SP',
    country: 'BR'
  },
  metadata: null,
  status: {
    code: 'ACTIVE',
    description: null
  },
  createdAt: '2024-02-08T16:59:31+0300',
  updatedAt: '2024-02-08T16:59:31+0300',
  deletedAt: null
}

type OrganizationContextProps = {
  currentOrganization: typeof defaultOrganization
  setOrganization: (organization: typeof defaultOrganization) => void
}

const OrganizationContext = React.createContext<OrganizationContextProps>({
  currentOrganization: defaultOrganization,
  setOrganization: () => {}
})

export const useOrganization = () => React.useContext(OrganizationContext)

export const OrganizationProvider = ({ children }: React.PropsWithChildren) => {
  const [organization, setOrganization] = React.useState(defaultOrganization)

  return (
    <OrganizationContext.Provider
      value={{ currentOrganization: organization, setOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}
