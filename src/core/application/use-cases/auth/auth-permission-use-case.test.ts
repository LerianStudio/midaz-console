import { AuthPermissionUseCase } from './auth-permission-use-case'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'
import {
  AuthPermissionDto,
  AuthPermissionResponseDto
} from '../../dto/auth-dto'

describe('AuthPermissionUseCase', () => {
  let authPermissionUseCase: AuthPermissionUseCase
  let authPermissionRepository: jest.Mocked<AuthPermissionRepository>

  beforeEach(() => {
    authPermissionRepository = {
      getAuthPermissions: jest.fn()
    } as unknown as jest.Mocked<AuthPermissionRepository>

    authPermissionUseCase = new AuthPermissionUseCase(authPermissionRepository)
  })

  it('should execute and return auth permissions successfully', async () => {
    const data: AuthPermissionDto = {
      username: 'username1'
    }
    const response: AuthPermissionResponseDto = { resource1: ['action1'] }

    authPermissionRepository.getAuthPermissions.mockResolvedValueOnce(response)

    const result = await authPermissionUseCase.execute(data)

    expect(authPermissionRepository.getAuthPermissions).toHaveBeenCalledWith(
      data
    )
    expect(result).toEqual(response)
  })

  it('should handle errors when executing', async () => {
    const data: AuthPermissionDto = {
      username: 'username1'
    }
    const error = new Error('Error occurred')

    authPermissionRepository.getAuthPermissions.mockRejectedValueOnce(error)

    await expect(authPermissionUseCase.execute(data)).rejects.toThrow(
      'Error occurred'
    )
    expect(authPermissionRepository.getAuthPermissions).toHaveBeenCalledWith(
      data
    )
  })
})
