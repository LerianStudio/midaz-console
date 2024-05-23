import { container, Registry } from '@/infra/container-registry'
import OrganizationsUseCases from '@/useCases/OrganizationsUseCases'
import { NextResponse } from 'next/server'

const organizationsUseCases = container.get<OrganizationsUseCases>(
  Registry.OrganizationsUseCasesRegistry
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const organizations = await organizationsUseCases.getOrganizationByIdUseCases(
    params.id
  )
  return NextResponse.json(organizations)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  await organizationsUseCases.updateOrganizationUseCases(params.id, body)
  return NextResponse.json({ message: 'Organization updated!' })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await organizationsUseCases.deleteOrganizationUseCases(params.id)
  return NextResponse.json({ message: 'Organization deleted!' })
}
