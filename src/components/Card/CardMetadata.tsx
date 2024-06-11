import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent } from '../ui/card/card'
import { Label } from '../ui/label/label'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { useFormState } from '@/context/FormDetailsContext'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

type CardMetadataProps = {
  data: any
  onChange: (metadata: any[]) => void
}

const formSchema = z.object({
  metadata: z.array(
    z.object({
      key: z.string(),
      value: z.string()
    })
  )
})

const normalizeMetadata = (metadata: any) => {
  return Array.isArray(metadata)
    ? metadata
    : Object.entries(metadata || {}).map(([key, value]) => ({
        key,
        value: value?.toString() || ''
      }))
}

export const CardMetadata = ({ data, onChange }: CardMetadataProps) => {
  const { markAsDirty } = useFormState()
  const [newMetadata, setNewMetadata] = useState({ key: '', value: '' })

  const { control, register, handleSubmit, setValue, watch, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: normalizeMetadata(data.metadata)
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata'
  })

  useEffect(() => {
    const subscription = watch((newValue) => {
      onChange(newValue.metadata ?? [])
    })
    return () => subscription.unsubscribe()
  }, [watch, onChange])

  const handleNewMetadataChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMetadata((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleAddMetadata = () => {
    if (newMetadata.key && newMetadata.value) {
      append(newMetadata)
      setNewMetadata({ key: '', value: '' })
      markAsDirty()
    }
  }

  const handleInputChange =
    (index: number, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(`metadata.${index}.${field}`, e.target.value, {
        shouldValidate: true
      })
    }

  return (
    <CardContent className="p-0">
      <div className="mt-6 flex gap-3">
        <div className="flex w-full gap-3">
          <div className="flex flex-1 flex-col gap-4">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={newMetadata.key}
              onChange={handleNewMetadataChange('key')}
              placeholder="Digite..."
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={newMetadata.value}
              onChange={handleNewMetadataChange('value')}
              placeholder="Digite..."
            />
          </div>
        </div>

        <Button
          onClick={handleAddMetadata}
          className="h-9 w-9 self-end rounded-full bg-shadcn-600 disabled:bg-shadcn-200"
          disabled={!newMetadata.key || !newMetadata.value}
        >
          <Plus
            size={16}
            className={cn(
              'shrink-0 text-shadcn-400',
              newMetadata.key && newMetadata.value && 'text-white'
            )}
          />
        </Button>
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="mt-3 flex items-center justify-between">
          <div className="flex w-full gap-3">
            <Input
              defaultValue={item.key}
              {...register(`metadata.${index}.key`)}
              onChange={() => {
                handleInputChange(index, 'key')
                markAsDirty()
              }}
            />
            <Input
              defaultValue={item.value}
              {...register(`metadata.${index}.value`)}
              onChange={() => {
                handleInputChange(index, 'value')
                markAsDirty()
              }}
            />
            <Button
              onClick={() => {
                remove(index)
                markAsDirty()
              }}
              className="group h-9 w-9 rounded-full border border-shadcn-200 bg-white hover:border-none"
            >
              <Trash
                size={16}
                className="shrink-0 text-black group-hover:text-white"
              />
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
  )
}
