'use client'

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { useFormState } from '@/context/LedgerDetailsContext'
import { Plus, Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent } from '../ui/card/card'
import { Label } from '../ui/label/label'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  metadata: z.array(
    z.object({
      key: z.string(),
      value: z.string()
    })
  )
})

export const CardMetadata = forwardRef(({ data }: any, ref) => {
  const { updateFormData, markAsDirty } = useFormState()
  const [newMetadata, setNewMetadata] = useState({ key: '', value: '' })

  const { control, handleSubmit, register, setValue, getValues } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: Object.entries(data.metadata || {}).map(([key, value]) => ({
        key,
        value
      }))
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata'
  })

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return new Promise((resolve) => {
        handleSubmit((values) => {
          updateFormData({
            metadata: values.metadata.reduce((acc: any, { key, value }) => {
              acc[key] = value
              return acc
            }, {})
          })

          resolve(values)
        })()
      })
    }
  }))

  const handleNewMetadataChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMetadata((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleInputChange =
    (index: number, field: 'key' | 'value') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldPath =
        `metadata.${index}.${field}` as `metadata.${number}.${'key' | 'value'}`

      const currentValue = getValues(fieldPath as any)

      if (currentValue !== e.target.value) {
        markAsDirty()
      }
      setValue(fieldPath as any, e.target.value, { shouldValidate: true })
    }

  const handleAddMetadata = () => {
    if (newMetadata.key && newMetadata.value) {
      append({ key: newMetadata.key, value: newMetadata.value })
      markAsDirty()
      setNewMetadata({ key: '', value: '' })
    }
  }

  return (
    <CardContent className="p-0">
      <div className="mt-6 flex gap-5">
        <div className="flex w-full gap-3">
          <div className="flex flex-1 flex-col gap-4">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={newMetadata.key}
              onChange={handleNewMetadataChange('key')}
              placeholder="Type..."
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={newMetadata.value}
              onChange={handleNewMetadataChange('value')}
              placeholder="Type..."
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
              'shrink-0',
              !newMetadata.key || !newMetadata.value
                ? 'text-shadcn-400'
                : 'text-white'
            )}
          />
        </Button>
      </div>

      {fields.map((item: any, index) => (
        <div key={item.id} className="mt-3 flex items-center justify-between">
          <div className="flex w-full gap-5">
            <div className="flex flex-1 gap-3">
              <Input
                defaultValue={item.key}
                {...register(`metadata.${index}.key` as const)}
                onChange={handleInputChange(index, 'key')}
              />

              <Input
                defaultValue={item.value}
                {...register(`metadata.${index}.value` as const)}
                onChange={handleInputChange(index, 'value')}
              />
            </div>

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
})

CardMetadata.displayName = 'CardMetadata'
