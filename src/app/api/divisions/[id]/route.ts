import { NextRequest, NextResponse } from 'next/server'
import { container, Registry } from '@/core/infra/container-registry'
import DivisionsUseCases from '@/core/useCases/DivisionsUseCases'


const divisionsUseCases = container.get<DivisionsUseCases>(
  Registry.DivisionsUseCases
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const divisions = await divisionsUseCases.getDivisionByIdUseCases(params.id)
  return NextResponse.json(divisions)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const division = await divisionsUseCases.updateDivisionUseCases(
    params.id,
    body
  )

  return NextResponse.json({ message: 'Division updated!' })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await divisionsUseCases.deleteDivisionUseCases(params.id)

  return NextResponse.json({ message: 'Division deleted!' })
}
