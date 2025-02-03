import { CreateTransactionRepository } from '@/core/domain/repositories/transactions/create-transaction-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazCreateTransactionRepository } from '../transactions/midaz-create-transaction-repository'
import { FetchAllTransactionsRepository } from '@/core/domain/repositories/transactions/fetch-all-transactions-repository'
import { MidazFetchAllTransactionsRepository } from '../transactions/midaz-fetch-all-transactions-repository'

export const MidazTransactionModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<CreateTransactionRepository>(CreateTransactionRepository)
      .to(MidazCreateTransactionRepository)
    container
      .bind<FetchAllTransactionsRepository>(FetchAllTransactionsRepository)
      .to(MidazFetchAllTransactionsRepository)
  }
)
