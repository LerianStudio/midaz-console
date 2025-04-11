import { InputField, SelectField } from '@/components/form'
import { Form } from '@/components/ui/form'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { user } from '@/schema/user'
import { useListGroups } from '@/client/groups'
import { SelectItem } from '@/components/ui/select'
import { LoadingButton } from '@/components/ui/loading-button'
import { useCreateUser } from '@/client/users'
import useCustomToast from '@/hooks/use-custom-toast'
import { GroupResponseDto } from '@/core/application/dto/group-dto'
import { UsersType } from '@/types/users-type'

const FormSchema = z.object({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  password: user.password,
  email: user.email,
  groups: user.groups
})

type FormData = z.infer<typeof FormSchema>

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  groups: ''
}

interface CreateUserFormProps {
  onSuccess?: () => void
  onOpenChange?: (open: boolean) => void
}

export const CreateUserForm = ({
  onSuccess,
  onOpenChange
}: CreateUserFormProps) => {
  const intl = useIntl()
  const { showSuccess, showError } = useCustomToast()
  const { data: groups } = useListGroups({})

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues
  })

  const { mutate: createUser, isPending: createPending } = useCreateUser({
    onSuccess: async (response: unknown) => {
      const responseData = response as any
      const newUser = responseData.userCreated as UsersType

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

  const handleSubmit = (formData: FormData) => {
    createUser({
      ...formData,
      groups: [formData.groups]
    })
  }

  return (
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
              required
            />

            <InputField
              name="lastName"
              label={intl.formatMessage({
                id: 'entity.user.lastName',
                defaultMessage: 'Last Name'
              })}
              control={form.control}
              required
            />
          </div>

          <InputField
            name="username"
            label={intl.formatMessage({
              id: 'entity.user.username',
              defaultMessage: 'Username'
            })}
            control={form.control}
            required
          />

          <InputField
            name="email"
            label={intl.formatMessage({
              id: 'common.email',
              defaultMessage: 'E-mail'
            })}
            control={form.control}
            required
          />

          <InputField
            name="password"
            type="password"
            label={intl.formatMessage({
              id: 'common.password',
              defaultMessage: 'Password'
            })}
            control={form.control}
            required
          />

          <SelectField
            name="groups"
            label={intl.formatMessage({
              id: 'common.role',
              defaultMessage: 'Role'
            })}
            placeholder={intl.formatMessage({
              id: 'common.select',
              defaultMessage: 'Select'
            })}
            control={form.control}
            required
          >
            {groups?.map((group: GroupResponseDto) => (
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
          </div>
        </div>

        <div className="mt-4">
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
        </div>
      </form>
    </Form>
  )
}
