import { InputField, SelectField } from '@/components/form'
import { Form } from '@/components/ui/form'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { user, passwordChange } from '@/schema/user'
import { useListGroups } from '@/client/groups'
import { SelectItem } from '@/components/ui/select'
import { LoadingButton } from '@/components/ui/loading-button'
import { useUpdateUser, useResetUserPassword } from '@/client/users'
import { UserResponseDto } from '@/core/application/dto/user-dto'
import useCustomToast from '@/hooks/use-custom-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import ConfirmationDialog from '@/components/confirmation-dialog'
import React from 'react'
import { GroupResponseDto } from '@/core/application/dto/group-dto'
import { AlertTriangle } from 'lucide-react'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'

const editInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  groups: ''
}

const UpdateFormSchema = z.object({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  groups: user.groups
})

const PasswordSchema = z
  .object({
    newPassword: passwordChange.newPassword,
    confirmPassword: passwordChange.confirmPassword
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    params: { id: 'custom_confirm_password' },
    path: ['confirmPassword']
  })

type UpdateFormData = z.infer<typeof UpdateFormSchema>
type PasswordFormData = z.infer<typeof PasswordSchema>

interface EditUserFormProps {
  user: UserResponseDto
  onSuccess?: () => void
  onOpenChange?: (open: boolean) => void
}

export const EditUserForm = ({
  user,
  onSuccess,
  onOpenChange
}: EditUserFormProps) => {
  const intl = useIntl()
  const { showSuccess, showError } = useCustomToast()
  const { data: groups } = useListGroups({})
  const [activeTab, setActiveTab] = useState('personal-information')
  const [pendingPasswordData, setPendingPasswordData] =
    useState<PasswordFormData | null>(null)

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {
      onConfirm: () => {
        if (pendingPasswordData) {
          const { newPassword } = pendingPasswordData
          resetPassword({ newPassword })
        }
      }
    }
  )

  const form = useForm<UpdateFormData>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      ...editInitialValues,
      ...user,
      groups: user.groups[0] || ''
    }
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  })

  const { mutate: updateUser, isPending: updatePending } = useUpdateUser({
    userId: user.id,
    onSuccess: async (response: unknown) => {
      const responseData = response as any
      const updatedUser = responseData.userUpdated as UserResponseDto

      await onSuccess?.()
      onOpenChange?.(false)

      showSuccess(
        intl.formatMessage(
          {
            id: 'users.toast.update.success',
            defaultMessage: 'User {userName} updated successfully'
          },
          { userName: `${updatedUser.firstName} ${updatedUser.lastName}` }
        )
      )
    },
    onError: () => {
      onOpenChange?.(false)
      showError(
        intl.formatMessage({
          id: 'users.toast.update.error',
          defaultMessage: 'Error updating User'
        })
      )
    }
  })

  const { mutate: resetPassword, isPending: resetPasswordPending } =
    useResetUserPassword({
      userId: user.id,
      onSuccess: async () => {
        await onSuccess?.()
        onOpenChange?.(false)
        showSuccess(
          intl.formatMessage(
            {
              id: 'users.toast.resetPassword.success',
              defaultMessage: 'Password for {userName} reset successfully'
            },
            { userName: `${user.firstName} ${user.lastName}` }
          )
        )
      },
      onError: () => {
        showError(
          intl.formatMessage({
            id: 'users.toast.resetPassword.error',
            defaultMessage: 'Error resetting password'
          })
        )
      }
    })

  const handleEditSubmit = (formData: UpdateFormData) => {
    updateUser({
      ...formData,
      groups: [formData.groups]
    })
  }

  const handlePasswordSubmit = (formData: PasswordFormData) => {
    setPendingPasswordData(formData)
    handleDialogOpen('')
  }

  return (
    <React.Fragment>
      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'users.password.confirmTitle',
          defaultMessage: 'Password Change'
        })}
        description={intl.formatMessage({
          id: 'users.password.confirmDescription',
          defaultMessage:
            'Are you sure you want to change the password for this user? This action cannot be undone.'
        })}
        icon={<AlertTriangle size={24} className="text-yellow-500" />}
        loading={resetPasswordPending}
        {...dialogProps}
      />

      <Tabs
        defaultValue="personal-information"
        className="mt-0 flex flex-grow flex-col justify-between"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <div>
          <TabsList className="mb-8 px-0">
            <TabsTrigger value="personal-information">
              {intl.formatMessage({
                id: 'users.sheet.tabs.personal-information',
                defaultMessage: 'Personal Information'
              })}
            </TabsTrigger>
            <TabsTrigger value="password">
              {intl.formatMessage({
                id: 'common.password',
                defaultMessage: 'Password'
              })}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-information">
            <Form {...form}>
              <form
                id="profile-form"
                className="flex flex-col"
                onSubmit={form.handleSubmit(handleEditSubmit)}
              >
                <div className="flex flex-col gap-4">
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
                    name="email"
                    label={intl.formatMessage({
                      id: 'common.email',
                      defaultMessage: 'E-mail'
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

                  <p className="text-xs font-normal italic text-shadcn-400">
                    {intl.formatMessage({
                      id: 'common.requiredFields',
                      defaultMessage: '(*) required fields.'
                    })}
                  </p>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                id="password-form"
                className="flex flex-col"
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              >
                <div className="flex flex-col gap-4">
                  <InputField
                    name="newPassword"
                    type="password"
                    label={intl.formatMessage({
                      id: 'entity.user.newPassword',
                      defaultMessage: 'New Password'
                    })}
                    control={passwordForm.control}
                    required
                  />

                  <InputField
                    name="confirmPassword"
                    type="password"
                    label={intl.formatMessage({
                      id: 'entity.user.confirmPassword',
                      defaultMessage: 'Confirm Password'
                    })}
                    control={passwordForm.control}
                    required
                  />
                </div>
              </form>
            </Form>
          </TabsContent>
        </div>

        <div className="mt-4">
          <LoadingButton
            size="lg"
            type="submit"
            fullWidth
            loading={
              activeTab === 'personal-information'
                ? updatePending
                : resetPasswordPending
            }
            form={
              activeTab === 'personal-information'
                ? 'profile-form'
                : 'password-form'
            }
          >
            {intl.formatMessage({
              id: 'common.save',
              defaultMessage: 'Save'
            })}
          </LoadingButton>
        </div>
      </Tabs>
    </React.Fragment>
  )
}
