import {
  CreateTransaction,
  CreateTransactionUseCase
} from '@/core/application/use-cases/transactions/create-transaction-use-case'
import { Container, ContainerModule } from '../../utils/di/container'

export const TransactionUseCaseModule = new ContainerModule(
  (container: Container) => {
    container.bind<CreateTransaction>(CreateTransactionUseCase).toSelf()
  }
)
