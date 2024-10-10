import React from 'react'

/**
 * Custom hook to manage the creation and update state of a sheet component.
 *
 * @template TData - The type of data being managed by the sheet.
 *
 * @returns {Object} An object containing the following properties and methods:
 * - `mode` (`'create' | 'edit'`): Indicates whether the sheet is in create or edit mode.
 * - `data` (`TData | null`): The data being managed by the sheet. `null` if in create mode.
 * - `handleCreate` (`() => void`): Function to set the sheet to create mode and open it.
 * - `handleEdit` (`(data: TData) => void`): Function to set the sheet to edit mode with the provided data and open it.
 * - `sheetProps` (`Object`): An object containing properties to be passed to the sheet component:
 */
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
