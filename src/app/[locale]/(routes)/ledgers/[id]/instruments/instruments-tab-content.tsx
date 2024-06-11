import { DataTable } from '@/components/DataTable'
import { useInstruments } from '@/utils/queries'
import { instrumentsColumns } from './instruments-columns'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { NoResource } from '@/components/NoResource'
import { useSheetMode } from '@/hooks/ledgers/useSheetMode'
import { getInstrumentsFormFields } from './instruments-form-fields'
import { instrumentsSchema } from './instruments-form-schema'
import { getSheetInfo } from '@/helpers/ledgers/ledgersHelpers'
import { useTranslations } from 'next-intl'
import { Sheet } from '@/components/Sheet'
import { getInstrumentsSheetInfo } from '@/helpers/instruments/instrumentsHelpers'

export const InstrumentsTabContent = ({ data }: any) => {
  const instruments = useInstruments(data?.id)
  const t = useTranslations('instruments')
  const formFields: any = getInstrumentsFormFields(t)
  const {
    sheetMode,
    handleOpenCreateSheet,
    handleOpenViewSheet,
    setSheetMode
  } = useSheetMode()

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
    t
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

        <Sheet {...sheetProps} />
      </div>
    )
  }

  return <div>{getInstrumentsComponent()}</div>
}
