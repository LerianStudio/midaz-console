import { UpdateUserPasswordRepository } from '@/core/domain/repositories/users/update-user-password-repository'

export interface UpdateUserPassword {
  execute: (
    userId: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>
}

export class UpdateUserPasswordUseCase implements UpdateUserPassword {
  constructor(
    private readonly updateUserPasswordRepository: UpdateUserPasswordRepository
  ) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await this.updateUserPasswordRepository.updatePassword(
      userId,
      oldPassword,
      newPassword
    )
  }
}
