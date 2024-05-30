import { NextRequest, NextResponse } from 'next/server'
import DivisionsUseCases from '@/useCases/DivisionsUseCases'
import { container, Registry } from '@/infra/container-registry'

const divisionsUseCases = container.get<DivisionsUseCases>(
  Registry.DivisionsUseCases
)

export async function GET() {
  const divisions = await divisionsUseCases.listDivisionsUseCases()

  return NextResponse.json(divisions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  await divisionsUseCases.createDivisionUseCases(body)

  return NextResponse.json({ message: 'Division created' })
}
