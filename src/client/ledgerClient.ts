const fetchAllLedgers = async () => {
  const response = await fetch('http://localhost:3000/api/ledgers')
  if (!response.ok) {
    throw new Error('Failed to fetch ledgers')
  }
  const data = await response.json()
  return data
}

const fetchLedgerById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/ledgers/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ledger with id ${id}`)
  }
  const data = await response.json()
  return data
}

export { fetchLedgerById, fetchAllLedgers }
