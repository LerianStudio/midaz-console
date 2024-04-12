import { DivisionType } from '@/types/DivisionsType'

const createDivision = async (division: DivisionType): Promise<void> => {
    const response = await fetch('/api/divisions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(division)
    })
    
    if (!response.ok) {
        throw new Error(`Failed to create divisions`)
    }
    
    return await response.json()
}


const updateDivision = async (id: string, division: DivisionType): Promise<void> => {
    const response = await fetch(`/api/divisions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(division)
    })
    
    if (!response.ok) {
        throw new Error(`Failed to update divisions`)
    }
    
    return await response.json()
}


const deleteDivision = async (id: string): Promise<void> => {
    const response = await fetch(`/api/divisions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (!response.ok) {
        throw new Error(`Failed to delete divisions`)
    }
    
    return await response.json()
}


const getDivisions = async () => {
    const response = await fetch('/api/divisions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (!response.ok) {
        throw new Error(`Failed to fetch divisions`)
    }
    
    return await response.json()
}


export { getDivisions, createDivision, updateDivision, deleteDivision }