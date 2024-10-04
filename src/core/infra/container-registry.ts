import { InstrumentsAPIAdapter } from '@/core/adapters/instruments-api-adapter'
import { LedgersAPIAdapter } from '@/core/adapters/ledgers-api-adapter'
import { OryAuthAPIAdapter } from '@/core/adapters/ory-auth-api-adapter'
import OrganizationRepository from '@/core/repositories/organizations-repository'
import InstrumentsUseCases from '@/core/useCases/instruments-use-cases'
import LedgersUseCases from '@/core/useCases/ledgers-use-cases'
import OrganizationsUseCases from '@/core/useCases/organizations-use-cases'
import OryAuthUseCases from '@/core/useCases/ory-auth-use-cases'
import { Container } from 'inversify'
import {
  CreateOrganization,
  CreateOrganizationUseCase
} from '../application/use-cases/organizations/create-organization-use-case'
import {
  FetchAllOrganizations,
  FetchAllOrganizationsUseCase
} from '../application/use-cases/organizations/fetch-all-organizations-use-case'
import {
  FetchOrganizationById,
  FetchOrganizationByIdUseCase
} from '../application/use-cases/organizations/fetch-organization-by-id-use-case'
import {
  FetchParentOrganizations,
  FetchParentOrganizationsUseCase
} from '../application/use-cases/organizations/fetch-parent-organizations-use-case'
import {
  UpdateOrganization,
  UpdateOrganizationUseCase
} from '../application/use-cases/organizations/update-organization-use-case'
import { MidazCreateOrganizationRepository } from '../infrastructure/midaz/organizations/midaz-create-organization-repository'
import { MidazFetchAllOrganizationsRepository } from '../infrastructure/midaz/organizations/midaz-fetch-all-organizations-repository'
import { MidazFetchOrganizationByIdRepository } from '../infrastructure/midaz/organizations/midaz-fetch-organization-by-id-repository'
import {
  DeleteOrganization,
  DeleteOrganizationUseCase
} from '../application/use-cases/organizations/delete-organization-use-case'
import { MidazDeleteOrganizationRepository } from '../infrastructure/midaz/organizations/midaz-delete-organization-repository'
import { MidazUpdateOrganizationRepository } from '../infrastructure/midaz/organizations/midaz-update-organization-repository'

export const Registry = {
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  // Repository
  OrganizationRepositoryRegistry: Symbol.for('OrganizationRepositoryRegistry'),

  /**
   * TODO Remove old Registry
   */
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),
  OrganizationsUseCasesRegistry: Symbol.for('OrganizationsUseCasesRegistry'),

  /**
   * TODO Improve import and instantiation containers
   */
  CreateOrganizationUseCase: Symbol.for('CreateOrganizationUseCase'),
  FetchAllOrganizationsUseCase: Symbol.for('FetchAllOrganizationsUseCase'),
  FetchOrganizationByIdUseCase: Symbol.for('FetchOrganizationByIdUseCase'),
  FetchParentOrganizationsUseCase: Symbol.for(
    'FetchParentOrganizationsUseCase'
  ),
  UpdateOrganizationUseCase: Symbol.for('UpdateOrganizationUseCase'),
  DeleteOrganizationUseCase: Symbol.for('DeleteOrganizationUseCase')
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

container
  .bind<OrganizationRepository>(Registry.OrganizationRepositoryRegistry)
  .toDynamicValue((context) => {
    return new OrganizationRepository()
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

container
  .bind<OrganizationsUseCases>(Registry.OrganizationsUseCasesRegistry)
  .toDynamicValue((context) => {
    return new OrganizationsUseCases(
      context.container.get(Registry.OrganizationRepositoryRegistry)
    )
  })

/**
 * New Containers
 */

container
  .bind<CreateOrganization>(Registry.CreateOrganizationUseCase)
  .toConstantValue(
    new CreateOrganizationUseCase(new MidazCreateOrganizationRepository())
  )

container
  .bind<FetchAllOrganizations>(Registry.FetchAllOrganizationsUseCase)
  .toConstantValue(
    new FetchAllOrganizationsUseCase(new MidazFetchAllOrganizationsRepository())
  )

container
  .bind<FetchOrganizationById>(Registry.FetchOrganizationByIdUseCase)
  .toConstantValue(
    new FetchOrganizationByIdUseCase(new MidazFetchOrganizationByIdRepository())
  )

container
  .bind<FetchParentOrganizations>(Registry.FetchParentOrganizationsUseCase)
  .toConstantValue(
    new FetchParentOrganizationsUseCase(
      new MidazFetchAllOrganizationsRepository()
    )
  )

container
  .bind<UpdateOrganization>(Registry.UpdateOrganizationUseCase)
  .toConstantValue(
    new UpdateOrganizationUseCase(new MidazUpdateOrganizationRepository())
  )

container
  .bind<DeleteOrganization>(Registry.DeleteOrganizationUseCase)
  .toConstantValue(
    new DeleteOrganizationUseCase(new MidazDeleteOrganizationRepository())
  )
