import { Container } from 'inversify'
import { DivisionAPIAdapter } from '@/core/adapters/DivisionAPIAdapter'
import { LedgersAPIAdapter } from '@/core/adapters/LedgersAPIAdapter'
import { OryAuthAPIAdapter } from '@/core/adapters/OryAuthAPIAdapter'
import { InstrumentsAPIAdapter } from '@/core/adapters/InstrumentsAPIAdapter'
import DivisionsUseCases from '@/core/useCases/DivisionsUseCases'
import LedgersUseCases from '@/core/useCases/LedgersUseCases'
import OryAuthUseCases from '@/core/useCases/OryAuthUseCases'
import InstrumentsUseCases from '@/core/useCases/InstrumentsUseCases'
import OrganizationRepository from '@/core/repositories/OrganizationsRepository'
import OrganizationsUseCases from '@/core/useCases/OrganizationsUseCases'

export const Registry = {
  DivisionsAPIAdapter: Symbol.for('DivisionsAPIAdapter'),
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  // Repository
  OrganizationRepositoryRegistry: Symbol.for('OrganizationRepositoryRegistry'),

  // Use Cases
  DivisionsUseCases: Symbol.for('DivisionsUseCases'),
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),
  OrganizationsUseCasesRegistry: Symbol.for('OrganizationsUseCasesRegistry')
}

export const container = new Container()

// External API Adapters

container
  .bind<DivisionAPIAdapter>(Registry.DivisionsAPIAdapter)
  .toDynamicValue((context) => {
    return new DivisionAPIAdapter()
  })
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
  .bind<DivisionsUseCases>(Registry.DivisionsUseCases)
  .toDynamicValue((context) => {
    return new DivisionsUseCases(
      context.container.get(Registry.DivisionsAPIAdapter)
    )
  })

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
