import { container } from '@/core/infrastructure/container-registry/container-registry'
import {
  DeleteOrganization,
  DeleteOrganizationUseCase
} from '@/core/application/use-cases/organizations/delete-organization-use-case'
import {
  FetchOrganizationById,
  FetchOrganizationByIdUseCase
} from '@/core/application/use-cases/organizations/fetch-organization-by-id-use-case'
import {
  UpdateOrganization,
  UpdateOrganizationUseCase
} from '@/core/application/use-cases/organizations/update-organization-use-case'
import { NextResponse } from 'next/server'
import { apiErrorHandler } from '../../utils/api-error-handler'

const updateOrganizationUseCase = container.get<UpdateOrganization>(
  UpdateOrganizationUseCase
)

const fetchOrganizationByIdUseCase = container.get<FetchOrganizationById>(
  FetchOrganizationByIdUseCase
)

const deleteOrganizationUseCase = container.get<DeleteOrganization>(
  DeleteOrganizationUseCase
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = params.id

    const organizations =
      await fetchOrganizationByIdUseCase.execute(organizationId)

    return NextResponse.json(organizations)
  } catch (error: any) {
    console.error('Error fetching organization', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const organizationUpdated = await updateOrganizationUseCase.execute(
      params.id,
      body
    )
    return NextResponse.json({ organizationUpdated })
  } catch (error: any) {
    console.error('Error updating organization', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteOrganizationUseCase.execute(params.id)
    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    console.log('Error deleting organization', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
