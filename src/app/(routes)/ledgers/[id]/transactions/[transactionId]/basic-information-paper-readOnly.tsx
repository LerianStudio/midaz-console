import { InputField } from '@/components/form'
import { Paper } from '@/components/ui/paper'
import { Separator } from '@/components/ui/separator'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Control, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import DolarSign from '/public/svg/dolar-sign.svg'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'
import { ArrowRight } from 'lucide-react'
import { PageFooter, PageFooterSection } from '@/components/page-footer'
import { useUpdateTransaction } from '@/client/transactions'
import useCustomToast from '@/hooks/use-custom-toast'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRANSACTION_DETAILS_TAB_VALUES } from './Transaction-details-tab-values'

interface TransactionValues {
  chartOfAccountsGroupName?: string
  value?: number
  asset?: string
  description?: string
}

export interface BasicInformationPaperProps {
  control: Control<any>
  values: TransactionValues
  amount: string
  onCancel?: () => void
  onSave?: (description: string) => void
  handleTabChange?: (tab: string) => void
}

const formSchema = z.object({
  description: z.string().min(1, 'Description is required')
})

type FormSchema = z.infer<typeof formSchema>

const useTransactionForm = (
  initialValues: TransactionValues,
  onSave?: (description: string) => void,
  handleTabChange?: (tab: string) => void
) => {
  const intl = useIntl()
  const { id, transactionId } = useParams<{
    id: string
    transactionId: string
  }>()
  const { showSuccess, showError } = useCustomToast()
  const { currentOrganization } = useOrganization()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialValues.description || ''
    }
  })

  const { mutate: updateTransaction, isPending } = useUpdateTransaction({
    organizationId: currentOrganization.id!,
    ledgerId: id!,
    transactionId: transactionId!,
    onSuccess: () => {
      showSuccess(
        intl.formatMessage({
          id: 'transactions.toast.update.success',
          defaultMessage: 'Transaction updated successfully'
        })
      )
      onSave?.(form.getValues().description)
      handleTabChange?.(TRANSACTION_DETAILS_TAB_VALUES.SUMMARY)
    },
    onError: (error) => {
      showError(
        intl.formatMessage({
          id: 'transactions.toast.update.error',
          defaultMessage: 'An error occurred while updating the transaction'
        })
      ),
        handleTabChange?.(TRANSACTION_DETAILS_TAB_VALUES.SUMMARY)
    }
  })

  const handleSave = () => {
    form.handleSubmit((data) => {
      updateTransaction({ description: data.description })
    })()
  }

  return {
    form,
    handleSave,
    isPending
  }
}

export const BasicInformationPaperReadOnly = ({
  values,
  amount,
  onCancel,
  onSave,
  handleTabChange
}: BasicInformationPaperProps) => {
  const intl = useIntl()
  const { form, handleSave, isPending } = useTransactionForm(
    values,
    onSave,
    handleTabChange
  )

  const { handleDialogOpen, dialogProps } = useConfirmDialog({
    onConfirm: handleSave
  })

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      <Paper className="mb-6 flex flex-col">
        <div className="grid grid-cols-2 gap-5 p-6">
          <InputField
            name="description"
            label={intl.formatMessage({
              id: 'transactions.field.description',
              defaultMessage: 'Transaction description'
            })}
            control={form.control}
            maxHeight={100}
            textArea
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {intl.formatMessage({
                id: 'transactions.create.field.chartOfAccountsGroupName',
                defaultMessage: 'Accounting route group'
              })}
            </label>
            <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
              {values.chartOfAccountsGroupName}
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="grid grid-cols-4 gap-5 p-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {intl.formatMessage({
                  id: 'entity.transaction.value',
                  defaultMessage: 'Value'
                })}
              </label>
              <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
                {amount}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {intl.formatMessage({
                id: 'entity.transaction.asset',
                defaultMessage: 'Asset'
              })}
            </label>
            <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
              {values.asset}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Image alt="" src={DolarSign} />
          </div>
        </div>
      </Paper>

      <PageFooter open={form.formState.isDirty}>
        <PageFooterSection>
          <Button variant="outline" onClick={onCancel} type="button">
            {intl.formatMessage({
              id: 'common.cancel',
              defaultMessage: 'Cancel'
            })}
          </Button>
        </PageFooterSection>
        <PageFooterSection>
          <LoadingButton
            icon={<ArrowRight />}
            iconPlacement="end"
            onClick={() => handleDialogOpen('')}
            loading={isPending}
            type="button"
          >
            {intl.formatMessage({
              id: 'common.save',
              defaultMessage: 'Save'
            })}
          </LoadingButton>
        </PageFooterSection>
      </PageFooter>

      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'common.confirm',
          defaultMessage: 'Confirm'
        })}
        description={intl.formatMessage({
          id: 'common.confirmDescription',
          defaultMessage: 'Are you sure you want to save?'
        })}
        {...dialogProps}
      />
    </form>
  )
}
