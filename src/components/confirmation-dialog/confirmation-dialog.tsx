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
import { useIntl } from 'react-intl'

type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  ledgerName?: string
  icon?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title = '',
  description = '',
  icon,
  onConfirm = () => {},
  onCancel = () => {},
  confirmLabel,
  cancelLabel
}) => {
  const intl = useIntl()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onCancel} variant="outline">
            {cancelLabel ??
              intl.formatMessage({
                id: 'common.cancel',
                defaultMessage: 'Cancel'
              })}
          </Button>
          <Button onClick={onConfirm} variant="default">
            {confirmLabel ??
              intl.formatMessage({
                id: 'common.confirm',
                defaultMessage: 'Confirm'
              })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
