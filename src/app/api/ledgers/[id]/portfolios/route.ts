import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import PortfoliosUseCases from '@/core/useCases/portfolio-use-cases'
import { NextRequest, NextResponse } from 'next/server'

const JSON_SERVER_URL = 'http://localhost:3001/v1'
const portfolioUseCases = container.get<PortfoliosUseCases>(
  Registry.PortfolioUseCases
)

export async function GET() {
  try {
    const portfolios = await portfolioUseCases.listPortfoliosUseCases()
    return NextResponse.json(portfolios)
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { ledgerId: string } }
) {
  const body = await request.json()
  console.log('body', body)
  if (params.ledgerId !== body.ledgerId) {
    return NextResponse.json({ error: 'Invalid ledgerId' }, { status: 400 })
  }

  const newPortfolio = {
    id: crypto.randomUUID(),
    ledger_id: '38eff558-757a-4ca6-ae16-d4a6aef0f4d3',
    entity_id: body.entity_id,
    status: body.status || { code: 'ACTIVE', description: null },
    metadata: body.metadata || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }

  console.log(newPortfolio)

  const response = await fetch(`${JSON_SERVER_URL}/portfolios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPortfolio)
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    )
  }

  const createdPortfolio = await response.json()
  return NextResponse.json(createdPortfolio, { status: 201 })
}
