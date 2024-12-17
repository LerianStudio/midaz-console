import { inject, injectable } from 'inversify'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'
import { AuthPermissionResponseDto } from '../../dto/auth-permission-dto'

export interface AuthPermission {
  execute: (username: string) => Promise<AuthPermissionResponseDto>
}

@injectable()
export class AuthPermissionUseCase implements AuthPermission {
  constructor(
    @inject(AuthPermissionRepository)
    private readonly authPermissionRepository: AuthPermissionRepository
  ) {}
  async execute(username: string): Promise<AuthPermissionResponseDto> {
    const authPermissionResponse =
      await this.authPermissionRepository.getPermissions(username)

    return authPermissionResponse
  }
}
