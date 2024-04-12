import { LedgersAPIAdapter } from '@/adapters/LedgersAPIAdapter'
import LedgersUseCases from '@/useCases/LedgersUseCases'
import { NextResponse } from 'next/server'


const ledgersUseCases = new LedgersUseCases(new LedgersAPIAdapter());

export async function GET() {
    const ledgers = await ledgersUseCases.listLedgersUseCases()
    return NextResponse.json(ledgers)
}

export async function POST(request: Request) {
    const body = await request.json()
    await ledgersUseCases.createLedgersUseCases(body)
    return NextResponse.json({ message: 'Ledger created!' })
}