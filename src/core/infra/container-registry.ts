import { Container } from 'inversify'
import { LedgersAPIAdapter } from '@/core/adapters/ledgers-api-adapter'
import { OryAuthAPIAdapter } from '@/core/adapters/ory-auth-api-adapter'
import { InstrumentsAPIAdapter } from '@/core/adapters/instruments-api-adapter'
import LedgersUseCases from '@/core/useCases/ledgers-use-cases'
import OryAuthUseCases from '@/core/useCases/ory-auth-use-cases'
import InstrumentsUseCases from '@/core/useCases/instruments-use-cases'
import OrganizationRepository from '@/core/repositories/organizations-repository'
import OrganizationsUseCases from '@/core/useCases/organizations-use-cases'

export const Registry = {
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  // Repository
  OrganizationRepositoryRegistry: Symbol.for('OrganizationRepositoryRegistry'),

  // Use Cases
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),
  OrganizationsUseCasesRegistry: Symbol.for('OrganizationsUseCasesRegistry')
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
