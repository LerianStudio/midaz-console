import React from 'react'

type UseConfirmDialog = {
  onConfirm?: (id: string) => void
}

export function useConfirmDialog<TData = {}>({
  onConfirm: onConfirmProp
}: UseConfirmDialog) {
  const [id, setId] = React.useState('')
  const [data, setData] = React.useState<TData | null>(null)
  const [open, setOpen] = React.useState(false)

  const onOpenChange = (open: boolean) => setOpen(open)

  const handleDialogOpen = (id: string, data?: any) => {
    setId(id)
    setData(data)
    setOpen(true)
  }

  const onCancel = () => {
    setId('')
    setData(null)
    setOpen(false)
  }

  const onConfirm = () => {
    setId('')
    setData(null)
    setOpen(false)
    onConfirmProp?.(id)
  }

  return {
    id,
    data,
    handleDialogOpen,
    dialogProps: {
      open,
      onOpenChange,
      onCancel,
      onConfirm
    }
  }
}
