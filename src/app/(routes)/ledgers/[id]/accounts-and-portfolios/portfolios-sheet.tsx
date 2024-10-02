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
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { SheetProps } from '@/types/sheet-type'
import { Plus, Trash2, HelpCircle } from 'lucide-react'

import { formSchemaPortfolio } from './accounts-and-portfolios-form-schema'

export const PortfolioSheet = ({ sheetProps }: SheetProps) => {
  const { open, setOpen } = sheetProps
  const [showMetadata, setShowMetadata] = useState(false)

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

  const onSubmit = (data: z.infer<typeof formSchemaPortfolio>) => {
    console.log(data)
    // Handle form submission
  }

  return (
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
                    <FormLabel className="flex items-center">
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

              <div className="space-y-2">
                <FormLabel>Metadata</FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={showMetadata}
                    onCheckedChange={setShowMetadata}
                    id="show-metadata"
                  />
                </div>
              </div>

              {showMetadata && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <FormLabel>Metadata</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ key: '', value: '' })}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Metadata
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="mt-2 flex items-center space-x-2"
                    >
                      <FormField
                        control={form.control}
                        name={`metadata.${index}.key`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} placeholder="Key" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`metadata.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} placeholder="Value" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
  )
}
