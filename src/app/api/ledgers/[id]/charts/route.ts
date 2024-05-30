import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  let responseData

  if (body.type === 'totalAmountByInstrument') {
    responseData = {
      chartType: 'totalAmountByAsset',
      startDate: null,
      endDate: null,
      data: [
        {
          instrumentCode: 'BTC',
          instrumentName: 'Bitcoin',
          totalAmount: 50000,
          scale: 0
        },
        {
          instrumentCode: 'ETH',
          instrumentName: 'Ethereum',
          totalAmount: 329189,
          scale: 0
        },
        {
          instrumentCode: 'ZSN4',
          instrumentName: 'Soy Futures Chicago',
          totalAmount: 2,
          scale: 0
        }
      ]
    }

    return NextResponse.json(responseData)
  } else if (body.type === 'totalTransactions') {
    responseData = {
      type: 'totalTransactions',
      startDate: '2024-01-01',
      endDate: '2024-05-12',
      data: [
        {
          metric: 'totalTransactions',
          count: 195
        }
      ]
    }

    return NextResponse.json(responseData)
  } else if (body.type === 'transactionsByStatus') {
    responseData = {
      type: 'transactionsByStatus',
      startDate: '2024-01-01',
      endDate: '2024-05-12',
      data: [
        {
          status: 'SENT',
          count: 120
        },
        {
          status: 'CANCELED',
          count: 45
        },
        {
          status: 'PRE_APPROVED',
          count: 30
        }
      ]
    }

    return NextResponse.json(responseData)
  } else {
    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
  }
}
