import { ContainerModule, interfaces } from 'inversify'
import {
  CreateLedger,
  CreateLedgerUseCase
} from '@/core/application/use-cases/ledgers/create-ledger-use-case'
import {
  DeleteLedger,
  DeleteLedgerUseCase
} from '@/core/application/use-cases/ledgers/delete-ledger-use-case'
import {
  FetchAllLedgers,
  FetchAllLedgersUseCase
} from '@/core/application/use-cases/ledgers/fetch-all-ledgers-use-case'
import {
  FetchLedgerById,
  FetchLedgerByIdUseCase
} from '@/core/application/use-cases/ledgers/fetch-ledger-by-id-use-case'
import {
  UpdateLedger,
  UpdateLedgerUseCase
} from '@/core/application/use-cases/ledgers/update-ledger-use-case'

import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/ledgers/fetch-all-ledgers-repository'
import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { UpdateLedgerRepository } from '@/core/domain/repositories/ledgers/update-ledger-repository'

import { MidazCreateLedgerRepository } from '../midaz/ledgers/midaz-create-ledger-repository'
import { MidazDeleteLedgerRepository } from '../midaz/ledgers/midaz-delete-ledger-repository'
import { MidazFetchAllLedgersRepository } from '../midaz/ledgers/midaz-fetch-all-ledgers-repository'
import { MidazFetchLedgerByIdRepository } from '../midaz/ledgers/midaz-fetch-ledger-by-id-repository'
import { MidazUpdateLedgerRepository } from '../midaz/ledgers/midaz-update-ledger-repository'

export const LedgerRegistry = {
  CreateLedgerUseCase: Symbol.for('CreateLedgerUseCase'),
  FetchAllLedgersUseCase: Symbol.for('FetchAllLedgersUseCase'),
  FetchLedgerByIdUseCase: Symbol.for('FetchLedgerByIdUseCase'),
  UpdateLedgerUseCase: Symbol.for('UpdateLedgerUseCase'),
  DeleteLedgerUseCase: Symbol.for('DeleteLedgerUseCase'),

  CreateLedgerRepository: Symbol.for('CreateLedgerRepository'),
  FetchAllLedgersRepository: Symbol.for('FetchAllLedgersRepository'),
  FetchLedgerByIdRepository: Symbol.for('FetchLedgerByIdRepository'),
  UpdateLedgerRepository: Symbol.for('UpdateLedgerRepository'),
  DeleteLedgerRepository: Symbol.for('DeleteLedgerRepository')
}

export const LedgerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreateLedgerRepository>(
    LedgerRegistry.CreateLedgerRepository
  ).toConstantValue(new MidazCreateLedgerRepository())

  bind<CreateLedger>(LedgerRegistry.CreateLedgerUseCase).toDynamicValue(
    (context) => {
      return new CreateLedgerUseCase(
        context.container.get(LedgerRegistry.CreateLedgerRepository)
      )
    }
  )

  bind<FetchAllLedgersRepository>(
    LedgerRegistry.FetchAllLedgersRepository
  ).toConstantValue(new MidazFetchAllLedgersRepository())

  bind<FetchAllLedgers>(LedgerRegistry.FetchAllLedgersUseCase).toDynamicValue(
    (context) => {
      return new FetchAllLedgersUseCase(
        context.container.get(LedgerRegistry.FetchAllLedgersRepository)
      )
    }
  )

  bind<FetchLedgerByIdRepository>(
    LedgerRegistry.FetchLedgerByIdRepository
  ).toConstantValue(new MidazFetchLedgerByIdRepository())

  bind<FetchLedgerById>(LedgerRegistry.FetchLedgerByIdUseCase).toDynamicValue(
    (context) => {
      return new FetchLedgerByIdUseCase(
        context.container.get(LedgerRegistry.FetchLedgerByIdRepository)
      )
    }
  )

  bind<UpdateLedgerRepository>(
    LedgerRegistry.UpdateLedgerRepository
  ).toConstantValue(new MidazUpdateLedgerRepository())

  bind<UpdateLedger>(LedgerRegistry.UpdateLedgerUseCase).toDynamicValue(
    (context) => {
      return new UpdateLedgerUseCase(
        context.container.get(LedgerRegistry.UpdateLedgerRepository)
      )
    }
  )

  bind<DeleteLedgerRepository>(
    LedgerRegistry.DeleteLedgerRepository
  ).toConstantValue(new MidazDeleteLedgerRepository())

  bind<DeleteLedger>(LedgerRegistry.DeleteLedgerUseCase).toDynamicValue(
    (context) => {
      return new DeleteLedgerUseCase(
        context.container.get(LedgerRegistry.DeleteLedgerRepository)
      )
    }
  )
})
