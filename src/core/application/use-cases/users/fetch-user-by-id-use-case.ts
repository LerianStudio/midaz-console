import { FetchUserByIdRepository } from '@/core/domain/repositories/users/fetch-user-by-id-repository'
import { UserResponseDto } from '../../dto/user-dto'
import { UserMapper } from '../../mappers/user-mapper'

export interface FetchUserById {
  execute: (userId: string) => Promise<UserResponseDto>
}

export class FetchUserByIdUseCase implements FetchUserById {
  constructor(
    private readonly fetchUserByIdRepository: FetchUserByIdRepository
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const userEntity = await this.fetchUserByIdRepository.fetchById(userId)
    const userResponseDto: UserResponseDto = UserMapper.toDto(userEntity)

    return userResponseDto
  }
}
