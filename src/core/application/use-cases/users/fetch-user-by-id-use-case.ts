import { FetchUserByIdRepository } from '@/core/domain/repositories/users/fetch-user-by-id-repository'
import { UserResponseDto } from '../../dto/user-dto'
import { UserMapper } from '../../mappers/user-mapper'
import { inject } from 'inversify'

export interface FetchUserById {
  execute: (userId: string) => Promise<UserResponseDto>
}

export class FetchUserByIdUseCase implements FetchUserById {
  constructor(
    @inject(FetchUserByIdRepository)
    private readonly fetchUserByIdRepository: FetchUserByIdRepository
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const userEntity = await this.fetchUserByIdRepository.fetchById(userId)
    const userResponseDto: UserResponseDto = UserMapper.toDto(userEntity)

    return userResponseDto
  }
}
