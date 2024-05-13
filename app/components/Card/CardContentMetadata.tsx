'use client'

import { Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button/button'
import { CardContent } from '../ui/card/card'
import { Input } from '../ui/input/input'
import { Label } from '../ui/label/label'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'

type Metadata = {
  key: string
  value: string
}

type MetadataValues = {
  metadata: Metadata[]
}

const formSchema = z.object({
  metadata: z.array(
    z.object({
      key: z.string(),
      value: z.string()
    })
  )
})

const AddMetadataFields = ({
  currentMetadata,
  handleMetadataChange,
  handleAddMetadata
}: any) => (
  <div className="mt-6 flex gap-5">
    <div className="flex w-full gap-3">
      <div className="flex flex-1 flex-col gap-4">
        <Label htmlFor="key">Key</Label>
        <Input
          id="key"
          value={currentMetadata.key}
          onChange={handleMetadataChange('key')}
          placeholder="Type..."
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          value={currentMetadata.value}
          onChange={handleMetadataChange('value')}
          placeholder="Type..."
        />
      </div>
    </div>

    <Button
      onClick={handleAddMetadata}
      className="h-9 w-9 self-end rounded-full bg-shadcn-600 disabled:bg-shadcn-200"
      disabled={!currentMetadata.key || !currentMetadata.value}
    >
      <Plus
        size={16}
        className={cn(
          'shrink-0',
          !currentMetadata.key || !currentMetadata.value
            ? 'text-shadcn-400'
            : 'text-white'
        )}
      />
    </Button>
  </div>
)

const PreviewMetadataFields = ({ register, item, index, remove }: any) => (
  <div key={index} className="mt-3 flex items-center justify-between">
    <div className="flex w-full gap-5">
      <div className="flex flex-1 gap-3">
        <Input
          defaultValue={item.key}
          {...register(`metadata.${index}.key` as const)}
        />

        <Input
          defaultValue={item.value}
          {...register(`metadata.${index}.value` as const)}
        />
      </div>

      <Button
        onClick={() => remove(index)}
        className="group h-9 w-9 rounded-full border border-shadcn-200 bg-white hover:border-none"
      >
        <Trash
          size={16}
          className="shrink-0 text-black group-hover:text-white"
        />
      </Button>
    </div>
  </div>
)

export const CustomCardContentMetadata = ({ data }: any) => {
  const [currentMetadata, setCurrentMetadata] = useState({ key: '', value: '' })

  const initialFormData = {
    ...data,
    metadata: Object.entries(data.metadata || {}).map(([key, value]) => ({
      key,
      value
    }))
  }

  const form = useForm<MetadataValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormData
  })

  const { control, handleSubmit, register } = form

  const {
    fields: metaFields,
    append,
    remove
  } = useFieldArray<MetadataValues, 'metadata'>({
    control,
    name: 'metadata'
  })

  const handleAddMetadata = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (currentMetadata.key && currentMetadata.value) {
      append(currentMetadata)
      setCurrentMetadata({ key: '', value: '' })
    }
  }

  const handleMetadataChange =
    (field: 'key' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentMetadata({
        ...currentMetadata,
        [field]: e.target.value
      })
    }

  return (
    <CardContent className="p-0">
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <AddMetadataFields
          currentMetadata={currentMetadata}
          handleMetadataChange={handleMetadataChange}
          handleAddMetadata={handleAddMetadata}
        />

        {metaFields.map((item, index) => (
          <PreviewMetadataFields
            key={index}
            register={register}
            item={item}
            index={index}
            remove={remove}
          />
        ))}

        <div className="mt-7">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </CardContent>
  )
}
