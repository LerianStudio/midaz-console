'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { usePathname, useRouter } from 'next/navigation'

type OrganizationContextProps = {
  currentOrganization: OrganizationEntity
  setOrganization: (organization: OrganizationEntity) => void
  currentLedgerId: string | null
  setLedgerId: (ledgerId: string | null) => void
}

const OrganizationContext = createContext<OrganizationContextProps>(
  {} as OrganizationContextProps
)

export const useOrganization = () => useContext(OrganizationContext)

export type OrganizationProviderClientProps = PropsWithChildren & {
  organizations: OrganizationEntity[]
  defaultLedgerId?: string | null
}

export const OrganizationProviderClient = ({
  organizations: organizationsProp,
  defaultLedgerId,
  children
}: OrganizationProviderClientProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [current, setCurrent] = useState<OrganizationEntity>(
    {} as OrganizationEntity
  )
  const [organizations, setOrganizations] = useState<OrganizationEntity[]>(
    organizationsProp ?? []
  )

  useEffect(() => {
    // Do nothing if the user is already at the onboarding
    if (pathname.includes('/onboarding')) {
      return
    }

    // Redirect user to onboarding if it has no organizations
    if (organizations.length === 0) {
      router.replace('/onboarding')
    }

    // Redirect user to ledger onboarding if it has only one organization and no ledgers
    if (organizations.length === 1 && current?.metadata?.onboarding === true) {
      router.replace('/onboarding/ledger')
    }
  }, [current?.id, organizations.length])

  // Initialize a current organization
  useEffect(() => {
    if (organizations.length > 0) {
      setCurrent(organizations[0])
    }
  }, [])

  const [currentLedgerId, setLedgerId] = useState<string | null>(
    defaultLedgerId ?? null
  )

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization: current,
        setOrganization: setCurrent,
        currentLedgerId,
        setLedgerId
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}
