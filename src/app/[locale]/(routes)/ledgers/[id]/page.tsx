'use client'

import { FormDetailsProvider } from '@/context/FormDetailsContext'
import LedgerDetailsView from './ledger-details-view'
import { useLedgerById } from '@/utils/queries'
import { FormProvider, useForm } from 'react-hook-form'

type Params = {
  params: {
    locale: string
    id: string
  }
}

const Page = ({ params }: Params) => {
  const data = useLedgerById(params.id)
  const methods = useForm()

  return (
    <FormDetailsProvider>
      <FormProvider {...methods}>
        <LedgerDetailsView data={data.data} />
      </FormProvider>
    </FormDetailsProvider>
  )
}

export default Page
