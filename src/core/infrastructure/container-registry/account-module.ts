import { ContainerModule, interfaces } from 'inversify'
import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { MidazFetchAllAccountsRepository } from '../midaz/accounts/midaz-fetch-all-accounts-repository'
import {
  FetchAllAccounts,
  FetchAllAccountsUseCase
} from '@/core/application/use-cases/accounts/fetch-all-account-use-case'
import { CreateAccountsRepository } from '@/core/domain/repositories/accounts/create-accounts-repository'
import {
  CreateAccount,
  CreateAccountUseCase
} from '@/core/application/use-cases/accounts/create-account-use-case'
import { MidazCreateAccountRepository } from '../midaz/accounts/midaz-create-accounts-repository'
import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { MidazFetchAccountByIdRepository } from '../midaz/accounts/midaz-fetch-account-by-id-repository'
import {
  FetchAccountById,
  FetchAccountByIdUseCase
} from '@/core/application/use-cases/accounts/fetch-account-by-id-use-case'
import { UpdateAccountsRepository } from '@/core/domain/repositories/accounts/update-accounts-repository'
import { MidazUpdateAccountsRepository } from '../midaz/accounts/midaz-update-accounts-repository'
import {
  UpdateAccount,
  UpdateAccountUseCase
} from '@/core/application/use-cases/accounts/update-account-use-case'
import { DeleteAccountsRepository } from '@/core/domain/repositories/accounts/delete-accounts-repository'
import { MidazDeleteAccountsRepository } from '../midaz/accounts/midaz-delete-accounts-repository'
import {
  DeleteAccount,
  DeleteAccountUseCase
} from '@/core/application/use-cases/accounts/delete-account-use-case'

export const AccountRegistry = {
  FetchAllAccountsUseCase: Symbol.for('FetchAllAccountsUseCase'),
  FetchAllAccountsRepository: Symbol.for('FetchAllAccountsRepository'),
  CreateAccountsRepository: Symbol.for('CreateAccountsRepository'),
  CreateAccountUseCase: Symbol.for('CreateAccountUseCase'),
  CreateAccountSymbolRepository: Symbol.for('CreateAccountSymbolRepository'),
  FetchAccountByIdRepository: Symbol.for('FetchAccountByIdRepository'),
  FetchAccountByIdUseCase: Symbol.for('FetchAccountByIdUseCase'),
  UpdateAccountRepository: Symbol.for('UpdateAccountRepository'),
  UpdateAccountUseCase: Symbol.for('UpdateAccountUseCase'),
  DeleteAccountRepository: Symbol.for('DeleteAccountRepository'),
  DeleteAccountUseCase: Symbol.for('DeleteAccountUseCase')
}

export const AccountModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<FetchAllAccountsRepository>(
    AccountRegistry.FetchAllAccountsRepository
  ).toConstantValue(new MidazFetchAllAccountsRepository())

  bind<FetchAllAccounts>(
    AccountRegistry.FetchAllAccountsUseCase
  ).toDynamicValue((context) => {
    return new FetchAllAccountsUseCase(
      context.container.get(AccountRegistry.FetchAllAccountsRepository)
    )
  })

  bind<CreateAccountsRepository>(
    AccountRegistry.CreateAccountsRepository
  ).toConstantValue(new MidazCreateAccountRepository())

  bind<CreateAccount>(AccountRegistry.CreateAccountUseCase).toDynamicValue(
    (context) => {
      return new CreateAccountUseCase(
        context.container.get(AccountRegistry.CreateAccountsRepository)
      )
    }
  )

  // Fetch Account By Id
  bind<FetchAccountByIdRepository>(
    AccountRegistry.FetchAccountByIdRepository
  ).toConstantValue(new MidazFetchAccountByIdRepository())

  bind<FetchAccountById>(
    AccountRegistry.FetchAccountByIdUseCase
  ).toDynamicValue((context) => {
    return new FetchAccountByIdUseCase(
      context.container.get(AccountRegistry.FetchAccountByIdRepository)
    )
  })

  // Update Account
  bind<UpdateAccountsRepository>(
    AccountRegistry.UpdateAccountRepository
  ).toConstantValue(new MidazUpdateAccountsRepository())

  bind<UpdateAccount>(AccountRegistry.UpdateAccountUseCase).toDynamicValue(
    (context) => {
      return new UpdateAccountUseCase(
        context.container.get(AccountRegistry.UpdateAccountRepository)
      )
    }
  )

  // Delete Account
  bind<DeleteAccountsRepository>(
    AccountRegistry.DeleteAccountRepository
  ).toConstantValue(new MidazDeleteAccountsRepository())

  bind<DeleteAccount>(AccountRegistry.DeleteAccountUseCase).toDynamicValue(
    (context) => {
      return new DeleteAccountUseCase(
        context.container.get(AccountRegistry.DeleteAccountRepository)
      )
    }
  )
})
