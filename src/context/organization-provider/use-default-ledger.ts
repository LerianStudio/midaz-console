'use client'

import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { LedgerType } from '@/types/ledgers-type'
import { useEffect, useRef } from 'react'

type UseDefaultLedgerProps = {
  current: OrganizationEntity
  ledgers: { items: LedgerType[] } | undefined
  currentLedger: LedgerType
  setCurrentLedger: (ledger: LedgerType) => void
  isInitialLoadRef: React.MutableRefObject<boolean>
}

const fetchLedgerById = async (
  orgId: string,
  ledgerId: string
): Promise<LedgerType | null> => {
  try {
    const response = await fetch(
      `/api/organizations/${orgId}/ledgers/${ledgerId}`
    )

    if (!response.ok) return null
    const data = await response.json()
    if (!data || !data.id) return null

    return {
      ...data,
      createdAt: data.createdAt ? new Date(data.createdAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
      deletedAt: data.deletedAt ? new Date(data.deletedAt) : null
    }
  } catch (error) {
    return null
  }
}

export function useDefaultLedger({
  current,
  ledgers,
  currentLedger,
  setCurrentLedger,
  isInitialLoadRef
}: UseDefaultLedgerProps) {
  const hasLoadedLedgerForOrgRef = useRef<Record<string, boolean>>({})

  useEffect(() => {
    if (!current?.id) return

    if (
      currentLedger?.id &&
      current.id &&
      hasLoadedLedgerForOrgRef.current[current.id]
    ) {
      return
    }

    const loadLedger = async () => {
      try {
        const savedPreferences = JSON.parse(
          localStorage.getItem('defaultLedgers') || '{}'
        )
        const savedLedgerId = current.id ? savedPreferences[current.id] : null

        if (savedLedgerId && current.id) {
          if (ledgers?.items && ledgers.items.length > 0) {
            const ledgerInList = ledgers.items.find(
              (led) => led.id === savedLedgerId
            )
            if (ledgerInList) {
              setCurrentLedger(ledgerInList)
              if (current.id)
                hasLoadedLedgerForOrgRef.current[current.id] = true
              return
            }
          }

          const orgId = current.id
          const specificLedger = await fetchLedgerById(orgId, savedLedgerId)

          if (specificLedger) {
            setCurrentLedger(specificLedger)
            if (current.id) hasLoadedLedgerForOrgRef.current[current.id] = true
            return
          }
        }

        if (ledgers?.items && ledgers.items.length > 0 && current.id) {
          setCurrentLedger(ledgers.items[0])
          hasLoadedLedgerForOrgRef.current[current.id] = true
        }
      } catch (error) {
        if (ledgers?.items && ledgers.items.length > 0 && current.id) {
          setCurrentLedger(ledgers.items[0])
          hasLoadedLedgerForOrgRef.current[current.id] = true
        }
      }
    }

    loadLedger()
  }, [current?.id, ledgers?.items, currentLedger?.id])

  const setLedger = (ledger: LedgerType) => {
    if (!ledger?.id) return
    if (isInitialLoadRef.current) return

    setCurrentLedger(ledger)

    if (current?.id) {
      hasLoadedLedgerForOrgRef.current[current.id] = true

      localStorage.setItem(
        'defaultLedgers',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('defaultLedgers') || '{}'),
          [current.id]: ledger.id
        })
      )
    }
  }

  return { setLedger }
}
