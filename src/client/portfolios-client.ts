import { LedgerPortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

const createPortfolio = async (
  ledgerId: string,
  portfolio: LedgerPortfoliosEntity
) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/portfolios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(portfolio)
  })

  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to create portfolio')
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

export { createPortfolio, getPortfolios }
