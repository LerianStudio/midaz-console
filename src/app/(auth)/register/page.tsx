'use client'

import Image from 'next/image'
import GeometricShape from '../../../../public/images/geometric-shape.svg'
import LeriandLogo from '../../../../public/images/leriand-logo.png'
import { Card, CardContent } from '@/components/ui/card'
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
  FormLabel
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import React from 'react'

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
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

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
      <div className="mt-6 flex w-full flex-col items-center">
        <Image src={LeriandLogo} alt="Leriand Logo" />
        <div className="mt-6 flex w-full max-w-[429px] flex-col gap-2">
          <h1 className="text-center text-3xl font-semibold text-black">
            Crie sua conta
          </h1>
          <p className="text-center text-sm font-normal text-black">
            Confirme seus{' '}
            <span className="font-bold text-[#DFC844]">dados pessoais</span>.
          </p>
          <Progress
            value={50}
            className="mt-5 w-full"
            indicatorColor="bg-[#F9DF4B]"
          />
        </div>
      </div>

      <div className="mt-3 flex w-full">
        <div className="z-10 h-screen w-fit">
          <Image src={GeometricShape} alt="Rectangle" />
        </div>

        <div className="absolute flex w-full justify-center">
          <Card className="min-h-[407px] min-w-[429px] border-none shadow-none">
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
                        <FormLabel className="text-black opacity-60">
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E-mail"
                            className="h-[37px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black opacity-60">
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Senha"
                            className="h-[37px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black opacity-60">
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Senha"
                            className="h-[37px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black opacity-60">
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Senha"
                            className="h-[37px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="default"
                    className="h-auto w-full bg-[#F9DF4B] px-4 py-3 text-black hover:bg-[#F9DF4B]/50"
                  >
                    Próximo
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
