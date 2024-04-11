import { NextResponse } from 'next/server'
import { DivisionRepository } from '@/repositories/divisions/DivisionRepository'
import { DivisionAPIAdapter } from '@/adapters/divisions/DivisionAPIAdapter'
import DivisionsUseCases from '@/useCases/divisions/DivisionsUseCases'

const divisionsAdapter: DivisionRepository = new DivisionAPIAdapter()
const divisionsUseCases = new DivisionsUseCases(divisionsAdapter)


export async function GET() {
  const divisions = await divisionsUseCases.listDivisionsUseCases()
  
  return NextResponse.json(divisions)
}

export async function POST({ body }: any) {
  await divisionsAdapter.createDivision(body)
  return NextResponse.json({ message: 'Division created' })
}