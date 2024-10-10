import { renderHook, act } from '@testing-library/react'
import { useCreateUpdateSheet } from './use-create-update-sheet'

describe('useCreateUpdateSheet', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useCreateUpdateSheet())

    expect(result.current.mode).toBe('create')
    expect(result.current.data).toBeNull()
    expect(result.current.sheetProps.open).toBe(false)
  })

  test('should handle create mode', () => {
    const { result } = renderHook(() => useCreateUpdateSheet())

    act(() => {
      result.current.handleCreate()
    })

    expect(result.current.mode).toBe('create')
    expect(result.current.data).toBeNull()
    expect(result.current.sheetProps.open).toBe(true)
  })

  test('should handle edit mode', () => {
    const { result } = renderHook(() => useCreateUpdateSheet<{ id: number }>())
    const testData = { id: 1 }

    act(() => {
      result.current.handleEdit(testData)
    })

    expect(result.current.mode).toBe('edit')
    expect(result.current.data).toEqual(testData)
    expect(result.current.sheetProps.open).toBe(true)
  })

  test('should change open state', () => {
    const { result } = renderHook(() => useCreateUpdateSheet())

    act(() => {
      result.current.sheetProps.onOpenChange(true)
    })

    expect(result.current.sheetProps.open).toBe(true)

    act(() => {
      result.current.sheetProps.onOpenChange(false)
    })

    expect(result.current.sheetProps.open).toBe(false)
  })
})
