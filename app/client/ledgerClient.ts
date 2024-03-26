const getLedgers = async () => {
  const response = await fetch('/api/ledgers')

  if (!response.ok) {
    throw new Error('Failed to fetch ledgers')
  }

  return response.json()
}

const getLedgerById = async (id: string) => {
  const response = await fetch(`/api/ledgers/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ledger with id ${id}`)
  }

  return response.json()
}

export { getLedgers, getLedgerById }
