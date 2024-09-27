'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button/button'

import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '../ui/dialog'

type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  ledgerName?: string
  icon?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title = '',
  description = '',
  ledgerName = '',
  icon = '',
  onConfirm = () => {},
  onCancel = () => {}
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>
            {description} <strong>{ledgerName}</strong>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onCancel} variant="outline">
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-sunglow-400 text-black hover:bg-sunglow-400/70"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
