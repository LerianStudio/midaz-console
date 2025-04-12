import { useState } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  label: string
  control: Control<TFieldValues>
  required?: boolean
  disabled?: boolean
}

export function PasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  required = false,
  disabled = false
}: PasswordFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                disabled={disabled}
                className="pr-10"
              />
            </FormControl>
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500 focus:outline-none"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault()
                setShowPassword(!showPassword)
              }}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
