'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'

interface FormData {
  name: string
  metadata: Record<string, any>
}

interface FormStateContextType {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  isDirty: boolean
  markAsDirty: () => void
  resetDirty: () => void
}

const FormStateContext = createContext<FormStateContextType | undefined>(
  undefined
)

export const useFormState = () => {
  const context = useContext(FormStateContext)
  if (context === undefined) {
    throw new Error('useFormState must be used within a LedgerDetailsProvider')
  }
  return context
}

export const LedgerDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formData, setFormData] = useState<FormData>({ name: '', metadata: {} })
  const [isDirty, setIsDirty] = useState(false)

  const markAsDirty = () => {
    setIsDirty(true)
  }

  const resetDirty = () => {
    setIsDirty(false)
  }

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <FormStateContext.Provider
      value={{ formData, updateFormData, isDirty, markAsDirty, resetDirty }}
    >
      {children}
    </FormStateContext.Provider>
  )
}
