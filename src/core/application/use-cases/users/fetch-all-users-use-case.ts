import { FetchAllUsersRepository } from '@/core/domain/repositories/users/fetch-all-users-repository'
import { UserResponseDto } from '../../dto/user-dto'
import { UserMapper } from '../../mappers/user-mapper'

export interface FetchAllUsers {
  execute: () => Promise<UserResponseDto[]>
}

export class FetchAllUsersUseCase implements FetchAllUsers {
  constructor(
    private readonly fetchAllUsersRepository: FetchAllUsersRepository
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.fetchAllUsersRepository.fetchAll()
    const usersResponseDto: UserResponseDto[] = users.map(UserMapper.toDto)

    return usersResponseDto
  }
}
