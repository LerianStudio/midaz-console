import { CreateUserRepository } from '@/core/domain/repositories/users/create-user-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { IdentityCreateUsersRepository } from '../../midaz-plugins/identity/users/identity-create-users-repository'
import { DeleteUserRepository } from '@/core/domain/repositories/users/delete-user-repository'
import { IdentityDeleteUserRepository } from '../../midaz-plugins/identity/users/identity-delete-user-repository'
import { FetchAllUsersRepository } from '@/core/domain/repositories/users/fetch-all-users-repository'
import { IdentityFetchAllUsersRepository } from '../../midaz-plugins/identity/users/identity-fetch-all-users-repository'
import { FetchUserByIdRepository } from '@/core/domain/repositories/users/fetch-user-by-id-repository'
import { IdentityFetchUserByIdRepository } from '../../midaz-plugins/identity/users/identity-fetch-user-by-id-repository'
import { UpdateUserPasswordRepository } from '@/core/domain/repositories/users/update-user-password-repository'
import { IdentityUpdateUserPasswordRepository } from '../../midaz-plugins/identity/users/identity-update-user-password'
import { UpdateUserRepository } from '@/core/domain/repositories/users/update-user-repository'
import { IdentityUpdateUserRepository } from '../../midaz-plugins/identity/users/identity-update-user-repository'

export const IdentityModule = new ContainerModule((container: Container) => {
  container
    .bind<CreateUserRepository>(CreateUserRepository)
    .to(IdentityCreateUsersRepository)
  container
    .bind<DeleteUserRepository>(DeleteUserRepository)
    .to(IdentityDeleteUserRepository)
  container
    .bind<FetchAllUsersRepository>(FetchAllUsersRepository)
    .to(IdentityFetchAllUsersRepository)
  container
    .bind<FetchUserByIdRepository>(FetchUserByIdRepository)
    .to(IdentityFetchUserByIdRepository)
  container
    .bind<UpdateUserPasswordRepository>(UpdateUserPasswordRepository)
    .to(IdentityUpdateUserPasswordRepository)
  container
    .bind<UpdateUserRepository>(UpdateUserRepository)
    .to(IdentityUpdateUserRepository)
})
