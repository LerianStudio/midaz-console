'use server'

import { AuthPermission } from '@/core/application/use-cases/auth/auth-permission-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'
import { getServerSession } from 'next-auth'
import { PermissionProviderClient } from './permission-provider-client'

const authPermissionUseCase = container.get<AuthPermission>(
  Registry.AuthPermissionUseCase
)

export const PermissionProvider = async ({
  children
}: React.PropsWithChildren) => {
  const session = await getServerSession(nextAuthCasdoorOptions)

  const permissions = await authPermissionUseCase.execute({
    username: session?.user.username
  })

  return (
    <PermissionProviderClient permissions={permissions}>
      {children}
    </PermissionProviderClient>
  )
}
