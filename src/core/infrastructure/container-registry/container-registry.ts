import { InstrumentsAPIAdapter } from '@/core/adapters/instruments-api-adapter'
import { LedgersAPIAdapter } from '@/core/adapters/ledgers-api-adapter'
import { OryAuthAPIAdapter } from '@/core/adapters/ory-auth-api-adapter'
import {
  CreateOrganization,
  CreateOrganizationUseCase
} from '@/core/application/use-cases/organizations/create-organization-use-case'
import {
  DeleteOrganization,
  DeleteOrganizationUseCase
} from '@/core/application/use-cases/organizations/delete-organization-use-case'
import {
  FetchAllOrganizations,
  FetchAllOrganizationsUseCase
} from '@/core/application/use-cases/organizations/fetch-all-organizations-use-case'
import {
  FetchOrganizationById,
  FetchOrganizationByIdUseCase
} from '@/core/application/use-cases/organizations/fetch-organization-by-id-use-case'
import {
  FetchParentOrganizations,
  FetchParentOrganizationsUseCase
} from '@/core/application/use-cases/organizations/fetch-parent-organizations-use-case'
import {
  UpdateOrganization,
  UpdateOrganizationUseCase
} from '@/core/application/use-cases/organizations/update-organization-use-case'

import {
  CreateLedger,
  CreateLedgerUseCase
} from '@/core/application/use-cases/ledgers/create-ledgers-use-case'
import {
  FetchAllLedgers,
  FetchAllLedgersUseCase
} from '@/core/application/use-cases/ledgers/fetch-all-ledgers-use-case'
import { CreateLedgerRepository } from '@/core/domain/repositories/legders/create-ledger-repository'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/legders/fetch-all-ledgers-repository'
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import InstrumentsUseCases from '@/core/useCases/instruments-use-cases'
import LedgersUseCases from '@/core/useCases/ledgers-use-cases'
import OryAuthUseCases from '@/core/useCases/ory-auth-use-cases'
import { Container } from 'inversify'
import { MidazCreateLedgerRepository } from '../midaz/ledgers/midaz-create-ledger-repository'
import { MidazFetchAllLedgersRepository } from '../midaz/ledgers/midaz-fetch-all-ledgers-repository'
import { MidazCreateOrganizationRepository } from '../midaz/organizations/midaz-create-organization-repository'
import { MidazDeleteOrganizationRepository } from '../midaz/organizations/midaz-delete-organization-repository'
import { MidazFetchAllOrganizationsRepository } from '../midaz/organizations/midaz-fetch-all-organizations-repository'
import { MidazFetchOrganizationByIdRepository } from '../midaz/organizations/midaz-fetch-organization-by-id-repository'
import { MidazUpdateOrganizationRepository } from '../midaz/organizations/midaz-update-organization-repository'

export const Registry = {
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  /**
   * TODO Remove old Registry
   */
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),

  /**
   * TODO Improve import and instantiation containers
   */

  // Organizations

  CreateOrganizationUseCase: Symbol.for('CreateOrganizationUseCase'),
  FetchAllOrganizationsUseCase: Symbol.for('FetchAllOrganizationsUseCase'),
  FetchOrganizationByIdUseCase: Symbol.for('FetchOrganizationByIdUseCase'),
  FetchParentOrganizationsUseCase: Symbol.for(
    'FetchParentOrganizationsUseCase'
  ),
  UpdateOrganizationUseCase: Symbol.for('UpdateOrganizationUseCase'),
  DeleteOrganizationUseCase: Symbol.for('DeleteOrganizationUseCase'),

  CreateOrganizationRepository: Symbol.for('CreateOrganizationRepository'),
  FetchAllOrganizationsRepository: Symbol.for(
    'FetchAllOrganizationsRepository'
  ),
  FetchOrganizationByIdRepository: Symbol.for(
    'FetchOrganizationByIdRepository'
  ),
  DeleteOrganizationRepository: Symbol.for('DeleteOrganizationRepository'),
  UpdateOrganizationRepository: Symbol.for('UpdateOrganizationRepository'),

  // Ledgers

  CreateLedgerUseCase: Symbol.for('CreateLedgerUseCase'),
  CreateLedgerRepository: Symbol.for('CreateLedgerRepository'),
  FetchAllLedgersUseCase: Symbol.for('FetchAllLedgersUseCase'),
  FetchAllLedgersRepository: Symbol.for('FetchAllLedgersRepository')
}

export const container = new Container()

// External API Adapters

container
  .bind<LedgersAPIAdapter>(Registry.LedgersAPIAdapter)
  .toDynamicValue((context) => {
    return new LedgersAPIAdapter()
  })
container
  .bind<InstrumentsAPIAdapter>(Registry.InstrumentsAPIAdapter)
  .toDynamicValue((context) => {
    return new InstrumentsAPIAdapter()
  })
container
  .bind<OryAuthAPIAdapter>(Registry.OryAuthAPIAdapter)
  .toDynamicValue((context) => {
    return new OryAuthAPIAdapter()
  })

// Use Cases

container
  .bind<LedgersUseCases>(Registry.LedgersUseCases)
  .toDynamicValue((context) => {
    return new LedgersUseCases(
      context.container.get(Registry.LedgersAPIAdapter)
    )
  })

container
  .bind<InstrumentsUseCases>(Registry.InstrumentsUseCases)
  .toDynamicValue((context) => {
    return new InstrumentsUseCases(
      context.container.get(Registry.InstrumentsAPIAdapter)
    )
  })
container
  .bind<OryAuthUseCases>(Registry.OryAuthUseCases)
  .toDynamicValue((context) => {
    return new OryAuthUseCases(
      context.container.get(Registry.OryAuthAPIAdapter)
    )
  })

/**
 * New Containers
 */

// Organizations

container
  .bind<CreateOrganizationRepository>(Registry.CreateOrganizationRepository)
  .toConstantValue(new MidazCreateOrganizationRepository())

container
  .bind<FetchAllOrganizationsRepository>(
    Registry.FetchAllOrganizationsRepository
  )
  .toConstantValue(new MidazFetchAllOrganizationsRepository())

container
  .bind<FetchOrganizationByIdRepository>(
    Registry.FetchOrganizationByIdRepository
  )
  .toConstantValue(new MidazFetchOrganizationByIdRepository())

container
  .bind<DeleteOrganizationRepository>(Registry.DeleteOrganizationRepository)
  .toConstantValue(new MidazDeleteOrganizationRepository())

container
  .bind<UpdateOrganizationRepository>(Registry.UpdateOrganizationRepository)
  .toConstantValue(new MidazUpdateOrganizationRepository())

container
  .bind<CreateOrganization>(Registry.CreateOrganizationUseCase)
  .toDynamicValue((context) => {
    return new CreateOrganizationUseCase(
      context.container.get(Registry.CreateOrganizationRepository)
    )
  })

container
  .bind<FetchAllOrganizations>(Registry.FetchAllOrganizationsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllOrganizationsUseCase(
      context.container.get(Registry.FetchAllOrganizationsRepository)
    )
  })

container
  .bind<FetchOrganizationById>(Registry.FetchOrganizationByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchOrganizationByIdUseCase(
      context.container.get(Registry.FetchOrganizationByIdRepository)
    )
  })

container
  .bind<FetchParentOrganizations>(Registry.FetchParentOrganizationsUseCase)
  .toDynamicValue((context) => {
    return new FetchParentOrganizationsUseCase(
      context.container.get(Registry.FetchOrganizationByIdRepository)
    )
  })

container
  .bind<UpdateOrganization>(Registry.UpdateOrganizationUseCase)
  .toDynamicValue((context) => {
    return new UpdateOrganizationUseCase(
      context.container.get(Registry.UpdateOrganizationRepository)
    )
  })

container
  .bind<DeleteOrganization>(Registry.DeleteOrganizationUseCase)
  .toDynamicValue((context) => {
    return new DeleteOrganizationUseCase(
      context.container.get(Registry.DeleteOrganizationRepository)
    )
  })

// Ledgers

container
  .bind<CreateLedgerRepository>(Registry.CreateLedgerRepository)
  .toConstantValue(new MidazCreateLedgerRepository())

container
  .bind<CreateLedger>(Registry.CreateLedgerUseCase)
  .toDynamicValue((context) => {
    return new CreateLedgerUseCase(
      context.container.get(Registry.CreateLedgerRepository)
    )
  })

container
  .bind<FetchAllLedgersRepository>(Registry.FetchAllLedgersRepository)
  .toConstantValue(new MidazFetchAllLedgersRepository())

container
  .bind<FetchAllLedgers>(Registry.FetchAllLedgersUseCase)
  .toDynamicValue((context) => {
    return new FetchAllLedgersUseCase(
      context.container.get(Registry.FetchAllLedgersRepository)
    )
  })
