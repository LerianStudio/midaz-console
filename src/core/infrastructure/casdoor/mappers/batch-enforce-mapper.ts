import { uniq } from 'lodash'
import { AuthPermissionEntity } from '@/core/domain/entities/auth-permission-entity'
import { BatchEnforceDto } from '../dto/batch-enforce'
import { CasbinRequest } from '../service/sdk/enforce'
import { Permission } from '../service/sdk/permission'

export class BatchEnforceMapper {
  public static toDto(user: string, data: Permission[]): CasbinRequest[] {
    return data
      .map((permission) =>
        (permission.resources || []).map((resource) =>
          (permission.actions || []).map((action) => [user, resource, action])
        )
      )
      .flat()
      .flat()
  }

  public static toResponseDto(data: BatchEnforceDto): AuthPermissionEntity {
    return data.reduce<AuthPermissionEntity>(
      (sum, [user, resource, action]) => {
        return {
          ...sum,
          [resource]: uniq([...(sum[resource] || []), action])
        }
      },
      {}
    )
  }
}
