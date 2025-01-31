import { Separator } from '@/components/ui/separator'
import {
  PaperCollapsible,
  PaperCollapsibleBanner,
  PaperCollapsibleContent
} from '@/components/transactions/primitives/paper-collapsible'
import { MetadataField } from '@/components/form'
import { Control, Form, useForm, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Metadata } from '@/types/metadata-type'
import { useEffect, useState } from 'react'
import { useUpdateTransaction } from '@/client/transactions'
import { useParams } from 'next/navigation'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { SaveSheet } from '../../overview/save-sheet'
import { PageFooter } from '@/components/page-footer'
import { ArrowRight } from 'lucide-react'
import { PageFooterSection } from '@/components/page-footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'node_modules/zod/lib'
import { metadata } from '@/schema/metadata'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'

export type MetadataAccordionProps = {
  name: string
  values: Metadata
  control: Control<any>
}

const formSchema = z.object({
  metadata: metadata
})

type FormSchema = z.infer<typeof formSchema>

export const MetaAccordionTransactionDetails = ({
  name,
  values,
  control
}: MetadataAccordionProps) => {
  const intl = useIntl()
  const { id, transactionId } = useParams<{
    id: string
    transactionId: string
  }>()
  const { currentOrganization } = useOrganization()
  const { showSuccess } = useCustomToast()
  const [isFooterOpen, setIsFooterOpen] = useState(false)

  const { mutate: updateTransaction } = useUpdateTransaction({
    organizationId: currentOrganization.id!,
    ledgerId: id!,
    transactionId: transactionId!,
    onSuccess: (response) => {
      form.reset({ metadata: response.metadata })
      
      showSuccess(
        intl.formatMessage({
          id: 'transactions.toast.update.success',
          defaultMessage: 'Transaction updated successfully'
        })
      )
      setIsFooterOpen(false)
    }
  })


  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: values
    }
  })


  const handleCancel = () => {
    form.reset()
  }

  const handleSubmit = form.handleSubmit((data) => {
    updateTransaction({
      metadata: data.metadata
    })
  })

  useEffect(() => {
    setIsFooterOpen(form.formState.isDirty)
  }, [form.formState.isDirty])


  return (
    <Form {...form}>
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
              control={form.control}
              defaultValue={values || {}}
            />
          </div>
        </PaperCollapsibleContent>
      </PaperCollapsible>
            
      <PageFooter open={isFooterOpen}>
        <PageFooterSection>
          <Button variant="outline" onClick={handleCancel}>
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
            onClick={handleSubmit}
          >
            {intl.formatMessage({
              id: 'common.save',
              defaultMessage: 'Save'
            })}
          </LoadingButton>
        </PageFooterSection>
      </PageFooter>
    </Form>
  )
}
