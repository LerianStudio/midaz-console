import { ContainerModule, interfaces } from 'inversify'
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

import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'

import { MidazCreateOrganizationRepository } from '../midaz/organizations/midaz-create-organization-repository'
import { MidazDeleteOrganizationRepository } from '../midaz/organizations/midaz-delete-organization-repository'
import { MidazFetchAllOrganizationsRepository } from '../midaz/organizations/midaz-fetch-all-organizations-repository'
import { MidazFetchOrganizationByIdRepository } from '../midaz/organizations/midaz-fetch-organization-by-id-repository'
import { MidazUpdateOrganizationRepository } from '../midaz/organizations/midaz-update-organization-repository'

export const OrganizationRegistry = {
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
  UpdateOrganizationRepository: Symbol.for('UpdateOrganizationRepository')
}

export const OrganizationModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<CreateOrganizationRepository>(
      OrganizationRegistry.CreateOrganizationRepository
    ).toConstantValue(new MidazCreateOrganizationRepository())

    bind<FetchAllOrganizationsRepository>(
      OrganizationRegistry.FetchAllOrganizationsRepository
    ).toConstantValue(new MidazFetchAllOrganizationsRepository())

    bind<FetchOrganizationByIdRepository>(
      OrganizationRegistry.FetchOrganizationByIdRepository
    ).toConstantValue(new MidazFetchOrganizationByIdRepository())

    bind<DeleteOrganizationRepository>(
      OrganizationRegistry.DeleteOrganizationRepository
    ).toConstantValue(new MidazDeleteOrganizationRepository())

    bind<UpdateOrganizationRepository>(
      OrganizationRegistry.UpdateOrganizationRepository
    ).toConstantValue(new MidazUpdateOrganizationRepository())

    bind<CreateOrganization>(
      OrganizationRegistry.CreateOrganizationUseCase
    ).toDynamicValue((context) => {
      return new CreateOrganizationUseCase(
        context.container.get(OrganizationRegistry.CreateOrganizationRepository)
      )
    })

    bind<FetchAllOrganizations>(
      OrganizationRegistry.FetchAllOrganizationsUseCase
    ).toDynamicValue((context) => {
      return new FetchAllOrganizationsUseCase(
        context.container.get(
          OrganizationRegistry.FetchAllOrganizationsRepository
        )
      )
    })

    bind<FetchOrganizationById>(
      OrganizationRegistry.FetchOrganizationByIdUseCase
    ).toDynamicValue((context) => {
      return new FetchOrganizationByIdUseCase(
        context.container.get(
          OrganizationRegistry.FetchOrganizationByIdRepository
        )
      )
    })

    bind<FetchParentOrganizations>(
      OrganizationRegistry.FetchParentOrganizationsUseCase
    ).toDynamicValue((context) => {
      return new FetchParentOrganizationsUseCase(
        context.container.get(
          OrganizationRegistry.FetchOrganizationByIdRepository
        )
      )
    })

    bind<UpdateOrganization>(
      OrganizationRegistry.UpdateOrganizationUseCase
    ).toDynamicValue((context) => {
      return new UpdateOrganizationUseCase(
        context.container.get(OrganizationRegistry.UpdateOrganizationRepository)
      )
    })

    bind<DeleteOrganization>(
      OrganizationRegistry.DeleteOrganizationUseCase
    ).toDynamicValue((context) => {
      return new DeleteOrganizationUseCase(
        context.container.get(OrganizationRegistry.DeleteOrganizationRepository)
      )
    })
  }
)
