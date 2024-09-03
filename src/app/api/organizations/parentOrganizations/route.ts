import { NextResponse } from 'next/server'
import OrganizationsUseCases from '@/core/useCases/organizations-use-cases'
import { container, Registry } from '@/core/infra/container-registry'

const organizationsUseCases = container.get<OrganizationsUseCases>(
  Registry.OrganizationsUseCasesRegistry
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const idActualOrganization = searchParams.get('idActualOrganization')
  const organizations =
    await organizationsUseCases.getParentOrganizationsUseCases(
      idActualOrganization || undefined
    )

  return NextResponse.json(organizations)
}
