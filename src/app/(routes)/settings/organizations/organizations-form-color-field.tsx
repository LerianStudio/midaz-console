import React from 'react'
import { HashIcon } from 'lucide-react'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { ChromePicker, ColorResult } from 'react-color'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { isNil } from 'lodash'
import { InputWithIcon } from '@/components/ui/input-with-icon'

type ColorInputProps = ControllerRenderProps

const ColorInput = React.forwardRef<unknown, ColorInputProps>(
  ({ name, value, onChange }: ColorInputProps, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleInputChange = (event: any) => {
      onChange?.({
        ...event,
        target: { ...event.target, value: `#${event.target.value}` }
      })
    }

    const handleChange = (color: ColorResult) => {
      onChange?.({ target: { name, value: color.hex } })
    }

    return (
      <div className="mb-4 flex w-full flex-col gap-2">
        <div className="flex w-full gap-2">
          <div
            className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-md border border-zinc-300 hover:border-zinc-400"
            style={{
              backgroundColor: value !== '' ? value : '#FFFFFF'
            }}
            onClick={() => setOpen(!open)}
          />

          <InputWithIcon
            icon={<HashIcon />}
            value={value?.replace('#', '')}
            onChange={handleInputChange}
            disabled
          />
        </div>

        {open && (
          <div>
            <ChromePicker
              className="absolute"
              color={value}
              disableAlpha={true}
              onChangeComplete={handleChange}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    )
  }
)
ColorInput.displayName = 'ColorInput'

export type OrganizationsFormColorFieldProps = {
  name: string
  description: string
  control: Control<any>
}

export const OrganizationsFormColorField = ({
  description,
  ...others
}: OrganizationsFormColorFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem>
          <ColorInput {...field} />
          {description && (isNil(field.value) || field.value === '') && (
            <FormDescription>{description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
