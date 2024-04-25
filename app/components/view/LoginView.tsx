'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input/input'
import { Button } from '@/components/ui/button/button'
import useCustomToast from '@/hooks/useCustomToast'

const formSchema = z.object({
  username: z.string({
    required_error: 'Informe um email válido'
  }).email({
    message: 'Informe um email válido'
  }),
  password: z.string({
    required_error: 'Informe uma senha válida'
  }).min(4, {
    message: 'O campo senha deve conter mais que 4 caracteres'
  })
})


const LoginView = () => {
  const route = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  
  const { showSuccess, showError } = useCustomToast()
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn('credentials', {
      ...values,
      redirect: false
    })
    
    if (result?.error) {
      console.log('Login error ->', result)
      showError('Invalid user or password!')
      return
    }
    
    route.replace('/en')
  }
  
  return (
    
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu email cadastrado" {...field} />
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
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} className="w-full"
                  type="submit">{form.formState.isSubmitting ? 'Carregando...' : 'Entrar'}</Button>
        </form>
      </Form>
    </div>
  )
  
  
}

export default LoginView
