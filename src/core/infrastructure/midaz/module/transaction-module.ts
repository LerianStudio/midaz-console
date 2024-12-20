import { CreateTransactionRepository } from '@/core/domain/repositories/transactions/create-transaction-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazCreateTransactionRepository } from '../transactions/midaz-create-transaction-repository'

export const MidazTransactionModule = new ContainerModule(
  (container: Container) => {
    container.bind<CreateTransactionRepository>(CreateTransactionRepository).to(MidazCreateTransactionRepository)
  }
)
