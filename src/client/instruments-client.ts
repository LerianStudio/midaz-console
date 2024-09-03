const getInstruments = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/instruments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments`)
  }

  return await response.json()
}

export { getInstruments }
