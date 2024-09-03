import { NextResponse } from 'next/server'
import OrganizationsUseCases from '@/core/useCases/organizations-use-cases'
import { container, Registry } from '@/core/infra/container-registry'

const organizationsUseCases = container.get<OrganizationsUseCases>(
  Registry.OrganizationsUseCasesRegistry
)

export async function GET() {
  const organizations = await organizationsUseCases.listOrganizationsUseCases()
  return NextResponse.json(organizations)
}

export async function POST(request: Request) {
  const body = await request.json()
  await organizationsUseCases.createOrganizationUseCases(body)
  return NextResponse.json({ message: 'Organization created!' })
}
