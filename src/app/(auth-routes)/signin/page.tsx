'use client'

import Image from 'next/image'
import GeometricShape from '@/../public/images/geometric-shape.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import useCustomToast from '@/hooks/use-custom-toast'
import { signIn } from 'next-auth/react'
import { auth } from '@/schema/auth'
import { useIntl } from 'react-intl'
import { InputField } from '@/components/form'
import { LoadingButton } from '@/components/ui/loading-button'

const FormSchema = z.object({
  username: auth.username,
  password: auth.password
})

type FormData = z.infer<typeof FormSchema>

const defaultValues = {
  username: '',
  password: ''
}

const SignInPage = () => {
  const intl = useIntl()
  const route = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues
  })

  const { showError } = useCustomToast()

  const onSubmit = async (values: FormData) => {
    const result = await signIn('credentials', {
      ...values,
      redirect: false
    })

    if (result?.error) {
      console.error('Login error ->', result)
      showError(
        intl.formatMessage({
          id: 'signIn.toast.error',
          defaultMessage: 'Invalid credentials.'
        })
      )
      return
    }

    route.replace('/')
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#faf9f9]">
      <div className="absolute flex h-screen w-full items-center justify-center">
        <div className="w-full">
          <Image src={GeometricShape} alt="Rectangle" />
        </div>

        <div className="absolute">
          <Card className="w-full min-w-[430px] border-none px-8 shadow-none">
            <CardHeader className="px-0 pt-[72px]">
              <CardTitle className="text-3xl">
                {intl.formatMessage({
                  id: 'signIn.titleLogin',
                  defaultMessage: 'Welcome back!'
                })}
              </CardTitle>
              <CardDescription>
                {intl.formatMessage({
                  id: 'signIn.descriptionLogin',
                  defaultMessage: 'Enter your email and password to log in.'
                })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <InputField
                    control={form.control}
                    name="username"
                    label={intl.formatMessage({
                      id: 'entity.auth.username',
                      defaultMessage: 'User'
                    })}
                    placeholder={intl.formatMessage({
                      id: 'signIn.placeholderEmail',
                      defaultMessage: 'Enter your registered email...'
                    })}
                  />
                  <InputField
                    type="password"
                    control={form.control}
                    name="password"
                    label={intl.formatMessage({
                      id: 'entity.auth.password',
                      defaultMessage: 'Password'
                    })}
                    placeholder={intl.formatMessage({
                      id: 'signIn.placeholderPassword',
                      defaultMessage: '******'
                    })}
                  />
                  <LoadingButton
                    className="w-full"
                    type="submit"
                    loading={form.formState.isSubmitting}
                  >
                    {intl.formatMessage({
                      id: 'signIn.buttonSignIn',
                      defaultMessage: 'Sign in'
                    })}
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
