import { getLedgerById, getLedgers } from '@/client/ledgerClient'
import { useQuery } from '@tanstack/react-query'
import { getDivisions } from '@/client/divisionsClient'
import { getInstruments } from '@/client/instrumentsClient'
import {
  getChartsTotalAmount,
  getChartsTotalTransactions,
  getChartsTransactionsByStatus
} from '@/client/chartsClient'

export const useDivisions = () => {
  return useQuery({
    queryKey: ['divisions'],
    queryFn: getDivisions
  })
}

export const useLedgers = () => {
  return useQuery({
    queryKey: ['ledgers'],
    queryFn: getLedgers
  })
}

export const useLedgerById = (id: string) => {
  return useQuery({
    queryKey: ['ledger', id],
    queryFn: () => getLedgerById(id)
  })
}

export const useInstruments = (ledgerId: string) => {
  return useQuery({
    queryKey: ['instrument', ledgerId],
    queryFn: () => getInstruments(ledgerId)
  })
}

export const useChartsTotalAmount = (ledgerId: string) => {
  return useQuery({
    queryKey: ['chartsTotalAmount', ledgerId],
    queryFn: () => getChartsTotalAmount(ledgerId)
  })
}

export const useChartsTotalTransactions = (ledgerId: string) => {
  return useQuery({
    queryKey: ['chartsTotalTransactions', ledgerId],
    queryFn: () => getChartsTotalTransactions(ledgerId)
  })
}

export const useChartsTransactionsByStatus = (ledgerId: string) => {
  return useQuery({
    queryKey: ['chartsTransactionsByStatus', ledgerId],
    queryFn: () => getChartsTransactionsByStatus(ledgerId)
  })
}
