import { deleteFetcher, patchFetcher, postFetcher } from '@/lib/fetcher'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

type UseCreateLedgerProps = UseMutationOptions & {
  organizationId: string
}

type UseUpdateLedgerProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

type UseDeleteLedgerProps = UseMutationOptions & {
  organizationId: string
  ledgerId: string
}

const useCreateLedger = ({
  organizationId,
  ...options
}: UseCreateLedgerProps) => {
  return useMutation<any, any, any>({
    mutationFn: postFetcher(`/api/organizations/${organizationId}/ledgers`),
    ...options
  })
}

const useUpdateLedger = ({
  organizationId,
  ledgerId,
  ...options
}: UseUpdateLedgerProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: patchFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}}`
    ),
    ...options
  })
}

const useDeleteLedger = ({
  organizationId,
  ledgerId,
  ...options
}: UseDeleteLedgerProps) => {
  return useMutation<any, any, any>({
    mutationKey: [organizationId, ledgerId],
    mutationFn: deleteFetcher(
      `/api/organizations/${organizationId}/ledgers/${ledgerId}`
    ),
    ...options
  })
}

// const useCreateLedger = async (
//   ledger: LedgerEntity,
//   organizationId: string
// ) => {
//   const response = await fetch(`/api/organizations/${organizationId}/ledgers`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(ledger)
//   })

//   if (!response.ok) {
//     throw new Error('Failed to create ledgers')
//   }

//   return await response.json()
// }

// const updateLedger = async (id: string, ledger: LedgerEntity) => {
//   const response = await fetch(`/api/ledgers/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(ledger)
//   })

//   if (!response.ok) {
//     throw new Error('Failed to update ledgers')
//   }

//   return response.json()
// }

const getLedgers = async (organizationId: string) => {
  const response = await fetch(`/api/organizations/${organizationId}/ledgers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch ledgers')
  }

  return await response.json()
}

const getLedgerById = async (organizationId: string, id: string) => {
  const response = await fetch(
    `/api/organizations/${organizationId}/ledgers/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch ledger with id ${id}`)
  }

  return await response.json()
}

const getPortfolios = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/portfolios`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch portfolios')
  }

  return await response.json()
}

const createPortfolio = async (ledgerId: string, portfolio: any) => {
  console.log(ledgerId, portfolio)
  const response = await fetch(`/api/ledgers/${ledgerId}/portfolios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(portfolio)
  })

  if (!response.ok) {
    throw new Error('Failed to create portfolio')
  }

  return await response.json()
}

export {
  useCreateLedger,
  useUpdateLedger,
  useDeleteLedger,
  getLedgers,
  getLedgerById,
  getPortfolios,
  createPortfolio
}
