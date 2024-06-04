import { Button } from '@/components/ui/button/button'
import { Trash } from 'lucide-react'
import React from 'react'

type MetadataPreviewProps = {
  metaFields?: Record<string, any>
  handleRemoveMetadata: (key: string) => void
}

const MetadataPreview = ({metaFields, handleRemoveMetadata}: MetadataPreviewProps) => {
  if(!metaFields) return null
  
  const onRemoveMetadata = (key: string) => {
    handleRemoveMetadata(key)
  }
  
  return Object.entries(metaFields).map(([key, value], index) => (
    <div key={index} className="mt-2 flex items-center justify-between">
      <div className="flex w-full gap-5">
        <div className="flex flex-1 gap-2">
          <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
            {key}
          </div>
          <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
            {value}
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault()
            onRemoveMetadata(key)
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
  ))
}

export default MetadataPreview