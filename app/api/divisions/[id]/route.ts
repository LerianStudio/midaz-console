import { NextRequest, NextResponse } from 'next/server'
import { DivisionRepository } from '@/repositories/divisions/DivisionRepository'
import { DivisionAPIAdapter } from '@/adapters/divisions/DivisionAPIAdapter'
import DivisionsUseCases from '@/useCases/divisions/DivisionsUseCases'

const divisionsAdapter: DivisionRepository = new DivisionAPIAdapter()
const divisionsUseCases = new DivisionsUseCases(divisionsAdapter)


export async function GET({ params }: { params: { id: string } }) {
    const divisions = await divisionsUseCases.getDivisionByIdUseCases(params.id)
    return NextResponse.json(divisions)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json()
    const division = await divisionsAdapter.updateDivision(params.id, body)
    
    return NextResponse.json({ division })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const data = await divisionsUseCases.deleteDivisionUseCases(params.id)
    
    return NextResponse.json(data)
}

