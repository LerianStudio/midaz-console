import { UpdateSegmentRepository } from '@/core/domain/repositories/segments/update-segment-repository'
import { SegmentResponseDto, UpdateSegmentDto } from '../../dto/segment-dto'
import { SegmentEntity } from '@/core/domain/entities/segment-entity'
import { SegmentMapper } from '../../mappers/segment-mapper'
import { inject, injectable } from 'inversify'

export interface UpdateSegment {
  execute: (
    organizationId: string,
    ledgerId: string,
    segmentId: string,
    segment: Partial<UpdateSegmentDto>
  ) => Promise<SegmentResponseDto>
}

@injectable()
export class UpdateSegmentUseCase implements UpdateSegment {
  constructor(
    @inject(UpdateSegmentRepository)
    private readonly updateSegmentRepository: UpdateSegmentRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    segmentId: string,
    segment: Partial<UpdateSegmentDto>
  ): Promise<SegmentResponseDto> {
    const segmentEntity: Partial<SegmentEntity> =
      SegmentMapper.toDomain(segment)

    const updatedSegment: SegmentEntity =
      await this.updateSegmentRepository.update(
        organizationId,
        ledgerId,
        segmentId,
        segmentEntity
      )

    return SegmentMapper.toResponseDto(updatedSegment)
  }
}
