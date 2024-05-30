import React from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '../ui/label/label'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MetadataItem } from '@/types/MetadataType'

type MetadataFieldsProps = {
  currentMetadata: { key: string; value: string }
  setCurrentMetadata: React.Dispatch<
    React.SetStateAction<{ key: string; value: string }>
  >
  append: (value: MetadataItem) => void
}

export const MetadataFields = ({
  currentMetadata,
  setCurrentMetadata,
  append
}: MetadataFieldsProps) => {
  const handleAddMetadata = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentMetadata.key && currentMetadata.value) {
      append({ ...currentMetadata })
      setCurrentMetadata({ key: '', value: '' })
    }
  }

  const handleMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCurrentMetadata({
      ...currentMetadata,
      [field]: e.target.value
    })
  }

  return (
    <div className="flex gap-5">
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="key">Chave</Label>
          <Input
            id="key"
            value={currentMetadata.key}
            onChange={(e) => handleMetadataChange(e, 'key')}
            placeholder="Key"
            className="h-9"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            value={currentMetadata.value}
            onChange={(e) => handleMetadataChange(e, 'value')}
            placeholder="Value"
            className="h-9"
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
}
