'use client'

import { FormDetailsProvider } from '@/context/form-details-context'
import LedgerDetailsView from './ledger-details-view'
import { useLedgerById } from '@/utils/queries'
import { FormProvider, useForm } from 'react-hook-form'
import jsonData from '@/../faker/index.json'
type Params = {
  params: {
    locale: string
    id: string
  }
}

const Page = ({ params }: Params) => {
  // const data = useLedgerById(params.id)
  const methods = useForm()
  const data = { data: jsonData.ledgers }

  return (
    <FormDetailsProvider>
      <FormProvider {...methods}>
        <LedgerDetailsView data={data.data} />
      </FormProvider>
    </FormDetailsProvider>
  )
}

export default Page
