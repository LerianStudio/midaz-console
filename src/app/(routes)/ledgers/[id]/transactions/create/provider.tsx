import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createContext, PropsWithChildren, useContext } from 'react'
import { useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form'
import { useTransactionFormControl } from './use-transaction-form-control'
import {
  initialValues,
  sourceInitialValues,
  transactionFormSchema,
  TransactionFormSchema
} from './schemas'
import {
  TransactionFormErrors,
  useTransactionFormErrors
} from './use-transaction-form-errors'

type TransactionFormProviderContext = {
  form: ReturnType<typeof useForm<TransactionFormSchema>>
  errors: TransactionFormErrors
  currentStep: number
  multipleSources?: boolean
  values: TransactionFormSchema
  addSource: (account: string) => void
  addDestination: (account: string) => void
  handleReview: () => void
  handleBack: () => void
}

const TransactionFormProvider = createContext<TransactionFormProviderContext>(
  {} as never
)

export const useTransactionForm = () => {
  return useContext(TransactionFormProvider)
}

export type TransactionProviderProps = PropsWithChildren & {
  values?: TransactionFormSchema
}

export const TransactionProvider = ({
  values,
  children
}: TransactionProviderProps) => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: { ...initialValues, ...values } as TransactionFormSchema
  })

  const formValues = form.watch()

  const { step, handleNext, handlePrevious } =
    useTransactionFormControl(formValues)
  const { errors } = useTransactionFormErrors(formValues)

  const originFieldArray = useFieldArray({
    name: 'source',
    control: form.control
  })

  const destinationFieldArray = useFieldArray({
    name: 'destination',
    control: form.control
  })

  // Flag to represent if the transaction has multiple sources or destinations
  const multipleSources =
    originFieldArray.fields.length > 1 ||
    destinationFieldArray.fields.length > 1

  // Add source or destination to the transaction
  // The first entity uses the same value as the transaction
  // Latter ones will start at 0
  const addSource = (fieldArray: UseFieldArrayReturn<any>, account: string) => {
    if (fieldArray.fields.length === 0) {
      fieldArray.append({
        ...sourceInitialValues,
        account,
        value: formValues.value
      })
    } else {
      fieldArray.append({
        ...sourceInitialValues,
        account
      })
    }
  }

  const handleReview = () => {
    router.push(`/ledgers/${id}/transactions/create/review`)
    handleNext()
  }

  // In case the user adds more than 1 source or destination,
  // And then removes to stay with only 1, we need to restore the original
  // transaction value to the source or destination
  useEffect(() => {
    if (formValues.source.length === 1) {
      form.setValue('source.0.value', formValues.value)
    }
  }, [formValues.source.length])

  useEffect(() => {
    if (formValues.destination.length === 1) {
      form.setValue('destination.0.value', formValues.value)
    }
  }, [formValues.destination.length])

  return (
    <TransactionFormProvider.Provider
      value={{
        form,
        errors,
        currentStep: step,
        multipleSources,
        values: formValues,
        addSource: (account: string) => addSource(originFieldArray, account),
        addDestination: (account: string) =>
          addSource(destinationFieldArray, account),
        handleReview,
        handleBack: handlePrevious
      }}
    >
      {children}
    </TransactionFormProvider.Provider>
  )
}