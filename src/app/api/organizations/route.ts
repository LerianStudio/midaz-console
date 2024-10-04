import { CreateOrganization } from '@/core/application/use-cases/organizations/create-organization-use-case'
import { FetchAllOrganizations } from '@/core/application/use-cases/organizations/fetch-all-organizations-use-case'
import { container, Registry } from '@/core/infra/container-registry'
import { NextResponse } from 'next/server'
import { apiErrorHandler } from '../utils/api-error-handler'

const createOrganizationUseCase = container.get<CreateOrganization>(
  Registry.CreateOrganizationUseCase
)

const fetchAllOrganizationsUseCase = container.get<FetchAllOrganizations>(
  Registry.FetchAllOrganizationsUseCase
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizations = await fetchAllOrganizationsUseCase.execute(
      limit,
      page
    )

    return NextResponse.json(organizations)
  } catch (error: any) {
    console.error('Error fetching all organizations', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createOrganizationUseCase.execute(body)

    return NextResponse.json({ result }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating organization', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
