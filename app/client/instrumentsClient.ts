const getInstrumentsById = async (ledgerId: string, instrumentId: string) => {
  const response = await fetch(
    `/api/ledgers/${ledgerId}/instruments/${instrumentId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch ledger with id ${instrumentId}`)
  }

  return await response.json()
}

export { getInstrumentsById }
