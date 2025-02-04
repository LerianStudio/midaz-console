import {
  CreateTransaction,
  CreateTransactionUseCase
} from '@/core/application/use-cases/transactions/create-transaction-use-case'
import { Container, ContainerModule } from '../../utils/di/container'
import {
  FetchAllTransactions,
  FetchAllTransactionsUseCase
} from '@/core/application/use-cases/transactions/fetch-all-transactions-use-case'

export const TransactionUseCaseModule = new ContainerModule(
  (container: Container) => {
    container.bind<CreateTransaction>(CreateTransactionUseCase).toSelf()
    container.bind<FetchAllTransactions>(FetchAllTransactionsUseCase).toSelf()
  }
)
