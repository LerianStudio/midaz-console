import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Form } from '@/components/ui/form'
import { useParams } from 'next/navigation'
import { isNil } from 'lodash'
import { useIntl } from 'react-intl'
import { useCreatePortfolio, useUpdatePortfolio } from '@/client/portfolios'
import { DialogProps } from '@radix-ui/react-dialog'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { LoadingButton } from '@/components/ui/loading-button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { MetadataField } from '@/components/form/metadata-field'
import { InputField } from '@/components/form'
import { portfolioSchema } from '@/schema/portfolio'
import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type PortfolioSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: PortfolioResponseDto | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  entityId: '',
  metadata: {}
}

type FormData = z.infer<typeof portfolioSchema>

export const PortfolioSheet = ({
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: PortfolioSheetProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()

  const { mutate: createPortfolio, isPending: createPending } =
    useCreatePortfolio({
      organizationId: currentOrganization.id!,
      ledgerId: ledgerId,
      onSuccess: () => {
        onSucess?.()
        onOpenChange?.(false)
      }
    })

  const { mutate: updatePortfolio, isPending: updatePending } =
    useUpdatePortfolio({
      organizationId: currentOrganization.id!,
      ledgerId,
      portfolioId: data?.id!,
      onSuccess: () => {
        onSucess?.()
        onOpenChange?.(false)
      }
    })

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: Object.assign(
      {},
      defaultValues,
      mode === 'create' ? { entityId: '' } : {}
    )
  })

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      createPortfolio(data)
    } else if (mode === 'edit') {
      updatePortfolio(data)
    }

    form.reset(defaultValues)
  }

  // Resets information if using creation mode
  React.useEffect(() => {
    if (mode === 'create') {
      form.reset(defaultValues)
    }
  }, [mode])

  React.useEffect(() => {
    if (!isNil(data)) {
      if (mode === 'edit') {
        const { entityId, ...dataWithoutEntityId } = data
        form.reset(dataWithoutEntityId, { keepDefaultValues: true })
      } else {
        form.reset(data, { keepDefaultValues: true })
      }
    }
  }, [data])

  return (
    <>
      <Sheet onOpenChange={onOpenChange} {...others}>
        <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {mode === 'create' && (
            <SheetHeader>
              <SheetTitle>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.title',
                  defaultMessage: 'New Portfolio'
                })}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.description',
                  defaultMessage:
                    'Fill in the details of the Portfolio you want to create.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          {mode === 'edit' && (
            <SheetHeader>
              <SheetTitle>
                {intl.formatMessage(
                  {
                    id: 'ledgers.portfolio.sheet.edit.title',
                    defaultMessage: 'Edit {portfolioName}'
                  },
                  {
                    portfolioName: data?.name
                  }
                )}
              </SheetTitle>
              <SheetDescription>
                {intl.formatMessage({
                  id: 'ledgers.portfolio.sheet.edit.description',
                  defaultMessage: 'View and edit segment fields.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-grow flex-col"
            >
              <Tabs defaultValue="details" className="mt-0">
                <TabsList className="mb-8 px-0">
                  <TabsTrigger value="details">
                    {intl.formatMessage({
                      id: 'ledgers.portfolio.sheet.tabs.details',
                      defaultMessage: 'Portfolio Details'
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
                        id: 'entity.portfolio.name',
                        defaultMessage: 'Portfolio Name'
                      })}
                      control={form.control}
                      required
                    />

                    {mode === 'create' && (
                      <InputField
                        name="entityId"
                        label={intl.formatMessage({
                          id: 'entity.portfolio.entityId',
                          defaultMessage: 'Entity Id'
                        })}
                        tooltip={intl.formatMessage({
                          id: 'entity.portfolio.description',
                          defaultMessage:
                            'Enter the unique identifier for the entity associated with this portfolio'
                        })}
                        control={form.control}
                      />
                    )}
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

              <SheetFooter className="sticky bottom-0 mt-auto bg-white py-4">
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
    </>
  )
}
