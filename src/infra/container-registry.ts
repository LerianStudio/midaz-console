import { Container } from 'inversify'
import { DivisionAPIAdapter } from '@/adapters/DivisionAPIAdapter'
import { LedgersAPIAdapter } from '@/adapters/LedgersAPIAdapter'
import { OryAuthAPIAdapter } from '@/adapters/OryAuthAPIAdapter'
import DivisionsUseCases from '@/useCases/DivisionsUseCases'
import LedgersUseCases from '@/useCases/LedgersUseCases'
import OryAuthUseCases from '@/useCases/OryAuthUseCases'

export const Registry = {
  DivisionsAPIAdapter: Symbol.for('DivisionsAPIAdapter'),
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),
  DivisionsUseCases: Symbol.for('DivisionsUseCases'),
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases')
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
  .bind<OryAuthAPIAdapter>(Registry.OryAuthAPIAdapter)
  .toDynamicValue((context) => {
    return new OryAuthAPIAdapter()
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
  .bind<OryAuthUseCases>(Registry.OryAuthUseCases)
  .toDynamicValue((context) => {
    return new OryAuthUseCases(
      context.container.get(Registry.OryAuthAPIAdapter)
    )
  })
