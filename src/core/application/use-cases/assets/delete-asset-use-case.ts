import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'

export interface DeleteAsset {
  execute: (
    organizationId: string,
    ledgerId: string,
    assetId: string
  ) => Promise<void>
}

export class DeleteAssetUseCase implements DeleteAsset {
  constructor(private readonly deleteAssetRepository: DeleteAssetRepository) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    assetId: string
  ): Promise<void> {
    await this.deleteAssetRepository.delete(organizationId, ledgerId, assetId)
  }
}
