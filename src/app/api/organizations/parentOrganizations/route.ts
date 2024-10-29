import { FetchParentOrganizations } from '@/core/application/use-cases/organizations/fetch-parent-organizations-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const fetchParentOrganizations = container.get<FetchParentOrganizations>(
  Registry.FetchParentOrganizationsUseCase
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId') || undefined

    const organizations = await fetchParentOrganizations.execute(organizationId)

    return NextResponse.json(organizations)
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Error fetching parent organizations' },
      { status: 400 }
    )
  }
}
