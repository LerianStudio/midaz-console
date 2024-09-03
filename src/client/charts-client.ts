const getChartsTotalAmount = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/charts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: 'totalAmountByInstrument' })
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments`)
  }

  return await response.json()
}

const getChartsTotalTransactions = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/charts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'totalTransactions',
      startDate: '2024-01-01',
      endDate: '2024-05-12'
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments`)
  }

  return await response.json()
}

const getChartsTransactionsByStatus = async (ledgerId: string) => {
  const response = await fetch(`/api/ledgers/${ledgerId}/charts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'transactionsByStatus',
      startDate: '2024-01-01',
      endDate: '2024-05-12'
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments`)
  }

  return await response.json()
}

export {
  getChartsTotalAmount,
  getChartsTotalTransactions,
  getChartsTransactionsByStatus
}
