import { NextRequest, NextResponse } from 'next/server'
import { DivisionAPIAdapter } from '@/adapters/DivisionAPIAdapter'
import DivisionsUseCases from '@/useCases/DivisionsUseCases'

const divisionsUseCases = new DivisionsUseCases(new DivisionAPIAdapter())

export async function GET() {
    const divisions = await divisionsUseCases.listDivisionsUseCases()
    
    return NextResponse.json(divisions)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    await divisionsUseCases.createDivisionUseCases(body)
    
    return NextResponse.json({ message: 'Division created' })
}