import React from 'react'
import { Button } from '@/components/ui/button/button'
import {
  Sheet as BaseSheet,
  SheetClose,
  SheetContent,
  SheetFooter
} from '@/components/ui/sheet'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { SheetHeaderSection } from './sheet-header-section'
import { FormContent } from './form-content'
import { SheetProps } from '@/types/sheet-type'

export const Sheet = ({ sheetProps, formProps, stateProps }: SheetProps) => {
  // console.log(sheetProps, formProps, stateProps)
  const { open, setOpen, sheetInfo } = sheetProps

  const {
    form,
    fields,
    isDirty,
    isValid,
    handleSubmit,
    metaFields,
    append,
    remove
  } = formProps

  const {
    isCreateMode,
    isSwitchOn,
    setSwitchOn,
    currentMetadata,
    setCurrentMetadata
  } = stateProps

  const formContentProps = {
    fields,
    form,
    isCreateMode,
    isSwitchOn,
    setSwitchOn,
    currentMetadata,
    setCurrentMetadata,
    metaFields,
    append,
    remove
  }

  return (
    <BaseSheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="flex max-h-screen w-2/5 flex-col justify-between overflow-x-auto px-8 pb-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeaderSection sheetInfo={sheetInfo} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-grow flex-col"
          >
            <FormContent {...formContentProps} />
            <SheetFooter className="mt-auto flex justify-center py-8 pt-20">
              <SheetClose asChild>
                <Button
                  size="lg"
                  type="submit"
                  className={cn(
                    'w-full bg-shadcn-600 text-white hover:bg-shadcn-600/70',
                    !(isDirty && isValid) && 'bg-shadcn-200 text-shadcn-600'
                  )}
                  disabled={!(isDirty && isValid)}
                >
                  {sheetInfo.buttonText}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </BaseSheet>
  )
}
