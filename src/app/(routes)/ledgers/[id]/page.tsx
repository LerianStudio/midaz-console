'use client'

import { FormDetailsProvider } from '@/context/form-details-context'
import LedgerDetailsView from './ledger-details-view'
import { FormProvider, useForm } from 'react-hook-form'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useLedgerById } from '@/client/ledgers'

type Params = {
  params: {
    locale: string
    id: string
  }
}

const Page = ({ params }: Params) => {
  const { currentOrganization } = useOrganization()
  const { data: ledger } = useLedgerById({
    organizationId: currentOrganization.id!,
    ledgerId: params.id!
  })
  const methods = useForm()

  return (
    <FormDetailsProvider>
      <FormProvider {...methods}>
        <LedgerDetailsView data={ledger!} />
      </FormProvider>
    </FormDetailsProvider>
  )
}

export default Page
