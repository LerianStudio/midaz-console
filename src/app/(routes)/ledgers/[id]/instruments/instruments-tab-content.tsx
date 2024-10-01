import { DataTable } from '@/components/data-table'
import { useInstruments } from '@/utils/queries'
import { instrumentsColumns } from './instruments-columns'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { NoResource } from '@/components/no-resource'
import { useSheetMode } from '@/hooks/ledgers/use-sheet-mode'
import { getInstrumentsFormFields } from './instruments-form-fields'
import { instrumentsSchema } from './instruments-form-schema'
import { getInstrumentsSheetInfo } from '@/helpers/instruments/instruments-helpers'
import { SheetContainer } from '@/components/sheet/sheet-container'
import { useIntl } from 'react-intl'

export const InstrumentsTabContent = ({ data }: any) => {
  const intl = useIntl()
  const instruments = useInstruments(data?.id)
  const formFields: any = getInstrumentsFormFields(intl)
  const { sheetMode, handleOpenCreateSheet, setSheetMode } = useSheetMode()

  const getLoadingSkeleton = () => {
    return (
      <React.Fragment>
        <Skeleton className="h-[84px] w-full bg-zinc-200" />
        <Skeleton className="mt-6 h-[390px] w-full bg-zinc-200" />
      </React.Fragment>
    )
  }

  const sheetInfo = getInstrumentsSheetInfo(
    sheetMode.mode,
    sheetMode.ledgersData,
    intl
  )

  const handleSubmit = async () => {}

  const sheetProps = React.useMemo(
    () => ({
      open: sheetMode.isOpen,
      setOpen: (isOpen: boolean) => setSheetMode({ ...sheetMode, isOpen }),
      fields: formFields,
      formSchema: instrumentsSchema,
      sheetInfo: sheetInfo,
      onSubmit: handleSubmit,
      mode: sheetMode.mode,
      data: sheetMode.ledgersData
    }),
    [sheetMode, formFields, instrumentsSchema, sheetInfo, handleSubmit]
  )

  const getInstrumentsComponent = () => {
    if (instruments.isLoading) {
      return getLoadingSkeleton()
    }

    return (
      <div>
        {instruments.data && instruments.data.length > 0 ? (
          <DataTable columns={instrumentsColumns} data={instruments.data} />
        ) : (
          <NoResource
            resourceName="Instrumento"
            onClick={handleOpenCreateSheet}
            pronoun="he"
          />
        )}

        <SheetContainer {...sheetProps} />
      </div>
    )
  }

  return <div>{getInstrumentsComponent()}</div>
}
