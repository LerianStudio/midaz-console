import { DivisionType } from '@/types/DivisionsType'

export const getDivisions = async (): Promise<DivisionType[]> => {
  const response = await fetch('/api/divisions')

  if (!response.ok) {
    throw new Error(`Failed to fetch divisions`)
  }

  return response.json()
}
