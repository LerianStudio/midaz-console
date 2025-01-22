import { CreateTransactionRepository } from '@/core/domain/repositories/transactions/create-transaction-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazCreateTransactionRepository } from '../transactions/midaz-create-transaction-repository'
import { MidazFetchTransactionByIdRepository } from '../transactions/midaz-fetch-transaction-by-id-repository'
import { FetchTransactionByIdRepository } from '@/core/domain/repositories/transactions/fetch-transaction-by-id-repository'

export const MidazTransactionModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<CreateTransactionRepository>(CreateTransactionRepository)
      .to(MidazCreateTransactionRepository)

    container
      .bind<FetchTransactionByIdRepository>(FetchTransactionByIdRepository)
      .to(MidazFetchTransactionByIdRepository)
  }
)
