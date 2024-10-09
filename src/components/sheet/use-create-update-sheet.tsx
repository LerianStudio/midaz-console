import React from 'react'

export function useCreateUpdateSheet<TData = {}>() {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState<TData | null>(null)

  const onOpenChange = (open: boolean) => setOpen(open)

  const handleCreate = () => {
    setData(null)
    setOpen(true)
  }

  const handleEdit = (data: TData) => {
    setData(data)
    setOpen(true)
  }

  const mode = data === null ? 'create' : 'edit'

  return {
    mode: mode as 'create' | 'edit',
    data,
    handleCreate,
    handleEdit,
    sheetProps: {
      mode: mode as 'create' | 'edit',
      data,
      open,
      onOpenChange
    }
  }
}
