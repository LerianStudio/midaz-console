import React, { useState } from 'react'
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { isNil } from 'lodash'
import { useIntl } from 'react-intl'
import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'
import { useCreatePortfolio, useUpdatePortfolio } from '@/client/portfolios'
import { DialogProps } from '@radix-ui/react-dialog'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { LoadingButton } from '@/components/ui/loading-button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Label } from '@/components/ui/label'
import { MetadataField } from '@/components/form/metadata-field'
import { Switch } from '@/components/ui/switch'
import { metadata } from '@/schema/metadata'
import { InputField } from '@/components/form'

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

type FormData = z.infer<typeof formSchemaPortfolio>

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
  const [metadataEnabled, setMetadataEnabled] = React.useState(
    Object.entries(metadata || {}).length > 0
  )

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

  const form = useForm<z.infer<typeof formSchemaPortfolio>>({
    resolver: zodResolver(formSchemaPortfolio),
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

  React.useEffect(() => {
    if (!isNil(data)) {
      setMetadataEnabled(Object.entries(data.metadata || {}).length > 0)
      if (mode === 'edit') {
        const { entityId, ...dataWithoutEntityId } = data
        form.reset(dataWithoutEntityId, { keepDefaultValues: true })
      } else {
        form.reset(data, { keepDefaultValues: true })
      }
    } else {
      setMetadataEnabled(false)
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
                  defaultMessage: 'View and edit product fields.'
                })}
              </SheetDescription>
            </SheetHeader>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-grow flex-col gap-8"
            >
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
                <FormField
                  control={form.control}
                  name="entityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        {intl.formatMessage({
                          id: 'entity.portfolio.entityId',
                          defaultMessage: 'Entity Id'
                        })}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              {intl.formatMessage({
                                id: 'entity.portfolio.description',
                                defaultMessage:
                                  'Enter the unique identifier for the entity associated with this portfolio'
                              })}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
