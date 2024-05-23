import { NextResponse } from 'next/server'
import { container, Registry } from '@/infra/container-registry'
import LedgersUseCases from '@/useCases/LedgersUseCases'
import OrganizationsUseCases from '@/useCases/OrganizationsUseCases'

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
