'use client'

import Image from 'next/image'
import GeometricShape from '../../../../public/images/geometric-shape.svg'
import LeriandLogo from '../../../../public/images/leriand-logo.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'next-export-i18n'
import { PasswordInput } from '@/components/ui/password-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Este campo precisa ser preenchido.' })
    .email('Insira um e-mail válido.'),
  password: z.string().min(8, {
    message: 'Insira pelo menos 8 caracteres.'
  })
})

const Page = () => {
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#faf9f9]">
      <div className="mt-6 flex w-full justify-center">
        <Image src={LeriandLogo} alt="Leriand Logo" />
      </div>

      <div className="absolute flex h-screen w-full items-center justify-center">
        <div className="w-full">
          <Image src={GeometricShape} alt="Rectangle" />
        </div>

        <div className="absolute">
          <Card className="min-h-[505px] w-full min-w-[430px] border-none px-8 shadow-none">
            <CardHeader className="pt-[72px]">
              <CardTitle className="text-3xl font-semibold">
                {t('auth.titleLogin')}
              </CardTitle>
              <CardDescription className="text-black">
                Insira seu e-mail e senha pra entrar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6 pt-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            className="h-[48px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Senha"
                            className="h-[48px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="default"
                    className="h-auto w-full bg-[#F9DF4B] px-4 py-3 text-black hover:bg-[#F9DF4B]/50"
                  >
                    Entrar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
