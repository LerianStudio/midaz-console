import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTooltip
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { ReactNode } from 'react'
import { Control } from 'react-hook-form'

export type SwitchFieldProps = {
  label?: string
  name: string
  control: Control<any>
  labelExtra?: ReactNode
  tooltip?: string
  required?: boolean
  disabled?: boolean
}

export const SwitchField = ({
  label,
  name,
  control,
  labelExtra,
  tooltip,
  required,
  disabled
}: SwitchFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem required={required}>
          {label && (
            <FormLabel
              extra={
                tooltip ? <FormTooltip>{tooltip}</FormTooltip> : labelExtra
              }
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
