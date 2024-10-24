import { AuthPermissionResponseDto } from '@/core/application/dto/auth-dto'

export interface AuthPermissionRepository {
  getAuthPermissions: ({
    username
  }: {
    username: string
  }) => Promise<AuthPermissionResponseDto>
}
