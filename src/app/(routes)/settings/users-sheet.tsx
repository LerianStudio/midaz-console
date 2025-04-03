import { InputField, SelectField } from '@/components/form'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { z } from 'zod'
import { LoadingButton } from '@/components/ui/loading-button'
import { usePopulateCreateUpdateForm } from '@/components/sheet/use-populate-create-update-form'
import { UserResponseDto } from '@/core/application/dto/user-dto'
import { SelectItem } from '@/components/ui/select'
import { user } from '@/schema/user'
import { useListGroups } from '@/client/groups'

export type UsersSheetProps = DialogProps & {
  mode: 'create' | 'edit'
  data?: UserResponseDto | null
  onSuccess?: () => void
}

const initialValues = {
  name: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  role: ''
}

const FormSchema = z.object({
  name: user.name,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  password: user.password,
  role: user.role
})

type FormData = z.infer<typeof FormSchema>

export const UsersSheet = ({
  mode,
  data,
  onSuccess,
  onOpenChange,
  ...others
}: UsersSheetProps) => {
  const intl = useIntl()
  const { data: groups } = useListGroups({})

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues
  })

  const { isDirty } = form.formState

  const handleSubmit = (data: FormData) => {
    if (mode === 'create') {
      console.log(data)
    } else if (mode === 'edit') {
      console.log(data)
    }
  }

  usePopulateCreateUpdateForm(form, mode, initialValues, data)

  return (
    <Sheet onOpenChange={onOpenChange} {...others}>
      <SheetContent data-testid="ledgers-sheet">
        {mode === 'create' && (
          <SheetHeader>
            <SheetTitle>
              {intl.formatMessage({
                id: 'users.sheetCreate.title',
                defaultMessage: 'New User'
              })}
            </SheetTitle>
            <SheetDescription>
              {intl.formatMessage({
                id: 'users.sheetCreate.description',
                defaultMessage:
                  'Fill in the data of the User you wish to create.'
              })}
            </SheetDescription>
          </SheetHeader>
        )}

        {mode === 'edit' && (
          <SheetHeader>
            <SheetTitle>x</SheetTitle>
            <SheetDescription>x</SheetDescription>
          </SheetHeader>
        )}

        <Form {...form}>
          <form
            className="flex flex-grow flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-grow flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="name"
                  label={intl.formatMessage({
                    id: 'entity.user.name',
                    defaultMessage: 'Name'
                  })}
                  control={form.control}
                />

                <InputField
                  name="lastName"
                  label={intl.formatMessage({
                    id: 'entity.user.lastName',
                    defaultMessage: 'Last Name'
                  })}
                  control={form.control}
                />
              </div>

              <InputField
                name="username"
                label={intl.formatMessage({
                  id: 'entity.user.username',
                  defaultMessage: 'Username'
                })}
                control={form.control}
              />

              <InputField
                name="email"
                label={intl.formatMessage({
                  id: 'entity.user.email',
                  defaultMessage: 'Email'
                })}
                control={form.control}
                required
              />

              <InputField
                name="password"
                type="password"
                label={intl.formatMessage({
                  id: 'entity.user.password',
                  defaultMessage: 'Password'
                })}
                control={form.control}
                required
              />

              <SelectField
                name="role"
                label={intl.formatMessage({
                  id: 'common.role',
                  defaultMessage: 'Role'
                })}
                placeholder={intl.formatMessage({
                  id: 'common.select',
                  defaultMessage: 'Select'
                })}
                control={form.control}
                disabled={mode === 'edit'}
                required
              >
                {groups?.map((group: any) => (
                  <SelectItem key={group.id} value={group.id || group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectField>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-normal italic text-shadcn-400">
                  {intl.formatMessage({
                    id: 'common.requiredFields',
                    defaultMessage: '(*) required fields.'
                  })}
                </p>

                {/* <Button
                  variant="outline"
                  icon={<ExternalLink size={16} />}
                  iconPlacement="end"
                  size="sm"
                >
                  <a
                    href="https://docs.lerian.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({
                      id: 'entity.user.rolesAndPermissions',
                      defaultMessage: 'Roles and permissions'
                    })}
                  </a>
                </Button> */}
              </div>
            </div>

            <SheetFooter>
              <LoadingButton
                size="lg"
                type="submit"
                disabled={!isDirty}
                fullWidth
                loading={false}
              >
                {intl.formatMessage({
                  id: 'common.save',
                  defaultMessage: 'Save'
                })}
              </LoadingButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
