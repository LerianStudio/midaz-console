import LedgersUseCases from '@/core/useCases/ledgers-use-cases'
import { NextResponse } from 'next/server'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'

const ledgersUseCases = container.get<LedgersUseCases>(Registry.LedgersUseCases)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ledgers = await ledgersUseCases.getLedgersByIdUseCases(params.id)
  return NextResponse.json(ledgers)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  await ledgersUseCases.updateLedgersUseCases(params.id, body)
  return NextResponse.json({ message: 'Ledger updated!' })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await ledgersUseCases.deleteLedgersUseCases(params.id)
  return NextResponse.json({ message: 'Ledger deleted!' })
}
