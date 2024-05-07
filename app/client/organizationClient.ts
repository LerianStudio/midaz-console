const getOrganization = async () => {
  const response = await fetch('http://localhost:3000/api/organizations')
  if (!response.ok) {
    throw new Error('Failed to fetch organizations')
  }
  return await response.json()
}

export { getOrganization }
