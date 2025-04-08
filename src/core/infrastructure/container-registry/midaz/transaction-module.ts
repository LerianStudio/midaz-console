import { CreateTransactionRepository } from '@/core/domain/repositories/transactions/create-transaction-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazCreateTransactionRepository } from '@/core/infrastructure/midaz/transactions/midaz-create-transaction-repository'
import { MidazFetchTransactionByIdRepository } from '@/core/infrastructure/midaz/transactions/midaz-fetch-transaction-by-id-repository'
import { FetchTransactionByIdRepository } from '@/core/domain/repositories/transactions/fetch-transaction-by-id-repository'
import { UpdateTransactionRepository } from '@/core/domain/repositories/transactions/update-transaction-repository'
import { MidazUpdateTransactionRepository } from '@/core/infrastructure/midaz/transactions/midaz-update-transaction-repository'
import { FetchAllTransactionsRepository } from '@/core/domain/repositories/transactions/fetch-all-transactions-repository'
import { MidazFetchAllTransactionsRepository } from '@/core/infrastructure/midaz/transactions/midaz-fetch-all-transactions-repository'

export const MidazTransactionModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<CreateTransactionRepository>(CreateTransactionRepository)
      .to(MidazCreateTransactionRepository)

    container
      .bind<FetchTransactionByIdRepository>(FetchTransactionByIdRepository)
      .to(MidazFetchTransactionByIdRepository)

    container
      .bind<UpdateTransactionRepository>(UpdateTransactionRepository)
      .to(MidazUpdateTransactionRepository)

    container
      .bind<FetchAllTransactionsRepository>(FetchAllTransactionsRepository)
      .to(MidazFetchAllTransactionsRepository)
  }
)
