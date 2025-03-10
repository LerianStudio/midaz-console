import { inject, injectable } from 'inversify'
import { GroupResponseDto } from '../../dto/group-dto'
import { FetchAllGroupsRepository } from '@/core/domain/repositories/groups/fetch-all-groups-repository'
import { Group } from 'lucide-react'
import { GroupMapper } from '../../mappers/group-mapper'

export interface FetchAllGroups {
  execute: () => Promise<GroupResponseDto[]>
}

@injectable()
export class FetchAllGroupsUseCase implements FetchAllGroups {
  constructor(
    @inject(FetchAllGroupsRepository)
    private readonly fetchAllGroupsRepository: FetchAllGroupsRepository
  ) {}

  async execute(): Promise<GroupResponseDto[]> {
    const groupsEntity = await this.fetchAllGroupsRepository.fetchAllGroups()

    const groupsResponseDto: GroupResponseDto[] = groupsEntity.map(
      GroupMapper.toResponseDto
    )

    return groupsResponseDto
  }
}
