import {
  CreateTransaction,
  CreateTransactionUseCase
} from '@/core/application/use-cases/transactions/create-transaction-use-case'
import { Container, ContainerModule } from '../../utils/di/container'
import {
  FetchTransactionById,
  FetchTransactionByIdUseCase
} from '@/core/application/use-cases/transactions/fetch-transaction-by-id-use-case'

export const TransactionUseCaseModule = new ContainerModule(
  (container: Container) => {
    container.bind<CreateTransaction>(CreateTransactionUseCase).toSelf()
    container.bind<FetchTransactionById>(FetchTransactionByIdUseCase).toSelf()
  }
)
