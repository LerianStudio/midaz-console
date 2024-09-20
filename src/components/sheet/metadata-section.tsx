import React from 'react'
import { Label } from '@/components/ui/label/label'
import { Switch } from '@/components/ui/switch'
import { MetadataFields } from './fields/metadata-fields'
import { PreviewMetadataFields } from './fields/preview-metadata-fields'
import { MetadataSectionProps } from '@/types/metadata-type'

export const MetadataSection = ({
  isSwitchOn,
  setSwitchOn,
  currentMetadata,
  setCurrentMetadata,
  metaFields,
  append,
  remove
}: MetadataSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="gap- flex flex-col gap-4">
        <Label htmlFor="metadata">Metadados</Label>
        <Switch
          id="metadata"
          checked={isSwitchOn}
          onCheckedChange={() => setSwitchOn(!isSwitchOn)}
          className="data-[state=checked]:bg-[#52525B] data-[state=unchecked]:bg-[#E5E7EB]"
        />
      </div>

      {isSwitchOn && (
        <React.Fragment>
          <MetadataFields
            currentMetadata={currentMetadata}
            setCurrentMetadata={setCurrentMetadata}
            append={append}
          />
          <PreviewMetadataFields metaFields={metaFields} remove={remove} />
        </React.Fragment>
      )}

      <p className="text-xs font-normal italic text-shadcn-400">
        (*) campos obrigatórios.
      </p>
    </div>
  )
}
