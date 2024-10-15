import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { OrganizationsType } from '@/types/organizations-type'
import { defineMessages } from 'react-intl'

const messages = defineMessages({
  organizationCreateFailed: {
    id: 'organizations.toast.organizationCreateFailed',
    defaultMessage: 'Failed to create organization'
  },
  organizationUpdatedFailed: {
    id: 'organizations.toast.organizationUpdatedFailed',
    defaultMessage: 'Failed to update organization id: {organizationId}'
  },
  organizationDeletedFailed: {
    id: 'organizations.toast.organizationDeletedFailed',
    defaultMessage: 'Failed to delete organization id: {organizationId}'
  },
  organizationNotFound: {
    id: 'organizations.toast.organizationNotFound',
    defaultMessage: 'No organization found'
  }
})

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
      messages.organizationCreateFailed
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
      messages.organizationUpdatedFailed
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
      messages.organizationDeletedFailed
    )
  }

  return await response.json()
}

const getOrganization = async () => {
  const response = await fetch('http://localhost:3000/api/organizations')

  if (!response.ok) {
    throw new ClientToastException(
      `Fetch organizations Failed!`,
      messages.organizationNotFound
    )
  }
  return await response.json()
}

const getOrganizationById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/organizations/${id}`)

  if (!response.ok) {
    throw new ClientToastException(
      'Error get organization by id',
      messages.organizationNotFound
    )
  }

  return await response.json()
}

export {
  getOrganization,
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  updateOrganization
}
