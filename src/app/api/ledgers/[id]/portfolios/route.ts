import { NextRequest, NextResponse } from 'next/server'

const JSON_SERVER_URL = 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: { ledgerId: string } }
) {
  const response = await fetch(
    `${JSON_SERVER_URL}/portfolios?ledgerId=${params.ledgerId}`
  )
  const portfolios = await response.json()
  return NextResponse.json(portfolios)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { ledgerId: string } }
) {
  const body = await request.json()
  console.log('body', body)
  // Validate the ledgerId
  if (params.ledgerId !== body.ledgerId) {
    return NextResponse.json({ error: 'Invalid ledgerId' }, { status: 400 })
  }

  // Create a new portfolio
  const newPortfolio = {
    id: crypto.randomUUID(),
    ledger_id: params.ledgerId,
    portfolio_name: body.portfolio_name,
    entity_id: body.entity_id,
    status: body.status || { code: 'ACTIVE', description: null },
    metadata: body.metadata || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }

  console.log(newPortfolio)

  // Add the new portfolio using json-server
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
