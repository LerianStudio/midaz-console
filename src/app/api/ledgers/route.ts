import LedgersUseCases from '@/core/useCases/LedgersUseCases'
import { NextResponse } from 'next/server'
import { container, Registry } from '@/core/infra/container-registry'

const ledgersUseCases = container.get<LedgersUseCases>(Registry.LedgersUseCases)

export async function GET() {
  const ledgers = await ledgersUseCases.listLedgersUseCases()
  return NextResponse.json(ledgers)
}

export async function POST(request: Request) {
  const body = await request.json()
  await ledgersUseCases.createLedgersUseCases(body)
  return NextResponse.json({ message: 'Ledger created!' })
}
