export interface DeleteAssetRepository {
  delete: (
    organizationId: string,
    ledgerId: string,
    assetId: string
  ) => Promise<void>
}
