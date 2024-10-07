import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

const createLedger = async (ledger: LedgerEntity) => {
  const response = await fetch('/api/ledgers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ledger)
  })

  if (!response.ok) {
    throw new Error('Failed to create ledgers')
  }

  return await response.json()
}

const updateLedger = async (id: string, ledger: LedgerEntity) => {
  const response = await fetch(`/api/ledgers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ledger)
  })

  if (!response.ok) {
    throw new Error('Failed to update ledgers')
  }

  return response.json()
}

const deleteLedger = async (id: string) => {
  const response = await fetch(`/api/ledgers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to delete ledgers')
  }

  return await response.json()
}

const getLedgers = async () => {
  const response = await fetch('/api/ledgers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch ledgers')
  }

  return await response.json()
}

const getLedgerById = async (id: string) => {
  const response = await fetch(`/api/ledgers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ledger with id ${id}`)
  }

  return await response.json()
}

const getPortfolios = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/portfolios`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch portfolios')
  }

  return await response.json()
}

const createPortfolio = async (ledgerId: string, portfolio: any) => {
  console.log(ledgerId, portfolio)
  const response = await fetch(`/api/ledgers/${ledgerId}/portfolios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(portfolio)
  })

  if (!response.ok) {
    throw new Error('Failed to create portfolio')
  }

  return await response.json()
}

export {
  createLedger,
  updateLedger,
  deleteLedger,
  getLedgers,
  getLedgerById,
  getPortfolios,
  createPortfolio
}
