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
import useCustomToast from '@/hooks/use-custom-toast'
import { useCreateUser } from '@/client/users'

export type UsersSheetProps = DialogProps & {
  mode: 'create' | 'edit'
  data?: UserResponseDto | null
  onSuccess?: () => void
}

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  groups: []
}

const FormSchema = z.object({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  password: user.password,
  email: user.email,
  groups: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (Array.isArray(value) ? value : [value]))
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
  const { showSuccess, showError } = useCustomToast()
  const { data: groups } = useListGroups({})

  const { mutate: createUser, isPending: createPending } = useCreateUser({
    onSuccess: async (response: unknown) => {
      const responseData = response as any
      const newUser = responseData.userCreated as UserResponseDto

      await onSuccess?.()
      onOpenChange?.(false)

      showSuccess(
        intl.formatMessage(
          {
            id: 'users.toast.create.success',
            defaultMessage: 'User {userName} created successfully'
          },
          { userName: `${newUser.firstName} ${newUser.lastName}` }
        )
      )
    },
    onError: () => {
      onOpenChange?.(false)
      showError(
        intl.formatMessage({
          id: 'users.toast.create.error',
          defaultMessage: 'Error creating User'
        })
      )
    }
  })

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues
  })

  const handleSubmit = (formData: FormData) => {
    if (mode === 'create') {
      createUser(formData)
    } else if (mode === 'edit') {
      console.log(formData)
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
            <SheetTitle>
              {intl.formatMessage({
                id: 'users.sheetEdit.title',
                defaultMessage: 'Edit User'
              })}
            </SheetTitle>
            <SheetDescription>
              {intl.formatMessage({
                id: 'users.sheetEdit.description',
                defaultMessage: "View and edit the user's fields."
              })}
            </SheetDescription>
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
                  name="firstName"
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
                name="groups"
                label={intl.formatMessage({
                  id: 'entity.user.role',
                  defaultMessage: 'Role'
                })}
                placeholder={intl.formatMessage({
                  id: 'common.select',
                  defaultMessage: 'Select'
                })}
                control={form.control}
                required
              >
                {groups?.map((group: any) => (
                  <SelectItem key={group.id} value={group.id}>
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
                fullWidth
                loading={createPending}
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
