import { Container } from 'inversify'
import { LedgersAPIAdapter } from '@/core/adapters/LedgersAPIAdapter'
import { OryAuthAPIAdapter } from '@/core/adapters/OryAuthAPIAdapter'
import { InstrumentsAPIAdapter } from '@/core/adapters/InstrumentsAPIAdapter'
import LedgersUseCases from '@/core/useCases/LedgersUseCases'
import OryAuthUseCases from '@/core/useCases/OryAuthUseCases'
import InstrumentsUseCases from '@/core/useCases/InstrumentsUseCases'

export const Registry = {
  DivisionsAPIAdapter: Symbol.for('DivisionsAPIAdapter'),
  LedgersAPIAdapter: Symbol.for('LedgersAPIAdapter'),
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),
  DivisionsUseCases: Symbol.for('DivisionsUseCases'),
  LedgersUseCases: Symbol.for('LedgersUseCases'),
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases')
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
