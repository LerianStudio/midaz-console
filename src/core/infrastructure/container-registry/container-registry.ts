import { InstrumentsAPIAdapter } from '@/core/adapters/instruments-api-adapter'
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
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import InstrumentsUseCases from '@/core/useCases/instruments-use-cases'
import OryAuthUseCases from '@/core/useCases/ory-auth-use-cases'
import { Container } from 'inversify'
import { MidazCreateLedgerRepository } from '../midaz/ledgers/midaz-create-ledger-repository'
import { MidazDeleteLedgerRepository } from '../midaz/ledgers/midaz-delete-ledger-repository'
import { MidazFetchAllLedgersRepository } from '../midaz/ledgers/midaz-fetch-all-ledgers-repository'
import { MidazFetchLedgerByIdRepository } from '../midaz/ledgers/midaz-fetch-ledger-by-id-repository'
import { MidazUpdateLedgerRepository } from '../midaz/ledgers/midaz-update-ledger-repository'
import { MidazCreateOrganizationRepository } from '../midaz/organizations/midaz-create-organization-repository'
import { MidazDeleteOrganizationRepository } from '../midaz/organizations/midaz-delete-organization-repository'
import { MidazFetchAllOrganizationsRepository } from '../midaz/organizations/midaz-fetch-all-organizations-repository'
import { MidazFetchOrganizationByIdRepository } from '../midaz/organizations/midaz-fetch-organization-by-id-repository'
import { MidazUpdateOrganizationRepository } from '../midaz/organizations/midaz-update-organization-repository'

export const Registry = {
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  /**
   * TODO Remove old Registry
   */
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),

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

export const container = new Container()

// External API Adapters

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

container
  .bind<FetchLedgerByIdRepository>(Registry.FetchLedgerByIdRepository)
  .toConstantValue(new MidazFetchLedgerByIdRepository())

container
  .bind<FetchLedgerById>(Registry.FetchLedgerByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchLedgerByIdUseCase(
      context.container.get(Registry.FetchLedgerByIdRepository)
    )
  })

container
  .bind<UpdateLedgerRepository>(Registry.UpdateLedgerRepository)
  .toConstantValue(new MidazUpdateLedgerRepository())

container
  .bind<UpdateLedger>(Registry.UpdateLedgerUseCase)
  .toDynamicValue((context) => {
    return new UpdateLedgerUseCase(
      context.container.get(Registry.UpdateLedgerRepository)
    )
  })

container
  .bind<DeleteLedgerRepository>(Registry.DeleteLedgerRepository)
  .toConstantValue(new MidazDeleteLedgerRepository())

container
  .bind<DeleteLedger>(Registry.DeleteLedgerUseCase)
  .toDynamicValue((context) => {
    return new DeleteLedgerUseCase(
      context.container.get(Registry.DeleteLedgerRepository)
    )
  })
