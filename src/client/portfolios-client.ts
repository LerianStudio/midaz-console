import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

const createPortfolio = async (
  organizationId: string,
  ledgerId: string,
  portfolio: PortfoliosEntity
) => {
  console.log('0000----portfolio', portfolio)
  const response = await fetch(
    `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portfolio)
    }
  )

  console.log('createPortfolio', response)

  if (!response.ok) {
    throw new Error('Failed to create portfolio')
  }

  return await response.json()
}

const getPortfolios = async (organizationId: string, ledgerId: string) => {
  const response = await fetch(
    `/api/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch portfolios')
  }

  console.log('getPortfolios', response.json)

  return await response.json()
}

export { createPortfolio, getPortfolios }
