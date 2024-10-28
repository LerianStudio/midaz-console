type Status = {
  code: string
  description: string
}

type Metadata = Record<string, string>

export type IAssetType = {
  id: string
  ledgerId: string
  organizationId: string
  name: string
  type: string
  code: string
  status: Status
  metadata: Metadata | null
}
