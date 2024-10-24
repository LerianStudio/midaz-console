import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { apiErrorHandler } from '../utils/api-error-handler'
import { AuthPermission } from '@/core/application/use-cases/auth/auth-permission-use-case'

const authPermissionUseCase = container.get<AuthPermission>(
  Registry.AuthPermissionUseCase
)

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(nextAuthCasdoorOptions)
    const { username } = session?.user

    const permissions = await authPermissionUseCase.execute({ username })

    return NextResponse.json(permissions)
  } catch (error: any) {
    console.error('Error fetching user permissions', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
