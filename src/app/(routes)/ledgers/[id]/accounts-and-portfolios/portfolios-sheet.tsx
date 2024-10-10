import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader
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
import { cn } from '@/lib/utils'
import { SheetProps } from '@/types/sheet-type'
import { HelpCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

import { MetadataSection } from '@/components/sheet/metadata-section'
// import { useCreatePortfolio } from '@/hooks/portfolios-and-accounts/use-create-portfolio'
import { useIntl } from 'react-intl'
import { v4 as uuidv4 } from 'uuid'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useCreatePortfolio, useListPortfolios } from '@/client/portfolios'
import { DialogProps } from '@radix-ui/react-dialog'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { LoadingButton } from '@/components/ui/loading-button'

export type PortfolioSheetProps = DialogProps & {
  ledgerId: string
  mode: 'create' | 'edit'
  data?: PortfolioResponseDto | null
  onSucess?: () => void
}

const defaultValues = {
  name: '',
  entityId: '',
  metadata: []
}

type FormData = z.infer<typeof formSchemaPortfolio>

export const PortfolioSheet = ({
  mode,
  data,
  onSucess,
  onOpenChange,
  ...others
}: PortfolioSheetProps) => {
  const { id: ledgerId } = useParams()
  const intl = useIntl()
  const [showMetadata, setShowMetadata] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState({
    id: '',
    key: '',
    value: ''
  })

  const { mutate: createPortfolio, isPending: createPending } =
    useCreatePortfolio({
      organizationId: 'b36c9055-01cd-4232-8bed-d4dd2b826b1e',
      ledgerId: '38eff558-757a-4ca6-ae16-d4a6aef0f4d3',
      onSuccess: () => {
        onSucess?.()
        onOpenChange?.(false)
      }
    })

  // const { mutate: updateProduct, isPending: updatePending } = useListPortfolios({
  //   organizationId: '1c494870-8c14-41ba-b63f-8fe40c5173c3',
  //   ledgerId: '74e15716-f5c6-4c86-9641-a7ffa729895c',
  //   productId: data?.id!,
  //   onSuccess: () => {
  //     onSucess?.()
  //     onOpenChange?.(false)
  //   }
  // })

  const form = useForm<z.infer<typeof formSchemaPortfolio>>({
    resolver: zodResolver(formSchemaPortfolio),
    defaultValues: Object.assign({}, defaultValues, formSchemaPortfolio)
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'metadata'
  })

  const handleSubmit = (data: FormData) => {
    console.log('whats the mode', mode)
    console.log('gimme data', data)
    if (mode === 'create') {
      createPortfolio(data)
    }

    form.reset(defaultValues)
  }

  return (
    <Sheet onOpenChange={onOpenChange} {...others}>
      <SheetContent
        className="flex max-h-screen w-2/5 flex-col justify-between overflow-x-auto px-8 pb-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-grow flex-col overflow-y-auto">
          <SheetHeader>New Portfolio</SheetHeader>
          <p className="mb-4 text-sm text-gray-500">
            Preencha os dados do Portfólio que você deseja criar.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      Entity ID *
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Enter the unique identifier for the entity
                              associated with this portfolio.
                            </p>
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

              <MetadataSection
                isSwitchOn={showMetadata}
                setSwitchOn={setShowMetadata}
                currentMetadata={currentMetadata}
                setCurrentMetadata={setCurrentMetadata}
                metaFields={fields.map((field) => ({
                  ...field,
                  key: field.key || '',
                  value: field.value || ''
                }))}
                append={append}
                remove={remove}
              />
              <SheetFooter className="sticky bottom-0 mt-auto bg-white py-4">
                <SheetClose asChild>
                  <LoadingButton
                    size="lg"
                    type="submit"
                    disabled={
                      !(form.formState.isDirty && form.formState.isValid)
                    }
                    fullWidth
                    loading={createPending}
                  >
                    {intl.formatMessage({
                      id: 'common.save',
                      defaultMessage: 'Save'
                    })}
                  </LoadingButton>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>

    //  {/* <ConfirmationDialog
    //     open={isDialogOpen}
    //     onOpenChange={setIsDialogOpen}
    //     title={intl.formatMessage({
    //       id: 'ledgers.dialog.title',
    //       defaultMessage: 'Are you sure?'
    //     })}
    //     description={intl.formatMessage({
    //       id: 'ledgers.dialog.subtitle',
    //       defaultMessage:
    //         'This action is irreversible. This will deactivate your Ledger forever {ledgerName}.'
    //     })}
    //     onConfirm={() => {}}
    //     onCancel={() => setIsDialogOpen(false)}
    //   /> */}
  )
}
