import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Camera } from 'lucide-react'
import React from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { isNil } from 'lodash'

type AvatarFieldProps = ControllerRenderProps

export const AvatarField = React.forwardRef<unknown, AvatarFieldProps>(
  ({ name, value, onChange }: AvatarFieldProps, ref) => {
    const intl = useIntl()
    const [open, setOpen] = React.useState(false)
    const [avatarURL, setAvatarURL] = React.useState('')

    const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAvatarURL('')
      onChange({ ...event, target: { ...event.target, name, value: '' } })
    }

    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChange({
        ...event,
        target: { ...event.target, name, value: avatarURL }
      })
      setOpen(false)
    }

    return (
      <div className="mb-4 flex flex-col items-center justify-center gap-4">
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger onClick={() => setOpen(true)}>
            <Avatar className="flex h-44 w-44 items-center justify-center rounded-[30px] border border-zinc-300 bg-zinc-200 shadow hover:border-zinc-400">
              <AvatarImage
                className="h-44 w-44 items-center justify-center gap-2 rounded-[30px] border border-zinc-200 shadow"
                src={value}
                alt="Organization Avatar"
              />
              <AvatarFallback className="flex h-10 w-10 gap-2 rounded-full border border-zinc-200 bg-white p-2 shadow hover:border-zinc-400">
                <Camera className="relative h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="flex w-full items-center justify-center">
              {intl.formatMessage({
                id: 'organizations.organizationView.avatarDialog.title',
                defaultMessage: 'Avatar'
              })}
            </DialogTitle>
            <DialogDescription className="mb-4 flex w-full items-center justify-center">
              {intl.formatMessage({
                id: 'organizations.organizationView.avatarDialog.description',
                defaultMessage: 'Insert your SVG or PNG image URL.'
              })}
            </DialogDescription>

            <Input
              placeholder="https://example.com/image.png"
              onChange={(e) => setAvatarURL(e.target.value)}
            />

            <Button variant="secondary" onClick={handleChange}>
              {intl.formatMessage({
                id: 'common.send',
                defaultMessage: 'Send'
              })}
            </Button>
          </DialogContent>
        </Dialog>

        {value !== '' && (
          <div className="flex w-full content-center items-center justify-center self-center">
            <Button variant="secondary" onClick={handleReset}>
              {intl.formatMessage({
                id: 'common.remove',
                defaultMessage: 'Remove'
              })}
            </Button>
          </div>
        )}
      </div>
    )
  }
)

export type OrganizationsFormAvatarFieldProps = {
  name: string
  description?: string
  control: Control<any>
}

export const OrganizationsFormAvatarField = ({
  description,
  ...others
}: OrganizationsFormAvatarFieldProps) => {
  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem>
          <AvatarField {...field} />
          {description && (isNil(field.value) || field.value === '') && (
            <FormDescription className="mt-8">{description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
