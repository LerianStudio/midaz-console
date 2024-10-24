import {
  AuthPermissionDto,
  AuthPermissionResponseDto
} from '../../dto/auth-dto'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'

export interface AuthPermission {
  execute: (data: AuthPermissionDto) => Promise<AuthPermissionResponseDto>
}

export class AuthPermissionUseCase implements AuthPermission {
  constructor(
    private readonly authPermissionRepository: AuthPermissionRepository
  ) {}
  async execute(data: AuthPermissionDto): Promise<AuthPermissionResponseDto> {
    const authPermissionResponse =
      await this.authPermissionRepository.getAuthPermissions(data)

    return authPermissionResponse
  }
}
