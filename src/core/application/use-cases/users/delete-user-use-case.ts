import { DeleteUserRepository } from '@/core/domain/repositories/users/delete-user-repository'
import { inject } from 'inversify'

export interface DeleteUser {
  execute: (userId: string) => Promise<void>
}

export class DeleteUserUseCase implements DeleteUser {
  constructor(
    @inject(DeleteUserRepository)
    private readonly deleteUserRepository: DeleteUserRepository
  ) {}

  async execute(userId: string): Promise<void> {
    await this.deleteUserRepository.delete(userId)
  }
}
