import { inject, injectable } from 'inversify'
import { CreateUserDto, UserResponseDto } from '../../dto/user-dto'
import { CreateUserRepository } from '@/core/domain/repositories/users/create-user-repository'
import { UserMapper } from '../../mappers/user-mapper'

export interface CreateUser {
  execute: (user: CreateUserDto) => Promise<UserResponseDto>
}

@injectable()
export class CreateUserUseCase implements CreateUser {
  constructor(
    @inject(CreateUserRepository)
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async execute(user: CreateUserDto): Promise<UserResponseDto> {
    const userEntity = UserMapper.toDomain(user)
    const userCreated = await this.createUserRepository.create(userEntity)
    const userResponseDto = UserMapper.toDto(userCreated)

    return userResponseDto
  }
}
