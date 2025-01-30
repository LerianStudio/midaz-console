import { Separator } from '@/components/ui/separator'
import {
  PaperCollapsible,
  PaperCollapsibleBanner,
  PaperCollapsibleContent
} from '@/components/transactions/primitives/paper-collapsible'
import { MetadataField } from '@/components/form'
import { Control, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Metadata } from '@/types/metadata-type'
import { useEffect } from 'react'
import { useUpdateTransaction } from '@/client/transactions'
import { useParams } from 'next/navigation'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import useCustomToast from '@/hooks/use-custom-toast'

export type MetadataAccordionProps = {
  name: string
  values: Metadata
  control: Control<any>
}

export const MetaAccordionTransactionDetails = ({
  name,
  values,
  control
}: MetadataAccordionProps) => {
  const intl = useIntl()
  const { id, transactionId } = useParams<{ id: string; transactionId: string }>()
  const { currentOrganization } = useOrganization()

  const { mutate: updateTransaction } = useUpdateTransaction({
    organizationId: currentOrganization.id!,
    ledgerId: id!,
    transactionId: transactionId!
  })

  const metadata = useWatch({
    control,
    name: `metadata`,
  }) 
  
  const { showSuccess } = useCustomToast()

  useEffect(() => {
    if (!metadata || !values) return;

    const metadataString = JSON.stringify(metadata);
    const valuesString = JSON.stringify(values);

    if (metadataString !== valuesString && Object.keys(metadata).length > 0) {
      updateTransaction({
        metadata: {
          ...metadata,
        }
      }, {
        onSuccess: () => {
          showSuccess(
            intl.formatMessage({
              id: 'transactions.toast.update.success',
              defaultMessage: 'Transaction updated successfully'
            })
          )
        }
      })
    }
  }, [metadata, values])

  return (
    <>
      <h6 className="mb-6 text-sm font-medium">
        {intl.formatMessage({
          id: 'transactions.metadata.title',
          defaultMessage: 'Transaction Metadata'
        })}
      </h6>

      <PaperCollapsible className="mb-32">
        <PaperCollapsibleBanner className="flex items-center justify-between">
          <p className="text-xs italic text-shadcn-400">
            {intl.formatMessage(
              {
                id: 'organizations.organizationForm.metadataRegisterCountText',
                defaultMessage:
                  '{count} added {count, plural, =0 {records} one {record} other {records}}'
              },
              {
                count: Object.entries(values || 0).length
              }
            )}
          </p>
        </PaperCollapsibleBanner>
        <PaperCollapsibleContent>
          <Separator orientation="horizontal" />
          <div className="p-6">
            <MetadataField
              name={name}
              control={control}
              defaultValue={values || {}}
            />
          </div>
        </PaperCollapsibleContent>
      </PaperCollapsible>
    </>
  )
}
