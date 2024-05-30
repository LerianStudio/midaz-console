import { NextResponse } from 'next/server'

const mock = [
  {
    id: 'bb907427-5a8c-4622-b1ce-801b70e40d0c',
    ledgerId: '77b0fb8b-1bd9-4810-9c6d-7e80064fab0c',
    organizationId: '5f3a4c55-8b28-4276-bed7-f7c8a4bb44e8',
    name: 'Bitcoin',
    type: 'crypto',
    code: 'BTC',
    status: {
      code: '002',
      description: 'Blocked'
    },
    metadata: {
      internalExchangeAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      internalExchangeCustody: 'Binance US'
    }
  },
  {
    id: 'f9e838d6-d3a7-4975-b681-613999537d2e',
    ledgerId: '77b0fb8b-1bd9-4810-9c6d-7e80064fab0c',
    organizationId: '5f3a4c55-8b28-4276-bed7-f7c8a4bb44e8',
    name: 'Real',
    type: 'currency',
    code: 'BRL',
    status: {
      code: '001',
      description: 'Active'
    },
    metadata: {
      localBank: 'c6'
    }
  }
]

export async function GET(
  request: Request,
  { params }: { params: { id: string; instrumentId: string } }
) {
  const ledgerExists = mock.some(
    (instrument) => instrument.ledgerId === params.id
  )

  if (!ledgerExists) {
    return NextResponse.json({ error: 'Ledger not found' }, { status: 404 })
  }

  const instruments = mock.filter(
    (instrument) => instrument.ledgerId === params.id
  )

  if (instruments.length === 0) {
    return NextResponse.json(
      { error: 'No instruments found in the specified ledger' },
      { status: 404 }
    )
  }

  return NextResponse.json(instruments)
}
