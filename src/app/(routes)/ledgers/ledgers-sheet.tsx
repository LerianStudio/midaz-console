import { InputField } from '@/components/form'
import { MetadataField } from '@/components/form/metadata-field'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { ledger } from '@/schema/ledger'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'
import { isNil } from 'lodash'
import { LoadingButton } from '@/components/ui/loading-button'
import { useCreateLedger, useUpdateLedger } from '@/client/ledgers'
import { LedgerResponseDto } from '@/core/application/dto/ledger-response-dto'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import useCustomToast from '@/hooks/use-custom-toast'
import { ILedgerType } from '@/types/ledgers-type'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type LedgersSheetProps = DialogProps & {
  mode: 'create' | 'edit'
  data?: LedgerResponseDto | null
  onSuccess?: () => void
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
  onSuccess,
  onOpenChange,
  ...others
}: LedgersSheetProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const { showSuccess, showError } = useCustomToast()

  const { mutate: createLedger, isPending: createPending } = useCreateLedger({
    organizationId: currentOrganization.id!,
    onSuccess: (data: unknown) => {
      const formData = data as ILedgerType
      onSuccess?.()
      onOpenChange?.(false)
      showSuccess(
        intl.formatMessage(
          {
            id: 'ledgers.toast.create.success',
            defaultMessage: 'Ledger {ledgerName} created successfully'
          },
          { ledgerName: formData.name }
        )
      )
    },
    onError: () => {
      onOpenChange?.(false)
      showError(
        intl.formatMessage({
          id: 'ledgers.toast.create.error',
          defaultMessage: 'Error creating Ledger'
        })
      )
    }
  })

  const { mutate: updateLedger, isPending: updatePending } = useUpdateLedger({
    organizationId: currentOrganization!.id!,
    ledgerId: data?.id!,
    onSuccess: () => {
      onSuccess?.()
      onOpenChange?.(false)
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

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: Object.assign({}, defaultValues, ledger)
  })

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      createLedger(data)
    } else if (mode === 'edit') {
      updateLedger(data)
    }

    form.reset(defaultValues)
  }

  React.useEffect(() => {
    if (mode === 'create') {
      form.reset(defaultValues)
    }
  }, [mode])

  React.useEffect(() => {
    if (mode === 'edit' && !isNil(data)) {
      form.reset(data, { keepDefaultValues: true })
    }
  }, [data, mode])

  return (
    <Sheet onOpenChange={onOpenChange} {...others}>
      <SheetContent data-testid="ledgers-sheet">
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

        {mode === 'edit' && (
          <SheetHeader>
            <SheetTitle>
              {intl.formatMessage(
                {
                  id: 'ledgers.sheet.edit.title',
                  defaultMessage: 'Edit "{ledgerName}"'
                },
                {
                  ledgerName: data?.name
                }
              )}
            </SheetTitle>
            <SheetDescription>
              {intl.formatMessage({
                id: 'ledgers.sheet.edit.description',
                defaultMessage: 'View and edit ledger fields.'
              })}
            </SheetDescription>
          </SheetHeader>
        )}

        <Form {...form}>
          <form
            className="flex flex-grow flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Tabs defaultValue="details" className="mt-0">
              <TabsList className="mb-8 px-0">
                <TabsTrigger
                  value="details"
                  className="focus:outline-none focus:ring-0"
                >
                  {intl.formatMessage({
                    id: 'ledgers.sheet.tabs.details',
                    defaultMessage: 'Ledger Details'
                  })}
                </TabsTrigger>
                <TabsTrigger value="metadata">
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="flex flex-grow flex-col gap-4">
                  <InputField
                    name="name"
                    label={intl.formatMessage({
                      id: 'entity.ledger.name',
                      defaultMessage: 'Ledger Name'
                    })}
                    control={form.control}
                    required
                  />

                  <p className="text-xs font-normal italic text-shadcn-400">
                    {intl.formatMessage({
                      id: 'common.requiredFields',
                      defaultMessage: '(*) required fields.'
                    })}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="metadata">
                <MetadataField name="metadata" control={form.control} />
              </TabsContent>
            </Tabs>

            <SheetFooter>
              <LoadingButton
                size="lg"
                type="submit"
                disabled={!(form.formState.isDirty && form.formState.isValid)}
                fullWidth
                loading={createPending || updatePending}
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
