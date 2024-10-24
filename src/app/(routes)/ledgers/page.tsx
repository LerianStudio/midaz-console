'use client'

import LedgersView from '@/app/(routes)/ledgers/ledgers-view'
import { useListLedgers } from '@/client/ledger-client'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'

const Page = () => {
  const { currentOrganization } = useOrganization()

  const {
    data: ledgers,
    refetch,
    isLoading
  } = useListLedgers({
    organizationId: currentOrganization.id!
  })

  return (
    <LedgersView ledgers={ledgers} refetch={refetch} isLoading={isLoading} />
  )
}

export default Page
