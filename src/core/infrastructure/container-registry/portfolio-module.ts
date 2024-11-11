import { ContainerModule, interfaces } from 'inversify'

import {
  CreatePortfolio,
  CreatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/create-portfolio-use-case'
import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import { MidazCreatePortfolioRepository } from '../midaz/portfolios/midaz-create-portfolio-repository'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { MidazFetchAllPortfoliosRepository } from '../midaz/portfolios/midaz-fetch-all-portfolio-repository'
import {
  FetchAllPortfolios,
  FetchAllPortfoliosUseCase
} from '@/core/application/use-cases/portfolios/fetch-all-portfolio-use-case'

import { UpdatePortfolioRepository } from '@/core/domain/repositories/portfolios/update-portfolio-repository'
import { MidazUpdatePortfolioRepository } from '../midaz/portfolios/midaz-update-portfolio-repository'
import {
  UpdatePortfolio,
  UpdatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/update-portfolio-use-case'
import { DeletePortfolioRepository } from '@/core/domain/repositories/portfolios/delete-portfolio-repository'
import { MidazDeletePortfolioRepository } from '../midaz/portfolios/midaz-delete-portfolio-repository'
import {
  DeletePortfolio,
  DeletePortfolioUseCase
} from '@/core/application/use-cases/portfolios/delete-portfolio-use-case'
import { FetchPortfolioByIdRepository } from '@/core/domain/repositories/portfolios/fetch-portfolio-by-id-repository'
import { MidazFetchPortfolioByIdRepository } from '../midaz/portfolios/midaz-fetch-portfolio-by-id-repository'
import {
  FetchPortfolioById,
  FetchPortfolioByIdUseCase
} from '@/core/application/use-cases/portfolios/fetch-portfolio-by-id-use-case'

export const PortfolioRegistry = {
  CreatePortfolioSymbolUseCase: Symbol.for('CreatePortfolioSymbolUseCase'),
  UpdatePortfolioUseCase: Symbol.for('UpdatePortfolioUseCase'),
  CreatePortfolioUseCase: Symbol.for('CreatePortfolioUseCase'),
  FetchAllPortfoliosUseCase: Symbol.for('FetchAllPortfoliosUseCase'),
  DeletePortfolioUseCase: Symbol.for('DeletePortfolioUseCase'),

  CreatePortfolioSymbolRepository: Symbol.for(
    'CreatePortfolioSymbolRepository'
  ),
  CreatePortfolioRepository: Symbol.for('CreatePortfolioRepository'),
  FetchAllPortfoliosRepository: Symbol.for('FetchAllPortfoliosRepository'),
  UpdatePortfolioRepository: Symbol.for('UpdatePortfolioRepository'),
  DeletePortfolioRepository: Symbol.for('DeletePortfolioRepository'),

  FetchPortfolioByIdUseCase: Symbol.for('FetchPortfolioByIdUseCase'),
  FetchPortfolioByIdRepository: Symbol.for('FetchPortfolioByIdRepository')
}

export const PortfolioModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreatePortfolioRepository>(
    PortfolioRegistry.CreatePortfolioSymbolRepository
  ).toConstantValue(new MidazCreatePortfolioRepository())

  bind<CreatePortfolio>(
    PortfolioRegistry.CreatePortfolioSymbolUseCase
  ).toDynamicValue((context) => {
    return new CreatePortfolioUseCase(
      context.container.get(PortfolioRegistry.CreatePortfolioSymbolRepository)
    )
  })

  bind<CreatePortfolioRepository>(
    PortfolioRegistry.CreatePortfolioRepository
  ).toConstantValue(new MidazCreatePortfolioRepository())

  bind<CreatePortfolio>(
    PortfolioRegistry.CreatePortfolioUseCase
  ).toDynamicValue((context) => {
    return new CreatePortfolioUseCase(
      context.container.get(PortfolioRegistry.CreatePortfolioRepository)
    )
  })

  bind<FetchAllPortfoliosRepository>(
    PortfolioRegistry.FetchAllPortfoliosRepository
  ).toConstantValue(new MidazFetchAllPortfoliosRepository())

  bind<FetchAllPortfolios>(
    PortfolioRegistry.FetchAllPortfoliosUseCase
  ).toDynamicValue((context) => {
    return new FetchAllPortfoliosUseCase(
      context.container.get(PortfolioRegistry.FetchAllPortfoliosRepository)
    )
  })

  bind<UpdatePortfolioRepository>(
    PortfolioRegistry.UpdatePortfolioRepository
  ).toConstantValue(new MidazUpdatePortfolioRepository())

  bind<UpdatePortfolio>(
    PortfolioRegistry.UpdatePortfolioUseCase
  ).toDynamicValue((context) => {
    return new UpdatePortfolioUseCase(
      context.container.get(PortfolioRegistry.UpdatePortfolioRepository)
    )
  })

  bind<DeletePortfolioRepository>(
    PortfolioRegistry.DeletePortfolioRepository
  ).toConstantValue(new MidazDeletePortfolioRepository())

  bind<DeletePortfolio>(
    PortfolioRegistry.DeletePortfolioUseCase
  ).toDynamicValue((context) => {
    return new DeletePortfolioUseCase(
      context.container.get(PortfolioRegistry.DeletePortfolioRepository)
    )
  })

  bind<FetchPortfolioByIdRepository>(
    PortfolioRegistry.FetchPortfolioByIdRepository
  ).toConstantValue(new MidazFetchPortfolioByIdRepository())

  bind<FetchPortfolioById>(
    PortfolioRegistry.FetchPortfolioByIdUseCase
  ).toDynamicValue((context) => {
    return new FetchPortfolioByIdUseCase(
      context.container.get(PortfolioRegistry.FetchPortfolioByIdRepository)
    )
  })
})
