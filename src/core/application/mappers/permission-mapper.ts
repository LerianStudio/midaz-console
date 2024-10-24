import { Permission } from 'casdoor-nodejs-sdk/lib/cjs/permission'
import { CasbinRequest } from 'casdoor-nodejs-sdk/lib/cjs/enforce'
import { uniq } from 'lodash'
import { AuthPermissionResponseDto } from '../dto/auth-dto'

type BatchEnforceDto = string[][]

type BatchEnforceResponseDto = boolean[]

export function permissionToCasbinRequest(
  user: string,
  data: Permission[]
): CasbinRequest[] {
  return data
    .map((permission) =>
      (permission.resources || []).map((resource) =>
        (permission.actions || []).map((action) => [user, resource, action])
      )
    )
    .flat()
    .flat()
}

export function filterBatchEnforceResponse(
  validation: BatchEnforceResponseDto,
  data: BatchEnforceDto
) {
  return validation
    .flat()
    ?.reduce<BatchEnforceDto>(
      (sum, result, i) => (result ? [...sum, data[i]] : sum),
      []
    )
}

export function batchEnforceResponseToDto(
  data: BatchEnforceDto
): AuthPermissionResponseDto {
  return data.reduce<AuthPermissionResponseDto>(
    (sum, [user, resource, action]) => {
      return {
        ...sum,
        [resource]: uniq([...(sum[resource] || []), action])
      }
    },
    {}
  )
}
