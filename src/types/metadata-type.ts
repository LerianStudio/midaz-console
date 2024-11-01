export type Metadata = Record<string, any>

export type MetadataItem = {
  id: string
  key: string
  value: string
}

export type MetadataValues = MetadataItem[]

export type MetadataSectionProps = {
  isSwitchOn: boolean
  setSwitchOn: React.Dispatch<React.SetStateAction<boolean>>
  currentMetadata: MetadataItem
  setCurrentMetadata: React.Dispatch<React.SetStateAction<MetadataItem>>
  metaFields: MetadataItem[]
  append: (value: Partial<MetadataItem>) => void
  remove: (index: number) => void
}
