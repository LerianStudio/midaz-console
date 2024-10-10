import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

type CardMetadataProps = {
  data: any
  onChange: (metadata: any[]) => void
  onDirtyChange?: (isDirty: boolean) => void
  resetFormTrigger?: boolean
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

export const CardMetadata = ({
  data,
  onChange,
  onDirtyChange,
  resetFormTrigger
}: CardMetadataProps) => {
  const {
    control,
    register,
    reset,
    formState: { isDirty }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: normalizeMetadata(data.metadata)
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata'
  })

  const metadataValues = useWatch({
    control,
    name: 'metadata'
  })

  useEffect(() => {
    onChange(metadataValues ?? [])
  }, [metadataValues, onChange])

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    reset({
      metadata: normalizeMetadata(data.metadata)
    })
  }, [resetFormTrigger, reset])

  const [newMetadata, setNewMetadata] = useState({ key: '', value: '' })

  const handleNewMetadataChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMetadata((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleAddMetadata = () => {
    if (newMetadata.key && newMetadata.value) {
      append(newMetadata)
      setNewMetadata({ key: '', value: '' })
    }
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
            <Input placeholder="Key" {...register(`metadata.${index}.key`)} />

            <Input
              placeholder="Value"
              {...register(`metadata.${index}.value`)}
            />

            <Button
              onClick={() => {
                remove(index)
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
