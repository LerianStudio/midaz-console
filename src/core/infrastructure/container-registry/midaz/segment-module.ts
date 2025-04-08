import { Container, ContainerModule } from '../../utils/di/container'

import { CreateSegmentRepository } from '@/core/domain/repositories/segments/create-segment-repository'
import { DeleteSegmentRepository } from '@/core/domain/repositories/segments/delete-segment-repository'
import { FetchAllSegmentsRepository } from '@/core/domain/repositories/segments/fetch-all-segments-repository'
import { FetchSegmentByIdRepository } from '@/core/domain/repositories/segments/fetch-segment-by-id-repository'
import { UpdateSegmentRepository } from '@/core/domain/repositories/segments/update-segment-repository'

import { MidazCreateSegmentRepository } from '@/core/infrastructure/midaz/segments/midaz-create-segment-repository'
import { MidazFetchAllSegmentsRepository } from '@/core/infrastructure/midaz/segments/midaz-fetch-all-segments-repository'
import { MidazUpdateSegmentRepository } from '@/core/infrastructure/midaz/segments/midaz-update-segment-repository'
import { MidazDeleteSegmentRepository } from '@/core/infrastructure/midaz/segments/midaz-delete-segment-repository'
import { MidazFetchSegmentByIdRepository } from '@/core/infrastructure/midaz/segments/midaz-fetch-segment-by-id-repository'

export const MidazSegmentModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<CreateSegmentRepository>(CreateSegmentRepository)
      .to(MidazCreateSegmentRepository)

    container
      .bind<FetchAllSegmentsRepository>(FetchAllSegmentsRepository)
      .to(MidazFetchAllSegmentsRepository)

    container
      .bind<UpdateSegmentRepository>(UpdateSegmentRepository)
      .to(MidazUpdateSegmentRepository)

    container
      .bind<DeleteSegmentRepository>(DeleteSegmentRepository)
      .to(MidazDeleteSegmentRepository)

    container
      .bind<FetchSegmentByIdRepository>(FetchSegmentByIdRepository)
      .to(MidazFetchSegmentByIdRepository)
  }
)
