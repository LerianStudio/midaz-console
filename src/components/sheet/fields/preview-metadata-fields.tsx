import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { MetadataItem } from '@/types/metadata-type'

export type PreviewMetadataFields = {
  id: string
  key: string
  value: string
}

export type PreviewMetadataFieldsProps = {
  metaFields: MetadataItem[]
  remove: (index: number) => void
}

export const PreviewMetadataFields = ({
  metaFields,
  remove
}: PreviewMetadataFieldsProps) => {
  return metaFields.map((item, index) => (
    <div key={item.id} className="mt-2 flex items-center justify-between">
      <div className="flex w-full gap-5">
        <div className="flex flex-1 gap-2">
          <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-3">
            <span className="text-sm">{item.key}</span>
          </div>
          <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-3">
            <span className="text-sm">{item.value}</span>
          </div>
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
  ))
}
