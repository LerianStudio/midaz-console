import { NextResponse } from 'next/server'

const mock = [
  {
    id: 'bb907427-5a8c-4622-b1ce-801b70e40d0c',
    ledgerId: '77b0fb8b-1bd9-4810-9c6d-7e80064fab0c',
    name: 'Bitcoin',
    type: 'crypto',
    code: 'BTC',
    metadata: {
      internalExchangeAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      internalExchangeCustody: 'Binance US'
    }
  },
  {
    id: 'c3a89e04-b1cd-4df8-a5f9-0bb077e07e6d',
    ledgerId: '77b0fb8b-1bd9-4810-9c6d-7e80064fab0c',
    name: 'Ethereum',
    type: 'crypto',
    code: 'ETH',
    metadata: {
      internalExchangeAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      internalExchangeCustody: 'Binance US'
    }
  }
]

export async function GET(
  request: Request,
  { params }: { params: { id: string; instrumentId: string } }
) {
  const instrument = mock.find((instrument) => {
    return instrument.id === params.instrumentId
  })

  if (!instrument) {
    return NextResponse.json({ error: 'Instrument not found' }, { status: 404 })
  }

  return NextResponse.json(instrument)
}
