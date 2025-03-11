import { InputField, MetadataField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LedgerType } from '@/types/ledgers-type'
import { ExternalLink, Github, LifeBuoy } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { SaveSheet } from './save-sheet'
import { useUpdateLedger } from '@/client/ledgers'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { z } from 'zod'
import { ledger } from '@/schema/ledger'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

const initialValues = {
  name: '',
  metadata: {}
}

const formSchema = z.object({
  name: ledger.name,
  metadata: ledger.metadata
})

type FormSchema = z.infer<typeof formSchema>

type OverviewTabContentProps = {
  data: LedgerType
}

export const OverviewTabContent = ({ data }: OverviewTabContentProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()

  const { showSuccess, showError } = useCustomToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      ...data
    }
  })

  const { mutate: updateLedger, isPending: updatePending } = useUpdateLedger({
    organizationId: currentOrganization!.id!,
    ledgerId: data?.id!,
    onSuccess: () => {
      showSuccess(
        intl.formatMessage({
          id: 'ledgers.toast.update.success',
          defaultMessage: 'Ledger changes saved successfully'
        })
      )
    },
    onError: () => {
      showError(
        intl.formatMessage({
          id: 'ledgers.toast.update.error',
          defaultMessage: 'Error updating Ledger'
        })
      )
    }
  })

  const handleSubmit = async (values: FormSchema) => {
    updateLedger(values)
    form.reset(values)
  }

  const handleCancel = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-2 flex flex-1 flex-col gap-6">
          <Card>
            <CardHeader>
              <h2 className="pb-3 text-lg font-semibold capitalize text-[#52525B]">
                {intl.formatMessage({
                  id: 'common.identification',
                  defaultMessage: 'Identification'
                })}
              </h2>
            </CardHeader>
            <CardContent>
              <InputField
                name="name"
                label={intl.formatMessage({
                  id: 'entity.ledger.name',
                  defaultMessage: 'Ledger Name'
                })}
                control={form.control}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="pb-3 text-lg font-semibold capitalize text-[#52525B]">
                {intl.formatMessage({
                  id: 'common.metadata',
                  defaultMessage: 'Metadata'
                })}
              </h2>
            </CardHeader>
            <CardContent>
              <MetadataField name="metadata" control={form.control} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {intl.formatMessage({
                  id: 'common.resources',
                  defaultMessage: 'Resources'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 justify-items-start">
                <Button
                  className="text-shadcn-400"
                  icon={<Github size={16} />}
                  variant="link"
                  size="link"
                  onClick={() =>
                    window.open('https://github.com/LerianStudio', '_blank')
                  }
                >
                  Github
                </Button>
                <Button
                  className="text-shadcn-400"
                  icon={<LifeBuoy size={16} />}
                  variant="link"
                  size="link"
                >
                  {intl.formatMessage({
                    id: 'common.support',
                    defaultMessage: 'Support'
                  })}
                </Button>
                <Button
                  className="text-shadcn-400"
                  icon={<ExternalLink size={16} />}
                  variant="link"
                  size="link"
                >
                  CLI Docs
                </Button>
                <Button
                  className="text-shadcn-400"
                  icon={<ExternalLink size={16} />}
                  variant="link"
                  size="link"
                  onClick={() =>
                    window.open('https://docs.lerian.studio', '_blank')
                  }
                >
                  Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          <SaveSheet
            open={form.formState.isDirty}
            loading={updatePending}
            onSubmit={form.handleSubmit(handleSubmit)}
            onCancel={handleCancel}
          />
        </div>
        <div className="col-span-1" />
        <div className="col-span-1" />
      </div>
    </Form>
  )
}
