import LedgersUseCases from '@/useCases/LedgersUseCases'
import { LedgersAPIAdapter } from '@/adapters/LedgersAPIAdapter'
import { NextResponse } from 'next/server'


const ledgersUseCases = new LedgersUseCases(new LedgersAPIAdapter());

export async function GET(request: Request,{ params }: { params: { id: string } }) {
    const ledgers = await ledgersUseCases.getLedgersByIdUseCases(params.id)
    return NextResponse.json(ledgers)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json()
    await ledgersUseCases.updateLedgersUseCases(params.id, body)
    return NextResponse.json({ message: 'Ledger updated!' })
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    console.log('params', params)
    await ledgersUseCases.deleteLedgersUseCases(params.id)
    return NextResponse.json({ message: 'Ledger deleted!' })
}