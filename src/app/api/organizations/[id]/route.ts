import { NextResponse } from 'next/server'
import { container, Registry } from '@/core/infra/container-registry'
import OrganizationsUseCases from '@/core/useCases/organizations-use-cases'

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
  try {
    await organizationsUseCases.deleteOrganizationUseCases(params.id)
    return NextResponse.json({ message: 'Organization deleted!' })
  } catch (error: any) {
    return handlerErrorResponse(error)
  }
}

function handlerErrorResponse(error: any) {
  return NextResponse.json({ message: error.message }, { status: 400 })
}
