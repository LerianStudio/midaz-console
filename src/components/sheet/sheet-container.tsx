import React, { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sheet } from './index'
import { FormFieldConfig, SheetContainerProps } from '@/types/sheet-type'
import { MetadataItem } from '@/types/metadata-type'

const getDefaultValues = (data: any, fields: FormFieldConfig[]) => {
  return data
    ? data
    : fields.reduce(
        (acc: any, field: FormFieldConfig) => ({ ...acc, [field.name]: '' }),
        {}
      )
}

export const SheetContainer = ({
  open,
  setOpen,
  fields,
  formSchema,
  sheetInfo,
  onSubmit,
  mode,
  data
}: SheetContainerProps) => {
  const [isSwitchOn, setSwitchOn] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState<MetadataItem>({
    id: '',
    key: '',
    value: ''
  })

  const isCreateMode = mode === 'create'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      metadata: [],
      isSwitchOn: false,
      ...getDefaultValues(data, fields)
    }
  })

  const { control, formState, reset } = form
  const { isValid, isDirty } = formState

  const {
    fields: metaFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'metadata'
  })

  const prevDataRef = useRef(data)

  useEffect(() => {
    if (data && data !== prevDataRef.current) {
      form.reset(getDefaultValues(data, fields))
      prevDataRef.current = data
    }
  }, [data, fields])

  const handleSubmit = async (values: any) => {
    await onSubmit(values)
    reset()
    setSwitchOn(false)
  }

  const sheetProps = {
    open,
    setOpen,
    sheetInfo
  }

  const formProps = {
    form,
    fields,
    isDirty,
    isValid,
    handleSubmit,
    metaFields,
    append,
    remove
  }

  const stateProps = {
    isCreateMode,
    isSwitchOn,
    setSwitchOn,
    currentMetadata,
    setCurrentMetadata
  }

  return (
    <Sheet
      sheetProps={sheetProps}
      formProps={formProps}
      stateProps={stateProps}
    />
  )
}
