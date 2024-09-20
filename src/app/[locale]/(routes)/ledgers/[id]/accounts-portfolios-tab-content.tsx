import { Card } from "@/components/card"
import { Button } from "@/components/ui/button/button"
import { useSheetMode } from "@/hooks/ledgers/use-sheet-mode"
import { PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"
import { getPortfoliosFormField } from "../ledgers-form-fields"
import { LedgerEntity } from "@/core/domain/entities/ledger-entity"
import { formSchema } from "../ledgers-form-schema"
import { getSheetInfo } from "@/helpers/ledgers/ledgers-helpers"
import { Sheet } from "@/components/sheet"
import { Skeleton } from "@/components/ui/skeleton"

export const AccountsPortfoliosTabContent = () => {
  const t = useTranslations('ledgers')
  const formFields: any = getPortfoliosFormField(t)

  const {
    sheetMode,
    handleOpenCreateSheet,
    handleOpenViewSheet,
    setSheetMode
  } = useSheetMode();


  const getLoadingSkeleton = () => {
    return (
      <React.Fragment>
        <Skeleton className="h-[84px] w-full bg-zinc-200" />
        <Skeleton className="mt-6 h-[390px] w-full bg-zinc-200" />
      </React.Fragment>
    )
  }


  const handleSubmit = async (values: LedgerEntity) => {
    console.log(values)

    // const mergedValues = { ...defaultLedgerSchema, ...values }

    // if (sheetMode.mode === 'create') {
    //   await createLedgerData(mergedValues)
    // }

    // console.log(mergedValues)
  }

  const sheetInfo = getSheetInfo(sheetMode.mode, sheetMode.ledgersData, t)


  const sheetProps = React.useMemo(
    () => ({
      open: sheetMode.isOpen,
      setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
      fields: formFields,
      formSchema: formSchema,
      sheetInfo: sheetInfo,
      onSubmit: handleSubmit,
      mode: sheetMode.mode,
      data: sheetMode.ledgersData
    }),
    [sheetMode, formFields, sheetInfo, handleSubmit]
  )

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card.Root>
        <div className="flex justify-between items-center">
          <div>
            <Card.Header title="Portfólios" className="text-lg capitalize" />
            <p className="text-sm text-gray-500 mt-2">Nenhum portfólio encontrado.</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleOpenCreateSheet()}
            className="flex items-center px-4 py-2 rounded-md shadow transition"
          >
            <span>Criar o primeiro portfólio</span>
            <PlusIcon className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <Sheet {...sheetProps} />
      </Card.Root>

      <Card.Root>
        <div className="flex justify-between items-center">
          <div>
            <Card.Header title="Contas" className="text-lg capitalize" />
            <p className="text-sm text-gray-500 mt-2">Nenhum portfólio encontrado.</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log('Criar')}
            className="flex items-center px-4 py-2 rounded-md shadow transition gray"
            disabled={true}
          >
            <span>Você precisa de um portfólio para criar contas</span>
          </Button>
        </div>
      </Card.Root>
    </div>

  )
}