import { ContainerModule, interfaces } from 'inversify'

import {
  CreateAsset,
  CreateAssetUseCase
} from '@/core/application/use-cases/assets/create-asset-use-case'
import {
  DeleteAsset,
  DeleteAssetUseCase
} from '@/core/application/use-cases/assets/delete-asset-use-case'
import {
  FetchAllAssets,
  FetchAllAssetsUseCase
} from '@/core/application/use-cases/assets/fetch-all-assets-use-case'
import { FetchAssetByIdUseCase } from '@/core/application/use-cases/assets/fetch-asset-by-id-use-case'
import {
  UpdateAsset,
  UpdateAssetUseCase
} from '@/core/application/use-cases/assets/update-asset-use-case'

import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'
import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { FetchAssetByIdRepository } from '@/core/domain/repositories/assets/fetch-asset-by-id-repository'
import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'

import { MidazCreateAssetRepository } from '../midaz/assets/midaz-create-asset-repository'
import { MidazDeleteAssetRepository } from '../midaz/assets/midaz-delete-asset-repository'
import { MidazFetchAllAssetsRepository } from '../midaz/assets/midaz-fetch-all-assets-repository'
import { MidazFetchAssetByIdRepository } from '../midaz/assets/midaz-fetch-asset-by-id-repository'
import { MidazUpdateAssetRepository } from '../midaz/assets/midaz-update-asset-repository'

export const AssetRegistry = {
  CreateAssetUseCase: Symbol.for('CreateAssetUseCase'),
  FetchAllAssetsUseCase: Symbol.for('FetchAllAssetsUseCase'),
  FetchAssetByIdUseCase: Symbol.for('FetchAssetByIdUseCase'),
  UpdateAssetUseCase: Symbol.for('UpdateAssetUseCase'),
  DeleteAssetUseCase: Symbol.for('DeleteAssetUseCase'),

  CreateAssetRepository: Symbol.for('CreateAssetRepository'),
  FetchAllAssetsRepository: Symbol.for('FetchAllAssetsRepository'),
  FetchAssetByIdRepository: Symbol.for('FetchAssetByIdRepository'),
  UpdateAssetRepository: Symbol.for('UpdateAssetRepository'),
  DeleteAssetRepository: Symbol.for('DeleteAssetRepository')
}

export const AssetModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreateAssetRepository>(
    AssetRegistry.CreateAssetRepository
  ).toConstantValue(new MidazCreateAssetRepository())

  bind<CreateAsset>(AssetRegistry.CreateAssetUseCase).toDynamicValue(
    (context) => {
      return new CreateAssetUseCase(
        context.container.get(AssetRegistry.CreateAssetRepository)
      )
    }
  )

  bind<FetchAllAssetsRepository>(
    AssetRegistry.FetchAllAssetsRepository
  ).toConstantValue(new MidazFetchAllAssetsRepository())

  bind<FetchAllAssets>(AssetRegistry.FetchAllAssetsUseCase).toDynamicValue(
    (context) => {
      return new FetchAllAssetsUseCase(
        context.container.get(AssetRegistry.FetchAllAssetsRepository)
      )
    }
  )

  bind<FetchAssetByIdRepository>(
    AssetRegistry.FetchAssetByIdRepository
  ).toConstantValue(new MidazFetchAssetByIdRepository())

  bind<FetchAssetByIdUseCase>(
    AssetRegistry.FetchAssetByIdUseCase
  ).toDynamicValue((context) => {
    return new FetchAssetByIdUseCase(
      context.container.get(AssetRegistry.FetchAssetByIdRepository)
    )
  })

  bind<UpdateAssetRepository>(
    AssetRegistry.UpdateAssetRepository
  ).toConstantValue(new MidazUpdateAssetRepository())

  bind<UpdateAsset>(AssetRegistry.UpdateAssetUseCase).toDynamicValue(
    (context) => {
      return new UpdateAssetUseCase(
        context.container.get(AssetRegistry.UpdateAssetRepository)
      )
    }
  )

  bind<DeleteAssetRepository>(
    AssetRegistry.DeleteAssetRepository
  ).toConstantValue(new MidazDeleteAssetRepository())

  bind<DeleteAsset>(AssetRegistry.DeleteAssetUseCase).toDynamicValue(
    (context) => {
      return new DeleteAssetUseCase(
        context.container.get(AssetRegistry.DeleteAssetRepository)
      )
    }
  )
})
