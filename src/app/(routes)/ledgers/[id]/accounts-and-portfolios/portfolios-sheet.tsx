import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Sheet as BaseSheet,
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

import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'
import { MetadataSection } from '@/components/sheet/metadata-section'
import ConfirmationDialog from '@/components/confirmation-dialog/confirmation-dialog'
import { useCreatePortfolio } from '@/hooks/portfolios-and-accounts/use-create-portfolio'
import { useIntl } from 'react-intl'
import { v4 as uuidv4 } from 'uuid'
import { LedgerPortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

export const PortfolioSheet = ({ sheetProps }: SheetProps) => {
  const { id: ledgerId } = useParams()
  const intl = useIntl()
  const { open, setOpen } = sheetProps
  const [showMetadata, setShowMetadata] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState({
    id: '',
    key: '',
    value: ''
  })
  const createPortfolioData = useCreatePortfolio()

  const { isDialogOpen, setIsDialogOpen, handleConfirmCreatePortfolio } =
    useCreatePortfolio()

  const form = useForm<z.infer<typeof formSchemaPortfolio>>({
    resolver: zodResolver(formSchemaPortfolio),
    defaultValues: {
      portfolio_name: '',
      entity_id: '',
      metadata: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'metadata'
  })

  const {
    handleSubmit,
    formState: { isDirty, isValid }
  } = form

  const onSubmit = async (data: z.infer<typeof formSchemaPortfolio>) => {
    try {
      const dataToSubmit: LedgerPortfoliosEntity = {
        id: uuidv4(),
        portfolio_name: data.portfolio_name,
        entity_id: data.entity_id,
        ledger_id: ledgerId as string,
        metadata: Object.fromEntries(
          data.metadata
            ?.filter(
              (item): item is { key: string; value: string } =>
                item !== undefined &&
                item.key !== undefined &&
                item.value !== undefined
            )
            .map((item) => [item.key, item.value]) ?? []
        ),
        status: {
          code: 'ACTIVE',
          description: null
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null
      }

      console.log(dataToSubmit)

      await createPortfolioData.handleCreatePortfolio(
        ledgerId as string,
        dataToSubmit
      )

      form.reset({
        portfolio_name: '',
        entity_id: '',
        metadata: []
      })
      setIsDialogOpen(true)
      setOpen(false)
    } catch (error) {
      console.error('Failed to create portfolio:', error)
    }
  }

  return (
    <>
      <BaseSheet open={open} onOpenChange={setOpen}>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="portfolio_name"
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
                  name="entity_id"
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
              </form>
            </Form>
          </div>

          <SheetFooter className="sticky bottom-0 mt-auto bg-white py-4">
            <SheetClose asChild>
              <Button
                size="lg"
                type="submit"
                className={cn(
                  'w-full bg-shadcn-600 text-white hover:bg-shadcn-600/70',
                  !(isDirty && isValid) && 'bg-shadcn-200 text-shadcn-600'
                )}
                disabled={!(isDirty && isValid)}
                onClick={form.handleSubmit(onSubmit)}
              >
                Create Portfolio
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </BaseSheet>

      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={intl.formatMessage({
          id: 'ledgers.dialog.title',
          defaultMessage: 'Are you sure?'
        })}
        description={intl.formatMessage({
          id: 'ledgers.dialog.subtitle',
          defaultMessage:
            'This action is irreversible. This will deactivate your Ledger forever {ledgerName}.'
        })}
        onConfirm={() => {}}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  )
}
