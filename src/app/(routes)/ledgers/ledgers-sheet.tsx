import { InputField } from '@/components/form'
import { MetadataField } from '@/components/form/metadata-field'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { ledger } from '@/schema/ledger'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'
import { isNil } from 'lodash'
import { LoadingButton } from '@/components/ui/loading-button'
import { useCreateLedger } from '@/client/ledger-client'
import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'

export type LedgersSheetProps = DialogProps & {
  mode: 'create' | 'edit'
  data?: LedgerResponseDto | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  metadata: {}
}

const FormSchema = z.object({
  name: ledger.name,
  metadata: ledger.metadata
})

type FormData = z.infer<typeof FormSchema>

export const LedgersSheet = ({
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: LedgersSheetProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()

  const { mutate: createLedger, isPending: createPending } = useCreateLedger({
    organizationId: currentOrganization.id!,
    onSuccess: () => {
      onSucess?.()
      onOpenChange?.(false)
    }
  })

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: Object.assign({}, defaultValues, ledger)
  })

  const [metadataEnabled, setMetadataEnabled] = React.useState(
    Object.entries(ledger?.metadata || {}).length > 0
  )

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      createLedger(data)
    }

    form.reset(defaultValues)
  }

  React.useEffect(() => {
    if (mode === 'create') {
      form.reset(defaultValues)
    }
  }, [mode])

  React.useEffect(() => {
    if (!isNil(data)) {
      setMetadataEnabled(Object.entries(data.metadata).length > 0)
      form.reset(data, { keepDefaultValues: true })
    } else {
      setMetadataEnabled(false)
    }
  }, [data])

  return (
    <Sheet onOpenChange={onOpenChange} {...others}>
      <SheetContent>
        {mode === 'create' && (
          <SheetHeader>
            <SheetTitle>
              {intl.formatMessage({
                id: 'ledgers.sheetCreate.title',
                defaultMessage: 'New Ledger'
              })}
            </SheetTitle>
            <SheetDescription>
              {intl.formatMessage({
                id: 'ledgers.sheetCreate.description',
                defaultMessage:
                  'Fill in the data of the Ledger you wish to create.'
              })}
            </SheetDescription>
          </SheetHeader>
        )}

        <Form {...form}>
          <form
            className="flex flex-grow flex-col gap-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <InputField
              name="name"
              label={intl.formatMessage({
                id: 'entity.ledger.name',
                defaultMessage: 'Ledger Name'
              })}
              control={form.control}
              required
            />

            <div className="flex flex-col gap-2">
              <div className="gap- flex flex-col gap-4">
                <Label htmlFor="metadata">
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </Label>
                <Switch
                  id="metadata"
                  checked={metadataEnabled}
                  onCheckedChange={() => setMetadataEnabled(!metadataEnabled)}
                />
              </div>
            </div>

            {metadataEnabled && (
              <div>
                <MetadataField name="metadata" control={form.control} />
              </div>
            )}

            <p className="text-xs font-normal italic text-shadcn-400">
              {intl.formatMessage({
                id: 'common.requiredFields',
                defaultMessage: '(*) required fields.'
              })}
            </p>

            <SheetFooter>
              <LoadingButton
                size="lg"
                type="submit"
                disabled={!(form.formState.isDirty && form.formState.isValid)}
                fullWidth
                loading={createPending}
              >
                {intl.formatMessage({
                  id: 'common.save',
                  defaultMessage: 'Save'
                })}
              </LoadingButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
