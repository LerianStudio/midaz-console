import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFormState } from '@/context/form-details-context'
import { ILedgerType } from '@/types/ledgers-type'
import { metadata } from '@/schema/metadata'
import { MetadataValues } from '@/types/metadata-type'

type Metadata = Record<string, string>

type CardMetadataProps = {
  data: ILedgerType
  resetFormTrigger?: boolean
}

const convertToArray = (metadata: Metadata) => {
  return Array.isArray(metadata)
    ? metadata
    : Object.entries(metadata || {}).map(([key, value]) => ({
        key,
        value: value?.toString() || ''
      }))
}

const convertArrayToObject = (array: { key: string; value: string }[]) => {
  if (array.length === 0) {
    return null
  }

  return array.reduce((acc: Record<string, string>, item) => {
    if (item.key && item.value) {
      acc[item.key] = item.value
    }
    return acc
  }, {})
}

export const CardMetadata = ({ data, resetFormTrigger }: CardMetadataProps) => {
  const { updateFormData } = useFormState()
  const { control, register, reset } = useForm({
    resolver: zodResolver(metadata),
    defaultValues: {
      metadata: convertToArray(data.metadata)
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata'
  })

  const [newMetadata, setNewMetadata] = useState({ key: '', value: '' })

  const syncMetadataWithContext = (fieldsArray: MetadataValues) => {
    const metadataObject = convertArrayToObject(fieldsArray)
    updateFormData({ metadata: metadataObject })
  }

  const handleFieldChange =
    (index: number, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      fields[index][field] = e.target.value
      syncMetadataWithContext(fields)
    }

  const handleNewMetadataChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMetadata((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleAddMetadata = () => {
    if (newMetadata.key && newMetadata.value) {
      append(newMetadata)
      syncMetadataWithContext([...fields, newMetadata])
      setNewMetadata({ key: '', value: '' })
    }
  }

  const handleRemoveMetadata = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index)
    remove(index)
    syncMetadataWithContext(updatedFields)
  }

  if (resetFormTrigger) {
    reset({
      metadata: convertToArray(data.metadata)
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
              placeholder="Enter key..."
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={newMetadata.value}
              onChange={handleNewMetadataChange('value')}
              placeholder="Enter value..."
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
              placeholder="Key"
              {...register(`metadata.${index}.key`)}
              onChange={handleFieldChange(index, 'key')}
              defaultValue={item.key}
            />
            <Input
              placeholder="Value"
              {...register(`metadata.${index}.value`)}
              onChange={handleFieldChange(index, 'value')}
              defaultValue={item.value}
            />

            <Button
              onClick={() => handleRemoveMetadata(index)}
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
