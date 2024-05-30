import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'

const getOrganization = async () => {
  const response = await fetch('http://localhost:3000/api/organizations')
  if (!response.ok) {
    throw new Error('Failed to fetch organizations')
  }
  return await response.json()
}

const createOrganization = async (organization: OrganizationEntity) => {
  const response = await fetch('http://localhost:3000/api/organizations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(organization)
  })

  return await response.json()
}

export const updateOrganization = async (
  id: string,
  organization: OrganizationEntity
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

  return await response.json()
}

export const getOrganizationById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/organizations/${id}`)
  return await response.json()
}

export { getOrganization, createOrganization }
