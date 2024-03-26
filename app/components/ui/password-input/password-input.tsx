import * as React from 'react'

import { Input } from '../input/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePassword = () => {
      setShowPassword(!showPassword)
    }

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        suffix={
          showPassword ? (
            <EyeOffIcon
              className="cursor-pointer select-none text-[#C7C7C7]"
              onClick={togglePassword}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer select-none text-[#C7C7C7]"
              onClick={togglePassword}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
