'use client'

import { useState } from 'react'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

type SheetModeState = {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  ledgersData: LedgerEntity | null
}

export const useSheetMode = () => {
  const [sheetMode, setSheetMode] = useState<SheetModeState>({
    isOpen: false,
    mode: 'create',
    ledgersData: null
  })

  const handleOpenCreateSheet = () => {
    setSheetMode({ isOpen: true, mode: 'create', ledgersData: null })
  }

  const handleOpenViewSheet = (ledgerData: LedgerEntity) => {
    setSheetMode({ isOpen: true, mode: 'view', ledgersData: ledgerData })
  }

  return {
    sheetMode,
    handleOpenCreateSheet,
    handleOpenViewSheet,
    setSheetMode
  }
}
