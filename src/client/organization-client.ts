import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { OrganizationsType } from '@/types/organizations-type'

const createOrganization = async (organization: OrganizationsType) => {
  const response = await fetch('http://localhost:3000/api/organizations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(organization)
  })

  if (!response.ok) {
    throw new ClientToastException(
      `Organization create Failed!`,
      'organizationCreateFailed'
    )
  }

  return await response.json()
}

const updateOrganization = async (
  id: string,
  organization: OrganizationsType
) => {
  const response = await fetch(
    `http://localhost:3000/api/organizations/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organization)
    }
  )

  if (!response.ok) {
    throw new ClientToastException(
      `Organization ${id} update Failed!`,
      'organizationUpdatedFailed'
    )
  }

  return await response.json()
}

const deleteOrganization = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/organizations/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new ClientToastException(
      `Organization ${id} delete Failed!`,
      'organizationDeletedFailed'
    )
  }

  return await response.json()
}

const getOrganization = async () => {
  const response = await fetch('http://localhost:3000/api/organizations')

  if (!response.ok) {
    throw new ClientToastException(
      `Fetch organizations Failed!`,
      'organizationNotFound'
    )
  }
  return await response.json()
}

const getOrganizationById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/organizations/${id}`)

  if (!response.ok) {
    throw new ClientToastException(
      'Error get organization by id',
      `organizationNotFound`
    )
  }

  return await response.json()
}

const getParentOrganizations = async (idActualOrganization?: string) => {
  const response = await fetch(
    'http://localhost:3000/api/organizations/parentOrganizations?idActualOrganization=' +
      idActualOrganization
  )

  if (!response.ok) {
    throw new ClientToastException(
      `Fetch parent organizations Failed!`,
      'organizationNotFound'
    )
  }
  return await response.json()
}

export {
  getOrganization,
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  updateOrganization,
  getParentOrganizations
}
