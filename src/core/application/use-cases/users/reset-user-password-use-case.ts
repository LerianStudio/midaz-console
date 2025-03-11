import { ResetUserPasswordRepository } from '@/core/domain/repositories/users/reset-user-password-repository'
import { UpdateUserPasswordRepository } from '@/core/domain/repositories/users/update-user-password-repository'
import { inject } from 'inversify'

export interface ResetUserPassword {
  execute: (userId: string, newPassword: string) => Promise<void>
}

export class ResetUserPasswordUseCase implements ResetUserPassword {
  constructor(
    @inject(ResetUserPasswordRepository)
    private readonly resetUserPasswordRepository: ResetUserPasswordRepository
  ) {}

  async execute(userId: string, newPassword: string): Promise<void> {
    await this.resetUserPasswordRepository.resetPassword(userId, newPassword)
  }
}
